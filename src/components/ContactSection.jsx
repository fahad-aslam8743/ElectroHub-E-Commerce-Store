import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true); 
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("ElectroHub Form Submission:", data);
    
    toast.success("Message sent! We'll be in touch.", {
      style: {
        borderRadius: '24px',
        background: '#1d1d1f',
        color: '#fff',
      },
    });

    setIsSubmitting(false);
    reset();
  };

  const inputClass = (error) => `
    w-full bg-[#f5f5f7] text-[#1d1d1f] rounded-2xl p-5 outline-none border-2 transition-all 
    placeholder:text-[#86868b] font-medium text-[16px] md:text-[17px]
    ${error ? 'border-red-500 focus:bg-[#fff2f2]' : 'border-transparent focus:border-[#0071e3] focus:bg-white'}
  `;

  return (
    <section className="bg-white py-20 md:py-32 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[38px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-5">
            Get in touch.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[18px] md:text-[21px] text-[#86868b] font-medium max-w-xl mx-auto leading-relaxed">
            Have a question about our products or an order? <br className="hidden md:block" /> 
            Send us a message and we'll get back to you.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <input 
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                  disabled={isSubmitting}
                  className={inputClass(errors.name)}/>
                {errors.name && <p className="text-red-500 text-xs ml-4 font-semibold">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <input 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  placeholder="Email Address"
                  disabled={isSubmitting}
                  className={inputClass(errors.email)}/>
                {errors.email && <p className="text-red-500 text-xs ml-4 font-semibold">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <textarea 
                {...register("message", { required: "Please enter your message", minLength: { value: 10, message: "Message is too short" } })}
                placeholder="How can we help?"
                disabled={isSubmitting}
                className={`${inputClass(errors.message)} h-40 md:h-52 resize-none`}/>
              {errors.message && <p className="text-red-500 text-xs ml-4 font-semibold">{errors.message.message}</p>}
            </div>
            
            <div className="flex justify-center pt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto min-w-[220px] bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold py-4 px-12 rounded-full text-[17px] transition-all active:scale-95 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}>
                
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;