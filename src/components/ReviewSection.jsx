import React, { useRef, useEffect, useState } from 'react';
const reviews = [
  { id: 1, name: "John Doe", role: "Photographer", text: "The MacBook Pro display is simply unrivaled. Editing 4K video is a breeze now.", initial: "JD" },
  { id: 2, name: "Lily Park", role: "UI Designer", text: "Incredible battery life and the sleekest design I've ever owned.", initial: "LP" },
  { id: 3, name: "Marcus Chen", role: "Developer", text: "The M3 chip handles everything I throw at it. No more fan noise.", initial: "MC" },
  { id: 4, name: "Sarah Jenkins", role: "Vlogger", text: "The camera and mic quality mean I can record high-quality content on the go.", initial: "SJ" },
  { id: 5, name: "David Smit", role: "Student", text: "Perfect for university. Lightweight enough for my bag, powerful for my projects.", initial: "DS" },
  { id: 6, name: "Elena Rossi", role: "Architect", text: "Rendering 3D models is 2x faster than my old workstation. Truly impressed.", initial: "ER" },
  { id: 7, name: "Tom Wilson", role: "Music Producer", text: "Zero latency when running 50+ tracks in Logic Pro. A total beast.", initial: "TW" },
  { id: 8, name: "Aisha Khan", role: "Data Scientist", text: "Training local ML models is surprisingly fast. Best laptop I've used.", initial: "AK" }
];
const ReviewSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      let scrollTo;
      if (direction === 'right') {
        scrollTo = scrollLeft + clientWidth >= scrollWidth - 10 ? 0 : scrollLeft + clientWidth / 1.2;
      } else {
        scrollTo = scrollLeft - clientWidth / 1.2;
      }
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    if (isPaused) return; // Stop timer if user is hovering
    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Scrolls every 4 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPaused]);
  return (
    <section className="bg-[#f5f5f7] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-[40px] md:text-[56px] font-black text-[#1d1d1f] tracking-tight leading-tight">
            Loved by creators <br /> everywhere.
          </h2>
          <div className="hidden md:flex gap-4 mb-4">
            <button 
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm active:scale-90"
            >
              <span className="text-2xl">‹</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm active:scale-90"
            >
              <span className="text-2xl">›</span>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)} // Pause on PC
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)} // Pause on Mobile touch
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar flex-nowrap"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {reviews.map((r) => (
            <div 
              key={r.id} 
              className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 flex flex-col justify-between"
            >
              <p className="text-[#1d1d1f] text-lg md:text-xl leading-relaxed mb-10 font-medium italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#f5f5f7] flex items-center justify-center font-bold text-[#0071e3] text-sm">
                  {r.initial}
                </div>
                <div>
                  <h4 className="font-bold text-[#1d1d1f] text-[15px]">{r.name}</h4>
                  <p className="text-sm text-[#86868b] font-medium">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};
export default ReviewSection;