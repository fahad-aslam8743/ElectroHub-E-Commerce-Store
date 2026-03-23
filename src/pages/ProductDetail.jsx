import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { api, fetchElectronics } from "../api/axiosInstance";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { TruckIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
  const { data: allProducts } = useQuery({
    queryKey: ["electronics"],
    queryFn: fetchElectronics,
    enabled: !!product,
    staleTime: 1000 * 60 * 30,
  });
  const handlePrefetch = (productId) => {
    queryClient.prefetchQuery({
      queryKey: ["product", String(productId)],
      queryFn: async () => {
        const { data } = await api.get(`/products/${productId}`);
        return data;
      },
      staleTime: 1000 * 60 * 10,
    });
  };
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      window.scrollTo({ top: 0, behavior: 'instant' }); 
    }
  }, [product]);
  const similarProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 8); // Taking 8 to perfectly fill 4x4 or 2x2 rows
  if (isLoading) return <Loader />;
  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        
        <div className="sticky top-[72px] w-full z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 hidden md:block">
          <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
            <h2 className="text-[18px] font-bold text-[#1d1d1f] tracking-tight">{product.title}</h2>
            <div className="flex items-center gap-6">
              <span className="text-[16px] font-semibold text-[#1d1d1f]">${product.price}</span>
              <button 
                onClick={() => { addToCart(product); toast.success("Added to Bag!"); }}
                className="bg-[#0071e3] text-white px-6 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#0077ed] transition-all"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            
            <div className="w-full lg:w-[60%]">
              <div className="lg:sticky lg:top-48">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-[#f5f5f7] rounded-[32px] overflow-hidden p-8 md:p-20 aspect-square flex items-center justify-center"
                >
                  <img src={selectedImage || product.thumbnail} className="max-h-full max-w-full object-contain mix-blend-multiply" alt={product.title} />
                </motion.div>
                <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar justify-start md:justify-center">
                  {product.images?.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(img)} className={`h-16 w-16 flex-shrink-0 rounded-xl bg-[#f5f5f7] p-2 border-2 transition-all ${selectedImage === img ? 'border-[#0071e3]' : 'border-transparent'}`}>
                      <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-[40%]">
              <span className="text-[#bf4800] text-[13px] font-bold uppercase tracking-widest">In Stock</span>
              <h1 className="text-[34px] md:text-[52px] font-semibold text-[#1d1d1f] leading-tight tracking-tight mt-2">{product.title}</h1>
              <p className="text-[20px] md:text-[24px] text-[#1d1d1f] font-medium mt-4">${product.price}</p>
              <div className="mt-10 space-y-8">
                <div className="bg-[#f5f5f7] p-6 rounded-[24px]">
                  <h3 className="text-[17px] font-bold text-[#1d1d1f] mb-3">About this item</h3>
                  <p className="text-[15px] text-[#424245] leading-relaxed font-medium">{product.description}</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100">
                  <TruckIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-[14px] font-medium text-[#1d1d1f]">Fast, free delivery on every order.</span>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => { addToCart(product); toast.success("Added to Bag!"); }} className="w-full bg-[#0071e3] text-white py-4 md:py-5 rounded-2xl font-bold text-[17px] shadow-lg shadow-blue-500/20">
                  Add to Bag
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {similarProducts?.length > 0 && (
          <section className="bg-[#f5f5f7] py-20 md:py-32 mt-16">
            <div className="max-w-[1200px] mx-auto px-6 mb-12">
              <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] tracking-tight text-center md:text-left">Complete the set.</h2>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {similarProducts.map((item) => (
                <motion.div 
                  key={item.id}
                  onMouseEnter={() => handlePrefetch(item.id)}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] flex flex-col group transition-all border border-transparent hover:border-gray-200"
                >
                  <Link to={`/product/${item.id}`} className="flex-1">
                    <div className="h-32 md:h-48 w-full flex items-center justify-center mb-4">
                      <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-[13px] md:text-[17px] font-bold text-[#1d1d1f] mb-1 line-clamp-1">{item.title}</h3>
                    <p className="hidden md:block text-[13px] text-[#86868b] line-clamp-2 font-medium mb-4">{item.description}</p>
                  </Link>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto pt-4 border-t border-gray-50 gap-2">
                    <span className="text-[15px] md:text-[18px] font-bold text-[#1d1d1f]">${item.price}</span>
                    <button 
                      onClick={() => { addToCart({ ...item, quantity: 1 }); toast.success("Added!"); }}
                      className="bg-[#f5f5f7] text-[#0071e3] hover:bg-[#0071e3] hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[11px] md:text-[12px] transition-all"
                    >
                      Buy
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};
export default ProductDetail;