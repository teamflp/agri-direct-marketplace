
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { validateStrongPassword, checkCompromisedPassword, type PasswordValidationResult } from '@/utils/securityValidation';
import { cn } from '@/lib/utils';

interface SecurePasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  showStrengthIndicator?: boolean;
  className?: string;
}

const SecurePasswordInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "••••••••",
  required = false,
  showStrengthIndicator = true,
  className
}: SecurePasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<PasswordValidationResult | null>(null);
  const [isCompromised, setIsCompromised] = useState(false);

  const handlePasswordChange = (newValue: string) => {
    onChange(newValue);
    
    if (newValue) {
      const validationResult = validateStrongPassword(newValue);
      const compromised = checkCompromisedPassword(newValue);
      
      setValidation(validationResult);
      setIsCompromised(compromised);
    } else {
      setValidation(null);
      setIsCompromised(false);
    }
  };

  const getStrengthColor = (strength: PasswordValidationResult['strength']) => {
    switch (strength) {
      case 'very-strong': return 'bg-green-500';
      case 'strong': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthText = (strength: PasswordValidationResult['strength']) => {
    switch (strength) {
      case 'very-strong': return 'Très fort';
      case 'strong': return 'Fort';
      case 'medium': return 'Moyen';
      case 'weak': return 'Faible';
      default: return '';
    }
  };

  const strengthPercentage = validation ? (validation.score / 8) * 100 : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(
            "pr-10",
            validation && !validation.isValid && "border-red-500",
            validation && validation.isValid && "border-green-500",
            isCompromised && "border-orange-500"
          )}
          autoComplete="new-password"
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {showStrengthIndicator && value && validation && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Force du mot de passe</span>
            <span className={cn(
              "font-medium",
              validation.strength === 'very-strong' && "text-green-600",
              validation.strength === 'strong' && "text-blue-600",
              validation.strength === 'medium' && "text-yellow-600",
              validation.strength === 'weak' && "text-red-600"
            )}>
              {getStrengthText(validation.strength)}
            </span>
          </div>
          
          <Progress 
            value={strengthPercentage} 
            className={cn(
              "h-2",
              getStrengthColor(validation.strength)
            )}
          />
        </div>
      )}

      {isCompromised && (
        <div className="flex items-center gap-2 text-orange-600 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>Ce mot de passe est connu pour être compromis. Veuillez en choisir un autre.</span>
        </div>
      )}

      {validation && validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
              <AlertTriangle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {validation && validation.isValid && !isCompromised && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Mot de passe sécurisé</span>
        </div>
      )}
    </div>
  );
};

export default SecurePasswordInput;
