import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchElectronics } from "../api/axiosInstance";
import { useCart } from "../context/CartContext";
const FeaturedScroller = () => {
  const { addToCart } = useCart();
  const scrollRef = useRef(null);
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchElectronics,
  });
  const originalItems = products?.slice(0, 6) || [];
  const featured = [...originalItems, ...originalItems, ...originalItems];
  const [activeIndex, setActiveIndex] = useState(originalItems.length);
  useEffect(() => {
    if (!isLoading && scrollRef.current && originalItems.length > 0) {
      const card = scrollRef.current.querySelector('.featured-card');
      if (card) {
        const gap = window.innerWidth >= 768 ? 32 : 16;
        const cardWidth = card.offsetWidth + gap;
        scrollRef.current.scrollLeft = cardWidth * originalItems.length;
      }
    }
  }, [isLoading, originalItems.length]);
  useEffect(() => {
    if (originalItems.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, originalItems.length]);
  const handleNext = () => {
    const nextIndex = activeIndex + 1;
    scrollToIndex(nextIndex);
    if (nextIndex >= originalItems.length * 2) {
      setTimeout(() => jumpToIndex(originalItems.length), 700);
    }
  };
  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.featured-card');
      const gap = window.innerWidth >= 768 ? 32 : 16;
      const cardWidth = card.offsetWidth + gap;
      scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };
  const jumpToIndex = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.featured-card');
      const gap = window.innerWidth >= 768 ? 32 : 16;
      const cardWidth = card.offsetWidth + gap;
      scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'auto' });
      setActiveIndex(index);
    }
  };
  if (isLoading) return <div className="h-[500px] flex items-center justify-center text-[#86868b]">Loading latest tech...</div>;
  return (
    <section className="py-16 md:py-24 bg-[#fbfbfd] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-10">
        <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
          The Latest. <span className="text-[#86868b]">Take a look at what’s new.</span>
        </h2>
      </div>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-8 px-6 md:px-20 pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {featured.map((item, index) => {
          const isFocused = activeIndex === index;
          return (
            <div 
              key={`${item.id}-${index}`} 
              className={`
                featured-card relative flex-shrink-0 
                w-[85vw] md:w-[400px] lg:w-[450px]
                h-[480px] md:h-[550px] 
                bg-white rounded-[32px] 
                p-8 flex flex-col items-center text-center
                snap-center transition-all duration-700 ease-in-out
                shadow-[0_4px_25px_rgba(0,0,0,0.03)]
                ${isFocused ? 'active-focus' : 'not-focused'}
              `}
            >
              
              <div className="w-full text-left mb-4">
                 <span className="text-[12px] font-bold uppercase tracking-wider text-[#0071e3]">
                    New Release
                 </span>
              </div>
              
              <Link to={`/product/${item.id}`} className="flex-1 flex items-center justify-center w-full group">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-[250px] object-contain transition-transform duration-500 group-hover:scale-110" 
                />
              </Link>
              
              <div className="w-full pt-6">
                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#1d1d1f] leading-tight mb-2 truncate">
                    {item.title}
                </h3>
                <p className="text-[#86868b] text-[15px] mb-4 line-clamp-1">{item.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-[19px] font-semibold text-[#1d1d1f]">${item.price}</span>
                  <button 
                    onClick={() => { 
                      addToCart({ ...item, quantity: 1 });  
                    }}
                    className="bg-[#0071e3] text-white px-6 py-2 rounded-full font-medium text-[14px] hover:bg-[#0077ed] active:scale-95 transition-all"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 767px) {
          .not-focused {
            opacity: 0.4;
            transform: scale(0.9);
            filter: grayscale(1);
          }
          .active-focus {
            opacity: 1;
            transform: scale(1);
            filter: grayscale(0);
          }
        }
        @media (min-width: 768px) {
          .featured-card:hover {
            box-shadow: 0 40px 80px rgba(0,0,0,0.08);
            transform: translateY(-10px);
          }
        }
      `}} />
    </section>
  );
};
export default FeaturedScroller;