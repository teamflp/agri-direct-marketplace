
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingEvents = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Événements à venir</CardTitle>
        <CardDescription>
          Marchés et événements agricoles prévus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border p-3 rounded-md">
            <div className="flex justify-between">
              <h3 className="font-medium">Marché Bio du Centre</h3>
              <span className="text-sm text-gray-500">15 Mai</span>
            </div>
            <p className="text-sm text-gray-600">Place du Marché, 08:00 - 14:00</p>
          </div>
          <div className="border p-3 rounded-md">
            <div className="flex justify-between">
              <h3 className="font-medium">Foire Agricole Régionale</h3>
              <span className="text-sm text-gray-500">22-24 Mai</span>
            </div>
            <p className="text-sm text-gray-600">Parc des Expositions, Journée</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
