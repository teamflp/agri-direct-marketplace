
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Farmers from './pages/Farmers';
import FarmerDetail from './pages/FarmerDetail';
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
import { ReviewProvider } from './contexts/reviews/ReviewContext';

// Import des pages ressources
import Blog from './pages/resources/Blog';
import BlogPost from './pages/resources/BlogPost';
import GuideAgriculteurs from './pages/resources/GuideAgriculteurs';
import FAQ from './pages/resources/FAQ';
import Support from './pages/resources/Support';
import KnowledgeBase from './pages/resources/KnowledgeBase';

// Import des pages d'agriculteur
import FarmerProducts from './pages/farmer/FarmerProducts';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerInventory from './pages/farmer/FarmerInventory';
import FarmerAnalytics from './pages/farmer/FarmerAnalytics';
import FarmerMessages from './pages/farmer/FarmerMessages';
import FarmerProfile from './pages/farmer/FarmerProfile';

// Import admin pages
import AdminReports from './pages/admin/AdminReports';

// Import des pages légales
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import LegalNotice from './pages/legal/LegalNotice';
import Cookies from './pages/legal/Cookies';

import FarmerProductsPage from './pages/farmers/FarmerProductsPage';
import FarmerVisitPage from './pages/farmers/FarmerVisitPage';
import FarmerContactPage from './pages/farmers/FarmerContactPage';

const App = () => {
  return (
    <SocialProvider>
      <NotificationProvider>
        <CartProvider>
          <SubscriptionProvider>
            <MessageProvider>
              <ReviewProvider>
                <Router>
                  <AuthProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/farmers" element={<Farmers />} />
                      <Route path="/farmers/:id" element={<FarmerDetail />} />
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
                      
                      {/* Routes principales pour le tableau de bord agriculteur */}
                      <Route path="/farmer" element={<FarmerDashboard />} />
                      <Route path="/farmer/products" element={<FarmerProducts />} />
                      <Route path="/farmer/orders" element={<FarmerOrders />} />
                      <Route path="/farmer/inventory" element={<FarmerInventory />} />
                      <Route path="/farmer/analytics" element={<FarmerAnalytics />} />
                      <Route path="/farmer/messages" element={<FarmerMessages />} />
                      <Route path="/farmer/profile" element={<FarmerProfile />} />
                      
                      {/* Routes pour les autres tableaux de bord */}
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/users" element={<AdminDashboard />} />
                      <Route path="/admin/farmers" element={<AdminDashboard />} />
                      <Route path="/admin/messages" element={<AdminDashboard />} />
                      <Route path="/admin/disputes" element={<AdminDashboard />} />
                      <Route path="/admin/subscriptions" element={<AdminDashboard />} />
                      <Route path="/admin/finances" element={<AdminDashboard />} />
                      <Route path="/admin/reports" element={<AdminReports />} />
                      <Route path="/admin/settings" element={<AdminDashboard />} />
                      
                      <Route path="/notifications-demo" element={<NotificationsDemo />} />
                      <Route path="/subscriptions" element={<Subscriptions />} />
                      <Route path="/chat" element={<Chat />} />
                      
                      {/* Routes pour les ressources */}
                      <Route path="/resources/blog" element={<Blog />} />
                      <Route path="/resources/blog/:slug" element={<BlogPost />} />
                      <Route path="/resources/guide-agriculteurs" element={<GuideAgriculteurs />} />
                      <Route path="/resources/faq" element={<FAQ />} />
                      <Route path="/resources/support" element={<Support />} />
                      <Route path="/resources/knowledge-base" element={<KnowledgeBase />} />
                      
                      {/* Routes pour les pages légales */}
                      <Route path="/legal/terms-of-service" element={<TermsOfService />} />
                      <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/legal/legal-notice" element={<LegalNotice />} />
                      <Route path="/legal/cookies" element={<Cookies />} />
                      
                      {/* Ajout des routes raccourcies pour faciliter l'accès */}
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      
                      <Route path="/farmers/:id/products" element={<FarmerProductsPage />} />
                      <Route path="/farmers/:id/visit" element={<FarmerVisitPage />} />
                      <Route path="/farmers/:id/contact" element={<FarmerContactPage />} />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <FloatingChatButton />
                  </AuthProvider>
                </Router>
              </ReviewProvider>
            </MessageProvider>
          </SubscriptionProvider>
        </CartProvider>
      </NotificationProvider>
    </SocialProvider>
  );
};

export default App;
