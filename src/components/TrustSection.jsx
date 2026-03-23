const partners = [
  { name: "Apple", color: "text-[#000000]" },
  { name: "Samsung", color: "text-[#034EA2]" },
  { name: "Xiaomi", color: "text-[#FF6700]" },
  { name: "Microsoft", color: "text-[#00A4EF]" },
  { name: "Intel", color: "text-[#0071C5]" },
  { name: "Sony", color: "text-[#000000]" },
  { name: "LG", color: "text-[#A50034]" },
  { name: "Dell", color: "text-[#0076CE]" },
  { name: "Nvidia", color: "text-[#76B900]" },
];
const TrustSection = () => {
  return (
    <section className="bg-white py-20 overflow-hidden relative border-b border-gray-50">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-container {
            display: flex;
            width: max-content;
            animation: scroll 35s linear infinite;
          }
          .animate-scroll-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-center text-[12px] font-bold text-[#86868b] uppercase tracking-[0.4em] opacity-70">
          Official Technology Partners
        </p>
      </div>
      <div className="relative flex items-center">
        
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="animate-scroll-container">
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center gap-16 md:gap-28 px-8">
              {partners.map((p, i) => (
                <span 
                  key={`${set}-${p.name}-${i}`} 
                  className={`
                    text-3xl md:text-5xl font-extrabold 
                    transition-all duration-500 
                    cursor-default tracking-tighter
                    opacity-60 hover:opacity-100 hover:scale-110
                    ${p.color}
                  `}
                >
                  {p.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrustSection;