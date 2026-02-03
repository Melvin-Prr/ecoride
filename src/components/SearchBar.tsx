"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";

export default function SearchBar() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!departure || !destination || !date) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Redirect to search results
    const params = new URLSearchParams({
      from: departure,
      to: destination,
      date: date,
    });
    window.location.href = `/covoiturages?${params.toString()}`;
  };

  return (
    <section id="search" className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-xl border-2 border-green-100">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Rechercher un covoiturage
            </h2>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Departure */}
                <div className="space-y-2">
                  <label htmlFor="departure" className="text-sm font-medium text-gray-700">
                    Départ
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="departure"
                      type="text"
                      placeholder="Paris, Lyon, Marseille..."
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium text-gray-700">
                    Arrivée
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="destination"
                      type="text"
                      placeholder="Paris, Lyon, Marseille..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Search className="mr-2 h-5 w-5" />
                Rechercher
              </Button>
            </form>

            {/* Quick Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                💡 <strong>Astuce :</strong> Réservez votre trajet à l&apos;avance pour bénéficier
                des meilleurs tarifs
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
