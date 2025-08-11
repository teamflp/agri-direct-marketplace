
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
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Farmers from "./pages/Farmers";
import FarmerDetail from "./pages/FarmerDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
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

// Buyer pages
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerFavorites from "./pages/buyer/BuyerFavorites";
import BuyerMessages from "./pages/buyer/BuyerMessages";
import BuyerFarmers from "./pages/buyer/BuyerFarmers";
import BuyerInvoices from "./pages/buyer/BuyerInvoices";
import BuyerSubscriptions from "./pages/buyer/BuyerSubscriptions";

// Farmer pages
import FarmerProducts from "./pages/farmer/FarmerProducts";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerInventory from "./pages/farmer/FarmerInventory";
import FarmerAnalytics from "./pages/farmer/FarmerAnalytics";
import FarmerMessages from "./pages/farmer/FarmerMessages";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerBlog from "./pages/farmer/FarmerBlog";
import FarmerSubscription from "./pages/farmer/FarmerSubscription";
import FarmerInvoices from "./pages/farmer/FarmerInvoices";

// Admin pages
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
                        {/* Main routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/farmers" element={<Farmers />} />
                        <Route path="/farmer/:id" element={<FarmerDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/notifications-demo" element={<NotificationsDemo />} />
                        <Route path="/email-verification" element={<EmailVerification />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/subscriptions" element={<SubscriptionsPage />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />

                        {/* Primary dashboard routes */}
                        <Route path="/buyer" element={<BuyerDashboard />} />
                        <Route path="/farmer" element={<FarmerDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        
                        {/* Backward compatibility redirects */}
                        <Route path="/buyer-dashboard" element={<Navigate to="/buyer" replace />} />
                        <Route path="/farmer-dashboard" element={<Navigate to="/farmer" replace />} />

                        {/* Buyer routes */}
                        <Route path="/buyer/dashboard" element={<Navigate to="/buyer" replace />} />
                        <Route path="/buyer/orders" element={<BuyerOrders />} />
                        <Route path="/buyer/profile" element={<BuyerProfile />} />
                        <Route path="/buyer/favorites" element={<BuyerFavorites />} />
                        <Route path="/buyer/messages" element={<BuyerMessages />} />
                        <Route path="/buyer/farmers" element={<BuyerFarmers />} />
                        <Route path="/buyer/invoices" element={<BuyerInvoices />} />
                        <Route path="/buyer/subscriptions" element={<BuyerSubscriptions />} />

                        {/* Legacy buyer routes - redirect to new paths */}
                        <Route path="/buyer-dashboard/orders" element={<Navigate to="/buyer/orders" replace />} />
                        <Route path="/buyer-dashboard/profile" element={<Navigate to="/buyer/profile" replace />} />
                        <Route path="/buyer-dashboard/favorites" element={<Navigate to="/buyer/favorites" replace />} />
                        <Route path="/buyer-dashboard/messages" element={<Navigate to="/buyer/messages" replace />} />
                        <Route path="/buyer-dashboard/farmers" element={<Navigate to="/buyer/farmers" replace />} />
                        <Route path="/buyer-dashboard/invoices" element={<Navigate to="/buyer/invoices" replace />} />
                        <Route path="/buyer-dashboard/subscriptions" element={<Navigate to="/buyer/subscriptions" replace />} />

                        {/* Farmer routes */}
                        <Route path="/farmer/products" element={<FarmerProducts />} />
                        <Route path="/farmer/orders" element={<FarmerOrders />} />
                        <Route path="/farmer/inventory" element={<FarmerInventory />} />
                        <Route path="/farmer/analytics" element={<FarmerAnalytics />} />
                        <Route path="/farmer/invoices" element={<FarmerInvoices />} />
                        <Route path="/farmer/messages" element={<FarmerMessages />} />
                        <Route path="/farmer/profile" element={<FarmerProfile />} />
                        <Route path="/farmer/blog" element={<FarmerBlog />} />
                        <Route path="/farmer/subscription" element={<FarmerSubscription />} />

                        {/* Admin routes */}
                        <Route path="/admin/settings" element={<AdminSettings />} />

                        {/* Catch all - 404 */}
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
