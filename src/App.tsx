
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import { initializeTracking } from "@/lib/tracking";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { SocialProvider } from "@/contexts/SocialContext";
import { MessageProvider } from "@/contexts/MessageContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { DeliveryProvider } from "@/contexts/DeliveryContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Farmers from "./pages/Farmers";
import FarmerDetail from "./pages/FarmerDetail";
import FarmersMap from "./pages/FarmersMap";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutProcess from "./pages/CheckoutProcess";
import Contact from "./pages/Contact";
import SeasonalCalendar from "./pages/SeasonalCalendar";
import Subscriptions from "./pages/Subscriptions";
import Chat from "./pages/Chat";
import MessagesPage from "./pages/MessagesPage";
import NotificationsDemo from "./pages/NotificationsDemo";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Buyer Pages
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerMessages from "./pages/buyer/BuyerMessages";
import BuyerFarmers from "./pages/buyer/BuyerFarmers";
import BuyerFavorites from "./pages/buyer/BuyerFavorites";
import BuyerInvoices from "./pages/buyer/BuyerInvoices";
import BuyerSubscriptions from "./pages/buyer/BuyerSubscriptions";

// Farmer Pages
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerMessages from "./pages/farmer/FarmerMessages";
import FarmerAnalytics from "./pages/farmer/FarmerAnalytics";
import FarmerInventory from "./pages/farmer/FarmerInventory";
import FarmerInvoices from "./pages/farmer/FarmerInvoices";
import FarmerSubscription from "./pages/farmer/FarmerSubscription";
import FarmerBlog from "./pages/farmer/FarmerBlog";
import FarmerDelivery from "./pages/farmer/FarmerDelivery";
import FarmerDeliveryRoute from "./pages/farmer/FarmerDeliveryRoute";

// Admin Pages
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFarmers from "./pages/admin/AdminFarmers";
import AdminFinances from "./pages/admin/AdminFinances";
import AdminReports from "./pages/admin/AdminReports";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";

// Legal Pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import LegalNotice from "./pages/legal/LegalNotice";
import Cookies from "./pages/legal/Cookies";

// Resources Pages
import FAQ from "./pages/resources/FAQ";
import Support from "./pages/resources/Support";
import KnowledgeBase from "./pages/resources/KnowledgeBase";
import GuideAgriculteurs from "./pages/resources/GuideAgriculteurs";
import Blog from "./pages/resources/Blog";
import BlogPost from "./pages/resources/BlogPost";

// Farmers sub-pages
import FarmerContactPage from "./pages/farmers/FarmerContactPage";
import FarmerProductsPage from "./pages/farmers/FarmerProductsPage";
import FarmerVisitPage from "./pages/farmers/FarmerVisitPage";

// Subscriptions
import SubscriptionsPage from "./pages/subscriptions/SubscriptionsPage";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initializeTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CookieConsentBanner />
          <AuthProvider>
            <SecureAuthProvider>
              <CartProvider>
                <ReviewProvider>
                  <SocialProvider>
                    <MessageProvider>
                      <NotificationProvider>
                        <DeliveryProvider>
                          <SubscriptionProvider>
                            <CurrencyProvider>
                              <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Index />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/forgot-password" element={<ForgotPassword />} />
                              <Route path="/reset-password" element={<ResetPassword />} />
                              <Route path="/email-verification" element={<EmailVerification />} />
                              <Route path="/products" element={<Products />} />
                              <Route path="/products/:id" element={<ProductDetail />} />
                              <Route path="/farmers" element={<Farmers />} />
                              <Route path="/farmers/:id" element={<FarmerDetail />} />
                              <Route path="/farmers/:id/contact" element={<FarmerContactPage />} />
                              <Route path="/farmers/:id/products" element={<FarmerProductsPage />} />
                              <Route path="/farmers/:id/visit" element={<FarmerVisitPage />} />
                              <Route path="/farmers-map" element={<FarmersMap />} />
                              <Route path="/cart" element={<Cart />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                              <Route path="/subscriptions" element={<Subscriptions />} />
                              <Route path="/subscriptions-page" element={<SubscriptionsPage />} />
                              <Route path="/chat" element={<Chat />} />
                              <Route path="/notifications-demo" element={<NotificationsDemo />} />

                              {/* Legal Routes */}
                              <Route path="/legal/terms" element={<TermsOfService />} />
                              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
                              <Route path="/legal/notice" element={<LegalNotice />} />
                              <Route path="/legal/cookies" element={<Cookies />} />

                              {/* Resources Routes */}
                              <Route path="/resources/faq" element={<FAQ />} />
                              <Route path="/resources/support" element={<Support />} />
                              <Route path="/resources/knowledge-base" element={<KnowledgeBase />} />
                              <Route path="/resources/guide-agriculteurs" element={<GuideAgriculteurs />} />
                              <Route path="/resources/blog" element={<Blog />} />
                              <Route path="/resources/blog/:slug" element={<BlogPost />} />

                              {/* Protected Routes */}
                              <Route path="/checkout" element={
                                <ProtectedRoute>
                                  <Checkout />
                                </ProtectedRoute>
                              } />
                              <Route path="/checkout-process" element={
                                <ProtectedRoute>
                                  <CheckoutProcess />
                                </ProtectedRoute>
                              } />
                              <Route path="/messages" element={
                                <ProtectedRoute>
                                  <MessagesPage />
                                </ProtectedRoute>
                              } />

                              {/* Buyer Dashboard Routes */}
                              <Route path="/buyer" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerDashboard />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/orders" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerOrders />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/profile" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerProfile />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/messages" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerMessages />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/farmers" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerFarmers />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/favorites" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerFavorites />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/invoices" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerInvoices />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/buyer/subscriptions" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['buyer']}>
                                    <BuyerSubscriptions />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />

                              {/* Farmer Dashboard Routes */}
                              <Route path="/farmer" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerDashboard />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/products" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerProducts />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/orders" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerOrders />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/delivery" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerDelivery />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/delivery-route" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerDeliveryRoute />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/profile" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerProfile />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/messages" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerMessages />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/analytics" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerAnalytics />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/inventory" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerInventory />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/invoices" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerInvoices />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/subscription" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerSubscription />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/farmer/blog" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['farmer']}>
                                    <FarmerBlog />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />

                              {/* Admin Dashboard Routes */}
                              <Route path="/admin" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminDashboard />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/users" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminUsers />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/farmers" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminFarmers />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/finances" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminFinances />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/reports" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminReports />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/messages" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminMessages />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/settings" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminSettings />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/disputes" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminDisputes />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />
                              <Route path="/admin/subscriptions" element={
                                <ProtectedRoute>
                                  <RoleGuard allowedRoles={['admin']}>
                                    <AdminSubscriptions />
                                  </RoleGuard>
                                </ProtectedRoute>
                              } />

                              {/* 404 Route */}
                              <Route path="*" element={<NotFound />} />
                              </Routes>
                            </CurrencyProvider>
                          </SubscriptionProvider>
                        </DeliveryProvider>
                      </NotificationProvider>
                    </MessageProvider>
                  </SocialProvider>
                </ReviewProvider>
              </CartProvider>
            </SecureAuthProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
