import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchElectronics, api } from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { MagnifyingGlassIcon, ArrowsUpDownIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const queryClient = useQueryClient();
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  const { data: products, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchElectronics,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
  const prefetchProduct = (id) => {
    queryClient.prefetchQuery({
      queryKey: ["product", String(id)],
      queryFn: async () => {
        const { data } = await api.get(`/products/${id}`);
        return data;
      },
      staleTime: 1000 * 60 * 10,
    });
  };
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter((p) => 
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, debouncedSearch, sortBy]);
  if (isError) return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaceFrownIcon className="h-10 w-10" />
          </motion.div>
          <h2 className="text-[28px] font-bold text-[#1d1d1f]">System offline.</h2>
          <button onClick={() => refetch()} className="mt-8 bg-[#0071e3] text-white px-8 py-3 rounded-full font-bold">Try Again</button>
        </div>
      </div>
    </PageTransition>
  );
  return (
    <PageTransition>
      <div className="bg-[#f5f5f7] min-h-screen pt-20 md:pt-32 pb-20">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6">
          
          <header className="mb-8 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-[32px] md:text-[64px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Store. <span className="text-[#86868b]">The best way to buy tech.</span>
              </h1>
            </motion.div>
          </header>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 md:mb-16">
            <div className="relative w-full md:max-w-[400px] group">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#86868b]" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-white border-none pl-12 pr-4 py-3.5 md:py-4.5 rounded-[16px] md:rounded-[20px] outline-none text-[16px] shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="relative w-full md:w-auto">
              <select 
                className="w-full md:w-[220px] appearance-none bg-white border-none pl-5 pr-12 py-3.5 md:py-4.5 rounded-[16px] md:rounded-[20px] outline-none text-[15px] font-bold text-[#1d1d1f] shadow-sm cursor-pointer"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ArrowsUpDownIcon className="h-4 w-4 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#86868b]" />
            </div>
          </div>
          
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <motion.div key={`skel-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => prefetchProduct(item.id)}
                  >
                    <ProductCard product={item} />
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                  <MagnifyingGlassIcon className="h-12 w-12 text-[#d2d2d7] mx-auto mb-4" />
                  <h3 className="text-[18px] font-semibold">No results for "{searchTerm}"</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        input::placeholder { color: #a1a1a6; }
        .py-4\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </PageTransition>
  );
};
export default ProductsPage;