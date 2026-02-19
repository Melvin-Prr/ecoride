"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CarpoolCard from "@/components/CarpoolCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Search, AlertCircle } from "lucide-react";

export default function CarpoolsPage() {
  const searchParams = useSearchParams();
  const [departure, setDeparture] = useState(searchParams.get("from") || "");
  const [destination, setDestination] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [carpools, setCarpools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [suggestedDate, setSuggestedDate] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setSuggestedDate(null);

    // Validation
    if (!departure || !destination || !date) {
      alert("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        from: departure,
        to: destination,
        date: date,
      });

      const response = await fetch(`/api/carpools/search?${params}`);
      const data = await response.json();

      if (response.ok) {
        setCarpools(data.data.carpools);
        if (data.data.suggestedDate) {
          setSuggestedDate(data.data.suggestedDate);
        }
      } else {
        console.error("Search error:", data.error);
        setCarpools([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setCarpools([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if URL params are present
  useEffect(() => {
    if (searchParams.get("from") && searchParams.get("to") && searchParams.get("date")) {
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Search Form */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Rechercher un covoiturage
            </h1>

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
                      placeholder="Ville de départ"
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
                      placeholder="Ville d'arrivée"
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
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={loading}
              >
                <Search className="h-5 w-5 mr-2" />
                {loading ? "Recherche..." : "Rechercher"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {searched && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {carpools.length > 0
                  ? `${carpools.length} ${carpools.length > 1 ? "covoiturages trouvés" : "covoiturage trouvé"}`
                  : "Aucun covoiturage trouvé"}
              </h2>
            </div>

            {carpools.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carpools.map((carpool) => (
                  <CarpoolCard key={carpool.id} {...carpool} />
                ))}
              </div>
            ) : (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-orange-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Aucun covoiturage disponible pour cette recherche
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Nous n&apos;avons trouvé aucun trajet correspondant à vos critères pour cette
                        date.
                      </p>
                      {suggestedDate && (
                        <p className="text-sm text-gray-700">
                          <strong>Suggestion :</strong> Essayez une autre date, par exemple le{" "}
                          {new Date(suggestedDate).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })}
                          .
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!searched && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Utilisez le formulaire ci-dessus pour rechercher un covoiturage
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
