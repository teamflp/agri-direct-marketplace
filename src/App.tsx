
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Farmers from "./pages/Farmers";
import Subscriptions from "./pages/Subscriptions";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import CheckoutProcess from "./pages/CheckoutProcess";
import AdminDashboard from "./pages/AdminDashboard";

// Buyer Dashboard Pages
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerFavorites from "./pages/buyer/BuyerFavorites";
import BuyerMessages from "./pages/buyer/BuyerMessages";
import BuyerFarmers from "./pages/buyer/BuyerFarmers";
import BuyerInvoices from "./pages/buyer/BuyerInvoices";

// Farmer Dashboard Pages
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerMessages from "./pages/farmer/FarmerMessages";
import FarmerSubscription from "./pages/farmer/FarmerSubscription";

// Admin Dashboard Pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFarmers from "./pages/admin/AdminFarmers";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminFinances from "./pages/admin/AdminFinances";
import AdminReports from "./pages/admin/AdminReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckoutProcess />} />
          
          {/* Buyer Dashboard Routes */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer-dashboard/orders" element={<BuyerOrders />} />
          <Route path="/buyer-dashboard/favorites" element={<BuyerFavorites />} />
          <Route path="/buyer-dashboard/messages" element={<BuyerMessages />} />
          <Route path="/buyer-dashboard/farmers" element={<BuyerFarmers />} />
          <Route path="/buyer-dashboard/invoices" element={<BuyerInvoices />} />
          
          {/* Farmer Dashboard Routes */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer-dashboard/products" element={<FarmerProducts />} />
          <Route path="/farmer-dashboard/orders" element={<FarmerOrders />} />
          <Route path="/farmer-dashboard/messages" element={<FarmerMessages />} />
          <Route path="/farmer-dashboard/subscription" element={<FarmerSubscription />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/users" element={<AdminUsers />} />
          <Route path="/admin-dashboard/farmers" element={<AdminFarmers />} />
          <Route path="/admin-dashboard/messages" element={<AdminMessages />} />
          <Route path="/admin-dashboard/disputes" element={<AdminDisputes />} />
          <Route path="/admin-dashboard/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin-dashboard/finances" element={<AdminFinances />} />
          <Route path="/admin-dashboard/reports" element={<AdminReports />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
