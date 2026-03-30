import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const HERO_PRODUCT = {
  id: 105,
  title: "iPhone 15 Pro Max",
  model: "Natural Titanium",
  price: 1199,
  image: "https://res.cloudinary.com/dewiz9758/image/upload/v1774263868/Gemini_Generated_Image_137mab137mab137m-removebg-preview_pnmz4p.png",
};
const HeroSection = () => {
  const { addToCart } = useCart();
  const handleAddToCart = (e) => {
    toast.dismiss();
    const coords = { 
      x: e.clientX, 
      y: e.clientY 
    };
    addToCart(
      { ...HERO_PRODUCT, thumbnail: HERO_PRODUCT.image, quantity: 1 }, 
      coords
    );
  };
  return (
    <section className="relative w-full min-h-screen lg:min-h-[85vh] flex items-center justify-center bg-white overflow-hidden pt-2 pb-10 lg:pt-24 lg:pb-16">
      <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 items-center">
        
        <div className="order-1 lg:order-2 relative flex justify-center items-center h-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full flex justify-center"
          >
            <img 
              src={HERO_PRODUCT.image} 
              alt={HERO_PRODUCT.title} 
              className="w-[115%] sm:w-[80%] md:w-[85%] lg:w-[100%] lg:max-h-[550px] scale-125 sm:scale-100 h-auto object-contain z-10 select-none"
            />
          </motion.div>
        </div>
        
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#bf4800] text-[12px] md:text-[18px] font-extrabold mb-1 md:mb-2 tracking-widest uppercase">
              Pro. Beyond.
            </p>
            <h1 className="text-[34px] sm:text-[50px] md:text-[75px] xl:text-[90px] font-black text-[#1d1d1f] leading-[1.1] tracking-tight mb-3 lg:mb-6">
              {HERO_PRODUCT.title}. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#888] to-[#000]">
                Titanium.
              </span>
            </h1>
            <p className="text-[14px] md:text-[19px] text-[#424245] max-w-[280px] md:max-w-md mb-6 lg:mb-8 leading-relaxed font-medium">
              The first iPhone with an aerospace‑grade titanium design. 
            </p>
            <button 
              onClick={handleAddToCart}
              className="bg-[#0071e3] text-white px-10 md:px-12 py-3 md:py-4 rounded-full font-bold text-[15px] md:text-[17px] hover:bg-[#0077ed] transition-all active:scale-95 shadow-lg shadow-blue-200"
            >
              Buy Now
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-6 w-full text-center px-6">
        <p className="text-[10px] md:text-[13px] text-[#86868b] font-medium tracking-tight">
          From ${HERO_PRODUCT.price} or ${ (HERO_PRODUCT.price / 24).toFixed(2) }/mo. for 24 mo.*
        </p>
      </div>
    </section>
  );
};
export default HeroSection;