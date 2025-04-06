
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Farmers from './pages/Farmers';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import SeasonalCalendar from './pages/SeasonalCalendar';
import EmailVerification from './pages/EmailVerification';
import FarmersMap from './pages/FarmersMap';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import CheckoutProcess from './pages/CheckoutProcess';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import BuyerFavorites from './pages/buyer/BuyerFavorites';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerMessages from './pages/buyer/BuyerMessages';
import BuyerFarmers from './pages/buyer/BuyerFarmers';
import BuyerInvoices from './pages/buyer/BuyerInvoices';
import BuyerProfile from './pages/buyer/BuyerProfile';
import BuyerSubscriptions from './pages/buyer/BuyerSubscriptions';
import NotificationsDemo from './pages/NotificationsDemo';
import Subscriptions from './pages/Subscriptions';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';
import FloatingChatButton from './components/chat/FloatingChatButton';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { MessageProvider } from './contexts/MessageContext';
import { SocialProvider } from './contexts/SocialContext';

const App = () => {
  return (
    <SocialProvider>
      <NotificationProvider>
        <CartProvider>
          <SubscriptionProvider>
            <MessageProvider>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/farmers" element={<Farmers />} />
                    <Route path="/farmers-map" element={<FarmersMap />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                    <Route path="/email-verification" element={<EmailVerification />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutProcess />} />
                    
                    {/* Routes principales standardisées pour le tableau de bord acheteur */}
                    <Route path="/buyer" element={<BuyerDashboard />} />
                    <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                    <Route path="/buyer/favorites" element={<BuyerFavorites />} />
                    <Route path="/buyer/orders" element={<BuyerOrders />} />
                    <Route path="/buyer/messages" element={<BuyerMessages />} />
                    <Route path="/buyer/farmers" element={<BuyerFarmers />} />
                    <Route path="/buyer/invoices" element={<BuyerInvoices />} />
                    <Route path="/buyer/profile" element={<BuyerProfile />} />
                    <Route path="/buyer/subscriptions" element={<BuyerSubscriptions />} />
                    
                    {/* Routes alternatives pour compatibilité avec l'ancien format */}
                    <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                    <Route path="/buyer-dashboard/favorites" element={<BuyerFavorites />} />
                    <Route path="/buyer-dashboard/orders" element={<BuyerOrders />} />
                    <Route path="/buyer-dashboard/messages" element={<BuyerMessages />} />
                    <Route path="/buyer-dashboard/farmers" element={<BuyerFarmers />} />
                    <Route path="/buyer-dashboard/invoices" element={<BuyerInvoices />} />
                    <Route path="/buyer-dashboard/profile" element={<BuyerProfile />} />
                    <Route path="/buyer-dashboard/subscriptions" element={<BuyerSubscriptions />} />
                    
                    {/* Routes pour les autres tableaux de bord */}
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/farmer/*" element={<FarmerDashboard />} />
                    
                    <Route path="/notifications-demo" element={<NotificationsDemo />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  {/* Ajout du bouton de chat flottant à toutes les pages */}
                  <FloatingChatButton />
                </AuthProvider>
              </Router>
            </MessageProvider>
          </SubscriptionProvider>
        </CartProvider>
      </NotificationProvider>
    </SocialProvider>
  );
};

export default App;
