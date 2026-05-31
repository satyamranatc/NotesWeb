import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded Page Imports
const Home = lazy(() => import("./pages/Home"));
const IntroToAI = lazy(() => import("./pages/IntroToAI"));
const PromptEngineering = lazy(() => import("./pages/PromptEngineering"));
const MlInterviewGuide = lazy(() => import("./pages/MlInterviewGuide"));
const Docker = lazy(() => import("./pages/Docker"));
const DockerCompose = lazy(() => import("./pages/DockerCompose"));
const SpanningTrees = lazy(() => import("./pages/SpanningTrees"));
const Dijkstra = lazy(() => import("./pages/Dijkstra"));
const QuestionGuide = lazy(() => import("./pages/QuestionGuide"));
const PlacementRoadmap = lazy(() => import("./pages/PlacementRoadmap"));
const JDBC = lazy(() => import("./pages/JDBC"));
const Hibernate = lazy(() => import("./pages/Hibernate"));
const SpringBootREST = lazy(() => import("./pages/SpringBootREST"));
const Django = lazy(() => import("./pages/Django"));
const Networking = lazy(() => import("./pages/Networking"));
const SqlJoins = lazy(() => import("./pages/SqlJoins"));
const BackendApiTheory = lazy(() => import("./pages/BackendApiTheory"));
const SE_Industry = lazy(() => import("./pages/SE_Industry"));
const UberSystemDesign = lazy(() => import("./pages/UberSystemDesign"));
const ZomatoSystemDesign = lazy(() => import("./pages/ZomatoSystemDesign"));
const PythonCleanCode = lazy(() => import("./pages/PythonCleanCode"));


// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full bg-black">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
      <div className="absolute inset-0 border-2 border-t-teal-500 border-l-teal-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-stone-50 text-stone-900 font-sans antialiased overflow-x-hidden">
      <ScrollToTop />

      {/* Desktop Sidebar (Always Visible) */}
      <div className={`hidden md:block fixed top-0 left-0 h-screen overflow-hidden z-20 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}>
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      </div>

      {/* Mobile Navbar Header */}
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Mobile Drawer Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sidebar drawer content sliding in */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-zinc-950 z-50 md:hidden shadow-2xl border-r border-zinc-900"
            >
              <Sidebar onLinkClick={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content body wrap */}
      <main className={`flex-1 min-h-[calc(100vh-73px)] md:min-h-screen flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "md:pl-20" : "md:pl-80"
      }`}>
        <div className="flex-1 w-full notes-container">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/ai/intro-to-ai" element={<IntroToAI />} />
                <Route path="/ai/prompt-engineering" element={<PromptEngineering />} />
                <Route path="/ai/ml-interview-guide" element={<MlInterviewGuide />} />
                <Route path="/devops/docker" element={<Docker />} />
                <Route path="/devops/docker-compose" element={<DockerCompose />} />
                <Route path="/dsa/kruskal-mst" element={<SpanningTrees />} />
                <Route path="/dsa/dijkstra" element={<Dijkstra />} />
                <Route path="/dsa/question-guide" element={<QuestionGuide />} />
                <Route path="/dsa/placement-roadmap" element={<PlacementRoadmap />} />
                <Route path="/java/jdbc" element={<JDBC />} />
                <Route path="/java/hibernate" element={<Hibernate />} />
                <Route path="/java/springboot" element={<SpringBootREST />} />
                <Route path="/web/django" element={<Django />} />
                <Route path="/web/networking" element={<Networking />} />
                <Route path="/web/backend-api-theory" element={<BackendApiTheory />} />
                <Route path="/web/se-industry" element={<SE_Industry />} />
                <Route path="/web/python-clean-code" element={<PythonCleanCode />} />
                <Route path="/sql/joins" element={<SqlJoins />} />
                <Route path="/system-design/uber" element={<UberSystemDesign />} />
                <Route path="/system-design/zomato" element={<ZomatoSystemDesign />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </div>

        {/* Global Mini Footer */}
        <footer className="w-full border-t border-zinc-900/60 bg-zinc-950/20 py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
            <p>© 2026 Satyam Rana • Personal Wiki</p>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">Github</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
