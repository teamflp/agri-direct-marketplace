import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSecureAuthContext } from '@/contexts/SecureAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, Eye, Clock, User, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SecurityEvent {
  id: string;
  event_type: string;
  created_at: string;
  user_email?: string;
  table_name?: string;
  old_values?: any;
  new_values?: any;
}

interface LoginAttempt {
  id: string;
  email: string;
  success: boolean;
  failure_reason?: string;
  created_at: string;
  user_agent?: string;
}

const SecurityMonitoringDashboard = () => {
  const { isAdmin } = useSecureAuthContext();
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    failedLogins24h: 0,
    suspiciousActivities: 0,
    activeUsers: 0
  });

  useEffect(() => {
    if (isAdmin()) {
      loadSecurityData();
    }
  }, []);

  const loadSecurityData = async () => {
    setIsLoading(true);
    try {
      // Charger les événements de sécurité avec mapping des colonnes
      const { data: events } = await supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // Charger les tentatives de connexion
      const { data: attempts } = await supabase
        .from('login_attempts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Mapper les événements pour correspondre à l'interface SecurityEvent
      const mappedEvents = (events || []).map(event => ({
        id: event.id,
        event_type: event.event_type,
        created_at: event.created_at || event.timestamp, // Utiliser created_at ou timestamp comme fallback
        user_email: event.user_email,
        table_name: event.table_name,
        old_values: event.old_values,
        new_values: event.new_values
      }));

      setSecurityEvents(mappedEvents);
      setLoginAttempts(attempts || []);

      // Calculer les statistiques
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const failedLogins24h = (attempts || []).filter(
        attempt => !attempt.success && new Date(attempt.created_at) > last24h
      ).length;

      const suspiciousActivities = (events || []).filter(
        event => event.event_type.includes('suspicious') || event.event_type.includes('repeated')
      ).length;

      setStats({
        totalEvents: (events || []).length,
        failedLogins24h,
        suspiciousActivities,
        activeUsers: new Set((attempts || []).map(a => a.email)).size
      });

    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    if (eventType.includes('login') || eventType.includes('registration')) {
      return <User className="h-4 w-4" />;
    }
    if (eventType.includes('role') || eventType.includes('permission')) {
      return <Shield className="h-4 w-4" />;
    }
    if (eventType.includes('suspicious')) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return <Lock className="h-4 w-4" />;
  };

  const getEventTypeBadgeVariant = (eventType: string) => {
    if (eventType.includes('failed') || eventType.includes('suspicious')) {
      return 'destructive';
    }
    if (eventType.includes('success') || eventType.includes('approved')) {
      return 'default';
    }
    return 'secondary';
  };

  if (!isAdmin()) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Accès restreint - Permissions administrateur requises
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-agrimarket-orange" />
          <h2 className="text-2xl font-bold">Monitoring de Sécurité</h2>
        </div>
        <Button onClick={loadSecurityData} disabled={isLoading}>
          Actualiser
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Événements totaux</p>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Échecs 24h</p>
                <p className="text-2xl font-bold text-red-600">{stats.failedLogins24h}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activités suspectes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.suspiciousActivities}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilisateurs actifs</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets détaillés */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Événements de Sécurité</TabsTrigger>
          <TabsTrigger value="logins">Tentatives de Connexion</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Événements de Sécurité Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Aucun événement de sécurité enregistré
                  </p>
                ) : (
                  securityEvents.map((event) => (
                    <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        {getEventTypeIcon(event.event_type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={getEventTypeBadgeVariant(event.event_type)}>
                              {event.event_type.replace(/_/g, ' ')}
                            </Badge>
                            {event.user_email && (
                              <span className="text-sm text-muted-foreground">
                                par {event.user_email}
                              </span>
                            )}
                          </div>
                          {event.table_name && (
                            <p className="text-sm text-muted-foreground">
                              Table: {event.table_name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatDistanceToNow(new Date(event.created_at), { 
                          addSuffix: true, 
                          locale: fr 
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logins">
          <Card>
            <CardHeader>
              <CardTitle>Tentatives de Connexion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loginAttempts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Aucune tentative de connexion enregistrée
                  </p>
                ) : (
                  loginAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          attempt.success ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{attempt.email}</p>
                          {attempt.failure_reason && (
                            <p className="text-sm text-red-600">{attempt.failure_reason}</p>
                          )}
                          {attempt.user_agent && (
                            <p className="text-xs text-muted-foreground">
                              {attempt.user_agent.substring(0, 50)}...
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={attempt.success ? 'default' : 'destructive'}>
                          {attempt.success ? 'Succès' : 'Échec'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(attempt.created_at), { 
                            addSuffix: true, 
                            locale: fr 
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityMonitoringDashboard;
