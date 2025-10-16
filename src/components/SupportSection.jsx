import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";


const SupportSection = () => {
  const ref = useRef(null);

  // Scroll tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth parallax transforms
  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const profileY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0.8, 1, 1, 0.9]);

  return (
    <motion.section
      ref={ref}
      className="bg-[#4178E1] w-full text-white py-24 px-6 md:px-16 overflow-hidden"
      style={{ opacity }}
    >
      {/* Quote + Text Section */}
      <div className="max-w-5xl mx-auto">
        {/* Big left-aligned quote mark with parallax */}
        <motion.div
          className="text-[300px] font-bold leading-none text-white -mb-24 text-left select-none"
          style={{ y: quoteY }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          “
        </motion.div>

        {/* Main quote */}
        <motion.div style={{ y: textY }}>
          <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6">
            How many stories of pain are left untold?
          </h2>
          <p className="text-lg leading-relaxed text-white/90 text-center mb-4">
            From that question grew a movement — a platform dedicated to helping survivors of
            Gender-Based Violence (GBV) speak, heal, and be heard.
          </p>
          <p className="text-lg leading-relaxed text-white/90 text-center">
            We believe GBV is not just a women’s issue or a men’s issue — it’s a human issue that
            demands empathy, action, and accountability.”
          </p>
        </motion.div>
      </div>

      {/* Profile + Arrows + Avatar */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-right justify-between mt-12 px-4 md:translate-x-20"
        style={{ y: profileY }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Profile Info */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1603415526960-f7e0328b3c49?auto=format&fit=crop&w=80&q=80"
            alt="Evans"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-white/80 text-xs md:text-sm">CEO</p>
            <p className="text-white/80 font-light text-sm md:text-base">Evans</p>
          </div>
        </motion.div>

        {/* Arrows + Avatar */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 mt-10 md:mt-0 scale-90 md:scale-100"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Arrows */}
          <div className="flex gap-4 md:gap-6">
            <button className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-110 duration-300">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-110 duration-300">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Avatar with floating motion */}
          <motion.div
            className="bg-[#A8F28C] p-6 md:p-9 rounded-2xl shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="Avatar Icon"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
export default SupportSection;