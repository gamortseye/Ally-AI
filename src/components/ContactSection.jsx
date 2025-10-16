import React from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import allyLogo from "../assets/ally logo.svg";

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
export default ContactSection;