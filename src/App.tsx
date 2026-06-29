import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import ShippingReturns from './pages/ShippingReturns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

import './App.css';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-kj-ivory font-sans text-kj-charcoal antialiased">
        <ScrollToTop />
        
        {/* Top promo line */}
        <AnnouncementBar />

        {/* Navigation Sticky Header */}
        <Header />

        {/* Global Slide-over Drawer Cart */}
        <CartDrawer />

        {/* Main Body Viewport */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:slug" element={<Collection />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        {/* Footer block */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
