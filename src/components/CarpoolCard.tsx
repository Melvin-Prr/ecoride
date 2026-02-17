import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Users, Star, Leaf, Euro } from "lucide-react";

interface CarpoolCardProps {
  id: string;
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  platformPrice: number;
  driver: {
    pseudo: string;
    rating?: number;
  };
  vehicle: {
    energyType: string;
  };
}

export default function CarpoolCard({
  id,
  departure,
  destination,
  departureDate,
  departureTime,
  arrivalTime,
  availableSeats,
  platformPrice,
  driver,
  vehicle,
}: CarpoolCardProps) {
  const isEco = vehicle.energyType === "ELECTRIC" || vehicle.energyType === "HYBRID";
  const formattedDate = new Date(departureDate).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
      <CardContent className="pt-6">
        {/* Route Info */}
        <div className="mb-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-green-600 mt-1 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{departure}</p>
              <div className="h-8 border-l-2 border-gray-300 ml-2"></div>
              <p className="font-semibold text-gray-900">{destination}</p>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{departureTime} - {arrivalTime}</span>
          </div>
        </div>

        {/* Driver & Vehicle Info */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-semibold">
                {driver.pseudo.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{driver.pseudo}</p>
              {driver.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{driver.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {isEco && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <Leaf className="h-4 w-4" />
              <span className="text-xs font-medium">Éco</span>
            </div>
          )}
        </div>

        {/* Seats & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">
              {availableSeats} {availableSeats > 1 ? "places" : "place"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Euro className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{platformPrice}</span>
            <span className="text-sm text-gray-500">crédits</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 border-t border-gray-200">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href={`/covoiturages/${id}`}>Voir les détails</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
