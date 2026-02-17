"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Leaf,
  Euro,
  Car,
  Music,
  Cigarette,
  Dog,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function CarpoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const carpoolId = params.id as string;
  
  const [carpool, setCarpool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchCarpool = async () => {
      try {
        const response = await fetch(`/api/carpools/${carpoolId}`);
        const data = await response.json();
        
        if (response.ok) {
          setCarpool(data.data);
        } else {
          console.error("Failed to load carpool:", data.error);
          alert("Impossible de charger ce covoiturage.");
          router.push("/covoiturages");
        }
      } catch (error) {
        console.error("Error fetching carpool:", error);
        alert("Erreur lors du chargement du covoiturage.");
        router.push("/covoiturages");
      } finally {
        setLoading(false);
      }
    };

    fetchCarpool();
  }, [carpoolId, router]);

  const isEco = carpool?.vehicle?.energyType === "ELECTRIC" || carpool?.vehicle?.energyType === "HYBRID";
  const hasAvailableSeats = carpool?.availableSeats > 0;
  const hasEnoughCredits = (user?.credits || 0) >= (carpool?.platformPrice || 0);

  const handleBooking = async () => {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    if (!hasAvailableSeats) {
      alert("Désolé, il n'y a plus de places disponibles.");
      return;
    }
    if (!hasEnoughCredits) {
      alert(`Vous n'avez pas assez de crédits. Il vous faut ${carpool.platformPrice} crédits.`);
      return;
    }

    // Show confirmation modal
    const confirmed = confirm(
      `Confirmer la réservation ?\n\nCela vous coûtera ${carpool.platformPrice} crédits.\nVous avez actuellement ${user.credits} crédits.`
    );
    
    if (!confirmed) return;

    setBooking(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carpoolId: carpool.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Réservation confirmée ! Il vous reste ${data.data.remainingCredits} crédits.`);
        // Refresh carpool data to update available seats
        const refreshResponse = await fetch(`/api/carpools/${carpoolId}`);
        const refreshData = await refreshResponse.json();
        if (refreshResponse.ok) {
          setCarpool(refreshData.data);
        }
        router.push("/profile");
      } else {
        alert(data.error || "Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!carpool) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux résultats
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">Détails du trajet</CardTitle>
                  {isEco && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm font-medium">Écologique</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Route */}
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">
                      {carpool.departure}
                    </p>
                    <div className="h-10 border-l-2 border-gray-300 ml-3 my-2"></div>
                    <p className="text-lg font-semibold text-gray-900">
                      {carpool.destination}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">
                        {new Date(carpool.departureDate).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-500">Horaires</p>
                      <p className="font-semibold">
                        {carpool.departureTime} - {carpool.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Seats */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-500">Places disponibles</p>
                    <p className="font-semibold text-lg">
                      {carpool.availableSeats} {carpool.availableSeats > 1 ? "places" : "place"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Marque et modèle</p>
                    <p className="font-semibold">
                      {carpool.vehicle.brand} {carpool.vehicle.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type d&apos;énergie</p>
                    <p className="font-semibold">
                      {carpool.vehicle.energyType === "ELECTRIC" && "Électrique"}
                      {carpool.vehicle.energyType === "HYBRID" && "Hybride"}
                      {carpool.vehicle.energyType === "GASOLINE" && "Essence"}
                      {carpool.vehicle.energyType === "DIESEL" && "Diesel"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Préférences du conducteur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        carpool.preferences.smokingAllowed
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Cigarette className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {carpool.preferences.smokingAllowed ? "Fumeurs acceptés" : "Non fumeur"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        carpool.preferences.petsAllowed
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Dog className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {carpool.preferences.petsAllowed ? "Animaux acceptés" : "Pas d'animaux"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        carpool.preferences.musicAllowed
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Music className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {carpool.preferences.musicAllowed ? "Musique autorisée" : "Sans musique"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        carpool.preferences.talkingAllowed
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {carpool.preferences.talkingAllowed ? "Bavard" : "Calme"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Avis sur le conducteur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {carpool.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Driver Info */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-2xl">
                        {carpool.driver.pseudo.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{carpool.driver.pseudo}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {carpool.driver.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({carpool.driver.totalTrips} trajets)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Prix par place</span>
                    <span className="font-semibold">{carpool.pricePerSeat} crédits</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Frais plateforme</span>
                    <span className="font-semibold">
                      {carpool.platformPrice - carpool.pricePerSeat} crédits
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-lg">Total</span>
                    <div className="flex items-center gap-1">
                      <Euro className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        {carpool.platformPrice}
                      </span>
                      <span className="text-sm text-gray-500">crédits</span>
                    </div>
                  </div>
                </div>

                {/* User Credits */}
                {user && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Vos crédits</span>
                      <span className="font-semibold">{user.credits} crédits</span>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                  onClick={handleBooking}
                  disabled={booking || !hasAvailableSeats || (!user || !hasEnoughCredits)}
                >
                  {booking
                    ? "Réservation..."
                    : !user
                    ? "Connectez-vous pour réserver"
                    : !hasAvailableSeats
                    ? "Plus de places disponibles"
                    : !hasEnoughCredits
                    ? "Crédits insuffisants"
                    : "Participer à ce trajet"}
                </Button>

                {user && !hasEnoughCredits && hasAvailableSeats && (
                  <p className="text-sm text-red-600 text-center">
                    Il vous manque {carpool.platformPrice - user.credits} crédits
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
