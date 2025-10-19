import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Adjust these imports to your project file paths
import EvansImg from "../assets/Evans.jpg";
import AnasImg from "../assets/Anas.jpg";
import PerryImg from "../assets/Perry.jpg";

/*
  Important: testimonials store strings (image module or URL).
  We do NOT store <img/> JSX inside the data.
*/
const testimonials = [
  {
    id: 0,
    strong: "How many stories of pain are left untold?",
    content:
      "From that question grew a movement — a platform dedicated to helping survivors of Gender-Based Violence (GBV) speak, heal, and be heard.\nWe believe GBV is not just a women’s issue or a men’s issue — it’s a human issue that demands empathy, action, and accountability.’’",
    name: "Evans",
    role: "Social media Manager",
    smallAvatar: EvansImg, // used for the small left avatar (current)
    largeAvatar: AnasImg,  // optional override for big avatar (we prefer next.smallAvatar by default)
  },
  {
    id: 1,
    strong:
      "Behind every face is a story — of courage, fear, survival, and rebirth. We exist to make sure those stories are never silenced again. Together, we can end the cycle of violence and build a world where safety, respect, and equality are rights — not privileges.",
    content: "",
    name: "Anastasia",
    role: "Co-Founder",
    smallAvatar: AnasImg,
    largeAvatar: PerryImg,
  },
  {
    id: 2,
    strong: "Information sparks action.",
    content:
      "We surface legal resources, survivor stories, and practical guidance so people can make safer, more informed choices.",
    name: "Perry",
    role: "Design Expert",
    smallAvatar: PerryImg,
    largeAvatar: EvansImg,
  },
];

const quoteVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const avatarVariants = {
  enter: { opacity: 0, scale: 0.92, x: 12 },
  center: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.92, x: -12 },
};

const SupportSection = () => {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  // scroll tracking for subtle parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const profileY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0.8, 1, 1, 0.9]);

  // handlers
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // keep index valid if testimonials change
  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [index, count]);

  const current = testimonials[index];
  const nextIndex = (index + 1) % count;
  const nextProfile = testimonials[nextIndex];

  // Choose big avatar intentionally:
  // Prefer nextProfile.smallAvatar (so big avatar always reflects the next person's profile).
  // If you prefer a separate large image, you can use nextProfile.largeAvatar instead.
  const bigAvatarSrc = nextProfile.smallAvatar || nextProfile.largeAvatar || nextProfile.smallAvatar;
  const smallAvatarSrc = current.smallAvatar;

  return (
    <motion.section
      ref={ref}
      className="bg-[#4178E1] w-full text-white py-24 px-6 md:px-16 overflow-hidden"
      style={{ opacity }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Big left quote mark (parallax) */}
        <motion.div
          className="text-[220px] md:text-[300px] font-bold leading-none text-white -mb-20 text-left select-none pointer-events-none"
          style={{ y: quoteY }}
          transition={{ type: "spring", stiffness: 50 }}
          aria-hidden
        >
          “
        </motion.div>

        {/* strong + content (per testimonial) */}
        <div className="relative">
          <motion.div style={{ y: textY }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`strong-${current.id}`}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h2 className="text-2xl md:text-4xl font-semibold text-center mb-6 leading-tight">
                  {current.strong}
                </h2>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div style={{ y: textY }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current.id}`}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45 }}
                className="max-w-3xl mx-auto"
              >
                {current.content
                  ? current.content.split("\n").map((p, i) => (
                      <p key={i} className="text-lg leading-relaxed text-white/90 text-center mb-3">
                        {p}
                      </p>
                    ))
                  : null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Profile block: left small profile (current) + arrows + big avatar (next) */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between mt-12 px-4 md:px-0"
        style={{ y: profileY }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* LEFT: small current profile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`profile-${current.id}`}
            className="flex items-center gap-4"
            variants={avatarVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45 }}
          >
            <img
              src={smallAvatarSrc}
              alt={current.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-white/80 text-xs md:text-sm">{current.role}</p>
              <p className="text-white/80 font-light text-sm md:text-base">{current.name}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT: arrows grouped tightly with big avatar */}
        <div className="flex items-center gap-3 md:gap-4 mt-6 md:mt-0">
          {/* left arrow (previous) */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-105 duration-150"
            title="Previous"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Big avatar (shows next profile's image) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`big-${nextProfile.id}`} // key by nextProfile id to ensure deterministic replacement
                className="bg-white/10 p-3 md:p-5 rounded-2xl shadow-lg inline-block"
                variants={avatarVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45 }}
              >
                <img
                  src={bigAvatarSrc}
                  alt={`${nextProfile.name} avatar`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* small caption under big avatar (optional) */}
            <div className="hidden md:block text-center mt-2 text-white/80 text-xs">
              Next: {nextProfile.name}
            </div>
          </div>

          {/* right arrow (next) */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full hover:bg-white/20 transition transform hover:scale-105 duration-150"
            title="Next"
          >
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SupportSection;
