import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const NotFound = () => {
  return (
    <PageTransition>
      
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-8 text-center pt-20 md:pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full">
          
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#f5f5f7] rounded-full flex items-center justify-center shadow-sm">
              <MagnifyingGlassIcon className="h-8 w-8 md:h-10 md:w-10 text-[#86868b]" />
            </div>
          </div>
          
          <h1 className="text-[32px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-[1.1] mb-4">
            The page you’re looking for can’t be found.
          </h1>
          <p className="text-[15px] md:text-[19px] text-[#86868b] font-medium mb-8 md:mb-10 leading-relaxed px-2">
            Maybe it was moved, or perhaps it never existed in this ecosystem. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/" 
              className="w-full sm:w-auto bg-[#0071e3] text-white px-10 py-3.5 rounded-full font-semibold text-[15px] md:text-[17px] hover:bg-[#0077ed] transition-all active:scale-95 shadow-lg shadow-blue-100">
              Go to Homepage
            </Link>
            <Link 
              to="/products" 
              className="text-[#0066cc] text-[15px] md:text-[17px] font-medium hover:underline flex items-center gap-1">
              Shop latest tech <span>→</span>
            </Link>
          </div>
          
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-100">
            <p className="text-[12px] md:text-[14px] text-[#86868b] leading-relaxed">
              Looking for something specific? <br className="block md:hidden" /> 
              Check our <Link to="/products" className="text-[#0066cc] hover:underline font-medium">Support</Link> or <Link to="/cart" className="text-[#0066cc] hover:underline font-medium">Bag</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
export default NotFound;