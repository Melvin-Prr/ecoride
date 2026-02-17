"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
            <Button asChild variant="outline">
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/register">Inscription</Link>
            </Button>
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
