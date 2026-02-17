"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Coins,
  Car,
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  UserCog,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "carpools">("bookings");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user && token) {
      fetchProfileData();
    }
  }, [user, token, authLoading, router]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfileData(data.data);
      } else {
        console.error("Failed to load profile:", data.error);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler cette réservation ? Vos crédits seront remboursés.")) {
      return;
    }

    setActionLoading(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Réservation annulée avec succès. ${data.data.refundedCredits} crédits ont été remboursés.`);
        // Refresh profile data
        fetchProfileData();
      } else {
        alert(data.error || "Erreur lors de l'annulation de la réservation");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Erreur lors de l'annulation de la réservation");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelCarpool = async (carpoolId: string) => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir annuler ce trajet ? Tous les passagers seront remboursés et notifiés."
      )
    ) {
      return;
    }

    setActionLoading(carpoolId);
    try {
      const response = await fetch(`/api/carpools/${carpoolId}/cancel`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.data.message);
        // Refresh profile data
        fetchProfileData();
      } else {
        alert(data.error || "Erreur lors de l'annulation du trajet");
      }
    } catch (error) {
      console.error("Error canceling carpool:", error);
      alert("Erreur lors de l'annulation du trajet");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStartTrip = async (carpoolId: string) => {
    if (!confirm("Confirmer le démarrage du trajet ?")) {
      return;
    }

    setActionLoading(carpoolId);
    try {
      const response = await fetch(`/api/carpools/${carpoolId}/start`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.data.message);
        // Refresh profile data
        fetchProfileData();
      } else {
        alert(data.error || "Erreur lors du démarrage du trajet");
      }
    } catch (error) {
      console.error("Error starting trip:", error);
      alert("Erreur lors du démarrage du trajet");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCompleteTrip = async (carpoolId: string) => {
    if (!confirm("Confirmer l'arrivée à destination ? Vous recevrez vos crédits.")) {
      return;
    }

    setActionLoading(carpoolId);
    try {
      const response = await fetch(`/api/carpools/${carpoolId}/complete`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.data.message);
        // Refresh profile data and user credits
        fetchProfileData();
      } else {
        alert(data.error || "Erreur lors de la finalisation du trajet");
      }
    } catch (error) {
      console.error("Error completing trip:", error);
      alert("Erreur lors de la finalisation du trajet");
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!user || !profileData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon profil</h1>
          <p className="text-gray-600">Gérez vos informations et consultez votre historique</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-center">{user.pseudo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <UserCog className="h-5 w-5" />
                  <span className="text-sm capitalize">{user.role.toLowerCase()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coins className="h-6 w-6 text-green-600" />
                    <span className="font-medium text-gray-700">Crédits</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{user.credits}</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Réservations</span>
                  <span className="font-semibold">{profileData.bookingsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trajets proposés</span>
                  <span className="font-semibold">{profileData.carpoolsCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avis reçus</span>
                  <span className="font-semibold">{profileData.reviewsCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/covoiturages">
                    <MapPin className="h-4 w-4 mr-2" />
                    Chercher un trajet
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/create-carpool">
                    <Car className="h-4 w-4 mr-2" />
                    Proposer un trajet
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card>
              <CardHeader>
                <div className="flex gap-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`pb-3 px-2 font-medium transition relative ${
                      activeTab === "bookings"
                        ? "text-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Mes réservations
                    {activeTab === "bookings" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("carpools")}
                    className={`pb-3 px-2 font-medium transition relative ${
                      activeTab === "carpools"
                        ? "text-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Mes trajets proposés
                    {activeTab === "carpools" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                    )}
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === "bookings" ? (
                  <div className="space-y-4">
                    {profileData.bookings.length > 0 ? (
                      profileData.bookings.map((booking: any) => (
                        <Card key={booking.id} className="border-l-4 border-l-green-600">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <MapPin className="h-5 w-5 text-green-600" />
                                  <h3 className="font-semibold text-lg">
                                    {booking.carpool.departure} → {booking.carpool.destination}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(booking.carpool.departureDate).toLocaleDateString("fr-FR")}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {booking.carpool.departureTime}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Conducteur: {booking.carpool.driver.pseudo}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Coins className="h-4 w-4" />
                                    {booking.seatsBooked} place{booking.seatsBooked > 1 ? "s" : ""} - {booking.totalPrice} crédits
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    booking.status === "CONFIRMED"
                                      ? "bg-green-100 text-green-700"
                                      : booking.status === "CANCELLED"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {booking.status === "CONFIRMED"
                                    ? "Confirmé"
                                    : booking.status === "CANCELLED"
                                    ? "Annulé"
                                    : booking.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/covoiturages/${booking.carpool.id}`}>
                                  Voir détails
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                              </Button>
                              {booking.status === "CONFIRMED" && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={actionLoading === booking.id}
                                >
                                  {actionLoading === booking.id ? "Annulation..." : "Annuler"}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Aucune réservation pour le moment</p>
                        <Button asChild>
                          <Link href="/covoiturages">Chercher un trajet</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profileData.carpools.length > 0 ? (
                      profileData.carpools.map((carpool: any) => (
                        <Card key={carpool.id} className="border-l-4 border-l-blue-600">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <MapPin className="h-5 w-5 text-blue-600" />
                                  <h3 className="font-semibold text-lg">
                                    {carpool.departure} → {carpool.destination}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(carpool.departureDate).toLocaleDateString("fr-FR")}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {carpool.departureTime}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    {carpool.availableSeats} place{carpool.availableSeats > 1 ? "s" : ""} disponible{carpool.availableSeats > 1 ? "s" : ""}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Coins className="h-4 w-4" />
                                    {carpool.platformPrice} crédits
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    carpool.status === "PENDING"
                                      ? "bg-blue-100 text-blue-700"
                                      : carpool.status === "IN_PROGRESS"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : carpool.status === "COMPLETED"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {carpool.status === "PENDING"
                                    ? "En attente"
                                    : carpool.status === "IN_PROGRESS"
                                    ? "En cours"
                                    : carpool.status === "COMPLETED"
                                    ? "Terminé"
                                    : carpool.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/covoiturages/${carpool.id}`}>
                                  Voir détails
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                              </Button>
                              {carpool.status === "PENDING" && (
                                <>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleStartTrip(carpool.id)}
                                    disabled={actionLoading === carpool.id}
                                  >
                                    {actionLoading === carpool.id ? "Démarrage..." : "Démarrer"}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleCancelCarpool(carpool.id)}
                                    disabled={actionLoading === carpool.id}
                                  >
                                    {actionLoading === carpool.id ? "Annulation..." : "Annuler"}
                                  </Button>
                                </>
                              )}
                              {carpool.status === "IN_PROGRESS" && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => handleCompleteTrip(carpool.id)}
                                  disabled={actionLoading === carpool.id}
                                >
                                  {actionLoading === carpool.id ? "Finalisation..." : "Arrivée à destination"}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Aucun trajet proposé pour le moment</p>
                        <Button asChild>
                          <Link href="/create-carpool">Proposer un trajet</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
