
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Farmers from './pages/Farmers';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
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
import NotificationsDemo from './pages/NotificationsDemo';
import Subscriptions from './pages/Subscriptions';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';
import FloatingChatButton from './components/chat/FloatingChatButton';
import { NotificationProvider } from './contexts/NotificationContext';
import { CartProvider } from './contexts/CartContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { MessageProvider } from './contexts/MessageContext';

const App = () => {
  return (
    <NotificationProvider>
      <CartProvider>
        <SubscriptionProvider>
          <MessageProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/farmers-map" element={<FarmersMap />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                <Route path="/email-verification" element={<EmailVerification />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutProcess />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/farmer/*" element={<FarmerDashboard />} />
                <Route path="/buyer/*" element={<BuyerDashboard />} />
                <Route path="/notifications-demo" element={<NotificationsDemo />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Ajout du bouton de chat flottant à toutes les pages */}
              <FloatingChatButton />
            </Router>
          </MessageProvider>
        </SubscriptionProvider>
      </CartProvider>
    </NotificationProvider>
  );
};

export default App;
