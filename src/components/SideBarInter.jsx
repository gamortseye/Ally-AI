import { FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useUser } from "../context/UserContext";
import vite from "../assets/ally logo.svg";
import sidebar from "../assets/sidebar.svg";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const { selectedAvatar } = useUser();

  // mobile detection + mobile drawer open state
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    // if mobile, open/close mobile drawer; otherwise use existing expanded toggle
    if (isMobile) {
      setMobileOpen((s) => !s);
    } else {
      setExpanded((s) => !s);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      // when switching to desktop, ensure mobile drawer is closed
      if (!mobile) setMobileOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close mobile drawer with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: '"gender-based violence" OR "domestic violence" OR GBV',
            language: "en",
            sortBy: "publishedAt",
            pageSize: 6,
            apiKey:
              import.meta.env.VITE_NEWS_API_KEY ||
              "9fe131a283cf41348953ee31d573ebfc",
          },
        });
        setArticles(data.articles ?? []);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };
    fetchNews();
  }, []);

  /* ------------------------ ANIMATION VARIANTS ------------------------ */
  const sidebarVariants = {
    collapsed: {
      width: 64,
      transition: { type: "spring", stiffness: 220, damping: 28 },
    },
    expanded: {
      width: 320,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  };

  const listItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  };

  /* ------------------------ COLLAPSED SIDEBAR (desktop) ----------------------- */
  const CollapsedSidebar = (
    <motion.div
      key="collapsed"
      initial="collapsed"
      animate="collapsed"
      variants={sidebarVariants}
      className="h-screen p-2 flex flex-col items-center border-r overflow-hidden"
      style={{ background: "#F5F5F5", borderColor: "rgba(0,0,0,0.06)" }}
      layout
    >
      {/* Expand toggle */}
      <motion.button
        onClick={toggleSidebar}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="p-1 mb-6 mt-4 flex items-center justify-center"
        aria-label="Expand sidebar"
        title="Expand"
      >
        <motion.img
          src={sidebar}
          alt="Expand"
          className="w-5 h-5"
          initial={{ rotate: -6, opacity: 0.9 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default-toggle.svg";
          }}
        />
      </motion.button>

      {/* Icons */}
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.button
          className="p-2 rounded-lg"
          aria-label="Trending news"
          title="Trending News"
          variants={contentItem}
          whileHover={{ scale: 1.06 }}
        >
          <FileText className="w-5 h-5 text-black/25" />
        </motion.button>
      </motion.div>

      {/* Avatar */}
      <motion.div className="mt-auto mb-4" variants={contentItem} initial="hidden" animate="show">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm">
          {selectedAvatar?.image ? (
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
          ) : (
            <div className="h-full w-full bg-black/10" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* ------------------------ EXPANDED SIDEBAR (desktop) ------------------------ */
  const ExpandedSidebar = (
    <motion.div
      key="expanded"
      initial="collapsed"
      animate="expanded"
      exit="collapsed"
      variants={sidebarVariants}
      className="h-screen p-4 flex flex-col border-r overflow-hidden"
      style={{ background: "#F5F5F5", borderColor: "rgba(0,0,0,0.06)" }}
      layout
    >
      {/* Header */}
      <motion.div className="flex justify-between items-center mb-6" variants={contentItem}>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            aria-hidden
            title="Ally logo"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.32 }}
          >
            <img
              src={vite}
              alt="Ally logo"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-logo.svg";
              }}
            />
          </motion.div>
        </div>

        {/* Collapse button */}
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 rounded-lg"
          aria-label="Collapse sidebar"
          title="Collapse"
          variants={contentItem}
        >
          <img
            src={sidebar}
            alt="Collapse"
            className="w-5 h-5 rotate-180"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/default-toggle.svg";
            }}
          />
        </motion.button>
      </motion.div>

      {/* Trending News Section */}
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.06 }}
        variants={contentItem}
      >
        <div className="p-0">
          <FileText className="w-5 h-5 text-black/25" />
        </div>
        <span className="text-sm font-medium text-black/25">Trending News</span>
      </motion.div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto">
        <motion.div
          className="bg-white rounded-lg p-4 space-y-6 shadow-sm"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {articles.length === 0 ? (
            <motion.p className="text-center text-sm text-black/50" variants={listItem}>
              Loading news...
            </motion.p>
          ) : (
            articles.map((article, idx) => (
              <motion.div
                key={idx}
                className="py-2 border-b last:border-b-0 border-black/6"
                variants={listItem}
              >
                <h3 className="text-lg font-medium text-black/90 text-center">{article.title}</h3>
                <h4 className="text-sm text-black/50 mb-1 text-center">
                  {article.source?.name} –{" "}
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
                </h4>
                <p className="text-sm text-black/75 text-center">
                  {article.description ?? "No description available."}
                </p>
                <p className="text-center mt-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-black/90 text-sm underline">
                    Read more
                  </a>
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Avatar */}
      <motion.div className="mt-auto py-4 flex items-center space-x-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm">
          {selectedAvatar?.image ? (
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.png";
              }}
            />
          ) : (
            <div className="h-full w-full bg-black/10" />
          )}
        </div>
        {selectedAvatar?.name && <span className="text-black/90 font-medium">{selectedAvatar.name}</span>}
      </motion.div>
    </motion.div>
  );

  /* ------------------------ MOBILE ICON + DRAWER ------------------------ */
  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* Desktop/tablet: render the normal sidebar (collapsed or expanded) */}
      {!isMobile ? (
        <>
          {!expanded ? CollapsedSidebar : ExpandedSidebar}
        </>
      ) : (
        <>
          {/* mobile: show only the small fixed icon (rounded) */}
          <motion.button
            key="mobile-icon"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white/95 shadow-lg"
            style={{ backdropFilter: "blur(6px)" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <img src={sidebar} alt="Menu" className="w-5 h-5" />
          </motion.button>

          {/* mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <>
                {/* backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.48 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 z-40 bg-black"
                />

                {/* drawer (slides in from left) */}
                <motion.aside
                  key="mobile-drawer"
                  initial={{ x: "-100%", opacity: 0.98 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 28 }}
                  className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm p-4 overflow-auto"
                  style={{ background: "#F5F5F5", borderRight: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {/* content: reuse expanded sidebar structure */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <img src={vite} alt="Ally logo" className="w-7 h-7 object-contain" />
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setMobileOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      className="p-1 rounded-lg"
                      aria-label="Close sidebar"
                      title="Close"
                    >
                      <img src={sidebar} alt="Close" className="w-5 h-5 rotate-180" />
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-black/25" />
                    <span className="text-sm font-medium text-black/25">Trending News</span>
                  </div>

                  <div className="bg-white rounded-lg p-4 space-y-6 shadow-sm mb-6">
                    {articles.length === 0 ? (
                      <p className="text-center text-sm text-black/50">Loading news...</p>
                    ) : (
                      articles.map((article, idx) => (
                        <div key={idx} className="py-2 border-b last:border-b-0 border-black/6">
                          <h3 className="text-lg font-medium text-black/90 text-center">{article.title}</h3>
                          <h4 className="text-sm text-black/50 mb-1 text-center">
                            {article.source?.name} –{" "}
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
                          </h4>
                          <p className="text-sm text-black/75 text-center">{article.description ?? "No description available."}</p>
                          <p className="text-center mt-2">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-black/90 text-sm underline">
                              Read more
                            </a>
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-auto py-4 flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow-sm">
                      {selectedAvatar?.image ? (
                        <img
                          src={selectedAvatar.image}
                          alt={selectedAvatar.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/default-avatar.png";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-black/10" />
                      )}
                    </div>
                    {selectedAvatar?.name && <span className="text-black/90 font-medium">{selectedAvatar.name}</span>}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
