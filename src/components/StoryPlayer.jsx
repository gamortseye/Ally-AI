import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * StoryPlayer (creative + cinematic)
 * - scenes: [{ video, text, duration, emotion? }]
 * - onEnd: callback when story finishes / user exits
 * - title: optional (used in end overlay)
 *
 * NOTE: Previous and Exit UI buttons have been removed as requested.
 * Exit still works via Escape key or clicking the dim background.
 */
const StoryPlayer = ({ scenes = [], onEnd, title }) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [revealIndex, setRevealIndex] = useState(null); // for typewriter
  const videoRef = useRef(null);

  const sceneCount = scenes.length;
  const currentScene = scenes[current] || {};

  // assign default emotion if not provided
  const emotionForIndex = (idx) => {
    const map = ["intro", "struggle", "help", "recovery", "celebrate"];
    return scenes[idx]?.emotion || map[idx] || "intro";
  };
  const emotion = emotionForIndex(current);

  // auto-advance timer
  useEffect(() => {
    if (!playing || paused) return;
    const duration = scenes[current]?.duration ?? 5000;
    const timer = setTimeout(() => {
      if (current < sceneCount - 1) {
        setCurrent((c) => c + 1);
      } else {
        setPlaying(false);
        if (typeof onEnd === "function") onEnd();
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [current, playing, paused, scenes, sceneCount, onEnd]);

  // keyboard shortcuts: Right = next, Left = prev, Esc = exit, Space = pause/play
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setCurrent((c) => Math.min(c + 1, sceneCount - 1));
        setPaused(false);
        setPlaying(true);
      } else if (e.key === "ArrowLeft") {
        setCurrent((c) => Math.max(c - 1, 0));
        setPaused(false);
        setPlaying(true);
      } else if (e.key === "Escape") {
        if (typeof onEnd === "function") onEnd();
      } else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sceneCount, onEnd]);

  // keep video play/pause in sync
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    try {
      if (paused) el.pause();
      else el.play().catch(() => {});
    } catch (e) {}
  }, [paused, current]);

  // typewriter reveal for "intro" emotion
  useEffect(() => {
    // reset reveal
    setRevealIndex(null);
    if (emotion === "intro") {
      const full = currentScene.text || "";
      let i = 0;
      const speed = Math.max(20, Math.floor((full.length / 60) * 60)); // pace adapts to text length
      setRevealIndex(0);
      const iv = setInterval(() => {
        i += 1;
        setRevealIndex(i);
        if (i >= full.length) {
          clearInterval(iv);
        }
      }, speed);
      return () => clearInterval(iv);
    } else {
      // not intro: show full immediately
      setRevealIndex(null);
    }
  }, [current, currentScene.text, emotion]);

  // confetti generator for celebrate scenes
  const confettiPieces = useMemo(() => {
    const count = 26;
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.round(Math.random() * 100);
      const size = Math.round(8 + Math.random() * 12);
      const delay = Math.random() * 0.8;
      const rotate = Math.round(Math.random() * 360);
      const colorChoices = ["#FFD166", "#06D6A0", "#4CC9F0", "#EF476F", "#8338EC"];
      const color = colorChoices[i % colorChoices.length];
      return { id: i, left, size, delay, rotate, color };
    });
  }, []);

  // emotion-driven motion and style helpers
  const textVariants = {
    intro: { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -12, opacity: 0 } },
    struggle: {
      initial: { y: 10, opacity: 0, scale: 0.99 },
      animate: { y: 0, opacity: 1, scale: [1, 1.02, 1] },
      exit: { opacity: 0 },
    },
    help: { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 12, opacity: 0 } },
    recovery: { initial: { y: 30, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { opacity: 0 } },
    celebrate: { initial: { scale: 0.92, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { opacity: 0 } },
  };

  const boxStyleForEmotion = (em) => {
    switch (em) {
      case "intro":
        return {
          background: "linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.34))",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
        };
      case "struggle":
        return {
          background: "linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.5))",
          border: "1px solid rgba(0,0,0,0.36)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.68)",
        };
      case "help":
        return {
          background: "linear-gradient(180deg, rgba(6,24,50,0.6), rgba(6,24,50,0.34))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 14px 46px rgba(6,24,50,0.42)",
        };
      case "recovery":
        return {
          background: "linear-gradient(180deg, rgba(10,18,30,0.44), rgba(10,18,30,0.28))",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.36)",
        };
      case "celebrate":
        return {
          background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.92))",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.32)",
          color: "#111",
        };
      default:
        return { background: "rgba(0,0,0,0.5)", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" };
    }
  };

  // small helpers
  const goNext = useCallback(() => {
    if (current < sceneCount - 1) {
      setCurrent((c) => c + 1);
      setPaused(false);
      setPlaying(true);
    } else {
      setPlaying(false);
      if (typeof onEnd === "function") onEnd();
    }
  }, [current, sceneCount, onEnd]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
    setPaused(false);
    setPlaying(true);
  }, []);

  // display text (typewriter if intro)
  const displayedText = (() => {
    const txt = currentScene.text || "";
    if (emotion === "intro" && typeof revealIndex === "number") {
      return txt.slice(0, revealIndex);
    }
    return txt;
  })();

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <AnimatePresence mode="wait">
        {playing && (
          <motion.div
            key={`scene-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* cinematic letterbox bars */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-0 h-16 md:h-24 bg-black/90 z-40 pointer-events-none"
              style={{ backdropFilter: "blur(2px)" }}
            />
            <div
              aria-hidden
              className="absolute left-0 right-0 bottom-0 h-16 md:h-24 bg-black/90 z-40 pointer-events-none"
              style={{ backdropFilter: "blur(2px)" }}
            />

            {/* ambient bokeh / parallax layer */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {/* gentle floating circles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
                style={{ mixBlendMode: "overlay" }}
              >
                {/* a few soft circles for depth */}
                <div
                  style={{
                    position: "absolute",
                    left: "12%",
                    top: "10%",
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    background: "radial-gradient(circle,#1e3a8a66,transparent)",
                    transform: "translateZ(0)",
                    opacity: 0.6,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "8%",
                    top: "18%",
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    filter: "blur(36px)",
                    background: "radial-gradient(circle,#be185d44,transparent)",
                    opacity: 0.55,
                  }}
                />
              </motion.div>
            </div>

            {/* video */}
            <video
              ref={videoRef}
              src={currentScene.video}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* dynamic vignette / tint */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  emotion === "struggle"
                    ? "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.62) 100%)"
                    : emotion === "celebrate"
                    ? "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.32) 100%)"
                    : "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)",
                mixBlendMode: "multiply",
                transition: "background 320ms ease",
              }}
            />

            {/* center text card */}
            <div className="absolute inset-0 flex items-center justify-center px-6 z-30">
              <motion.div
                variants={textVariants[emotion] || textVariants.intro}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl w-full"
                style={{
                  padding: "18px 22px",
                  borderRadius: 14,
                  backdropFilter: "blur(6px)",
                  ...boxStyleForEmotion(emotion),
                }}
                aria-live="polite"
              >
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.04)",
                      fontSize: 20,
                    }}
                  >
                    {emotion === "intro"
                      ? "💬"
                      : emotion === "struggle"
                      ? "⚠️"
                      : emotion === "help"
                      ? "🤝"
                      : emotion === "recovery"
                      ? "🌱"
                      : "🎉"}
                  </div>

                  <div className="flex-1">
                    <motion.p
                      key={`text-${current}`}
                      style={{ margin: 0, whiteSpace: "pre-wrap" }}
                      className={`${
                        emotion === "celebrate" ? "text-black" : "text-white"
                      } text-base md:text-2xl font-semibold leading-relaxed`}
                    >
                      {displayedText}
                      {/* show caret when typing */}
                      {emotion === "intro" && typeof revealIndex === "number" && revealIndex < (currentScene.text || "").length && (
                        <span className="inline-block ml-1 animate-pulse">|</span>
                      )}
                    </motion.p>

                    {/* emotional micro-caption for subtle empathy */}
                    <div className="mt-3 text-sm opacity-70">
                      {emotion === "struggle" && <span>She shares the weight she carried.</span>}
                      {emotion === "help" && <span>Help arrived — quiet but powerful.</span>}
                      {emotion === "recovery" && <span>Small steps, steady hope.</span>}
                      {emotion === "celebrate" && <span>Light returns. A new beginning.</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* celebration confetti */}
            {emotion === "celebrate" && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {confettiPieces.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ y: -40, opacity: 0, x: `${p.left}%`, rotate: p.rotate }}
                    animate={{ y: ["-40%", "120%"], opacity: [0, 1, 0], rotate: p.rotate + 200 }}
                    transition={{ duration: 2.2 + Math.random() * 0.6, delay: p.delay, ease: "easeIn" }}
                    style={{
                      position: "absolute",
                      left: `${p.left}%`,
                      top: "-6%",
                      width: p.size,
                      height: p.size * 0.6,
                      background: p.color,
                      borderRadius: 4,
                      transformOrigin: "center",
                    }}
                  />
                ))}
              </div>
            )}

            {/* top-right small controls: Pause and Next only (Previous and Exit removed) */}
            <div className="absolute top-4 right-4 flex gap-2 items-center z-40">
              <button
                onClick={() => setPaused((p) => !p)}
                className="px-3 py-1 rounded-md bg-black/40 text-white text-sm"
                aria-label={paused ? "Play" : "Pause"}
              >
                {paused ? "Play" : "Pause"}
              </button>

              <button
                onClick={goNext}
                className="px-3 py-1 rounded-md bg-black/40 text-white text-sm"
                aria-label="Next"
              >
                Next
              </button>
            </div>

            {/* scene counter bottom-left */}
            <div className="absolute left-4 bottom-6 text-white/70 z-40 text-sm">
              {current + 1} / {sceneCount}
            </div>

            {/* clickable background area: clicking near edges (outside text) can exit */}
            <button
              aria-label="Overlay exit"
              onClick={(e) => {
                // if they click deliberately outside main content, exit
                const rect = e.currentTarget.getBoundingClientRect();
                // simple: treat click anywhere in the bars area as an exit attempt
                if (typeof onEnd === "function") onEnd();
              }}
              className="absolute inset-0 z-20 bg-transparent"
              style={{ outline: "none" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* end / replay screen — Exit button removed (use Esc or click background); only Replay visible */}
      {!playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/92 text-white space-y-6 z-50"
        >
          <h2 className="text-2xl md:text-3xl font-bold">The End</h2>
          <p className="text-sm text-gray-300">{title ? `${title} Story Completed` : "Story Completed"}</p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrent(0);
                setPlaying(true);
                setPaused(false);
              }}
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200"
            >
              Replay
            </button>

            {/* removed Exit button intentionally (use Esc or background click to exit) */}
            <div className="px-4 py-2 rounded-full text-sm text-gray-300 self-center">
              Press <kbd className="px-2 py-1 bg-white/6 rounded">Esc</kbd> to close
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StoryPlayer;
