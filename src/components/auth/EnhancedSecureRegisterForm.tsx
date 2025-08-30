
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { validateEmailServer, validateNameServer, validatePhoneServer } from '@/utils/serverValidation';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Loader2, Shield, UserPlus } from 'lucide-react';
import SecurePasswordInput from '@/components/auth/SecurePasswordInput';

const EnhancedSecureRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userType: 'buyer' as 'buyer' | 'farmer'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const validateField = async (field: string, value: string) => {
    let result;
    
    switch (field) {
      case 'email':
        result = await validateEmailServer(value);
        break;
      case 'firstName':
        result = await validateNameServer(value, 'prénom');
        break;
      case 'lastName':
        result = await validateNameServer(value, 'nom');
        break;
      case 'phoneNumber':
        result = await validatePhoneServer(value);
        break;
      default:
        return;
    }
    
    if (!result.isValid) {
      setErrors(prev => ({ ...prev, [field]: result.errors[0] }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validation en temps réel pour les champs critiques
    if (['email', 'firstName', 'lastName', 'phoneNumber'].includes(field)) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validation côté serveur de tous les champs
      const validations = await Promise.all([
        validateEmailServer(formData.email),
        validateNameServer(formData.firstName, 'prénom'),
        validateNameServer(formData.lastName, 'nom'),
        validatePhoneServer(formData.phoneNumber)
      ]);
      
      const hasErrors = validations.some(v => !v.isValid);
      
      if (hasErrors) {
        toast({
          title: 'Erreurs de validation',
          description: 'Veuillez corriger les erreurs dans le formulaire',
          variant: 'destructive',
        });
        return;
      }
      
      // Vérification des mots de passe
      if (formData.password !== formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Les mots de passe ne correspondent pas' }));
        return;
      }
      
      if (formData.password.length < 8) {
        setErrors(prev => ({ ...prev, password: 'Le mot de passe doit contenir au moins 8 caractères' }));
        return;
      }

      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        userType: formData.userType
      });
      
      if (error) {
        throw error;
      }

      // Sécurité: fournir un retour utilisateur même si le contexte n'a pas navigué
      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre e-mail pour activer votre compte.",
        variant: "success",
      });
      // Redirection explicite au cas où la navigation du contexte échoue
      navigate('/email-verification', { state: { email: formData.email } });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: 'Erreur lors de l\'inscription',
        description: error.message || 'Une erreur inattendue s\'est produite',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-t-4 border-t-agrimarket-orange">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-agrimarket-orange" />
          Inscription sécurisée
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
                disabled={isLoading}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
                disabled={isLoading}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              disabled={isLoading}
              autoComplete="email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phoneNumber">Téléphone</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
              disabled={isLoading}
              placeholder="06 12 34 56 78"
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          
          <SecurePasswordInput
            id="password"
            label="Mot de passe"
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
            required={true}
            showStrengthIndicator={true}
          />
          
          <div>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="userType">Type de compte</Label>
            <Select
              value={formData.userType}
              onValueChange={(value: 'buyer' | 'farmer') => handleChange('userType', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Acheteur</SelectItem>
                <SelectItem value="farmer">Agriculteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <UserPlus className="mr-2 h-4 w-4" />
            S'inscrire
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedSecureRegisterForm;
