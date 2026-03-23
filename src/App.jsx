import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider, useCart } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AddedToCartPopup from "./components/AddedToCartPopup"; 
import Footer from "./components/Footer";
const queryClient = new QueryClient();
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};
const AppContent = () => {
  const { showPopup, setShowPopup, lastAddedItem, cartItems } = useCart();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />
      
      <Toaster 
        position="top-center" 
        gutter={12}
        containerStyle={{
          top: 40,
          left: 20,
          right: 20,
          bottom: 40
        }}
        toastOptions={{
          duration: 2500,
          style: {
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: '#1d1d1f',
            borderRadius: '20px',
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: '320px',
          },
          success: {
            duration: 2000,
          },
          error: {
            style: {
              background: '#1d1d1f', 
              color: '#fff',
            }
          }
        }} 
      />
      
      <AddedToCartPopup 
        item={lastAddedItem} 
        visible={showPopup} 
        onClose={() => setShowPopup(false)} 
        cartCount={cartItems?.length || 0}
      />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}
export default App;