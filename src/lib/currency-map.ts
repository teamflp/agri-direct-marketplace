export interface Currency {
  code: string; // ISO 4217 code, e.g., "XOF"
  symbol: string; // e.g., "FCFA"
  name: string; // e.g., "CFA Franc BCEAO"
}

export const currencyMap: Record<string, Currency> = {
  // Afrique de l'Ouest (UEMOA)
  CI: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Côte d'Ivoire
  SN: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Sénégal
  BJ: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Bénin
  BF: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Burkina Faso
  ML: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Mali
  NE: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Niger
  TG: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Togo
  GW: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA (UEMOA)' }, // Guinée-Bissau

  // Afrique Centrale (CEMAC)
  CM: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Cameroun
  GA: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Gabon
  CG: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Congo
  TD: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Tchad
  CF: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Centrafrique
  GQ: { code: 'XAF', symbol: 'FCFA', name: 'Franc CFA (CEMAC)' }, // Guinée Équatoriale

  // Autres pays majeurs
  NG: { code: 'NGN', symbol: '₦', name: 'Naira nigérian' },      // Nigeria
  GH: { code: 'GHS', symbol: 'GH₵', name: 'Cedi ghanéen' },       // Ghana
  KE: { code: 'KES', symbol: 'KSh', name: 'Shilling kényan' },    // Kenya
  ZA: { code: 'ZAR', symbol: 'R', name: 'Rand sud-africain' },  // Afrique du Sud
  EG: { code: 'EGP', symbol: 'E£', name: 'Livre égyptienne' },    // Égypte
  MA: { code: 'MAD', symbol: 'DH', name: 'Dirham marocain' },     // Maroc
};

export const defaultCurrency: Currency = currencyMap.CI; // Le Franc CFA comme défaut

/**
 * Récupère la devise pour un code pays donné.
 * @param countryCode Le code pays ISO à 2 lettres (ex: "CI").
 * @returns L'objet Currency correspondant, ou la devise par défaut si non trouvé.
 */
export const getCurrencyByCountry = (countryCode: string): Currency => {
  return currencyMap[countryCode.toUpperCase()] || defaultCurrency;
};
