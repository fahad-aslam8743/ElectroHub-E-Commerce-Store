import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { EnvelopeIcon, ChatBubbleLeftRightIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onBlur" // Real-time validation for better UX
  });
  const contactMutation = useMutation({
    mutationFn: async (formData) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("ElectroHub API Call:", formData);
      return { success: true };
    },
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch.", {
        icon: '✉️',
        style: { borderRadius: '24px', background: '#1d1d1f', color: '#fff' }
      });
      reset();
    },
    onError: () => toast.error("Could not send. Check your connection.")
  });
  const onSubmit = (data) => contactMutation.mutate(data);
  const inputBaseClass = (error) => `
    w-full bg-[#f5f5f7] border-2 rounded-[18px] px-6 py-4 transition-all outline-none text-[17px]
    ${error ? 'border-red-400 focus:bg-white' : 'border-transparent focus:bg-white focus:border-[#0071e3] focus:shadow-sm'}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  return (
    <PageTransition>
      <div className="bg-white min-h-screen pt-20">
        
        <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[34px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight mb-4"
          >
            How can we help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[17px] md:text-[21px] text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a product question or need help with an order, we're here.
          </motion.p>
        </section>
        
        <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {supportCards.map((card, i) => (
            <div key={i} className="bg-[#f5f5f7] rounded-[32px] p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className={`${card.bg} ${card.color} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-[20px] font-semibold mb-2">{card.title}</h3>
              <p className="text-[15px] text-[#86868b] mb-6">{card.desc}</p>
              <button className="text-[#0066cc] font-semibold hover:underline">{card.action}</button>
            </div>
          ))}
        </section>
        
        <section className="bg-[#f5f5f7] py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex-1 bg-white rounded-[40px] p-8 md:p-14 shadow-sm">
              <h2 className="text-[28px] md:text-[32px] font-semibold mb-8 tracking-tight">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider ml-1">Full Name</label>
                    <input 
                      disabled={contactMutation.isPending}
                      {...register("fullName", { required: "Name is required" })}
                      className={inputBaseClass(errors.fullName)}
                      placeholder="John Doe" 
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      disabled={contactMutation.isPending}
                      {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                      className={inputBaseClass(errors.email)}
                      placeholder="name@example.com" 
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">Enter a valid email</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider ml-1">Message</label>
                  <textarea 
                    disabled={contactMutation.isPending}
                    {...register("message", { required: "Please enter your message", minLength: 10 })}
                    rows="5" 
                    className={`${inputBaseClass(errors.message)} resize-none`}
                    placeholder="How can we help?"
                  />
                </div>
                <button 
                  disabled={contactMutation.isPending}
                  className={`w-full md:w-auto px-12 py-4.5 rounded-full font-bold text-[17px] flex items-center justify-center gap-3 transition-all
                    ${contactMutation.isPending ? 'bg-gray-200 text-gray-500' : 'bg-[#0071e3] text-white hover:bg-[#0077ed] active:scale-95 shadow-lg shadow-blue-500/20'}`}
                >
                  {contactMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                  ) : "Send Message"}
                </button>
              </form>
            </motion.div>
            
            <div className="w-full lg:w-1/3 space-y-12">
              <div className="flex items-start gap-5">
                <div className="bg-white p-3 rounded-xl shadow-sm"><MapPinIcon className="h-6 w-6 text-red-500" /></div>
                <div>
                  <h3 className="text-[18px] font-semibold mb-2">Visit Lahore HQ</h3>
                  <p className="text-[#86868b] leading-relaxed">123 Innovation Drive, Lahore, PK</p>
                </div>
              </div>
              <div className="p-10 bg-white rounded-[32px] border border-gray-100 shadow-sm">
                <h4 className="text-[18px] font-semibold mb-3">Business Inquiries</h4>
                <p className="text-[15px] text-[#86868b]">Reach our corporate team at <span className="text-[#0071e3] font-medium">biz@electrohub.com</span></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
const supportCards = [
  { title: "Chat with us", desc: "Wait time: ~2 mins", icon: <ChatBubbleLeftRightIcon className="h-7 w-7" />, action: "Start Chat", color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Give us a call", desc: "Mon-Fri · 9am-6pm", icon: <PhoneIcon className="h-7 w-7" />, action: "1-800-MY-ELECTRO", color: "text-green-500", bg: "bg-green-50" },
  { title: "Email Support", desc: "Response within 24h", icon: <EnvelopeIcon className="h-7 w-7" />, action: "support@electrohub.com", color: "text-purple-500", bg: "bg-purple-50" }
];
export default Contact;