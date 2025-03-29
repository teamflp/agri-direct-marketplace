
interface SeasonalProduct {
  id: number;
  name: string;
  category: string;
  organic: boolean;
  highlight: boolean;
  months: number[];
}

const seasonalProducts: SeasonalProduct[] = [
  {
    id: 1,
    name: "Pommes",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [9, 10, 11, 12, 1, 2]
  },
  {
    id: 2,
    name: "Poires",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [8, 9, 10, 11, 12]
  },
  {
    id: 3,
    name: "Fraises",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [5, 6, 7]
  },
  {
    id: 4,
    name: "Framboises",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8, 9]
  },
  {
    id: 5,
    name: "Tomates",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [6, 7, 8, 9, 10]
  },
  {
    id: 6,
    name: "Courgettes",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [6, 7, 8, 9]
  },
  {
    id: 7,
    name: "Aubergines",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [7, 8, 9, 10]
  },
  {
    id: 8,
    name: "Poivrons",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [7, 8, 9, 10]
  },
  {
    id: 9,
    name: "Carottes",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 10,
    name: "Pommes de terre",
    category: "Légumes",
    organic: false,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 11,
    name: "Oignons",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 12,
    name: "Ail",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [6, 7, 8, 9, 10, 11, 12, 1, 2]
  },
  {
    id: 13,
    name: "Champignons",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [9, 10, 11]
  },
  {
    id: 14,
    name: "Choux",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [10, 11, 12, 1, 2, 3]
  },
  {
    id: 15,
    name: "Épinards",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [3, 4, 5, 6, 9, 10, 11]
  },
  {
    id: 16,
    name: "Asperges",
    category: "Légumes",
    organic: false,
    highlight: true,
    months: [4, 5, 6]
  },
  {
    id: 17,
    name: "Radis",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [3, 4, 5, 6, 9, 10]
  },
  {
    id: 18,
    name: "Betteraves",
    category: "Légumes",
    organic: true,
    highlight: false,
    months: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3]
  },
  {
    id: 19,
    name: "Citrons",
    category: "Fruits",
    organic: false,
    highlight: false,
    months: [1, 2, 3, 11, 12]
  },
  {
    id: 20,
    name: "Oranges",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [1, 2, 3, 12]
  },
  {
    id: 21,
    name: "Cerises",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [5, 6, 7]
  },
  {
    id: 22,
    name: "Abricots",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8]
  },
  {
    id: 23,
    name: "Noisettes",
    category: "Fruits à coque",
    organic: true,
    highlight: true,
    months: [9, 10]
  },
  {
    id: 24,
    name: "Noix",
    category: "Fruits à coque",
    organic: true,
    highlight: true,
    months: [9, 10, 11]
  },
  {
    id: 25,
    name: "Miel de fleurs",
    category: "Miel",
    organic: true,
    highlight: true,
    months: [6, 7, 8]
  },
  {
    id: 26,
    name: "Miel de forêt",
    category: "Miel",
    organic: true,
    highlight: true,
    months: [8, 9, 10]
  },
  {
    id: 27,
    name: "Courges",
    category: "Légumes",
    organic: true,
    highlight: true,
    months: [9, 10, 11, 12]
  },
  {
    id: 28,
    name: "Pêches",
    category: "Fruits",
    organic: false,
    highlight: true,
    months: [6, 7, 8, 9]
  },
  {
    id: 29,
    name: "Melons",
    category: "Fruits",
    organic: true,
    highlight: true,
    months: [7, 8, 9]
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
