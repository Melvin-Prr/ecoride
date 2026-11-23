"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Star,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  User,
  MessageSquare,
  Shield,
} from "lucide-react";

interface PendingReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  reviewer: {
    id: string;
    pseudo: string;
    email: string;
  };
  reviewed: {
    id: string;
    pseudo: string;
    email: string;
  };
  carpool?: {
    id: string;
    departure: string;
    destination: string;
    departureDate: string;
  };
}

export default function EmployeePage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user && user.role !== "EMPLOYEE" && user.role !== "ADMIN") {
      alert("Accès refusé. Espace réservé aux employés.");
      router.push("/");
      return;
    }

    if (user && token) {
      fetchPendingReviews();
    }
  }, [user, token, authLoading, router]);

  const fetchPendingReviews = async () => {
    try {
      const response = await fetch("/api/reviews/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setReviews(data.data.reviews);
      } else {
        console.error("Failed to load reviews:", data.error);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    if (!confirm("Approuver cet avis ?")) {
      return;
    }

    setActionLoading(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.data.message);
        // Remove from list
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } else {
        alert(data.error || "Erreur lors de l'approbation");
      }
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Erreur lors de l'approbation");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (!confirm("Rejeter cet avis ?")) {
      return;
    }

    setActionLoading(reviewId);
    try {
      const response = await fetch(`/api/reviews/${reviewId}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.data.message);
        // Remove from list
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      } else {
        alert(data.error || "Erreur lors du rejet");
      }
    } catch (error) {
      console.error("Error rejecting review:", error);
      alert("Erreur lors du rejet");
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!user || (user.role !== "EMPLOYEE" && user.role !== "ADMIN")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Espace Employé</h1>
          </div>
          <p className="text-gray-600">Modération des avis utilisateurs</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avis en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Avis à modérer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-l-4 border-l-blue-600">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Review Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {[...new Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">{review.comment}</p>
                          </div>
                        </div>

                        {/* Trip and Users Info */}
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="h-4 w-4" />
                              <span>
                                <strong>Auteur:</strong> {review.reviewer.pseudo} ({review.reviewer.email})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <User className="h-4 w-4" />
                              <span>
                                <strong>Évalué:</strong> {review.reviewed.pseudo} ({review.reviewed.email})
                              </span>
                            </div>
                          </div>
                          {review.carpool && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {review.carpool.departure} → {review.carpool.destination}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(review.carpool.departureDate).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                          </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(review.id)}
                            disabled={actionLoading === review.id}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {actionLoading === review.id ? "Traitement..." : "Approuver"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(review.id)}
                            disabled={actionLoading === review.id}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {actionLoading === review.id ? "Traitement..." : "Rejeter"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun avis en attente de modération</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
