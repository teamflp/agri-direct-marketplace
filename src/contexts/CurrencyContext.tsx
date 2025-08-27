import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Currency, getCurrencyByCountry, defaultCurrency } from '@/lib/currency-map';

interface CurrencyContextType {
  currency: Currency;
  isLoading: boolean;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const determineCurrency = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('geolocate-user');
        if (error) {
          throw new Error('Failed to geolocate user.');
        }
        const countryCode = data?.country || 'CI'; // Fallback to CI
        const userCurrency = getCurrencyByCountry(countryCode);
        setCurrency(userCurrency);
      } catch (error) {
        console.warn(error);
        // En cas d'erreur, la devise par défaut est déjà définie.
        setCurrency(defaultCurrency);
      } finally {
        setIsLoading(false);
      }
    };

    determineCurrency();
  }, []);

  const formatPrice = useCallback((amount: number): string => {
    try {
      return new Intl.NumberFormat(undefined, { // `undefined` utilise les locales du navigateur
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (error) {
      // Fallback si le code de devise n'est pas supporté par Intl.NumberFormat
      console.error(`Failed to format price for currency ${currency.code}:`, error);
      return `${amount.toFixed(2)} ${currency.symbol}`;
    }
  }, [currency]);

  const value = {
    currency,
    isLoading,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
