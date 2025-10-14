

import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import bgImage from "./assets/Opendoor.png"; // 🔹 Replace with your actual image file path
import Allylogo from "./assets/ally logo.svg";
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

  return (
    <section className="w-full flex justify-center bg-white-70 py-20">
      {/* Fixed centered container */}
      <div
        className="flex flex-wrap justify-center gap-10"
        style={{
          width: "1561px",
          maxWidth: "100%",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} ${card.textColor} ${card.rotation}
                        flex-shrink-0 p-8 rounded-3xl shadow-lg 
                        hover:shadow-2xl transition-all transform 
                        hover:scale-105 md:hover:rotate-0`}
            style={{
              width: "250px",
              minHeight: "420px",
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
          </div>
        ))}
      </div>
    </section>
  );
};



// AmazingServices Component
const AmazingServices = () => {
  const services = [
    {
      icon: "💬",
      title: "Voice First - Speak, Don't Type",
      description: "Express yourself naturally through voice. Our AI listens and understands your concerns without the barrier of typing."
    },
    {
      icon: "🤝",
      title: "Anonymous Support Through Avatar Identity",
      description: "Feel safe sharing your deepest concerns. Use an avatar identity to maintain complete privacy while getting the help you need."
    }
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Explore The Amazing Services Ally AI Provides</h2>
        <p className="text-gray-600">Innovative features designed to support your mental health journey</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="text-6xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
            <button className="mt-6 text-blue-600 font-semibold hover:underline">Learn More →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// SupportSection Component
const SupportSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="text-6xl mb-6">📖</div>
          <h2 className="text-4xl font-bold mb-4">How many stories of pain are left untold?</h2>
          <p className="text-xl leading-relaxed">
            Millions of people suffer in silence every day. Breaking the stigma around mental health starts with creating safe spaces to share. We believe every story deserves to be heard, and every person deserves support.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all">
            Share Your Story
          </button>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="bg-green-400 rounded-full p-8 shadow-2xl">
            <div className="text-6xl">🔒</div>
          </div>
        </div>
      </div>
    </div>
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