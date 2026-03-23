import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon } from "@heroicons/react/24/solid";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onBlur" // Validate jab user input field se bahar click kare
  });
  const authMutation = useMutation({
    mutationFn: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      const users = JSON.parse(localStorage.getItem("electroUsers") || "[]");
      if (isLogin) {
        const user = users.find(u => u.email === data.email && u.password === data.password);
        if (user || data.email === "admin@electrohub.com") {
          return { 
            name: user ? user.fullName : "Premium User", 
            email: data.email,
            token: `session_${Math.random().toString(36).substr(2, 9)}`
          };
        }
        throw new Error("Invalid ElectroHub ID or password.");
      } else {
        if (users.some(u => u.email === data.email)) {
          throw new Error("This ElectroHub ID is already in use.");
        }
        const newUser = { fullName: data.fullName, email: data.email, password: data.password };
        users.push(newUser);
        localStorage.setItem("electroUsers", JSON.stringify(users));
        return { signup: true };
      }
    },
    onSuccess: (userData) => {
      if (userData.signup) {
        toast.success("Account created! Welcome.");
        setIsLogin(true);
        reset();
      } else {
        localStorage.setItem("userToken", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData));
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(`Welcome back, ${userData.name.split(' ')[0]}`, {
          icon: '',
          style: { borderRadius: '20px', background: '#1d1d1f', color: '#fff' }
        });
        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 1000);
      }
    },
    onError: (error) => toast.error(error.message)
  });
  const onSubmit = (data) => authMutation.mutate(data);
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white pb-20">
        <motion.div layout className="w-full max-w-[380px]">
          <div className="flex flex-col items-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} className="w-20 h-20 bg-[#1d1d1f] rounded-[22%] flex items-center justify-center shadow-2xl shadow-black/20">
              <BoltIcon className="h-10 w-10 text-[#0071e3]" />
            </motion.div>
            <h1 className="mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#1d1d1f]">
              Electro<span className="text-[#0071e3]">Hub</span>
            </h1>
          </div>
          <div className="text-center mb-10">
            <h2 className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight mb-3">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-[#86868b] text-[17px] leading-snug">
              {isLogin ? "Use your ElectroHub ID to sign in." : "Start your journey with premium tech."}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="popLayout">
              
              {!isLogin && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <input 
                    {...register("fullName", { 
                      required: "Name is required",
                      minLength: { value: 3, message: "Name must be at least 3 characters" }
                    })} 
                    placeholder="Full Name"
                    className={`auth-input ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-[#d2d2d7]'}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-[12px] mt-1 ml-1 font-medium">{errors.fullName.message}</p>}
                </motion.div>
              )}
              
              <motion.div layout>
                <input 
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address"
                    }
                  })} 
                  type="email" 
                  placeholder="Email Address"
                  className={`auth-input ${errors.email ? 'border-red-500 bg-red-50' : 'border-[#d2d2d7]'}`}
                />
                {errors.email && <p className="text-red-500 text-[12px] mt-1 ml-1 font-medium">{errors.email.message}</p>}
              </motion.div>
              
              <motion.div layout>
                <input 
                  {...register("password", { 
                    required: "Password is required", 
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })} 
                  type="password" 
                  placeholder="Password"
                  className={`auth-input ${errors.password ? 'border-red-500 bg-red-50' : 'border-[#d2d2d7]'}`}
                />
                {errors.password && <p className="text-red-500 text-[12px] mt-1 ml-1 font-medium">{errors.password.message}</p>}
              </motion.div>
            </AnimatePresence>
            <div className="pt-4">
              <button 
                disabled={authMutation.isPending}
                className={`w-full py-4 rounded-xl font-semibold text-[17px] transition-all flex items-center justify-center gap-3
                  ${authMutation.isPending ? 'bg-[#f5f5f7] text-[#86868b]' : 'bg-[#0071e3] text-white hover:bg-[#0077ed] active:scale-[0.98]'}`}
              >
                {authMutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-[#86868b] border-t-transparent rounded-full animate-spin" />
                ) : (isLogin ? "Sign In" : "Create Account")}
              </button>
            </div>
          </form>
          <div className="mt-12 text-center border-t border-[#d2d2d7] pt-8">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); reset(); }} 
              className="text-[#0066cc] text-[15px] hover:underline"
            >
              {isLogin ? "Don’t have an ID? Create one now." : "Already have an ID? Sign in here."}
            </button>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        .auth-input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid;
          outline: none;
          font-size: 17px;
          background: #f5f5f7;
          transition: all 0.2s ease;
        }
        .auth-input:focus {
          background: white;
          border-color: #0071e3;
          box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
        }
      `}</style>
    </PageTransition>
  );
};
export default Login;