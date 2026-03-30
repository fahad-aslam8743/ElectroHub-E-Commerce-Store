import { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [animatingItem, setAnimatingItem] = useState(null);

  const getUserEmail = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      return userData.email || null;
    } catch (e) { return null; }
  };

  const [cartItems, setCartItems] = useState(() => {
    const email = getUserEmail();
    if (email) {
      const savedCart = localStorage.getItem(`cart_${email}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    const email = getUserEmail();
    if (email) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product, coords = null) => {
    const email = getUserEmail();
    if (!email) {
      toast.error("Please sign in to add to bag", { id: 'auth-error' });
      return;
    }

  
    if (coords) {
      setAnimatingItem({
        image: product.thumbnail,
        start: { x: coords.x, y: coords.y }
      });
      setTimeout(() => setAnimatingItem(null), 1000);
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), 
  [cartItems]);

  const cartCount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0), 
  [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, cartCount, 
      animatingItem 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};