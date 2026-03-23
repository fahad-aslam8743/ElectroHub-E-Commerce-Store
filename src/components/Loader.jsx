const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-white/50 backdrop-blur-sm">
      <div className="relative w-10 h-10">
        
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-[44.5%] top-0 w-[10%] h-[28%] bg-[#1d1d1f] rounded-full origin-[50%_175%] animate-apple-fade"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${-1.1 + i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <p className="mt-8 text-[15px] font-medium text-[#86868b] tracking-tight">
        Just a moment.
      </p>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes apple-fade {
          from { opacity: 1; }
          to { opacity: 0.1; }
        }
        .animate-apple-fade {
          animation: apple-fade 1.2s linear infinite;
        }
      `}} />
    </div>
  );
};
export default Loader;