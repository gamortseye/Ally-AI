import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/pro1.png";
import img2 from "../assets/pro2.png";
import img3 from "../assets/pro3.png";
import img4 from "../assets/pro4.png";
import img5 from "../assets/pro5.png";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TrustedProfiles = () => {
  const profiles = [
    { name: "Dr. Wallace", role: "Clinical Psychologist", image: img2 },
    { name: "Dr. Grace Mensah", role: "Therapist", image: img1 },
    { name: "Dr. Kwame Boateng", role: "Legal Counselor", image: img3 },
    { name: "Dr. Akua Asante", role: "Family Therapist", image: img4},
    { name: "Dr. Mabel Owusu", role: "Trauma Specialist", image: img5 },
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
      }, 10000);
    }
    return () => clearInterval(autoRef.current);
  }, [isInteracting, profiles.length]);

  // helper: try to change index with cooldown to avoid jitter
  const tryChange = (direction) => {
    const now = Date.now();
    if (now - lastChangeRef.current < 1000) return; // 1000ms cooldown
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
                    mass: 1.0,
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
                        transition={{ duration: 2.50, ease: [0.22, 1, 0.36, 1] }}
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
                      transition={{ duration: 2.0 }}
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
export default TrustedProfiles;