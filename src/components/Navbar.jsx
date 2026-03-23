import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBagIcon, HomeIcon, Square3Stack3DIcon, 
  EnvelopeIcon, ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { 
  HomeIcon as HomeSolid, Square3Stack3DIcon as ProductsSolid, 
  EnvelopeIcon as ContactSolid, ShoppingBagIcon as BagSolid
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { clearCart, cartCount } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  //  Safe User Logic
  const isLoggedIn = !!localStorage.getItem("userToken");
  const rawUserData = localStorage.getItem("userData");
  
  // Parse logic with safety
  const user = rawUserData && rawUserData !== "undefined" ? JSON.parse(rawUserData) : null;
  
  // Get first name safely from the parsed 'user' object
  const firstName = user?.name?.split(' ')[0] || "User";

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearCart(); 
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    toast.success("Signed out", {
      style: { borderRadius: '24px', background: '#1d1d1f', color: '#fff' }
    });
    navigate("/login"); 
  };

  const navLinks = [
    { path: "/", label: "Store", icon: HomeIcon, activeIcon: HomeSolid },
    { path: "/products", label: "Products", icon: Square3Stack3DIcon, activeIcon: ProductsSolid },
    { path: "/contact", label: "Support", icon: EnvelopeIcon, activeIcon: ContactSolid },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[110] bg-white/80 backdrop-blur-md border-b border-gray-200/50 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link to="/" className="text-[20px] font-bold text-[#1d1d1f] tracking-tighter">
            Electro<span className="text-[#0071e3]">Hub</span>
          </Link>
          
          <div className="flex items-center gap-10 text-[13px] font-medium">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`transition-all ${isActive(link.path) ? 'text-[#000]' : 'text-[#86868b] hover:text-[#000]'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                <span className="text-[14px] text-[#1d1d1f] font-semibold tracking-tight">
                  Hi, <span className="text-[#0071e3]">{firstName}</span>
                </span>
                <button onClick={handleLogout} title="Logout" className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-all group">
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[13px] font-bold text-[#0071e3] px-4 py-2 rounded-full hover:bg-blue-50 transition-all">
                Sign In
              </Link>
            )}
            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-[#f5f5f7] transition-all">
              <ShoppingBagIcon className="h-5 w-5 text-[#1d1d1f]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#0071e3] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      
      {/* --- MOBILE TOP BAR --- */}
      <div className="md:hidden fixed top-0 w-full z-[110] bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 h-[60px] flex items-center justify-between">
        <Link to="/" className="text-[18px] font-bold text-[#1d1d1f] tracking-tighter">
          Electro<span className="text-[#0071e3]">Hub</span>
        </Link>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#1d1d1f]">Hi, {firstName}</span>
              <button onClick={handleLogout} className="p-2 text-red-500 bg-red-50 rounded-full">
                <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-[12px] font-bold text-[#0071e3] bg-blue-50 px-4 py-1.5 rounded-full">
              Sign In
            </Link>
          )}
        </div>
      </div>
      
      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] z-[120]">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[24px] border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-2 py-1.5 flex items-center justify-around">
          {navLinks.map((link) => {
            const Active = link.activeIcon;
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link key={link.path} to={link.path} className="relative p-2.5 flex flex-col items-center gap-0.5 min-w-[60px]">
                {active && (
                  <motion.div 
                    layoutId="activeTabCircle"
                    className="absolute inset-0 bg-[#0071e3]/5 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {active ? <Active className="h-5 w-5 text-[#0071e3]" /> : <Icon className="h-5 w-5 text-[#86868b]" />}
                <span className={`text-[10px] font-bold ${active ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>{link.label}</span>
              </Link>
            );
          })}
          <Link to="/cart" className="relative p-2.5 flex flex-col items-center gap-0.5 min-w-[60px]">
            {isActive('/cart') && <motion.div layoutId="activeTabCircle" className="absolute inset-0 bg-[#0071e3]/5 rounded-xl" />}
            <div className="relative">
              {isActive('/cart') ? <BagSolid className="h-5 w-5 text-[#0071e3]" /> : <ShoppingBagIcon className="h-5 w-5 text-[#86868b]" />}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0071e3] text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-bold ${isActive('/cart') ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>Bag</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;