import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Page Imports
import Home from "./pages/Home";
import PromptEngineering from "./pages/PromptEngineering";
import Docker from "./pages/Docker";
import DockerCompose from "./pages/DockerCompose";
import SpanningTrees from "./pages/SpanningTrees";
import Dijkstra from "./pages/Dijkstra";
import QuestionGuide from "./pages/QuestionGuide";
import JDBC from "./pages/JDBC";
import Hibernate from "./pages/Hibernate";
import SpringBootREST from "./pages/SpringBootREST";
import Django from "./pages/Django";
import Networking from "./pages/Networking";
import SqlJoins from "./pages/SqlJoins";

function AppContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-zinc-300 font-sans antialiased overflow-x-hidden">
      <ScrollToTop />

      {/* Desktop Sidebar (Always Visible) */}
      <div className="hidden md:block w-80 fixed top-0 left-0 h-screen overflow-hidden z-20">
        <Sidebar />
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
      <main className="flex-1 md:pl-80 min-h-[calc(100vh-73px)] md:min-h-screen flex flex-col justify-between">
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/ai/prompt-engineering" element={<PromptEngineering />} />
              <Route path="/devops/docker" element={<Docker />} />
              <Route path="/devops/docker-compose" element={<DockerCompose />} />
              <Route path="/dsa/kruskal-mst" element={<SpanningTrees />} />
              <Route path="/dsa/dijkstra" element={<Dijkstra />} />
              <Route path="/dsa/question-guide" element={<QuestionGuide />} />
              <Route path="/java/jdbc" element={<JDBC />} />
              <Route path="/java/hibernate" element={<Hibernate />} />
              <Route path="/java/springboot" element={<SpringBootREST />} />
              <Route path="/web/django" element={<Django />} />
              <Route path="/web/networking" element={<Networking />} />
              <Route path="/sql/joins" element={<SqlJoins />} />
            </Routes>
          </AnimatePresence>
        </div>

        {/* Global Mini Footer */}
        <footer className="w-full max-w-4xl mx-auto px-6 py-12 border-t border-zinc-950 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700 bg-black/25">
          <p>© 2026 Satyam Rana • Personal Wiki</p>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">Github</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
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
