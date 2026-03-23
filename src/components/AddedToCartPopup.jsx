import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
const AddedToCartPopup = ({ item, visible, onClose, cartCount }) => {
  return (
    <AnimatePresence>
      {visible && item && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } }}
          className="fixed bottom-24 md:bottom-auto md:top-20 right-4 z-[100] w-auto pointer-events-auto">
          
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl rounded-[22px] p-2 md:p-4 w-[200px] md:w-[300px]">
            
            <button 
              onClick={onClose} 
              className="absolute -top-1 -left-1 bg-white shadow-md border border-gray-100 rounded-full p-1 md:static md:bg-transparent md:shadow-none md:border-none md:p-1 md:float-right">
              <XMarkIcon className="h-3 w-3 text-gray-400" />
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              
              <div className="h-12 w-12 md:h-14 md:w-14 bg-[#f5f5f7] rounded-lg flex-shrink-0 p-1">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 min-w-0 text-center md:text-left">
                <h4 className="text-[11px] md:text-[13px] font-bold text-[#1d1d1f] truncate leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">
                  Added to Bag
                </p>
              </div>
            </div>
            
            <div className="flex gap-1.5 mt-2 md:mt-4">
              <Link 
                to="/cart" 
                onClick={onClose}
                className="flex-1 bg-[#0071e3] text-white py-1.5 rounded-full text-[10px] md:text-[12px] font-bold text-center active:scale-90 transition-all">
                View
              </Link>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="flex-1 bg-black text-white py-1.5 rounded-full text-[10px] md:text-[12px] font-bold text-center active:scale-90 transition-all">
                Pay
              </Link>
            </div>
          </div>
          
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white rotate-45 border-b border-r border-gray-200/50 block md:hidden" />
          
          <div className="absolute -top-1 right-6 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200/50 hidden md:block" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AddedToCartPopup;