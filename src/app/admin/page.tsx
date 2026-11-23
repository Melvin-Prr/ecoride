"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Analytics {
  stats: {
    totalUsers: number;
    totalCarpools: number;
    totalBookings: number;
    totalCredits: number;
    completedTrips: number;
    activeTrips: number;
  };
  charts: {
    carpoolsByDay: Array<{ date: string; count: number }>;
    creditsPerDay: Array<{ date: string; total: number }>;
  };
  recentUsers: Array<{
    id: string;
    pseudo: string;
    email: string;
    role: string;
    credits: number;
    suspended: boolean;
    createdAt: string;
  }>;
}

export default function AdminPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Employee creation form
  const [employeeForm, setEmployeeForm] = useState({
    email: "",
    pseudo: "",
    password: "",
  });
  const [employeeErrors, setEmployeeErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    fetchAnalytics();
  }, [user, router]);

  const fetchAnalytics = async () => {
    if (!token) return;

    try {
      const response = await fetch("/api/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        console.error("Failed to fetch analytics");
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmployeeErrors({});
    setActionLoading("create-employee");

    try {
      const response = await fetch("/api/admin/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeForm),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Compte employé créé avec succès !");
        setEmployeeForm({ email: "", pseudo: "", password: "" });
        fetchAnalytics(); // Refresh stats
      } else {
        if (data.errors) {
          setEmployeeErrors(data.errors);
        } else {
          alert(data.error || "Erreur lors de la création du compte");
        }
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Erreur lors de la création du compte");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspendUser = async (userId: string, suspend: boolean) => {
    const confirmMessage = suspend
      ? "Voulez-vous vraiment suspendre cet utilisateur ? Il ne pourra plus se connecter."
      : "Voulez-vous vraiment lever la suspension de cet utilisateur ?";

    if (!confirm(confirmMessage)) return;

    setActionLoading(`suspend-${userId}`);

    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ suspended: suspend }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchAnalytics(); // Refresh user list
      } else {
        alert(data.error || "Erreur lors de la modification du statut");
      }
    } catch (error) {
      console.error("Error suspending user:", error);
      alert("Erreur lors de la modification du statut");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100">
        <p className="text-primary text-lg">Chargement...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100">
        <p className="text-red-600">Erreur lors du chargement des données</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Espace Administrateur
          </h1>
          <p className="text-gray-700">
            Gestion de la plateforme EcoRide
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Utilisateurs</p>
                <p className="text-3xl font-bold text-primary">
                  {analytics.stats.totalUsers}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Covoiturages</p>
                <p className="text-3xl font-bold text-primary">
                  {analytics.stats.totalCarpools}
                </p>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Trajets Complétés</p>
                <p className="text-3xl font-bold text-primary">
                  {analytics.stats.completedTrips}
                </p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Trajets Actifs</p>
                <p className="text-3xl font-bold text-primary">
                  {analytics.stats.activeTrips}
                </p>
              </div>
              <div className="text-4xl">🚦</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Réservations</p>
                <p className="text-3xl font-bold text-primary">
                  {analytics.stats.totalBookings}
                </p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary to-orange-600 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-100 mb-1">Total Crédits Plateforme</p>
                <p className="text-3xl font-bold text-white">
                  {analytics.stats.totalCredits} €
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Carpools per day chart */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Covoiturages par jour (30 derniers jours)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {analytics.charts.carpoolsByDay.length > 0 ? (
                analytics.charts.carpoolsByDay.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">
                      {new Date(item.date).toLocaleDateString("fr-FR")}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full flex items-center justify-end pr-2"
                        style={{
                          width: `${Math.min(
                            (item.count /
                              Math.max(
                                ...analytics.charts.carpoolsByDay.map((d) => d.count)
                              )) *
                              100,
                            100
                          )}%`,
                        }}
                      >
                        <span className="text-white text-xs font-semibold">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune donnée disponible
                </p>
              )}
            </div>
          </Card>

          {/* Credits per day chart */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Crédits gagnés par la plateforme par jour (30 derniers jours)
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {analytics.charts.creditsPerDay.length > 0 ? (
                analytics.charts.creditsPerDay.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">
                      {new Date(item.date).toLocaleDateString("fr-FR")}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-secondary h-full rounded-full flex items-center justify-end pr-2"
                        style={{
                          width: `${Math.min(
                            (item.total /
                              Math.max(
                                ...analytics.charts.creditsPerDay.map((d) => d.total)
                              )) *
                              100,
                            100
                          )}%`,
                        }}
                      >
                        <span className="text-white text-xs font-semibold">
                          {item.total} crédits
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Aucune donnée disponible
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Employee Creation Form */}
        <Card className="p-6 bg-white shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Créer un compte employé
          </h3>
          <form onSubmit={handleCreateEmployee} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, email: e.target.value })
                  }
                  className={employeeErrors.email ? "border-red-500" : ""}
                  disabled={actionLoading === "create-employee"}
                />
                {employeeErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pseudo">Pseudo</Label>
                <Input
                  id="pseudo"
                  type="text"
                  value={employeeForm.pseudo}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, pseudo: e.target.value })
                  }
                  className={employeeErrors.pseudo ? "border-red-500" : ""}
                  disabled={actionLoading === "create-employee"}
                />
                {employeeErrors.pseudo && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.pseudo}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={employeeForm.password}
                  onChange={(e) =>
                    setEmployeeForm({ ...employeeForm, password: e.target.value })
                  }
                  className={employeeErrors.password ? "border-red-500" : ""}
                  disabled={actionLoading === "create-employee"}
                />
                {employeeErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {employeeErrors.password}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={actionLoading === "create-employee"}
            >
              {actionLoading === "create-employee"
                ? "Création en cours..."
                : "Créer un employé"}
            </Button>
          </form>
        </Card>

        {/* Recent Users / User Management */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Gestion des utilisateurs (derniers inscrits)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Pseudo
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Rôle
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Crédits
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{user.pseudo}</td>
                    <td className="py-3 px-2 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "EMPLOYEE"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">{user.credits} €</td>
                    <td className="py-3 px-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.suspended
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.suspended ? "Suspendu" : "Actif"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">
                      {user.role !== "ADMIN" && (
                        <Button
                          size="sm"
                          variant={user.suspended ? "default" : "destructive"}
                          onClick={() =>
                            handleSuspendUser(user.id, !user.suspended)
                          }
                          disabled={actionLoading === `suspend-${user.id}`}
                          className={
                            user.suspended
                              ? "bg-green-600 hover:bg-green-700"
                              : ""
                          }
                        >
                          {actionLoading === `suspend-${user.id}`
                            ? "..."
                            : user.suspended
                            ? "Lever la suspension"
                            : "Suspendre"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
