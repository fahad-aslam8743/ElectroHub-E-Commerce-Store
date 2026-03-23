const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[32px] p-4 md:p-6 border border-gray-200 shadow-sm overflow-hidden relative">
      
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-200/50 to-transparent z-10" />
      
      <div className="w-full aspect-square bg-[#e5e5e7] rounded-[24px] mb-6 shadow-inner"></div>
      
      <div className="space-y-4 px-2">
        
        <div className="h-3 bg-[#d2d2d7] rounded-full w-1/3 opacity-70"></div>
        
        <div className="space-y-2">
          <div className="h-5 bg-[#d2d2d7] rounded-full w-full"></div>
          <div className="h-5 bg-[#d2d2d7] rounded-full w-4/5"></div>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          
          <div className="h-6 bg-[#d2d2d7] rounded-full w-1/4"></div>
          
          <div className="h-11 w-11 bg-[#1d1d1f]/10 rounded-full border-2 border-[#d2d2d7]"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
export default ProductSkeleton;