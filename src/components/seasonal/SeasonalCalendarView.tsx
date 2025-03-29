
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, Snowflake, Leaf } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import MonthlyProductsList from './MonthlyProductsList';
import SeasonalLegend from './SeasonalLegend';

const seasons = [
  { id: "spring", name: "Printemps", icon: <Leaf className="h-5 w-5" />, months: [3, 4, 5] },
  { id: "summer", name: "Été", icon: <Sun className="h-5 w-5" />, months: [6, 7, 8] },
  { id: "autumn", name: "Automne", icon: <Cloud className="h-5 w-5" />, months: [9, 10, 11] },
  { id: "winter", name: "Hiver", icon: <Snowflake className="h-5 w-5" />, months: [12, 1, 2] }
];

const SeasonalCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const currentMonth = selectedDate ? selectedDate.getMonth() + 1 : new Date().getMonth() + 1;
  
  const currentSeason = seasons.find(season => season.months.includes(currentMonth)) || seasons[0];

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
                className="rounded-md border pointer-events-auto"
                showOutsideDays={false}
                ISOWeek={true}
                disabled={{ before: new Date(2020, 0, 1) }}
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Saison actuelle</h3>
                <div className="flex items-center gap-2 mb-4">
                  {currentSeason.icon}
                  <span className="font-medium">{currentSeason.name}</span>
                </div>
                <SeasonalLegend />
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
                  <h3 className="text-xl font-medium mb-4">
                    Produits disponibles en {selectedDate ? new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(selectedDate) : ''}
                  </h3>
                  <MonthlyProductsList month={currentMonth} />
                </TabsContent>
                
                <TabsContent value="seasonal">
                  <h3 className="text-xl font-medium mb-4">
                    Produits de {currentSeason.name}
                  </h3>
                  <div className="space-y-4">
                    {currentSeason.months.map(month => (
                      <div key={month} className="mb-4">
                        <h4 className="text-lg font-medium mb-2">
                          {new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(2023, month - 1, 1))}
                        </h4>
                        <MonthlyProductsList month={month} compact />
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
