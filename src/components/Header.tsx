"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, User, LogOut, Coins } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EcoRide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Accueil
            </Link>
            <Link
              href="/covoiturages"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Covoiturages
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Coins className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">{user.credits} crédits</span>
                </div>
                <Button asChild variant="outline">
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    {user.pseudo}
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/register">Inscription</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-green-600 font-medium transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/covoiturages"
              className="block text-gray-700 hover:text-green-600 font-medium transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Covoiturages
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-green-600 font-medium transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 text-gray-700" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{user.pseudo}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Coins className="h-3 w-3 text-green-600" />
                        {user.credits} crédits
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      Mon profil
                    </Link>
                  </Button>
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Connexion
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      Inscription
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
