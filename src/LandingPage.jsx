

import React, { useRef }  from "react";
import { motion,useScroll, useTransform  } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import bgImage from "./assets/Opendoor.png"; // 🔹 Replace with your actual image file path
import Allylogo from "./assets/ally logo.svg";
import { MicIcon, EyeOffIcon, ArrowLeft, ArrowRight } from "lucide-react";
const HeroSection = () => {
  return (
    <section className="relative flex flex-col min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: "brightness(1)",
        }}
      ></div>

      {/* Blue Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-500 opacity-40 blur-3xl"></div>
      </div>

      {/* Navigation with Animation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 py-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-3 sm:px-4 rounded-full h-8 flex items-center justify-center text-sm backdrop-blur-md"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            ⋯
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-3 sm:px-4 rounded-full h-8 flex items-center justify-center text-sm backdrop-blur-md"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            En / Fr
          </motion.button>
        </div>

        {/* Center Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <div className="shadow-md">
            <img src={Allylogo} alt="Ally Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <span className="hidden sm:inline text-xl sm:text-2xl font-bold text-black tracking-wide">
            ALLY AI
          </span>
        </motion.div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-3 sm:px-4 rounded-full h-8 flex items-center justify-center text-xs sm:text-sm backdrop-blur-md"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PhoneIcon className="w-4 h-4 text-white mr-1 sm:mr-2" />
            +233 894 566 7512
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-4 sm:px-6 rounded-full h-8 flex items-center justify-center text-xs sm:text-sm backdrop-blur-md"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            About Us
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 text-center">
        <motion.div
          className="backdrop-blur-sm rounded-3xl px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 shadow-2xl max-w-2xl sm:max-w-3xl md:max-w-5xl"
          style={{
            backgroundColor: "rgba(65, 124, 219, 0.25)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            Every voice deserves to be heard.
            <br className="hidden sm:block" />
            Every life deserves to be safe.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Gender-Based Violence (GBV) affects millions worldwide — women, men,
            boys, and girls. This isn’t just their story — it’s our shared
            responsibility.
          </motion.p>
        </motion.div>

        {/* Bottom Navigation Buttons */}
        <motion.div
          className="absolute bottom-10 sm:bottom-12 flex justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div
            className="flex items-center backdrop-blur-md rounded-full overflow-hidden"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-2 sm:py-3 hover:bg-white hover:bg-opacity-10 transition-all text-sm sm:text-base"
              style={{ color: "rgba(0, 0, 0, 0.41)" }}
            >
              <span className="text-lg sm:text-2xl">←</span>
              <span className="font-medium">Learn Their Stories</span>
            </motion.button>

            <div
              className="w-px h-6 sm:h-8"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
            ></div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-2 sm:py-3 hover:bg-white hover:bg-opacity-10 transition-all text-sm sm:text-base"
              style={{ color: "rgba(0, 0, 0, 0.41)" }}
            >
              <span className="font-medium">Take Action</span>
              <span className="text-lg sm:text-2xl">→</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// ServicesCards Component
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


// AmazingServices Component
// src/components/AmazingServices.jsx

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

// SupportSection Component

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
// PrivacySection Component
const PrivacySection = () => {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Are You Wondering?... Your Privacy. Our Promise</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          Your privacy is our top priority. We use industry-leading security measures to protect your personal information and ensure your conversations remain completely confidential.
        </p>
      </div>
    </div>
  );
}; 
// DataSecurity Component
const DataSecurity = () => {
  const securityFeatures = [
    {
      icon: "🛡️",
      title: "Using Data Responsibly To Improve Our AI",
      description: "We collect minimal data and use it solely to improve our AI's ability to support you better. Your conversations are never shared with third parties."
    },
    {
      icon: "🔍",
      title: "Research for Social Impact and Safety",
      description: "Anonymized data helps us understand mental health trends and improve our services. All research is conducted with strict ethical guidelines."
    },
    {
      icon: "🔐",
      title: "Confidentiality of Shared Stories",
      description: "Your stories remain completely confidential. We use enterprise-grade encryption to protect all communications on our platform."
    },
    {
      icon: "🚫",
      title: "No Collection of Personal Identifiable Information",
      description: "We don't collect unnecessary personal information. You can use our service anonymously without fear of being identified."
    },
    {
      icon: "🔒",
      title: "Strict Data Protection From Cybersecurity Concerns",
      description: "Our platform employs advanced cybersecurity measures including end-to-end encryption and regular security audits to keep your data safe."
    }
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-5xl">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// TrustedProfiles Component
const TrustedProfiles = () => {
  const profiles = [
    { name: "Dr. Sarah Johnson", role: "Clinical Psychologist", specialty: "Trauma & PTSD" },
    { name: "Dr. Michael Chen", role: "Psychiatrist", specialty: "Depression & Anxiety" },
    { name: "Dr. Emily Rodriguez", role: "Licensed Therapist", specialty: "Relationship Counseling" }
  ];

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Some Of Our Trusted Professional Profiles...</h2>
        <p className="text-center text-gray-600 mb-12">
          Connect with licensed professionals who are dedicated to supporting your mental health journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="text-8xl">👤</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                <p className="text-blue-600 font-semibold mb-1">{profile.role}</p>
                <p className="text-gray-600 text-sm">{profile.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ContactSection Component
const ContactSection = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Our Mission</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Crisis Support</a></li>
              <li><a href="#" className="hover:text-white">Counseling</a></li>
              <li><a href="#" className="hover:text-white">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Contact Us</h2>
            <button className="bg-white text-gray-900 p-4 rounded-full hover:bg-gray-100 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main LandingPage Component
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesCards />
      <AmazingServices />
      <SupportSection />
      <PrivacySection />
      <DataSecurity />
      <TrustedProfiles />
      <ContactSection />
    </div>
  );
};

export default LandingPage;