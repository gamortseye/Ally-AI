import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ServicesCards = () => {
  const cards = [
    {
      title: "GET PROFESSIONAL HELP",
      subtitle: "Connection to Professional Help:",
      description:
        "We connect survivors with verified counselors, legal professionals, and support centers that provide real, human assistance. Whether you're struggling with emotional abuse, unhealthy communication, or uncertainty in your relationship, our system helps you identify red flags and guides you toward healthy solutions.",
      bg: "bg-blue-200",
      textColor: "text-black",
      rotation: "md:-rotate-3",
    },
    {
      title: "EMOTIONAL SUPPORT",
      subtitle: "Emotional Support Through AI:",
      description:
        "Our AI assistant listens with empathy and provides comforting, non-judgmental responses 24/7 — helping you feel heard, understood, and supported at any moment.",
      bg: "bg-gray-400",
      textColor: "text-white",
      rotation: "md:rotate-2",
    },
    {
      title: "PSYCHOLOGICAL ADVICE",
      subtitle: "Psychological Support & Healing:",
      description:
        "Our AI companion and partner professionals offer tools, mindfulness exercises, and expert advice to support emotional recovery and mental well-being.",
      bg: "bg-gray-600",
      textColor: "text-white",
      rotation: "md:-rotate-2",
    },
    {
      title: "UNDERSTAND YOUR RIGHT",
      subtitle: "Legal Awareness & Rights Education:",
      description:
        "We help victims understand their rights under the law — simplifying legal terms and offering guidance on the steps to take for protection and justice.",
      bg: "bg-blue-200",
      textColor: "text-black",
      rotation: "md:rotate-3",
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: slight vertical translation on scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="w-full flex justify-center bg-white py-20 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="flex flex-wrap justify-center gap-10"
        transition={{ type: "spring", stiffness: 50 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`${card.bg} ${card.textColor} ${card.rotation}
                        flex-shrink-0 p-8 rounded-3xl shadow-lg 
                        hover:shadow-2xl transition-all transform 
                        hover:scale-105 md:hover:rotate-0`}
            style={{
              width: "250px",
              minHeight: "420px",
            }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 80 }}
            transition={{
              duration: 0.9,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          >
            <h3 className="font-bold text-xl mb-4 uppercase tracking-wide">
              {card.title}
            </h3>
            <div className="w-full h-px bg-current opacity-40 mb-6"></div>
            <h4 className="font-semibold text-base mb-4">{card.subtitle}</h4>
            <p className="text-sm leading-relaxed opacity-90">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
export default ServicesCards;