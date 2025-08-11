
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminMenuItems } from '@/components/layout/dashboardNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, Shield, Database, Mail } from 'lucide-react';

const AdminSettings = () => {
  return (
    <DashboardLayout
      name="Admin AgriMarket"
      email="admin@agrimarket.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          AM
        </div>
      }
      menuItems={adminMenuItems}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Paramètres système</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres généraux
              </CardTitle>
              <CardDescription>
                Configuration générale de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platform-name">Nom de la plateforme</Label>
                <Input id="platform-name" defaultValue="AgriMarket" />
              </div>
              <div>
                <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Activer le mode maintenance</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="registration">Inscriptions</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="registration" defaultChecked />
                  <Label htmlFor="registration">Autoriser les nouvelles inscriptions</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Gestion des notifications système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Activer les notifications email</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="push-notifications">Notifications push</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="push-notifications" defaultChecked />
                  <Label htmlFor="push-notifications">Activer les notifications push</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="admin-alerts">Alertes admin</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="admin-alerts" defaultChecked />
                  <Label htmlFor="admin-alerts">Recevoir les alertes système</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité
              </CardTitle>
              <CardDescription>
                Paramètres de sécurité et authentification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="session-timeout">Délai d'expiration de session (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="120" />
              </div>
              <div>
                <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Obliger la 2FA pour les admins</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="password-policy">Politique de mot de passe</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="password-policy" defaultChecked />
                  <Label htmlFor="password-policy">Appliquer une politique stricte</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configuration email
              </CardTitle>
              <CardDescription>
                Paramètres de configuration des emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="smtp-server">Serveur SMTP</Label>
                <Input id="smtp-server" defaultValue="smtp.agrimarket.com" />
              </div>
              <div>
                <Label htmlFor="smtp-port">Port SMTP</Label>
                <Input id="smtp-port" type="number" defaultValue="587" />
              </div>
              <div>
                <Label htmlFor="from-email">Email expéditeur</Label>
                <Input id="from-email" defaultValue="noreply@agrimarket.com" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Actions système
            </CardTitle>
            <CardDescription>
              Actions de maintenance et gestion des données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">
                Sauvegarder la base de données
              </Button>
              <Button variant="outline">
                Nettoyer les logs
              </Button>
              <Button variant="outline">
                Optimiser la base de données
              </Button>
              <Button variant="destructive">
                Réinitialiser le cache
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
