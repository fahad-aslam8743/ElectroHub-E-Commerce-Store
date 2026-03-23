import { 
  TruckIcon, 
  ArrowPathIcon, 
  ShieldCheckIcon, 
  ChatBubbleLeftRightIcon 
} from "@heroicons/react/24/outline";
const features = [
  {
    icon: TruckIcon,
    title: "Free Delivery",
    desc: "Order by 5pm and get it tomorrow.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: ShieldCheckIcon,
    title: "2-Year Warranty",
    desc: "Official brand protection on every purchase.",
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    icon: ArrowPathIcon,
    title: "Easy Returns",
    desc: "Not a fan? Send it back, no questions asked.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Expert Support",
    desc: "24/7 live assistance from real techies.",
    color: "text-teal-600",
    bg: "bg-teal-50"
  }
];
const mobileBadges = [
  "Verified by Visa", "Mastercard Secure", "Norton Secured", "PCI Compliant", "Google Pay", "Apple Pay"
];
const pcBadges = [
  "Verified by Visa", "Mastercard Secure", "Norton Secured", "PCI Compliant"
];
const OffersBanner = () => {
  return (
    <section className="bg-[#f5f5f7] py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20">
        
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-[28px] md:text-[48px] font-bold text-[#1d1d1f] tracking-tight px-4 leading-tight">
            The ElectroHub Difference.
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[21px] mt-3 font-medium px-6">
            Premium service for premium technology.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {features.map((item, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center p-5 md:p-10 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100"
            >
              <div className={`mb-4 md:mb-8 p-4 md:p-6 rounded-full ${item.bg} ${item.color} transition-transform duration-500 group-hover:scale-110`}>
                <item.icon className="h-7 w-7 md:h-12 md:w-12 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] md:text-[21px] font-bold text-[#1d1d1f] mb-1 md:mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="hidden sm:block text-[#86868b] text-[13px] md:text-[15px] leading-relaxed font-medium px-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 overflow-hidden relative">
        
        <div className="md:hidden flex animate-mobile-only-marquee whitespace-nowrap grayscale opacity-30 mask-fade">
          {[...mobileBadges, ...mobileBadges].map((badge, index) => (
            <span key={index} className="mx-8 text-[11px] font-black tracking-widest uppercase">
              {badge}
            </span>
          ))}
        </div>
        
        <div className="hidden md:flex justify-center items-center gap-16 grayscale opacity-30">
          {pcBadges.map((badge, index) => (
            <span key={index} className="text-sm font-black tracking-widest uppercase">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 767px) {
          .animate-mobile-only-marquee {
            display: flex;
            width: fit-content;
            animation: marqueeScroll 20s linear infinite;
          }
          .mask-fade {
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        }
        @media (min-width: 768px) {
          .animate-mobile-only-marquee {
            animation: none !important;
            transform: none !important;
          }
        }
      `}} />
    </section>
  );
};
export default OffersBanner;