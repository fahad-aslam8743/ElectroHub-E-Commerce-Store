import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const FlyToCartAnimation = () => {
  const { animatingItem } = useCart();

  if (!animatingItem) return null;

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
          top: 25, 
          left: window.innerWidth > 768 ? window.innerWidth - 80 : window.innerWidth - 40, 
          scale: 0.2,
          opacity: 0.8,
          rotate: 360,
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: "anticipate" 
        }}
        className="pointer-events-none flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-[2px] rounded-full"
      >
        <img 
          src={animatingItem.image} 
          className="w-[80%] h-[80%] object-contain mix-blend-multiply" 
          alt="fly-item"
          style={{ filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.1))" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default FlyToCartAnimation;