
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, Snowflake, Leaf, Search, Filter } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import MonthlyProductsList from './MonthlyProductsList';
import SeasonalLegend from './SeasonalLegend';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllCategories } from '@/lib/seasonal-data';

const seasons = [
  { id: "spring", name: "Printemps", icon: <Leaf className="h-5 w-5" />, months: [3, 4, 5], color: "bg-green-500" },
  { id: "summer", name: "Été", icon: <Sun className="h-5 w-5" />, months: [6, 7, 8], color: "bg-yellow-500" },
  { id: "autumn", name: "Automne", icon: <Cloud className="h-5 w-5" />, months: [9, 10, 11], color: "bg-orange-500" },
  { id: "winter", name: "Hiver", icon: <Snowflake className="h-5 w-5" />, months: [12, 1, 2], color: "bg-blue-500" }
];

const SeasonalCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const allCategories = getAllCategories();
  
  const currentMonth = selectedDate ? selectedDate.getMonth() + 1 : new Date().getMonth() + 1;
  const currentSeason = seasons.find(season => season.months.includes(currentMonth)) || seasons[0];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Sélectionner un mois</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                showOutsideDays={false}
                disabled={{ before: new Date(2020, 0, 1) }}
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Saison actuelle</h3>
                <div className={`flex items-center gap-2 mb-4 p-2 rounded-md ${currentSeason.color} bg-opacity-10`}>
                  <div className={`rounded-full ${currentSeason.color} p-1`}>
                    {currentSeason.icon}
                  </div>
                  <span className="font-medium">{currentSeason.name}</span>
                </div>
                <SeasonalLegend />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Filtrer les produits</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un produit..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Catégories</h4>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map(category => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedCategories.includes(category) ? 'bg-agrimarket-orange hover:bg-orange-600' : ''}`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="monthly">Vue mensuelle</TabsTrigger>
                  <TabsTrigger value="seasonal">Vue par saison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="monthly">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    Produits disponibles en {selectedDate ? new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(selectedDate) : ''}
                    <Badge 
                      className={`ml-3 ${currentSeason.color} text-white`}
                      variant="default"
                    >
                      {currentSeason.name}
                    </Badge>
                  </h3>
                  <MonthlyProductsList 
                    month={currentMonth} 
                    searchTerm={searchTerm}
                    categories={selectedCategories}
                  />
                </TabsContent>
                
                <TabsContent value="seasonal">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-medium">
                      Produits de {currentSeason.name}
                    </h3>
                    <Badge 
                      className={`ml-3 ${currentSeason.color} text-white`}
                      variant="default"
                    >
                      {currentSeason.months.length} mois
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                    {seasons.map(season => (
                      <Card 
                        key={season.id}
                        className={`cursor-pointer hover:shadow-md transition-shadow ${currentSeason.id === season.id ? 'ring-2 ring-offset-1 ring-' + season.color.replace('bg-', '') : ''}`}
                        onClick={() => {
                          // Sélectionner un mois de la saison
                          const midSeasonMonth = season.months[1]; // Prendre le mois du milieu
                          const currentYear = new Date().getFullYear();
                          // Ajuster pour les mois d'hiver qui chevauchent deux années
                          const year = (midSeasonMonth === 1 || midSeasonMonth === 2) ? currentYear : currentYear;
                          setSelectedDate(new Date(year, midSeasonMonth - 1, 15));
                        }}
                      >
                        <CardContent className="p-4 flex items-center">
                          <div className={`rounded-full ${season.color} p-2 mr-3`}>
                            {season.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{season.name}</h4>
                            <p className="text-sm text-gray-500">
                              {season.months.map(m => 
                                new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(new Date(2023, m - 1, 1))
                              ).join(', ')}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {currentSeason.months.map(month => (
                      <div key={month} className="mb-4">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-medium">
                            {new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(2023, month - 1, 1))}
                          </h4>
                          <Badge 
                            variant="outline"
                            className="ml-2 text-xs"
                          >
                            Mois {month}
                          </Badge>
                        </div>
                        <MonthlyProductsList 
                          month={month} 
                          compact 
                          searchTerm={searchTerm}
                          categories={selectedCategories}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeasonalCalendarView;
