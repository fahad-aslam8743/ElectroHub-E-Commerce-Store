import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const FlyToCartAnimation = () => {
  const { animatingItem } = useCart();

  if (!animatingItem) return null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <AnimatePresence>
      <motion.div
        key={Date.now()}
        initial={{ 
          position: 'fixed',
          top: animatingItem.start.y - 20, 
          left: animatingItem.start.x - 20,
          width: 50,
          height: 50,
          zIndex: 99999,
          opacity: 1,
          scale: 1,
          borderRadius: "100%"
        }}
        animate={{
          top: isMobile ? window.innerHeight - 60 : 25,
          left: isMobile ? window.innerWidth / 2 + 50 : window.innerWidth - 80, 
          
          scale: 0.1,
          opacity: 0,
          rotate: 450,
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 1.3,
          ease: "anticipate" 
        }}
        className="pointer-events-none flex items-center justify-center bg-white shadow-xl rounded-full border border-gray-100"
      >
        <img 
          src={animatingItem.image} 
          className="w-[80%] h-[80%] object-contain mix-blend-multiply" 
          alt="fly-item"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default FlyToCartAnimation;