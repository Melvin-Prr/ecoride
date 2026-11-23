import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section 
      className="relative py-24 px-4 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(30, 58, 95, 0.75), rgba(15, 23, 42, 0.75)),
          url('/assets/background_main.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '600px'
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Voyagez partout à<br />
            <span className="text-white">petit prix !</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
            Partagez vos trajets et économisez sur vos déplacements quotidiens.
            Rejoignez la communauté EcoRide dès maintenant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#search">Rechercher un trajet</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link href="/register">Créer un compte</Link>
            </Button>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Économique</h3>
              <p className="text-sm text-gray-600">
                Partagez les frais et voyagez à petit prix
              </p>
            </CardContent>
          </Card>

          <Card className="border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Écologique</h3>
              <p className="text-sm text-gray-600">
                Réduisez votre empreinte carbone ensemble
              </p>
            </CardContent>
          </Card>

          <Card className="border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Convivial</h3>
              <p className="text-sm text-gray-600">
                Rencontrez des personnes partageant vos trajets
              </p>
            </CardContent>
          </Card>

          <Card className="border-transparent bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
              <p className="text-sm text-gray-600">
                Profils vérifiés et système d&apos;évaluation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
