
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import Farmers from '@/pages/Farmers';
import FarmersMap from '@/pages/FarmersMap';
import Cart from '@/pages/Cart';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import EmailVerification from '@/pages/EmailVerification';
import Subscriptions from '@/pages/Subscriptions';
import CheckoutProcess from '@/pages/CheckoutProcess';
import NotFound from '@/pages/NotFound';
import BuyerDashboard from '@/pages/BuyerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import FarmerDashboard from '@/pages/FarmerDashboard';

// Buyer Dashboard
import BuyerProfile from '@/pages/buyer/BuyerProfile';
import BuyerOrders from '@/pages/buyer/BuyerOrders';
import BuyerFavorites from '@/pages/buyer/BuyerFavorites';
import BuyerMessages from '@/pages/buyer/BuyerMessages';
import BuyerInvoices from '@/pages/buyer/BuyerInvoices';
import BuyerFarmers from '@/pages/buyer/BuyerFarmers';
import BuyerSubscriptions from '@/pages/buyer/BuyerSubscriptions';

// Farmer Dashboard
import FarmerProfile from '@/pages/farmer/FarmerProfile';
import FarmerProducts from '@/pages/farmer/FarmerProducts';
import FarmerOrders from '@/pages/farmer/FarmerOrders';
import FarmerInventory from '@/pages/farmer/FarmerInventory';
import FarmerAnalytics from '@/pages/farmer/FarmerAnalytics';
import FarmerMessages from '@/pages/farmer/FarmerMessages';
import FarmerSubscription from '@/pages/farmer/FarmerSubscription';
import FarmerBlog from '@/pages/farmer/FarmerBlog';

// Admin Dashboard
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminFarmers from '@/pages/admin/AdminFarmers';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminDisputes from '@/pages/admin/AdminDisputes';
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions';
import AdminFinances from '@/pages/admin/AdminFinances';
import AdminReports from '@/pages/admin/AdminReports';

import { CartProvider } from '@/contexts/CartContext';
import '@/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Pages Publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farmers-map" element={<FarmersMap />} /> {/* Nouvelle page de carte */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/checkout" element={<CheckoutProcess />} />
          
          {/* Dashboard Acheteur */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer-dashboard/profile" element={<BuyerProfile />} />
          <Route path="/buyer-dashboard/orders" element={<BuyerOrders />} />
          <Route path="/buyer-dashboard/favorites" element={<BuyerFavorites />} />
          <Route path="/buyer-dashboard/messages" element={<BuyerMessages />} />
          <Route path="/buyer-dashboard/invoices" element={<BuyerInvoices />} />
          <Route path="/buyer-dashboard/farmers" element={<BuyerFarmers />} />
          <Route path="/buyer-dashboard/subscription" element={<BuyerSubscriptions />} />
          
          {/* Dashboard Agriculteur */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer-dashboard/profile" element={<FarmerProfile />} />
          <Route path="/farmer-dashboard/products" element={<FarmerProducts />} />
          <Route path="/farmer-dashboard/inventory" element={<FarmerInventory />} />
          <Route path="/farmer-dashboard/orders" element={<FarmerOrders />} />
          <Route path="/farmer-dashboard/analytics" element={<FarmerAnalytics />} />
          <Route path="/farmer-dashboard/messages" element={<FarmerMessages />} />
          <Route path="/farmer-dashboard/subscription" element={<FarmerSubscription />} />
          <Route path="/farmer-dashboard/blog" element={<FarmerBlog />} />

          {/* Dashboard Admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/users" element={<AdminUsers />} />
          <Route path="/admin-dashboard/farmers" element={<AdminFarmers />} />
          <Route path="/admin-dashboard/messages" element={<AdminMessages />} />
          <Route path="/admin-dashboard/disputes" element={<AdminDisputes />} />
          <Route path="/admin-dashboard/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin-dashboard/finances" element={<AdminFinances />} />
          <Route path="/admin-dashboard/reports" element={<AdminReports />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
