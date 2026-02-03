import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Users, TrendingDown, Shield } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full mb-6">
            <Leaf className="h-5 w-5" />
            <span className="text-sm font-medium">Plateforme de covoiturage écologique</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Voyagez ensemble,
            <br />
            <span className="text-green-600">Préservez la planète</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            EcoRide connecte conducteurs et passagers pour des trajets écoresponsables. Réduisez
            votre empreinte carbone tout en économisant sur vos déplacements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="#search">Rechercher un trajet</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Créer un compte</Link>
            </Button>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-green-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Écologique</h3>
              <p className="text-sm text-gray-600">
                Réduisez les émissions de CO₂ en partageant vos trajets
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Économique</h3>
              <p className="text-sm text-gray-600">
                Partagez les frais et économisez sur vos déplacements
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Convivial</h3>
              <p className="text-sm text-gray-600">
                Rencontrez de nouvelles personnes lors de vos trajets
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
              <p className="text-sm text-gray-600">
                Profils vérifiés et système d&apos;évaluation fiable
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
