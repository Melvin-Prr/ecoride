"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Mail, User, Lock, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string): boolean => {
    // Min 8 caractères, majuscule, chiffre, caractère spécial
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.pseudo.trim()) {
      newErrors.pseudo = "Le pseudo est requis";
    } else if (formData.pseudo.length < 3) {
      newErrors.pseudo = "Le pseudo doit contenir au moins 3 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // TODO: API call to register user
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     pseudo: formData.pseudo,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });

      // Mock success
      setTimeout(() => {
        alert("Compte créé avec succès ! Vous recevez 20 crédits de bienvenue.");
        router.push("/login");
      }, 1000);
    } catch (error) {
      setErrors({ general: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-900">EcoRide</span>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Créer un compte</CardTitle>
            <CardDescription>
              Rejoignez EcoRide et commencez à voyager de manière écologique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Pseudo */}
              <div className="space-y-2">
                <label htmlFor="pseudo" className="text-sm font-medium text-gray-700">
                  Pseudo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="pseudo"
                    type="text"
                    placeholder="Votre pseudo"
                    value={formData.pseudo}
                    onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                    className={`pl-10 ${errors.pseudo ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.pseudo && <p className="text-sm text-red-600">{errors.pseudo}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                <p className="text-xs text-gray-500">
                  Min 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={loading}
              >
                {loading ? "Création du compte..." : "Créer mon compte"}
              </Button>

              {/* Welcome Credits Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800 text-center">
                  🎉 Recevez <strong>20 crédits</strong> offerts à l&apos;inscription !
                </p>
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
