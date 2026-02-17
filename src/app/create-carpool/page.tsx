"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import {
  MapPin,
  Calendar,
  Clock,
  Euro,
  Car,
  Users,
  Music,
  Cigarette,
  Dog,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  energyType: string;
  seats: number;
}

export default function CreateCarpoolPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    availableSeats: 1,
    pricePerSeat: 10,
    vehicleId: "",
    smokingAllowed: false,
    petsAllowed: false,
    musicAllowed: true,
    talkingAllowed: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user && token) {
      if (user.role !== "DRIVER" && user.role !== "ADMIN") {
        alert("Seuls les conducteurs peuvent créer des trajets. Veuillez mettre à jour votre profil.");
        router.push("/profile");
        return;
      }
      fetchVehicles();
    }
  }, [user, token, authLoading, router]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/users/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setVehicles(data.data);
        if (data.data.length > 0) {
          setFormData((prev) => ({ ...prev, vehicleId: data.data[0].id }));
        }
      } else {
        console.error("Failed to load vehicles:", data.error);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.departure.trim()) {
      newErrors.departure = "Le lieu de départ est requis";
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Le lieu d'arrivée est requis";
    }
    if (!formData.departureDate) {
      newErrors.departureDate = "La date de départ est requise";
    } else {
      const selectedDate = new Date(formData.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.departureDate = "La date de départ ne peut pas être dans le passé";
      }
    }
    if (!formData.departureTime) {
      newErrors.departureTime = "L'heure de départ est requise";
    }
    if (!formData.arrivalTime) {
      newErrors.arrivalTime = "L'heure d'arrivée est requise";
    }
    if (formData.departureTime && formData.arrivalTime && formData.departureTime >= formData.arrivalTime) {
      newErrors.arrivalTime = "L'heure d'arrivée doit être après l'heure de départ";
    }
    if (formData.availableSeats < 1 || formData.availableSeats > 8) {
      newErrors.availableSeats = "Le nombre de places doit être entre 1 et 8";
    }
    if (formData.pricePerSeat < 1) {
      newErrors.pricePerSeat = "Le prix par place doit être au moins 1 crédit";
    }
    if (!formData.vehicleId) {
      newErrors.vehicleId = "Veuillez sélectionner un véhicule ou en ajouter un";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/carpools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          departure: formData.departure,
          destination: formData.destination,
          departureDate: formData.departureDate,
          departureTime: formData.departureTime,
          arrivalTime: formData.arrivalTime,
          availableSeats: formData.availableSeats,
          pricePerSeat: formData.pricePerSeat,
          vehicleId: formData.vehicleId,
          preferences: {
            smokingAllowed: formData.smokingAllowed,
            petsAllowed: formData.petsAllowed,
            musicAllowed: formData.musicAllowed,
            talkingAllowed: formData.talkingAllowed,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Trajet créé avec succès !");
        router.push(`/covoiturages/${data.data.id}`);
      } else {
        setErrors({ general: data.error || "Erreur lors de la création du trajet" });
      }
    } catch (error) {
      console.error("Error creating carpool:", error);
      setErrors({ general: "Erreur lors de la création du trajet. Veuillez réessayer." });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposer un trajet</h1>
          <p className="text-gray-600">Partagez votre trajet et gagnez des crédits</p>
        </div>

        {vehicles.length === 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-orange-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Aucun véhicule enregistré</h3>
                  <p className="text-gray-600">
                    Vous devez d&apos;abord ajouter un véhicule à votre profil pour proposer un trajet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Détails du trajet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Departure */}
                  <div className="space-y-2">
                    <Label htmlFor="departure">
                      Lieu de départ <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="departure"
                        type="text"
                        placeholder="Paris, 75001"
                        value={formData.departure}
                        onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                        className={`pl-10 ${errors.departure ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.departure && <p className="text-sm text-red-600">{errors.departure}</p>}
                  </div>

                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination">
                      Lieu d&apos;arrivée <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="destination"
                        type="text"
                        placeholder="Lyon, 69001"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className={`pl-10 ${errors.destination ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.destination && <p className="text-sm text-red-600">{errors.destination}</p>}
                  </div>

                  {/* Departure Date */}
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">
                      Date de départ <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                        className={`pl-10 ${errors.departureDate ? "border-red-500" : ""}`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    {errors.departureDate && <p className="text-sm text-red-600">{errors.departureDate}</p>}
                  </div>

                  {/* Departure Time */}
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">
                      Heure de départ <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="departureTime"
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                        className={`pl-10 ${errors.departureTime ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.departureTime && <p className="text-sm text-red-600">{errors.departureTime}</p>}
                  </div>

                  {/* Arrival Time */}
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">
                      Heure d&apos;arrivée estimée <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="arrivalTime"
                        type="time"
                        value={formData.arrivalTime}
                        onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                        className={`pl-10 ${errors.arrivalTime ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.arrivalTime && <p className="text-sm text-red-600">{errors.arrivalTime}</p>}
                  </div>

                  {/* Available Seats */}
                  <div className="space-y-2">
                    <Label htmlFor="availableSeats">
                      Places disponibles <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="availableSeats"
                        type="number"
                        min={1}
                        max={8}
                        value={formData.availableSeats}
                        onChange={(e) => setFormData({ ...formData, availableSeats: parseInt(e.target.value) })}
                        className={`pl-10 ${errors.availableSeats ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.availableSeats && <p className="text-sm text-red-600">{errors.availableSeats}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Vehicle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-green-600" />
                  Tarification et véhicule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Price per seat */}
                  <div className="space-y-2">
                    <Label htmlFor="pricePerSeat">
                      Prix par place (crédits) <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="pricePerSeat"
                        type="number"
                        min={1}
                        value={formData.pricePerSeat}
                        onChange={(e) => setFormData({ ...formData, pricePerSeat: parseInt(e.target.value) })}
                        className={`pl-10 ${errors.pricePerSeat ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.pricePerSeat && <p className="text-sm text-red-600">{errors.pricePerSeat}</p>}
                    <p className="text-sm text-gray-500">
                      Prix plateforme (avec frais de 7%) : {Math.ceil(formData.pricePerSeat * 1.07)} crédits
                    </p>
                  </div>

                  {/* Vehicle */}
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">
                      Véhicule <span className="text-red-600">*</span>
                    </Label>
                    <div className="relative">
                      <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        id="vehicleId"
                        value={formData.vehicleId}
                        onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                          errors.vehicleId ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        {vehicles.length === 0 ? (
                          <option value="">Aucun véhicule disponible</option>
                        ) : (
                          vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.brand} {vehicle.model} - {vehicle.energyType} ({vehicle.seats} places)
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    {errors.vehicleId && <p className="text-sm text-red-600">{errors.vehicleId}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  Préférences de trajet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="smokingAllowed"
                      checked={formData.smokingAllowed}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, smokingAllowed: checked === true })
                      }
                    />
                    <Label htmlFor="smokingAllowed" className="flex items-center gap-2 cursor-pointer">
                      <Cigarette className="h-5 w-5 text-gray-600" />
                      Tabac autorisé
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="petsAllowed"
                      checked={formData.petsAllowed}
                      onCheckedChange={(checked) => setFormData({ ...formData, petsAllowed: checked === true })}
                    />
                    <Label htmlFor="petsAllowed" className="flex items-center gap-2 cursor-pointer">
                      <Dog className="h-5 w-5 text-gray-600" />
                      Animaux acceptés
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="musicAllowed"
                      checked={formData.musicAllowed}
                      onCheckedChange={(checked) => setFormData({ ...formData, musicAllowed: checked === true })}
                    />
                    <Label htmlFor="musicAllowed" className="flex items-center gap-2 cursor-pointer">
                      <Music className="h-5 w-5 text-gray-600" />
                      Musique autorisée
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="talkingAllowed"
                      checked={formData.talkingAllowed}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, talkingAllowed: checked === true })
                      }
                    />
                    <Label htmlFor="talkingAllowed" className="flex items-center gap-2 cursor-pointer">
                      <MessageCircle className="h-5 w-5 text-gray-600" />
                      Discussion autorisée
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
                disabled={submitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={submitting || vehicles.length === 0}
              >
                {submitting ? "Création..." : "Créer le trajet"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
