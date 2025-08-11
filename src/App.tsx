
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ReviewProvider } from "@/contexts/reviews";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { SocialProvider } from "@/contexts/SocialContext";
import { MessageProvider } from "@/contexts/MessageContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ReviewProvider>
          <NotificationProvider>
            <SocialProvider>
              <MessageProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/farmers" element={<Farmers />} />
                      <Route path="/farmer/:id" element={<FarmerDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/buyer-dashboard/orders" element={<BuyerOrders />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
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
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </MessageProvider>
            </SocialProvider>
          </NotificationProvider>
        </ReviewProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
