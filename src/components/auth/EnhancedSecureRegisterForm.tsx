
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import SecurePasswordInput from './SecurePasswordInput';
import { validateEmail, validateName, validatePhoneNumber, sanitizeInput, logSecurityEvent } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, AlertTriangle, UserPlus } from 'lucide-react';

type UserRole = 'buyer' | 'farmer';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userType: UserRole;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const EnhancedSecureRegisterForm = () => {
  const [activeTab, setActiveTab] = useState<UserRole>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    const userType = value as UserRole;
    setActiveTab(userType);
    setFormData(prev => ({ ...prev, userType }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation du prénom
    const firstNameValidation = validateName(formData.firstName, 'prénom');
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error;
    }

    // Validation du nom
    const lastNameValidation = validateName(formData.lastName, 'nom');
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error;
    }

    // Validation de l'email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Validation du téléphone
    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.isValid) {
      newErrors.phoneNumber = phoneValidation.error;
    }

    // Validation du mot de passe (déjà gérée par SecurePasswordInput)
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    // Confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Conditions d'utilisation
    if (!formData.termsAccepted || !formData.privacyAccepted) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation et la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? sanitizeInput(value, { 
        maxLength: field === 'email' ? 254 : field.includes('Name') ? 50 : 1000 
      }) : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Erreur de validation',
        description: 'Veuillez corriger les erreurs dans le formulaire',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Log de la tentative d'inscription
      await logSecurityEvent('registration_attempt', {
        email: formData.email,
        user_type: formData.userType,
        timestamp: new Date().toISOString()
      });

      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        userType: formData.userType,
      });

      if (error) {
        // Log de l'échec
        await logSecurityEvent('registration_failed', {
          email: formData.email,
          error: error.message,
          timestamp: new Date().toISOString()
        });

        throw error;
      } else {
        // Log du succès
        await logSecurityEvent('registration_success', {
          email: formData.email,
          user_type: formData.userType,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let userMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (error.message.includes('already registered')) {
        userMessage = 'Cette adresse email est déjà utilisée';
      } else if (error.message.includes('invalid email')) {
        userMessage = 'Format d\'email invalide';
      } else if (error.message.includes('weak password')) {
        userMessage = 'Le mot de passe n\'est pas assez fort';
      }
      
      toast({
        title: 'Erreur d\'inscription',
        description: userMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto border-t-4 border-t-agrimarket-orange">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-agrimarket-orange" />
          Inscription sécurisée
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="buyer"
              className="data-[state=active]:bg-agrimarket-orange data-[state=active]:text-white"
            >
              Je suis Acheteur
            </TabsTrigger>
            <TabsTrigger 
              value="farmer"
              className="data-[state=active]:bg-agrimarket-green data-[state=active]:text-white"
            >
              Je suis Agriculteur
            </TabsTrigger>
          </TabsList>
          <TabsContent value="buyer">
            <p className="text-sm text-muted-foreground mb-4">
              Créez un compte pour acheter des produits frais directement auprès des agriculteurs locaux.
            </p>
          </TabsContent>
          <TabsContent value="farmer">
            <p className="text-sm text-muted-foreground mb-4">
              Créez un compte pour vendre vos produits directement aux consommateurs et professionnels.
            </p>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Prénom"
                required
                disabled={isLoading}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Nom"
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
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.com"
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
            <Label htmlFor="phoneNumber">Numéro de téléphone *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+225 XX XX XX XX XX"
              required
              disabled={isLoading}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SecurePasswordInput
              id="password"
              label="Mot de passe"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              required
              showStrengthIndicator
            />
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                autoComplete="new-password"
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleInputChange('termsAccepted', !!checked)}
                className="data-[state=checked]:bg-agrimarket-orange data-[state=checked]:border-agrimarket-orange mt-1"
                disabled={isLoading}
              />
              <Label htmlFor="termsAccepted" className="text-sm cursor-pointer leading-5">
                J'accepte les <a href="/legal/terms" className="text-agrimarket-orange hover:underline" target="_blank">conditions d'utilisation</a> *
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacyAccepted"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => handleInputChange('privacyAccepted', !!checked)}
                className="data-[state=checked]:bg-agrimarket-orange data-[state=checked]:border-agrimarket-orange mt-1"
                disabled={isLoading}
              />
              <Label htmlFor="privacyAccepted" className="text-sm cursor-pointer leading-5">
                J'accepte la <a href="/legal/privacy" className="text-agrimarket-orange hover:underline" target="_blank">politique de confidentialité</a> *
              </Label>
            </div>

            {errors.terms && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {errors.terms}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-agrimarket-orange hover:bg-agrimarket-brown"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer mon compte
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedSecureRegisterForm;
