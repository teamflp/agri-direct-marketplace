import React, { useState, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, Snowflake, Leaf, Search } from 'lucide-react';
import MonthlyProductsList from './MonthlyProductsList';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllCategories } from '@/lib/seasonal-data';

const seasons = [
  { id: "spring", name: "Printemps", icon: <Leaf className="h-4 w-4" />, months: [3, 4, 5], color: "text-green-600", ring: "ring-green-200" },
  { id: "summer", name: "Été", icon: <Sun className="h-4 w-4" />, months: [6, 7, 8], color: "text-yellow-600", ring: "ring-yellow-200" },
  { id: "autumn", name: "Automne", icon: <Cloud className="h-4 w-4" />, months: [9, 10, 11], color: "text-orange-600", ring: "ring-orange-200" },
  { id: "winter", name: "Hiver", icon: <Snowflake className="h-4 w-4" />, months: [12, 1, 2], color: "text-blue-600", ring: "ring-blue-200" }
];

const months = [
  { id: 1, name: "Janvier" }, { id: 2, name: "Février" }, { id: 3, name: "Mars" },
  { id: 4, name: "Avril" }, { id: 5, name: "Mai" }, { id: 6, name: "Juin" },
  { id: 7, name: "Juillet" }, { id: 8, name: "Août" }, { id: 9, name: "Septembre" },
  { id: 10, "name": "Octobre" }, { id: 11, "name": "Novembre" }, { id: 12, "name": "Décembre" }
];

const SeasonalCalendarView = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const allCategories = useMemo(() => getAllCategories(), []);

  const currentSeason = useMemo(() => {
    return seasons.find(season => season.months.includes(selectedMonth)) || seasons[3];
  }, [selectedMonth]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Calendrier des produits de saison</CardTitle>
        <div className="flex flex-wrap items-center gap-4 pt-4">
            {months.map(month => {
              const seasonForMonth = seasons.find(s => s.months.includes(month.id));
              return (
                <Button
                  key={month.id}
                  variant={selectedMonth === month.id ? "default" : "outline"}
                  onClick={() => setSelectedMonth(month.id)}
                  className={`capitalize transition-all duration-200 ease-in-out ${
                    selectedMonth === month.id
                      ? `bg-agrimarket-blue text-white shadow-lg scale-105`
                      : `hover:bg-gray-100 ${seasonForMonth?.color}`
                  }`}
                >
                  {month.name}
                </Button>
              );
            })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">Catégories:</span>
              {allCategories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-agrimarket-orange hover:bg-orange-600 text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <span className={`flex items-center gap-2 p-2 rounded-lg ring-2 ${currentSeason.ring} ${currentSeason.color}`}>
              {currentSeason.icon}
              <span>{currentSeason.name}</span>
            </span>
            <span>
              Produits pour: {months.find(m => m.id === selectedMonth)?.name}
            </span>
          </h3>
          <MonthlyProductsList
            month={selectedMonth}
            searchTerm={searchTerm}
            categories={selectedCategories}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalCalendarView;
