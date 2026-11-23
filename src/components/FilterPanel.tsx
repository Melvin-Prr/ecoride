"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Leaf, Euro, Clock, Star } from "lucide-react";

interface FilterPanelProps {
  onFilterChange: (filters: CarpoolFilters) => void;
}

export interface CarpoolFilters {
  ecoOnly: boolean;
  maxPrice: number;
  maxDuration: number;
  minRating: number;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<CarpoolFilters>({
    ecoOnly: false,
    maxPrice: 100,
    maxDuration: 480, // 8 hours in minutes
    minRating: 0,
  });

  const updateFilter = (key: keyof CarpoolFilters, value: number | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Filtres</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Eco Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="eco"
              checked={filters.ecoOnly}
              onCheckedChange={(checked) => updateFilter("ecoOnly", checked === true)}
            />
            <Label
              htmlFor="eco"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
            >
              <Leaf className="h-4 w-4 text-success" />
              Voiture électrique uniquement
            </Label>
          </div>
          <p className="text-xs text-gray-500 ml-6">
            Afficher seulement les véhicules électriques ou hybrides
          </p>
        </div>

        {/* Max Price Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-secondary" />
              Prix maximum
            </Label>
            <span className="text-sm font-semibold text-secondary">
              {filters.maxPrice} crédits
            </span>
          </div>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={(value: number[]) => updateFilter("maxPrice", value[0])}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Max Duration Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Durée maximum
            </Label>
            <span className="text-sm font-semibold text-primary">
              {Math.floor(filters.maxDuration / 60)}h{filters.maxDuration % 60 > 0 ? `${filters.maxDuration % 60}` : ""}
            </span>
          </div>
          <Slider
            value={[filters.maxDuration]}
            onValueChange={(value: number[]) => updateFilter("maxDuration", value[0])}
            min={60}
            max={480}
            step={30}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1h</span>
            <span>8h</span>
          </div>
        </div>

        {/* Min Rating Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Note minimum
            </Label>
            <span className="text-sm font-semibold text-primary">
              {filters.minRating > 0 ? `${filters.minRating.toFixed(1)} ⭐` : "Toutes"}
            </span>
          </div>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value: number[]) => updateFilter("minRating", value[0])}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Toutes</span>
            <span>5 ⭐</span>
          </div>
        </div>

        {/* Applied Filters Summary */}
        {(filters.ecoOnly || filters.maxPrice < 100 || filters.maxDuration < 480 || filters.minRating > 0) && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Filtres actifs :</p>
            <div className="space-y-1 text-xs text-gray-600">
              {filters.ecoOnly && (
                <div className="flex items-center gap-1">
                  <Leaf className="h-3 w-3 text-success" />
                  <span>Véhicules écologiques</span>
                </div>
              )}
              {filters.maxPrice < 100 && (
                <div className="flex items-center gap-1">
                  <Euro className="h-3 w-3 text-secondary" />
                  <span>Max {filters.maxPrice} crédits</span>
                </div>
              )}
              {filters.maxDuration < 480 && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" />
                  <span>Max {Math.floor(filters.maxDuration / 60)}h</span>
                </div>
              )}
              {filters.minRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>Min {filters.minRating.toFixed(1)} ⭐</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
