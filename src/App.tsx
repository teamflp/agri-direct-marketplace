
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ReviewProvider } from "@/contexts/reviews";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SocialProvider } from "@/contexts/SocialContext";
import { MessageProvider } from "@/contexts/MessageContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";

// Pages communes
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Farmers from "./pages/Farmers";
import FarmerDetail from "./pages/FarmerDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NotificationsDemo from "./pages/NotificationsDemo";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SubscriptionsPage from "./pages/subscriptions/SubscriptionsPage";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Contact from "./pages/Contact";
import FAQ from "./pages/resources/FAQ";
import NotFound from "./pages/NotFound";
import SeasonalCalendar from "./pages/SeasonalCalendar";

// Pages Buyer
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerFavorites from "./pages/buyer/BuyerFavorites";
import BuyerMessages from "./pages/buyer/BuyerMessages";
import BuyerFarmers from "./pages/buyer/BuyerFarmers";
import BuyerInvoices from "./pages/buyer/BuyerInvoices";
import BuyerSubscriptions from "./pages/buyer/BuyerSubscriptions";

// Pages Farmer
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerInventory from "./pages/farmer/FarmerInventory";
import FarmerAnalytics from "./pages/farmer/FarmerAnalytics";
import FarmerMessages from "./pages/farmer/FarmerMessages";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerBlog from "./pages/farmer/FarmerBlog";
import FarmerSubscription from "./pages/farmer/FarmerSubscription";
import FarmerInvoices from "./pages/farmer/FarmerInvoices";

// Pages Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SubscriptionProvider>
            <CartProvider>
              <ReviewProvider>
                <NotificationProvider>
                  <SocialProvider>
                    <MessageProvider>
                      <Routes>
                        {/* Routes publiques */}
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/farmers" element={<Farmers />} />
                        <Route path="/farmer/:id" element={<FarmerDetail />} />
                        <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />

                        {/* Routes d'authentification - interdites aux utilisateurs connectés */}
                        <Route 
                          path="/login" 
                          element={
                            <ProtectedRoute requireAuth={false}>
                              <Login />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/register" 
                          element={
                            <ProtectedRoute requireAuth={false}>
                              <Register />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/forgot-password" 
                          element={
                            <ProtectedRoute requireAuth={false}>
                              <ForgotPassword />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/reset-password" 
                          element={
                            <ProtectedRoute requireAuth={false}>
                              <ResetPassword />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="/email-verification" element={<EmailVerification />} />

                        {/* Routes protégées - requièrent une authentification */}
                        <Route 
                          path="/cart" 
                          element={
                            <ProtectedRoute>
                              <Cart />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/checkout" 
                          element={
                            <ProtectedRoute>
                              <Checkout />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/chat" 
                          element={
                            <ProtectedRoute>
                              <Chat />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/subscriptions" 
                          element={
                            <ProtectedRoute>
                              <SubscriptionsPage />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/notifications-demo" 
                          element={
                            <ProtectedRoute>
                              <NotificationsDemo />
                            </ProtectedRoute>
                          } 
                        />

                        {/* Routes Buyer - protégées par rôle */}
                        <Route 
                          path="/buyer" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerDashboard />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/orders" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerOrders />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/profile" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerProfile />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/favorites" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerFavorites />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/messages" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerMessages />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/farmers" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerFarmers />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/invoices" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerInvoices />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/buyer/subscriptions" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['buyer', 'admin']}>
                                <BuyerSubscriptions />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />

                        {/* Routes Farmer - protégées par rôle */}
                        <Route 
                          path="/farmer" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerDashboard />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/products" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerProducts />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/orders" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerOrders />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/inventory" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerInventory />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/analytics" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerAnalytics />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/invoices" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerInvoices />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/messages" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerMessages />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/profile" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerProfile />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/blog" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerBlog />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/farmer/subscription" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['farmer', 'admin']}>
                                <FarmerSubscription />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />

                        {/* Routes Admin - strictement admin */}
                        <Route 
                          path="/admin" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['admin']}>
                                <AdminDashboard />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/admin/settings" 
                          element={
                            <ProtectedRoute>
                              <RoleGuard allowedRoles={['admin']}>
                                <AdminSettings />
                              </RoleGuard>
                            </ProtectedRoute>
                          } 
                        />

                        {/* Redirections pour compatibilité */}
                        <Route path="/buyer-dashboard" element={<Navigate to="/buyer" replace />} />
                        <Route path="/farmer-dashboard" element={<Navigate to="/farmer" replace />} />
                        <Route path="/buyer/dashboard" element={<Navigate to="/buyer" replace />} />
                        <Route path="/buyer-dashboard/*" element={<Navigate to="/buyer" replace />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </MessageProvider>
                  </SocialProvider>
                </NotificationProvider>
              </ReviewProvider>
            </CartProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
