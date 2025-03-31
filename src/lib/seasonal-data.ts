
interface SeasonalProduct {
  id: number;
  name: string;
  category: string;
  organic: boolean;
  highlight: boolean;
  months: number[];
  image: string; // New property for product image
}

const seasonalProducts: SeasonalProduct[] = [
  {
    id: 1,
    name: "Pommes",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [9, 10, 11, 12, 1, 2],
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Poires",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Fraises",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [5, 6, 7],
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Framboises",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8, 9],
    image: "https://images.unsplash.com/photo-1577069861033-55d04cec56ec?w=150&h=150&fit=crop"
  },
  {
    id: 5,
    name: "Tomates",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [6, 7, 8, 9, 10],
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=150&h=150&fit=crop"
  },
  {
    id: 6,
    name: "Courgettes",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [6, 7, 8, 9],
    image: "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=150&h=150&fit=crop"
  },
  {
    id: 7,
    name: "Aubergines",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [7, 8, 9, 10],
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=150&h=150&fit=crop"
  },
  {
    id: 8,
    name: "Poivrons",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [7, 8, 9, 10],
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop"
  },
  {
    id: 9,
    name: "Carottes",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1522184216316-3c1a2f3d8c68?w=150&h=150&fit=crop"
  },
  {
    id: 10,
    name: "Pommes de terre",
    category: "Légumes",
    organic: false,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop"
  },
  {
    id: 11,
    name: "Oignons",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=150&h=150&fit=crop"
  },
  {
    id: 12,
    name: "Ail",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [6, 7, 8, 9, 10, 11, 12, 1, 2],
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=150&h=150&fit=crop"
  },
  {
    id: 13,
    name: "Champignons",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [9, 10, 11],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&h=150&fit=crop"
  },
  {
    id: 14,
    name: "Choux",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [10, 11, 12, 1, 2, 3],
    image: "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=150&h=150&fit=crop"
  },
  {
    id: 15,
    name: "Épinards",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [3, 4, 5, 6, 9, 10, 11],
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop"
  },
  {
    id: 16,
    name: "Asperges",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [4, 5, 6],
    image: "https://images.unsplash.com/photo-1605289356089-112ab5eefe69?w=150&h=150&fit=crop"
  },
  {
    id: 17,
    name: "Radis",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [3, 4, 5, 6, 9, 10],
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=150&h=150&fit=crop"
  },
  {
    id: 18,
    name: "Betteraves",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
    image: "https://images.unsplash.com/photo-1593103967884-4ee1795dea37?w=150&h=150&fit=crop"
  },
  {
    id: 19,
    name: "Citrons",
    category: "Fruits",
    organic: false,
    highlight: false,
    months: [1, 2, 3, 11, 12],
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=150&h=150&fit=crop"
  },
  {
    id: 20,
    name: "Oranges",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [1, 2, 3, 12],
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=150&h=150&fit=crop"
  },
  {
    id: 21,
    name: "Cerises",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [5, 6, 7],
    image: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=150&h=150&fit=crop"
  },
  {
    id: 22,
    name: "Abricots",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8],
    image: "https://images.unsplash.com/photo-1501420193726-1f65acd36c68?w=150&h=150&fit=crop"
  },
  {
    id: 23,
    name: "Noisettes",
    category: "Fruits à coque",
    organic: true,
    highlight: true,
    months: [9, 10],
    image: "https://images.unsplash.com/photo-1573851552153-816785fecf4a?w=150&h=150&fit=crop"
  },
  {
    id: 24,
    name: "Noix",
    category: "Fruits à coque",
    organic: true,
    highlight: true,
    months: [9, 10, 11],
    image: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=150&h=150&fit=crop"
  },
  {
    id: 25,
    name: "Miel de fleurs",
    category: "Miel",
    organic: true,
    highlight: true,
    months: [6, 7, 8],
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=150&h=150&fit=crop"
  },
  {
    id: 26,
    name: "Miel de forêt",
    category: "Miel",
    organic: true,
    highlight: true,
    months: [8, 9, 10],
    image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1?w=150&h=150&fit=crop"
  },
  {
    id: 27,
    name: "Courges",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=150&h=150&fit=crop"
  },
  {
    id: 28,
    name: "Pêches",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8, 9],
    image: "https://images.unsplash.com/photo-1595743825637-cdafc8ad6ca2?w=150&h=150&fit=crop"
  },
  {
    id: 29,
    name: "Melons",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [7, 8, 9],
    image: "https://images.unsplash.com/photo-1563288525-8f1ee0f874a8?w=150&h=150&fit=crop"
  },
];

export const getProductsByMonth = (month: number) => {
  return seasonalProducts.filter(product => product.months.includes(month));
};

export const getProductsByCategory = (category: string) => {
  return seasonalProducts.filter(product => product.category === category);
};

export const getProductsHighlighted = () => {
  return seasonalProducts.filter(product => product.highlight);
};

export const getAllCategories = () => {
  return [...new Set(seasonalProducts.map(product => product.category))];
};

export default seasonalProducts;
