
export interface NavLink {
  path: string;
  label: string;
  translationKey: string;
}

export const navigationLinks: NavLink[] = [
  { path: '/', label: 'Accueil', translationKey: 'header.home' },
  { path: '/products', label: 'Produits', translationKey: 'header.products' },
  { path: '/farmers', label: 'Agriculteurs', translationKey: 'header.farmers' },
  { path: '/seasonal-calendar', label: 'Calendrier saisonnier', translationKey: 'header.seasonal' },
  { path: '/subscriptions', label: 'Abonnements', translationKey: 'header.subscriptions' },
  { path: '/contact', label: 'Contact', translationKey: 'header.contact' },
];
