import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/HeroSection";
import { Reveal } from "../components/Reveal";
import OffersBanner from "../components/OffersBanner";
import FeaturedScroller from "../components/FeaturedScroller";
import TrustSection from "../components/TrustSection";
import ContactSection from "../components/ContactSection";
import ReviewSection from "../components/ReviewSection";
import { ShoppingBagIcon } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
const fetchFeaturedProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
const Home = () => {
  const [minLoaderTimeComplete, setMinLoaderTimeComplete] = useState(false);
  const { data: products, isLoading: isDataLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("electroHubVisited");
    if (!hasVisited) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setMinLoaderTimeComplete(true);
        sessionStorage.setItem("electroHubVisited", "true");
        document.body.style.overflow = "";
      }, 2500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      setMinLoaderTimeComplete(true);
    }
  }, []);
  const showSplash = !minLoaderTimeComplete || (isDataLoading && !sessionStorage.getItem("electroHubVisited"));
  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
            }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 select-none"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center"
            >
               <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1d1d1f] rounded-[24%] flex items-center justify-center shadow-2xl mb-8">
                  <ShoppingBagIcon className="w-8 h-8 md:w-10 md:h-10 text-[#0071e3]" />
               </div>
               <h2 className="text-[24px] md:text-[28px] font-bold text-[#1d1d1f] tracking-tighter">
                  Electro<span className="text-[#0071e3]">Hub</span>
               </h2>
               <div className="w-40 md:w-48 h-[2px] bg-gray-100 rounded-full mt-10 overflow-hidden">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full bg-[#1d1d1f] origin-left"
                  />
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showSplash && (
        <PageTransition>
          <main className="relative w-full overflow-hidden bg-white">
            <HeroSection />
            <div className="flex flex-col">
              <Reveal delay={0.2}><OffersBanner /></Reveal>
              
              <Reveal>
                <FeaturedScroller products={products} isLoading={isDataLoading} />
              </Reveal>
              <Reveal><TrustSection /></Reveal>
              <Reveal><ContactSection /></Reveal>
              <Reveal><ReviewSection /></Reveal>
            </div>
          </main>
        </PageTransition>
      )}
    </>
  );
};
export default Home;