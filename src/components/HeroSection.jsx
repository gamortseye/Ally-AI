import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/solid";
import bgImage from "../assets/Opendoor.png";
import LandingPag from "../assets/LandingPag.png";
import Allylogo from "../assets/ally logo.svg";
import StoryPlayer from "./StoryPlayer"; // adjust path if needed
import amaImg from "../assets/ama.png";
import kwameImg from "../assets/kwame.png";
import ama1 from "../assets/Ama1.mp4";
import ama2 from "../assets/Ama2.mp4";
import ama3 from "../assets/Ama3.mp4";
import ama4 from "../assets/Ama4.mp4";
import kwame1 from "../assets/Kwame1.mp4";
import kwame2 from "../assets/Kwame2.mp4";
import kwame3 from "../assets/Kwame3.mp4";
import kwame4 from "../assets/Kwame4.mp4";

/** Cup-like spinner component (blocks UI while loading) */
const CupSpinner = () => {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        initial={{ scale: 0.9, rotate: 0 }}
        animate={{ scale: [0.95, 1.05, 0.95], rotate: 360 }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 88, height: 88 }}
        className="flex items-center justify-center bg-white bg-opacity-0 rounded"
      >
        <svg viewBox="0 0 64 64" width="88" height="88" aria-hidden>
          <g
            fill="none"
            stroke="#9ca3af"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cup body */}
            <path d="M8 22c0 13 6 18 24 18s24-5 24-18" />
            {/* Rim */}
            <path d="M16 18h32" />
            {/* Handle */}
            <path d="M46 24c4 0 6 3 6 6s-2 6-6 6" />
          </g>

          <motion.circle
            cx="32"
            cy="12"
            r="3.5"
            fill="#9ca3af"
            initial={{ opacity: 0.6 }}
            animate={{ y: [-3, 3, -3], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </svg>
      </motion.div>
      {/* A subtle backdrop so user knows UI is blocked */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black bg-opacity-10"
        style={{ backdropFilter: "blur(2px)" }}
      />
    </div>
  );
};

/** Smart modern loading UI to cover the blank page */
const PreloadLoadingOverlay = ({ logoSrc }) => {
  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-80 w-[92%] max-w-md mx-4 p-6 rounded-2xl bg-white/90 shadow-xl border border-white/20"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 shadow">
            <img src={logoSrc} alt="ALLY logo" className="w-8 h-8" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Preparing secure session</h3>
                <p className="text-xs text-gray-500 mt-1">Getting things ready — one moment please</p>
              </div>

              {/* small animated dots */}
              <div className="flex items-center ml-3">
                <motion.span
                  className="w-2 h-2 rounded-full bg-gray-400 mr-1"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 rounded-full bg-gray-400 mr-1"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.12 }}
                />
                <motion.span
                  className="w-2 h-2 rounded-full bg-gray-400"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.24 }}
                />
              </div>
            </div>

            {/* subtle progress bar */}
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400"
                initial={{ width: "8%" }}
                animate={{ width: ["8%", "58%", "86%"] }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ borderRadius: 999 }}
              />
            </div>

            <div className="mt-3 text-xs text-gray-500">Secure connection — encryption established</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Integrated LandingPage (moved into same file so "Learn Their Stories" can open it)
 * - shows two story cards
 * - hovering each image changes a gradient strip below the cards
 * - keeps the top nav visible (because nav is in the parent HeroSection)
 */

const LandingPageIntegrated = ({ onClose }) => {
  const [activeStory, setActiveStory] = useState(null);
  const [hovered, setHovered] = useState(null); // "ama" | "kwame" | null

  // tutorial visibility + timer
  const [showTutorial, setShowTutorial] = useState(true);
  const tutorialTimerRef = React.useRef(null);

  useEffect(() => {
    // auto-dismiss tutorial after 15s
    tutorialTimerRef.current = setTimeout(() => {
      setShowTutorial(false);
      tutorialTimerRef.current = null;
    }, 15000);

    return () => {
      if (tutorialTimerRef.current) {
        clearTimeout(tutorialTimerRef.current);
        tutorialTimerRef.current = null;
      }
    };
  }, []);

  // Scenes
  const survivorScenes = [
    { video: ama1, text: "Ama was a bright young woman, passionate about education and dreams of becoming a nurse", duration: 9000 },
    { video: ama1, text: "But behind closed doors, she endured years of emotional abuse, silenced by fear. What started with controlling words turned into bruises and broken confidence.", duration: 9000 },
    { video: ama2, text: "One day, Ama reached out to a trusted friend. She realized she wasn’t alone — and help was possible.", duration: 9000 },
    { video: ama3, text: "and she said 'I am now enlightened'", duration: 9000 },
    { video: ama4, text: "Today, thanks to Ally, Ama is not just a survivor, but an advocate for change. Her journey reminds us that silence is never the answer, and support saves lives.", duration: 10000 },
  ];
  const normalScenes = [
    { video: kwame1, text: "Kwame was known as the strong one — hardworking, respected, and the pillar of his family", duration: 9000 },
    { video: kwame2, text: "But Kwame carried a silent pain. He was mocked, belittled, and physically assaulted by his partner. Society told him: ‘Men don’t get abused.’ So he kept quiet", duration: 9000 },
    { video: kwame3, text: "One night, overwhelmed and broken, Kwame reached out anonymously for help. He found that his story mattered, too", duration: 9000 },
    { video: kwame4, text: "Today, thanks to Ally, Kwame speaks up to break the stigma that men cannot be victims of GBV. His courage proves that healing begins with speaking out", duration: 10000 },
  ];

  // overlay tints
  const amaTint = "linear-gradient(180deg, rgba(18,52,120,0.18) 0%, rgba(30,80,160,0.42) 65%)";
  const kwameTint = "linear-gradient(180deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.60) 75%)";
  const defaultTint = "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.48) 75%)";

  // bottom vignette depending on hover
  const bottomVignette =
    hovered === "ama"
      ? "linear-gradient(180deg, rgba(255,255,255,0) 18%, rgba(6,32,64,0.94) 100%)"
      : hovered === "kwame"
      ? "linear-gradient(180deg, rgba(255,255,255,0) 18%, rgba(0,0,0,0.96) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0) 18%, rgba(7,24,55,0.92) 100%)";

  return (
    <div className="relative z-20 w-full min-h-screen pt-28 pb-24 bg-white flex items-center justify-center">
      {/* DESKTOP: invisible right-side hot area (click to go back) */}
      <button
        aria-label="Go back (desktop)"
        onClick={onClose}
        className="hidden md:block absolute inset-y-0 right-0"
        style={{
          width: "15%",
          background: "transparent",
          border: "none",
          padding: 0,
          zIndex: 10,
        }}
      />

      {/* MOBILE: invisible top-right hot area (click/touch to go back) */}
      <button
        aria-label="Go back (mobile)"
        onClick={onClose}
        className="md:hidden absolute top-0 right-0"
        style={{
          width: "33%",
          height: 64,
          background: "transparent",
          border: "none",
          padding: 0,
          zIndex: 20,
        }}
      />

      {/* responsive grid */}
      <div
        className="
          grid gap-10 w-full max-w-[1100px] 
          grid-cols-1 md:grid-cols-2
        "
      >
        {/* shared card style */}
        {[
          {
            key: "ama",
            title: "Survivors Perspective",
            img: amaImg,
            tint: amaTint,
            storyKey: "survivor",
            storyLabel: "View her Story",
          },
          {
            key: "kwame",
            title: "Normal Life",
            img: kwameImg,
            tint: kwameTint,
            storyKey: "normal",
            storyLabel: "View his Story",
          },
        ].map((card) => (
          <div
            key={card.key}
            onMouseEnter={() => setHovered(card.key)}
            onMouseLeave={() => setHovered(null)}
            className="
              relative rounded-2xl overflow-hidden 
              shadow-[0_30px_60px_rgba(7,24,55,0.18)]
              transition-transform duration-400 
              hover:scale-[1.02]
            "
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              maxHeight: 350,
            }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
            />

            <div
              className="absolute inset-0 transition-all duration-300"
              style={{ background: hovered === card.key ? card.tint : defaultTint }}
              aria-hidden
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <h3
                className="text-white font-extrabold drop-shadow-[0_8px_20px_rgba(0,0,0,0.55)]"
                style={{ fontSize: 36, lineHeight: 1.1 }}
              >
                {card.title}
              </h3>

              <button
                onClick={() => setActiveStory(card.storyKey)}
                className="mt-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm border border-white/10"
              >
                {card.storyLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "55vh",
          background: bottomVignette,
          transition: "background 260ms ease",
        }}
      />

      {/* Tutorial comment: white background, black text, dismiss */}
      {showTutorial && (
        <div
          className="fixed z-50"
          style={{
            right: 16,
            top: 16,
            // desktop: center-right vertically
            // we'll override with media query below for md screens
          }}
        >
          <div
            className="md:fixed md:right-6 md:top-1/2 md:-translate-y-1/2 bg-white text-black rounded-lg shadow-lg px-4 py-3 max-w-xs"
            role="status"
            aria-live="polite"
          >
            <div className="text-sm md:text-base">
              <strong>Note:</strong>{" "}
              <span className="block mt-1">
                Click or touch the empty space on the <b>right</b> to go back (desktop).
              </span>
              <span className="block mt-1 md:hidden">
                On mobile, tap the empty space at the <b>top right</b> to go back.
              </span>
            </div>

            <div className="mt-3 text-right">
              <button
                onClick={() => {
                  setShowTutorial(false);
                  if (tutorialTimerRef.current) {
                    clearTimeout(tutorialTimerRef.current);
                    tutorialTimerRef.current = null;
                  }
                }}
                className="text-sm text-gray-700 underline"
                aria-label="Dismiss tutorial"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* story overlays */}
      {activeStory === "survivor" && (
        <StoryPlayer title="Ama’s Journey" scenes={survivorScenes} onEnd={() => setActiveStory(null)} />
      )}
      {activeStory === "normal" && (
        <StoryPlayer title="Kwame’s Journey" scenes={normalScenes} onEnd={() => setActiveStory(null)} />
      )}
    </div>
  );
};


const HeroSection = () => {
  const [showLanding, setShowLanding] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [autoBlur, setAutoBlur] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPreloadUI, setShowPreloadUI] = useState(false);

  // Nav collapse state for mobile (three-dot toggles this)
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  // tutorial hint visibility (shown on mount for a longer time)
  const [showTutorial, setShowTutorial] = useState(true);

  const navigate = useNavigate();
  const blurTimerRef = useRef(null);
  const navigateTimerRef = useRef(null);
  const preloadTimerRef = useRef(null);
  const tutorialTimerRef = useRef(null);

  // keep navCollapsed consistent on initial load and when resizing
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      // ensure nav items visible on desktop
      if (desktop) setNavCollapsed(false);
    };

    // call once on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Manage auto blur after landing appears
    if (showLanding) {
      blurTimerRef.current = setTimeout(() => setAutoBlur(true), 2000);
    } else {
      setAutoBlur(false);
    }

    return () => {
      if (blurTimerRef.current) {
        clearTimeout(blurTimerRef.current);
        blurTimerRef.current = null;
      }
    };
  }, [showLanding]);

  useEffect(() => {
    // tutorial lasts longer: 15s by default
    tutorialTimerRef.current = setTimeout(() => setShowTutorial(false), 15000);
    return () => {
      if (tutorialTimerRef.current) {
        clearTimeout(tutorialTimerRef.current);
        tutorialTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // cleanup navigate/preload timers when component unmounts
    return () => {
      if (navigateTimerRef.current) {
        clearTimeout(navigateTimerRef.current);
        navigateTimerRef.current = null;
      }
      if (preloadTimerRef.current) {
        clearTimeout(preloadTimerRef.current);
        preloadTimerRef.current = null;
      }
      if (tutorialTimerRef.current) {
        clearTimeout(tutorialTimerRef.current);
        tutorialTimerRef.current = null;
      }
    };
  }, []);

  const handleYesClick = async () => {
    setShowSpinner(true);
    preloadTimerRef.current = setTimeout(() => setShowPreloadUI(true), 220);

    try {
      await import("../LoginPage");
      navigateTimerRef.current = setTimeout(() => {
        navigate("/login");
      }, 600);
    } catch (err) {
      console.error("Preload failed, navigating anyway:", err);
      navigateTimerRef.current = setTimeout(() => {
        navigate("/login");
      }, 400);
    }
  };

  // Toggle mobile nav visibility (only affects small screens; desktop stays as before)
  const toggleMobileNav = () => setNavCollapsed((s) => !s);

  return (
    <section className="relative flex flex-col min-h-screen text-white overflow-hidden">
      {/* Persistent Navigation */}
      <motion.nav
        className={`absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className={`relative flex items-center ${
            navCollapsed ? "justify-center" : "justify-between"
          } md:justify-between`}
        >
          {/* Three-dot button (single instance) */}
          <div className="absolute left-4 md:static z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleMobileNav}
              aria-label="Toggle nav"
              className="text-white px-3 rounded-full h-8 flex items-center justify-center text-sm backdrop-blur-md"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              ⋯
            </motion.button>
          </div>

          {/* Left extras (language etc.) — show on desktop OR when nav not collapsed */}
          {(isDesktop || !navCollapsed) && (
            <div className="flex items-center space-x-3 sm:space-x-4 ml-12 md:ml-0">
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
          )}

          {/* Center Logo — absolutely centered */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 sm:space-x-3 pointer-events-none md:pointer-events-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ pointerEvents: "none" }}
          >
            <img
              src={Allylogo}
              alt="Ally Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 pointer-events-none"
            />
            <span className="hidden sm:inline text-xl sm:text-2xl font-bold text-black tracking-wide pointer-events-none">
              ALLY AI
            </span>
          </motion.div>

          {/* Right extras (phone, about) — show on desktop OR when nav not collapsed */}
          {(isDesktop || !navCollapsed) && (
            <div className="flex items-center space-x-3 sm:space-x-4" style={{ marginLeft: "auto" }}>
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
          )}
        </div>
      </motion.nav>

      {/* PAGE TRANSITION */}
      <AnimatePresence mode="wait">
        {!showLanding && !showStories ? (
          // === HERO PAGE ===
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col flex-1"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bgImage})`,
                filter: "brightness(1)",
              }}
            ></div>

            {/* Blue Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-500 opacity-40 blur-3xl"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 text-center">
              <motion.div
                className="backdrop-blur-sm rounded-3xl px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 shadow-2xl max-w-2xl sm:max-w-3xl md:max-w-5xl"
                style={{ backgroundColor: "rgba(65, 124, 219, 0.25)" }}
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
                  Gender-Based Violence (GBV) affects millions worldwide — women,
                  men, boys, and girls. This isn’t just their story — it’s our shared
                  responsibility.
                </motion.p>
              </motion.div>

              {/* Bottom Buttons
                  - On mobile: rendered in-flow (static) just under the hero content so it's visible and close.
                  - On sm+ screens: positioned absolute at the bottom as before.
              */}
              <motion.div
                className="flex justify-center w-full sm:absolute sm:bottom-10 bottom-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <div
                  className="flex items-center backdrop-blur-md rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowStories(true)}
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-2 sm:py-3 hover:bg-white hover:bg-opacity-10 transition-all text-sm sm:text-base"
                    style={{ color: "rgba(0,0,0,0.80)" }}
                  >
                    <span className="text-lg sm:text-2xl">←</span>
                    <span className="font-medium">Learn Their Stories</span>
                  </motion.button>

                  <div className="w-px h-6 sm:h-8 bg-white bg-opacity-40"></div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowLanding(true)}
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-2 sm:py-3 hover:bg-white hover:bg-opacity-10 transition-all text-sm sm:text-base"
                    style={{ color: "rgba(0,0,0,0.80)" }}
                  >
                    <span className="font-medium">Take Action</span>
                    <span className="text-lg sm:text-2xl">→</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : showLanding ? (
          // === TAKE ACTION LANDING ===
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-center min-h-screen"
          >
            {/* Background Image (auto-blurred after a few seconds) */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${LandingPag})`,
                filter: autoBlur ? "blur(20px)" : "blur(0px)",
                transition: "filter 0.8s ease-in-out",
              }}
            />

            {/* Invisible left-side "hot" area: click to go back */}
            <button
              aria-label="Go back"
              className="absolute inset-y-0 left-0 w-1/3 z-40"
              onClick={() => setShowLanding(false)}
              style={{ background: "transparent", border: "none", padding: 0 }}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                Do You want to talk?
              </h1>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-6 py-3 bg-white text-black font-medium rounded-full shadow-md"
              >
                Yes
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // === STORIES SCREEN ===
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.6 }}
            className="relative flex-1"
          >
            <LandingPageIntegrated onClose={() => setShowStories(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutorial hint (appears for longer and on desktop too) */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed left-1/2 transform -translate-x-1/2 bottom-20 md:bottom-24 z-50 max-w-xl w-[90%] md:w-auto"
          >
            <div className="bg-white/95 text-black px-4 py-3 rounded-xl shadow-lg text-center text-sm md:text-base">
              <strong>Tip:</strong>{" "}
              <span className="ml-2">
                “Take Action” opens a private chat with our AI for support. “Learn Their Stories” shows survivor stories and resources.
              </span>
              <button
                onClick={() => setShowTutorial(false)}
                className="ml-3 text-sm text-gray-600 underline"
                aria-label="Dismiss tutorial"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      {showSpinner && <CupSpinner />}
      <AnimatePresence>
        {showPreloadUI && <PreloadLoadingOverlay logoSrc={Allylogo} />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
