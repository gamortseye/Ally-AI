import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@heroicons/react/24/solid";
import bgImage from "../assets/Opendoor.png";
import Allylogo from "../assets/ally logo.svg";

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
export default HeroSection;