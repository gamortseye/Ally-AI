import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MicIcon,
  EyeOffIcon,
  InfoIcon,
  CheckCircleIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AmazingServices = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [cardWidth, setCardWidth] = useState(320);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2
  );

  // Track scroll progress for the entire section (used for subtle parallax)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax movement for the whole section (paused on hover)
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
    {
      id: "03",
      icon: <InfoIcon className="w-7 h-7 text-black" />,
      title: "Stay Informed with Trending GBV News & Insights",
      subtitle: "Awareness is the first step to change.",
      description:
        "We bring you curated, real-time stories, legal updates, and survivor insights from around the world. Stay informed, inspired, and empowered to make safer, more conscious choices for yourself and others.",
      label: "Information",
    },
    {
      id: "04",
      icon: <CheckCircleIcon className="w-7 h-7 text-black" />,
      title: "Guided Healing Through Smart Emotional Care",
      subtitle: "Listens, learns, and supports your healing journey.",
      description:
        "Our AI companion offers personalized emotional guidance — from calming techniques and journaling prompts to connecting you with professionals. It learns your mood patterns and provides gentle, meaningful support at every step of recovery.",
      label: "Guide",
    },
  ];

  // Compute card width and visibleCount on mount and resize
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleResize = () => {
      const vw = window.innerWidth;
      const newVisibleCount = vw < 640 ? 1 : 2; // mobile:1, >=sm:2
      setVisibleCount(newVisibleCount);

      // compute card width so exactly visibleCount cards fit the visible area
      const containerVisibleWidth = node.clientWidth || Math.min(1200, vw - 32);
      const newCardWidth = Math.floor(containerVisibleWidth / newVisibleCount);
      setCardWidth(newCardWidth);

      // overflow check
      setHasOverflow(node.scrollWidth > node.clientWidth + 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // also update overflow state when content or cardWidth changes
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    setHasOverflow(node.scrollWidth > node.clientWidth + 1);
  }, [cardWidth, services.length]);

  // scroll by one card (so visible pair shifts by one card: 1+2 -> 2+3)
  const scrollHoriz = (dir = "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = cardWidth; // scroll exactly one card
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 bg-white text-gray-800 overflow-hidden px-4 sm:px-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ y: isHovered ? 0 : y, opacity }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      {/* hide webkit scrollbar for the scroller and ensure no native scrollbars show */}
      <style>{`
        /* target our scroller by class */
        .scroller {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scroller::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>

      {/* Header */}
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
      </motion.div>

      {/* Buttons */}
      <div className="max-w-6xl mx-auto relative">
        <button
          aria-label="Scroll left"
          onClick={() => scrollHoriz("left")}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 p-2 rounded-full shadow-md transition-opacity duration-200
            ${isHovered ? "opacity-100" : "opacity-0"} ${hasOverflow ? "" : "pointer-events-none opacity-0"}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          aria-label="Scroll right"
          onClick={() => scrollHoriz("right")}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 p-2 rounded-full shadow-md transition-opacity duration-200
            ${isHovered ? "opacity-100" : "opacity-0"} ${hasOverflow ? "" : "pointer-events-none opacity-0"}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal scroller that shows 2 cards at a time (or 1 on small screens) */}
        <div
          ref={containerRef}
          className="mx-auto scroller"
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            overflowY: "hidden", // prevent vertical scrolling
            scrollSnapType: "x mandatory",
            paddingBottom: 8,
            maxWidth: 960,
            // hide native scrollbar visuals as a fallback (handled in CSS above)
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex-shrink-0 px-6 py-12 flex flex-col items-center text-center md:items-start md:text-left border border-transparent"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: index * 0.18,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              style={{
                width: cardWidth,
                minWidth: cardWidth,
                maxWidth: cardWidth,
                scrollSnapAlign: "start",
                background: "transparent",
              }}
            >
              {/* Icon + Label + restored short vertical line */}
              <div className="flex items-center mb-6 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                    {service.icon}
                  </div>
                  <span className="text-blue-600 font-medium">{service.label}</span>
                </div>

                {/* RESTORED short vertical line (kept close to the icon/label) */}
                <div className="h-8 w-[2px] bg-black ml-65" aria-hidden="true"></div>
              </div>

              {/* Superscript ID + Title */}
              <div className="flex items-start justify-center md:justify-start gap-1 mb-2 w-full">
                <sup className="text-gray-400 text-sm font-semibold translate-y-[-6px]">
                  {service.id}
                </sup>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              <p className="text-gray-700 font-medium mb-4">{service.subtitle}</p>
              <p className="text-gray-500 leading-relaxed mb-8">{service.description}</p>

              <motion.div
                className="w-full flex justify-center md:justify-start"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button className="border border-gray-300 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-100 transition">
                  Learn more
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AmazingServices;
