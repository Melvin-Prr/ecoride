import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600">
            Une question ? Notre équipe est là pour vous aider
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Email */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <span>Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Envoyez-nous un email, nous vous répondrons dans les 24h
              </p>
              <a
                href="mailto:contact@ecoride.fr"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                contact@ecoride.fr
              </a>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <span>Téléphone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Appelez-nous du lundi au vendredi
              </p>
              <a
                href="tel:+33123456789"
                className="text-secondary hover:text-secondary/80 font-semibold"
              >
                01 23 45 67 89
              </a>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <span>Adresse</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                123 Avenue de la République
                <br />
                75011 Paris
                <br />
                France
              </p>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <span>Horaires</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Lundi - Vendredi : 9h - 18h
                <br />
                Samedi : 10h - 16h
                <br />
                Dimanche : Fermé
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment fonctionne le système de crédits ?
              </h3>
              <p className="text-gray-600">
                Lors de votre inscription, vous recevez 20 crédits offerts. Vous
                utilisez des crédits pour réserver un trajet, et vous gagnez des
                crédits lorsque vous proposez un covoiturage et que les passagers
                confirment leur participation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment annuler une réservation ?
              </h3>
              <p className="text-gray-600">
                Vous pouvez annuler votre réservation depuis votre espace
                personnel. Vos crédits vous seront automatiquement remboursés et
                le conducteur sera notifié par email.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Qu&apos;est-ce qu&apos;un véhicule écologique ?
              </h3>
              <p className="text-gray-600">
                Sur EcoRide, nous considérons comme écologiques les véhicules
                électriques et hybrides. Ils sont identifiés par un badge vert
                dans les résultats de recherche.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment devenir conducteur ?
              </h3>
              <p className="text-gray-600">
                Après avoir créé votre compte, rendez-vous dans votre profil pour
                ajouter vos informations de conducteur (véhicule, préférences).
                Vous pourrez ensuite proposer vos trajets.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <a href="/mentions-legales" className="hover:text-primary">
              Mentions légales
            </a>
            {" • "}
            <a href="/politique-confidentialite" className="hover:text-primary">
              Politique de confidentialité
            </a>
            {" • "}
            <a href="/cgu" className="hover:text-primary">
              CGU
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
