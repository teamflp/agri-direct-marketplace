
// Temporary solution until i18next is fully implemented
const translations: { [key: string]: string } = {
  'header.home': 'Accueil',
  'header.products': 'Produits',
  'header.farmers': 'Agriculteurs',
  'header.subscriptions': 'Abonnements',
  'header.seasonal': 'Calendrier saisonnier',
  'header.contact': 'Contact',
  'header.search.placeholder': 'Rechercher...',
};

export const t = (key: string) => {
  return translations[key] || key;
};
