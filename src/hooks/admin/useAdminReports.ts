import { useState, useEffect, useCallback } from 'react';

// Interfaces for the report data structures
export interface MonthlySales {
  month: string;
  ventes: number;
}

export interface UserGrowth {
  month: string;
  utilisateurs: number;
  agriculteurs: number;
}

export interface SalesByCategory {
  name: string;
  value: number;
}

export interface TopSellingProduct {
  id: number;
  name: string;
  farmer: string;
  sales: number;
  revenue: number;
  growth: number;
}

export interface ReportKPIs {
  totalUsers: number;
  totalFarmers: number;
  totalSales: number;
  totalRevenue: number;
}

export interface YearlyRevenue {
  year: string;
  revenue: number;
}

export interface AdminReportData {
  kpis: ReportKPIs;
  monthlySales: MonthlySales[];
  userGrowth: UserGrowth[];
  salesByCategory: SalesByCategory[];
  topSellingProducts: TopSellingProduct[];
  yearlyRevenue: YearlyRevenue[];
}

export const useAdminReports = () => {
  const [reportData, setReportData] = useState<AdminReportData>({
    kpis: {
      totalUsers: 0,
      totalFarmers: 0,
      totalSales: 0,
      totalRevenue: 0,
    },
    monthlySales: [],
    userGrowth: [],
    salesByCategory: [],
    topSellingProducts: [],
    yearlyRevenue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Pour l'instant, on retourne des données vides
      // Les requêtes nécessitent des colonnes qui n'existent pas encore dans la base
      setReportData({
        kpis: {
          totalUsers: 0,
          totalFarmers: 0,
          totalSales: 0,
          totalRevenue: 0,
        },
        monthlySales: [],
        userGrowth: [],
        salesByCategory: [],
        topSellingProducts: [],
        yearlyRevenue: [],
      });
      
    } catch (err) {
      console.error('Erreur lors de la génération des rapports:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  return {
    reportData,
    loading,
    error,
    refetch: fetchReportData,
  };
};
