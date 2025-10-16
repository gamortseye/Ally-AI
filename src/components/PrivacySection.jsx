import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";

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
    <div className="max-w-6xl mx-auto space-y-12">
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
              index % 2 === 0 ? "justify-end md:pr-10" : "justify-start md:pl-10"
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
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
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

export default PrivacySection;
