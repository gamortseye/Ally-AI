import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MicIcon, EyeOffIcon } from "lucide-react";

const AmazingServices = () => {
  const sectionRef = useRef(null);

  // Track scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Apply subtle parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9]);

  const services = [
    {
      id: "01",
      icon: <MicIcon className="w-7 h-7 text-black" />,
      title: "Voice to Feel — Speak, Don’t Type",
      subtitle: "Because emotions are better spoken than typed.",
      description:
        "Our advanced speech recognition (ASR) lets you talk directly to the AI, expressing your thoughts and emotions in your own voice. The system listens, understands, and responds with empathy — creating a more human, healing conversation.",
      label: "Voice",
    },
    {
      id: "02",
      icon: <EyeOffIcon className="w-7 h-7 text-black" />,
      title: "Anonymous Support Through Avatar Identity",
      subtitle: "Your story, your safety, your control",
      description:
        "Choose an avatar that represents you and talk freely without revealing your real identity. Our platform ensures full privacy, so you can express your emotions safely and honestly — without fear or judgment.",
      label: "Anonymous",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 bg-white text-gray-800 overflow-hidden"
      style={{ y, opacity }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-20 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="inline-block border border-gray-300 shadow-sm shadow-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm mb-6 backdrop-blur-sm">
          features
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Explore The Amazing Features Ally AI Provides
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          In a world where silence often hides pain, our AI was built to listen —
          not to judge, but to understand. It doesn’t replace a human voice, but
          it becomes one when no one else is there to hear yours.
        </p>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Through intelligent conversation, our system recognizes emotion,
          offers comfort, and guides survivors toward the right kind of help —
          from professional counseling to legal awareness.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="px-6 py-12 flex flex-col items-center text-center md:items-start md:text-left"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            style={{
              y: useTransform(scrollYProgress, [0, 1], [index === 0 ? 30 : -30, index === 0 ? -30 : 30]),
            }}
          >
            {/* Icon + Label + Vertical Line */}
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                  {service.icon}
                </div>
                <span className="text-blue-600 font-medium">{service.label}</span>
              </div>
              <div className="h-10 w-[2px] bg-black ml-90"></div>
            </div>

            {/* Superscript ID on the Left Side of the Title */}
            <div className="flex items-start justify-center md:justify-start gap-1 mb-2">
              <sup className="text-gray-400 text-sm font-semibold translate-y-[-6px]">
                {service.id}
              </sup>
              <h3 className="text-2xl font-bold">{service.title}</h3>
            </div>

            <p className="text-gray-700 font-medium mb-4">{service.subtitle}</p>
            <p className="text-gray-500 leading-relaxed mb-8">{service.description}</p>

            <motion.div
              className="w-full flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button className="border border-gray-300 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-100 transition">
                Learn more
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
export default AmazingServices;