

import React, { useRef, useState, useEffect }  from "react";
import { motion,useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import bgImage from "./assets/Opendoor.png"; // 🔹 Replace with your actual image file path
import Allylogo from "./assets/ally logo.svg";
import { MicIcon, EyeOffIcon, ArrowLeft, ArrowRight } from "lucide-react";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import img5 from "./assets/5.png";
import img12 from "./assets/pro1.png";
import img22 from "./assets/pro2.png";
import img32 from "./assets/pro3.png";
import img42 from "./assets/pro4.png";
import img52 from "./assets/pro5.png";
import allyLogo from "./assets/ally logo.svg"; 
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
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
    <section className="bg-white py-24 px-6 md:px-16 text-gray-800">
      {/* Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="inline-block border border-gray-300 shadow-sm shadow-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm mb-6 backdrop-blur-sm">
          Privacy & Data Protection
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Are You Wondering? … Your Privacy, Our Promise
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We believe trust is the foundation of healing. Every conversation, every emotion, and
          every story shared here is safeguarded with care, respect, and technology that puts your
          privacy first.
        </p>
      </motion.div>

      <DataSecurity />
    </section>
  );
};

const DataSecurity = () => {
  const features = [
    {
      label: "Data",
      title: "Using Data Responsibly to Improve Our AI",
      description:
        "We use anonymous responses and chat interactions solely to make our AI more understanding, accurate, and supportive. Every piece of information helps the system learn how to respond better — without linking your identity to your conversations.",
      image: img1,
    },
    {
      label: "Research",
      title: "Research for Social Impact and Safety",
      description:
        "Some anonymized data may be analyzed for research and educational purposes, aimed at improving gender-based violence awareness, emotional support systems, and technology for social good. Your personal identity is never attached to this research.",
      image: img2,
    },
    {
      label: "Confidentiality",
      title: "Confidentiality of Shared Stories",
      description:
        "Stories, experiences, or testimonials shared within our platform are never posted or shared publicly — not on social media, not in the media, and not with any external organization. Your voice belongs to you alone.",
      image: img3,
    },
    {
      label: "Integrity",
      title: "No Collection of Personal Identifiable Information",
      description:
        "We do not collect names, addresses, phone numbers, or any personally identifying details. Your conversations remain private, and your anonymity is fully protected at every stage.",
      image: img4,
    },
    {
      label: "Availability",
      title: "Strong Encryption and Secure Communication",
      description:
        "We use advanced cryptographic algorithms and secure network protocols to protect every interaction. Our platform ensures a safe, encrypted connection between you and our system — keeping your data and privacy fully protected.",
      image: img5,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-24">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className={`flex flex-col md:flex-row items-center ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } gap-10 md:gap-20`}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Text Section */}
          <div
            className={`flex-1 relative flex items-start ${
              index % 2 === 0 ? "justify-end md:pr-10" : "justify-start md:pl-7"
            }`}
          >
            {/* Vertical Line */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 h-16 w-[2px] bg-black ${
                index % 2 === 0 ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
              }`}
            ></div>

            {/* Text Content */}
            <div className="max-w-md">
              <span className="text-blue-600 font-medium text-sm mb-2 block">
                {feature.label}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center md:justify-center">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// TrustedProfiles Component

const TrustedProfiles = () => {
  const profiles = [
    { name: "Dr. Wallace", role: "Clinical Psychologist", image: img22 },
    { name: "Dr. Grace Mensah", role: "Therapist", image: img12 },
    { name: "Dr. Kwame Boateng", role: "Legal Counselor", image: img32 },
    { name: "Dr. Akua Asante", role: "Family Therapist", image: img42 },
    { name: "Dr. Mabel Owusu", role: "Trauma Specialist", image: img52 },
  ];

  const [index, setIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false); // hover/touch active
  const containerRef = useRef(null);
  const lastChangeRef = useRef(0);
  const autoRef = useRef(null);

  const xPositions = [-400, -250, 0, 250, 400];

  // Auto spin every 5s, pauses when interacting
  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (!isInteracting) {
      autoRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % profiles.length);
      }, 5000);
    }
    return () => clearInterval(autoRef.current);
  }, [isInteracting, profiles.length]);

  // helper: try to change index with cooldown to avoid jitter
  const tryChange = (direction) => {
    const now = Date.now();
    if (now - lastChangeRef.current < 500) return; // 500ms cooldown
    lastChangeRef.current = now;
    setIndex((prev) =>
      direction === "next" ? (prev + 1) % profiles.length : (prev - 1 + profiles.length) % profiles.length
    );
  };

  // pointer-based hover: when cursor over shadow area, determine left/right
  const onShadowMove = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const delta = clientX - centerX;

    // threshold, so small movements don't trigger
    const threshold = Math.max(40, rect.width * 0.06);

    if (delta > threshold) tryChange("next");
    else if (delta < -threshold) tryChange("prev");
  };

  // desktop mouse move handler
  const handleMouseMove = (e) => {
    setIsInteracting(true);
    onShadowMove(e.clientX);
  };

  // desktop enter/leave
  const handleMouseEnter = () => {
    setIsInteracting(true);
  };
  const handleMouseLeave = () => {
    setIsInteracting(false);
  };

  // touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsInteracting(true);
    if (e.touches && e.touches[0]) onShadowMove(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) onShadowMove(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  return (
    <section className="bg-white py-24 text-gray-800 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block border border-gray-300 shadow-sm text-gray-700 px-4 py-1 rounded-full text-sm mb-6 backdrop-blur-sm">
          Professionals
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Some Of Our Trusted Professional Profiles....
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We work with a network of verified psychologists, legal experts, and
          relationship counselors dedicated to supporting survivors with care
          and confidentiality. Each professional brings compassion and
          expertise to help you heal emotionally, understand your rights, and
          make informed decisions.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full flex items-center justify-center"
        ref={containerRef}
      >
        {/* Cards container - no drag now */}
        <motion.div
          className="relative w-[950px] h-[400px] flex items-center justify-center"
          // keep cursor feedback for desktop when hovering the shadow area
          role="presentation"
        >
          <AnimatePresence initial={false}>
            {profiles.map((profile, i) => {
              const position = (i - index + profiles.length) % profiles.length;

              const layout = {
                0: { scale: 0.6, x: xPositions[0], opacity: 0.2, z: 0 },
                1: { scale: 0.8, x: xPositions[1], opacity: 0.5, z: 1 },
                2: { scale: 1.0, x: xPositions[2], opacity: 1.0, z: 5 },
                3: { scale: 0.8, x: xPositions[3], opacity: 0.5, z: 1 },
                4: { scale: 0.6, x: xPositions[4], opacity: 0.2, z: 0 },
              };

              const { scale, x, opacity, z } = layout[position] || layout[0];

              const isActive = position === 2;
              const isFar = position === 0 || position === 4;

              return (
                <motion.div
                  key={profile.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity, scale, x }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.9,
                  }}
                  className="absolute rounded-3xl overflow-hidden bg-gray-200"
                  style={{
                    width: 280,
                    height: 360,
                    zIndex: z,
                    boxShadow: "0 40px 70px rgba(0,0,0,0.18)",
                    willChange: "transform, opacity",
                  }}
                >
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Info slides in only for active card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-3xl"
                      >
                        <h3 className="text-lg font-semibold">{profile.name}</h3>
                        <p className="text-sm opacity-90">{profile.role}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Inactive overlays */}
                  {!isActive && (
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: isFar ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)",
                      }}
                      transition={{ duration: 0.45 }}
                      className="absolute inset-0"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Soft shadow under entire carousel - this is the interactive area */}
        <div
          className="absolute bottom-[-40px] w-[900px] h-[120px] rounded-full"
          style={{ filter: "blur(36px)", background: "rgba(0,0,0,0.20)" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </section>
  );
};
// ContactSection Component

const columnData = [
  {
    title: "Explore",
    links: ["About Us", "Contact", "Stories", "Privacy"],
  },
  {
    title: "Resources",
    links: ["Blog", "Best practices", "Support"],
  },
  {
    title: "Companies with Us",
    links: [
      "UI design",
      "UX design",
      "Wireframing",
      "Diagramming",
      "Brainstorming",
      "Online whiteboard",
      "Team collaboration",
    ],
  },
];

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const ContactSection = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-800/95 to-black rounded-t-[28px] pt-8 pb-12 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo + socials */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col items-center md:items-start gap-6"
          >
            {/* Logo */}
            <motion.div variants={fadeUp}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <img
                  src={allyLogo}
                  alt="Ally logo"
                  className="w-9 h-9 object-contain"
                />
              </div>
            </motion.div>

            {/* Social media icons */}
            <motion.div
              variants={fadeUp}
              className="flex gap-5 text-gray-300 text-xl"
            >
              <a href="#" className="hover:text-white transition">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedinIn />
              </a>
            </motion.div>
          </motion.div>

          {/* Right columns */}
          <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-16 justify-center md:justify-end">
            {columnData.map((col, idx) => (
              <motion.div
                key={col.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: idx * 0.08 },
                  },
                }}
              >
                <h5 className="text-sm font-semibold mb-4">{col.title}</h5>
                <ul className="space-y-3 text-gray-300 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-white transition">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact text + arrow */}
        <div className="relative mt-10 md:mt-14" style={{ minHeight: 240 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white font-extrabold leading-none absolute left-4 md:left-12 bottom-10 md:bottom-16"
            style={{ fontSize: "clamp(48px, 10vw, 120px)" }}
          >
            Contact Us
          </motion.h2>

          {/* Arrow Button */}
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            viewport={{ once: true }}
            className="absolute right-6 md:right-12 bottom-6 md:bottom-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-2xl"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-900"
            >
              <path
                d="M7 17L17 7"
                stroke="#111827"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 17V7H7"
                stroke="#111827"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
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