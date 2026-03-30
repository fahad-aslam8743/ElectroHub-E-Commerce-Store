import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PlusIcon, EyeIcon } from "@heroicons/react/24/outline";
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const handleAdd = (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Is line se mouse ki location context tak jayegi
  const coords = { x: e.clientX, y: e.clientY };
  
  addToCart(product, coords); 
};
  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[32px] p-4 md:p-6 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] active:scale-[0.98] h-full border border-transparent hover:border-gray-100">
      
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 pointer-events-none">
        {product.discountPercentage > 10 && (
          <span className="bg-[#bf4800] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      
      <Link 
        to={`/product/${product.id}`}
        className="relative aspect-square w-full mb-6 overflow-hidden flex items-center justify-center rounded-[24px] bg-[#f5f5f7]"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 bg-[#ededf0] animate-pulse flex items-center justify-center">
             <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-400 rounded-full animate-spin opacity-20" />
          </div>
        )}
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          onLoad={() => setImgLoaded(true)}
          className={`max-h-[85%] max-w-[85%] object-contain transition-all duration-1000 ease-out group-hover:scale-110 
            ${imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'}`}
        />
        <div className="hidden md:flex absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
          <span className="bg-white/90 backdrop-blur-md text-[#1d1d1f] px-5 py-2.5 rounded-full text-[13px] font-semibold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
            <EyeIcon className="h-4 w-4" /> View Details
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <div className="text-center md:text-left">
          <p className="text-[11px] md:text-[12px] font-bold text-[#86868b] uppercase tracking-[0.1em] mb-1.5 opacity-80">
            {product.category}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-[17px] md:text-[20px] font-semibold text-[#1d1d1f] leading-tight mb-2 line-clamp-2 min-h-[40px] md:min-h-[48px] hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[18px] md:text-[20px] font-semibold text-[#1d1d1f] tracking-tight">
              ${product.price.toLocaleString()}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-[12px] text-[#86868b] line-through decoration-gray-400">
                ${(product.price * 1.2).toFixed(0)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center bg-[#1d1d1f] text-white transition-all duration-300 active:scale-90 shadow-[0_10px_20px_rgba(0,0,0,0.1)]
                       h-10 w-10 rounded-full md:h-11 md:w-auto md:px-6 md:rounded-full md:hover:bg-[#0071e3] md:hover:shadow-blue-500/20"
          >
            <PlusIcon className="h-5 w-5 md:mr-2 stroke-[2.5]" />
            <span className="hidden md:inline text-[14px] font-bold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;