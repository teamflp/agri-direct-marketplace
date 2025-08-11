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
import Profile from "./pages/Profile";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import ComingSoon from "./pages/ComingSoon";
import UnderMaintenance from "./pages/UnderMaintenance";
import AccessDenied from "./pages/AccessDenied";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

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
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/404" element={<Error404 />} />
                      <Route path="/500" element={<Error500 />} />
                      <Route path="/coming-soon" element={<ComingSoon />} />
                      <Route path="/maintenance" element={<UnderMaintenance />} />
                      <Route path="/access-denied" element={<AccessDenied />} />
                      <Route path="/verify-email" element={<VerifyEmail />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQ />} />
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
