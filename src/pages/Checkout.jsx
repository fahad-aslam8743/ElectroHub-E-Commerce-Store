import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import { CheckCircleIcon, ChevronLeftIcon, CreditCardIcon, BanknotesIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
const Checkout = () => {
  const { cartItems, clearCart, cartTotal } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange" // Real-time validation
  });
  const orderMutation = useMutation({
    mutationFn: async (orderData) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { id: `ORD-${Math.random().toString(36).substr(2, 7).toUpperCase()}` };
    },
    onSuccess: () => {
      setIsOrdered(true);
      clearCart();
      toast.success(`Order Placed!`);
    },
  });
  const onSubmit = (data) => {
    orderMutation.mutate({ ...data, items: cartItems, total: cartTotal, paymentMethod });
  };
  const ErrorMsg = ({ name }) => (
    <AnimatePresence>
      {errors[name] && (
        <motion.span 
          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-[11px] text-red-500 font-medium mt-1 ml-2 flex items-center gap-1"
        >
          <ExclamationCircleIcon className="h-3 w-3" /> {errors[name].message}
        </motion.span>
      )}
    </AnimatePresence>
  );
  const inputClass = (error) => `
    w-full bg-[#f5f5f7] border-2 px-4 py-3 rounded-[14px] outline-none text-[15px] transition-all
    ${error ? 'border-red-400 focus:bg-white' : 'border-transparent focus:bg-white focus:border-[#0071e3]'}
  `;
  if (isOrdered) {
    return (
      <PageTransition>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircleIcon className="w-10 h-10 stroke-[2]" />
          </motion.div>
          <h1 className="text-[32px] font-semibold mb-2">Thank you.</h1>
          <p className="text-[17px] text-[#86868b] mb-10">Your order is confirmed.</p>
          <Link to="/" className="bg-[#0071e3] text-white px-10 py-3 rounded-full font-bold text-[15px]">Continue Shopping</Link>
        </div>
      </PageTransition>
    );
  }
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-20 pb-10">
        <div className="max-w-[1060px] mx-auto px-5">
          <Link to="/cart" className="inline-flex items-center gap-1 text-[#0066cc] text-[14px] font-semibold mb-6 group">
            <ChevronLeftIcon className="h-3 w-3 stroke-[3]" /> Review Bag
          </Link>
          <div className="flex flex-col lg:flex-row gap-8">
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-8 order-2 lg:order-1">
              <section>
                <h2 className="text-[20px] font-semibold mb-5">Shipping Details</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input {...register("name", { required: "Name is required" })} placeholder="Full Name" className={inputClass(errors.name)} />
                    <ErrorMsg name="name" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input {...register("email", { 
                      required: "Email is required", 
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                    })} placeholder="Email" className={inputClass(errors.email)} />
                    <ErrorMsg name="email" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <input {...register("phone", { 
                      required: "Phone is required",
                      minLength: { value: 10, message: "Too short" }
                    })} placeholder="Phone" className={inputClass(errors.phone)} />
                    <ErrorMsg name="phone" />
                  </div>
                  <div className="col-span-2">
                    <input {...register("address", { required: "Address is required" })} placeholder="Street Address" className={inputClass(errors.address)} />
                    <ErrorMsg name="address" />
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-[20px] font-semibold mb-5">Payment</h2>
                <div className="flex gap-3 mb-4">
                  {['card', 'cod'].map((m) => (
                    <button key={m} type="button" onClick={() => setPaymentMethod(m)} className={`flex-1 py-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold text-[13px] transition-all ${paymentMethod === m ? "border-[#0071e3] bg-blue-50/30 text-[#0071e3]" : "border-gray-50 bg-[#f5f5f7] text-[#86868b]"}`}>
                      {m === 'card' ? <CreditCardIcon className="h-4 w-4" /> : <BanknotesIcon className="h-4 w-4" />} {m.toUpperCase()}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {paymentMethod === "card" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <input {...register("cardNum", { 
                          required: "Card number required",
                          pattern: { value: /^[0-9\s]*$/, message: "Numbers only" }
                        })} placeholder="Card Number" className={inputClass(errors.cardNum)} />
                        <ErrorMsg name="cardNum" />
                      </div>
                      <div>
                        <input {...register("expiry", { required: "Required" })} placeholder="MM/YY" className={inputClass(errors.expiry)} />
                        <ErrorMsg name="expiry" />
                      </div>
                      <div>
                        <input {...register("cvv", { required: "Required", maxLength: 3 })} placeholder="CVV" className={inputClass(errors.cvv)} />
                        <ErrorMsg name="cvv" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
              
              <div className="sticky bottom-4 lg:relative lg:bottom-0 z-10">
                 <button type="submit" disabled={orderMutation.isPending} className={`w-full py-3.5 md:py-4 rounded-xl font-bold text-[15px] md:text-[17px] transition-all flex items-center justify-center gap-2 shadow-lg ${orderMutation.isPending ? 'bg-gray-400' : 'bg-[#0071e3] text-white active:scale-[0.98] shadow-blue-500/20'}`}>
                  {orderMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : `Pay $${cartTotal.toLocaleString()}`}
                </button>
              </div>
            </form>
            
            <aside className="w-full lg:w-[340px] order-1 lg:order-2">
              <div className="bg-[#f5f5f7] p-5 rounded-[20px]">
                <h3 className="text-[17px] font-semibold mb-4">Summary</h3>
                <div className="space-y-3 mb-4 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.thumbnail} className="w-10 h-10 bg-white rounded-lg object-contain p-1" />
                      <div className="flex-1 min-w-0"><p className="text-[12px] font-bold truncate">{item.title}</p></div>
                      <p className="font-semibold text-[12px]">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                   <span className="text-[14px] text-gray-500 font-medium">Total</span>
                   <span className="text-[18px] font-bold">${cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Checkout;