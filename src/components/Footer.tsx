import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="EcoRide"
                width={120}
                height={32}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm">
              La plateforme de covoiturage qui respecte l&apos;environnement et votre budget.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/covoiturages" className="hover:text-primary transition">
                  Rechercher un trajet
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition">
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/legal/mentions-legales" className="hover:text-primary transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-primary transition">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-primary transition">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@ecoride.com"
                className="flex items-center gap-2 text-sm hover:text-secondary transition"
              >
                <Mail className="h-4 w-4" />
                contact@ecoride.com
              </a>

              {/* Social Media Links */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {currentYear} EcoRide. Tous droits réservés.</p>
            <p className="flex items-center gap-2">
              Fait avec <span className="text-red-500">❤️</span> pour la planète
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
