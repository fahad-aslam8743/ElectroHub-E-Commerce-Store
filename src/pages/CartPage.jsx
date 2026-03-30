import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, MinusIcon, ArrowRightIcon, ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageTransition from "../components/PageTransition"; 
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(`${title} removed from bag`, {
      icon: '🗑️',
      duration : 1000,
      style: { borderRadius: '24px', background: '#1d1d1f', color: '#fff' }
    });
  };
  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#f5f5f7] rounded-full flex items-center justify-center mb-6">
            <ShoppingBagIcon className="h-9 w-9 text-[#86868b]" />
          </motion.div>
          <h1 className="text-[28px] md:text-[42px] font-semibold text-[#1d1d1f] mb-4">Your bag is empty.</h1>
          <Link to="/products" className="bg-[#0071e3] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#0077ed] transition-all active:scale-95">
            Continue Shopping
          </Link>
        </div>
      </PageTransition>
    );
  }
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-24 pb-32">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <header className="mb-10">
            <h1 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] tracking-tight">Review your bag.</h1>
            <p className="text-[#86868b] font-medium">Free delivery and free returns on all orders.</p>
          </header>
          
          <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-8">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white border border-gray-100 md:border-none md:border-b md:border-gray-100 rounded-[24px] md:rounded-none p-3 md:p-0 md:pb-10 flex flex-col md:flex-row gap-4 md:gap-8 relative group"
                >
                  
                  <div className="w-full md:w-[200px] aspect-square bg-[#f5f5f7] rounded-[18px] md:rounded-[24px] flex items-center justify-center p-4">
                    <img src={item.thumbnail} alt={item.title} className="max-h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-[15px] md:text-[22px] font-semibold text-[#1d1d1f] line-clamp-1 md:line-clamp-none">{item.title}</h3>
                        <p className="hidden md:block text-[20px] font-semibold text-[#1d1d1f] tabular-nums">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-[#86868b] text-[12px] md:text-[16px] capitalize mb-3 md:mb-0">{item.category}</p>
                      <p className="md:hidden text-[16px] font-bold text-[#1d1d1f] mb-4">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center bg-[#f5f5f7] rounded-full p-1 scale-90 md:scale-100 origin-left">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 md:p-2 hover:bg-white rounded-full transition-all disabled:opacity-20" disabled={item.quantity <= 1}>
                          <MinusIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                        <span className="w-6 md:w-10 text-center font-bold text-sm md:text-base">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 md:p-2 hover:bg-white rounded-full transition-all">
                          <PlusIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRemove(item.id, item.title)}
                        className="p-2 text-red-500 md:text-[#0071e3] hover:bg-red-50 md:hover:bg-transparent rounded-full md:rounded-none md:font-medium md:hover:underline transition-all"
                      >
                        <TrashIcon className="h-5 w-5 md:hidden" />
                        <span className="hidden md:block">Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 flex justify-end">
            <div className="w-full md:w-[380px] space-y-6">
              <div className="space-y-3 border-b border-gray-200 pb-6 text-[15px] md:text-[16px]">
                <div className="flex justify-between text-[#424245]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1d1d1f]">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#424245]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs tracking-widest bg-green-50 px-2 py-0.5 rounded">Free</span>
                </div>
              </div>
              <div className="flex justify-between text-[26px] md:text-[32px] font-semibold text-[#1d1d1f]">
                <span>Total</span>
                <span className="tabular-nums">${cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#0071e3] text-white py-4.5 rounded-[18px] font-bold flex items-center justify-center gap-3 hover:bg-[#0077ed] transition-all active:scale-95 shadow-xl shadow-blue-500/10"
              >
                Check Out 
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default CartPage;