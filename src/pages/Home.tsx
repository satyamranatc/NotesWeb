import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronRight, BookOpen, Tag, 
  ArrowUpRight, Compass, Cpu, Quote,
  GraduationCap
} from "lucide-react";
import { categories } from "../components/Sidebar";
import libraryBlueprint from "../assets/library_blueprint.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  // Load visited pages from localStorage for progress display
  useEffect(() => {
    try {
      const saved = localStorage.getItem("visited_pages");
      if (saved) {
        setVisitedPages(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const registerVisit = (path: string) => {
    try {
      const saved = localStorage.getItem("visited_pages");
      const visited = saved ? JSON.parse(saved) : [];
      if (!visited.includes(path)) {
        visited.push(path);
        localStorage.setItem("visited_pages", JSON.stringify(visited));
        setVisitedPages(visited);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Automatically cycle quotes every 10 seconds for a dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % libraryQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Flatten pages for searching
  const allPages = categories.flatMap(cat => 
    cat.pages.map(page => ({
      ...page,
      categoryName: cat.name
    }))
  );

  // Filter based on search query
  const searchResults = allPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 28 } }
  };

  const getFormalCategoryName = (name: string) => {
    switch(name) {
      case "AI & Machine Learning": return "Department of Cognitive Systems & Intelligence";
      case "DevOps Series": return "Department of Infrastructural Systems & Operations";
      case "DSA Series": return "Department of Algorithmic Analysis & Mathematics";
      case "Java & DB Series": return "Department of Enterprise Architecture & Relational Systems";
      case "Web Library": return "Department of Communication Protocols & Web Architecture";
      case "System Design": return "Department of Distributed Scale & Architectural Design";
      case "SQL Folder": return "Department of Structured Query & Relational Calculus";
      default: return name;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-16 relative"
    >
      {/* Decorative Blueprint Grid Backgrounds */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-stone-300/10 filter blur-[120px]" />
      </div>

      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-stone-600 text-[10px] font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-stone-500" /> Archival Repository Active
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-bold text-stone-900 tracking-tight leading-none">
          The <span className="italic text-stone-850">Prime Step</span> Library
        </h1>
        <p className="text-base md:text-lg text-stone-650 font-serif leading-relaxed max-w-3xl">
          An elite repository of computer science engineering, algorithmic analysis, scientific principles, and systems design. Curated for rigorous conceptual exploration and technical mastery.
        </p>
      </motion.div>

      {/* Library Philosophy & Quotes Section (Redesigned) */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
      >
        {/* Left Column: Blueprint Schematic */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            <img 
              src={libraryBlueprint} 
              alt="The Classical Library Architectural Blueprint" 
              className="max-w-full h-auto max-h-[280px] object-contain rounded-lg border border-stone-200 bg-white"
            />
          </div>
          <span className="text-[9px] font-mono text-stone-550 uppercase tracking-widest text-center block">
            Figure 1.1: Schematic of the Classical Library (Archival Elevation & Section Study)
          </span>
        </div>

        {/* Right Column: Library Philosophy & Active Quote */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <GraduationCap className="w-4 h-4 text-stone-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Archival Philosophy</span>
            </div>
            <h3 className="text-xl font-display font-bold text-stone-900 leading-snug">
              At the Intersection of Science, Technology, & Education
            </h3>
            <p className="text-xs text-stone-600 font-serif leading-relaxed">
              We believe computational engineering is not merely code, but an empirical science. Our archives serve as a bridge between pure mathematical theory and production-grade implementation, unlocking complex ideas with absolute clarity.
            </p>
          </div>

          <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl relative">
            <Quote className="absolute right-4 top-4 w-8 h-8 text-stone-200 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuoteIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <span className="inline-block px-1.5 py-0.5 bg-stone-200 border border-stone-300 text-stone-700 text-[8px] font-bold uppercase rounded">
                  {libraryQuotes[activeQuoteIndex].category}
                </span>
                <p className="text-xs italic font-serif text-stone-800 leading-relaxed">
                  "{libraryQuotes[activeQuoteIndex].quote}"
                </p>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{libraryQuotes[activeQuoteIndex].author}</h4>
                  <p className="text-[9px] text-stone-500 font-sans uppercase tracking-wider">{libraryQuotes[activeQuoteIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Autocomplete Search Bar */}
      <motion.div variants={itemVariants} className="relative z-30 max-w-2xl mx-auto md:mx-0">
        <div className="bg-white p-3 border border-stone-200 rounded-2xl shadow-sm">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400 group-focus-within:text-stone-700 transition-colors" />
            <input
              type="text"
              placeholder="Search library catalog (e.g., Dijkstra, Docker, Spring, ML)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-stone-300 focus:outline-none rounded-xl pl-12 pr-4 py-3 text-sm text-stone-900 placeholder-stone-400 transition-all font-medium"
            />
          </div>
        </div>

        {/* Autocomplete Dropdown Result Card */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xl z-40 max-h-[320px] overflow-y-auto scrollbar-thin"
            >
              <div className="p-3 border-b border-stone-200 flex items-center justify-between text-[10px] text-stone-500 font-bold uppercase tracking-wider px-4 bg-stone-50">
                <span>Catalog Matches ({searchResults.length})</span>
                <button onClick={() => setSearchQuery("")} className="text-stone-700 hover:text-stone-900 font-bold">Clear</button>
              </div>

              <div className="divide-y divide-stone-100">
                {searchResults.length > 0 ? (
                  searchResults.map((page, idx) => {
                    const PageIcon = page.icon;
                    return (
                      <Link
                        key={idx}
                        to={page.path}
                        onClick={() => {
                          registerVisit(page.path);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between p-3.5 px-4 hover:bg-stone-50 transition-colors group/row"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200 bg-stone-50 ${page.accentClass}`}>
                            <PageIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-stone-900 text-xs font-bold group-hover/row:text-stone-700 transition-colors block">
                              {page.title}
                            </span>
                            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-semibold block mt-0.5">
                              {page.categoryName}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover/row:text-stone-600 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-all" />
                      </Link>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-stone-550 text-xs leading-relaxed font-serif">
                    No records found matching query. Try typing <code className="text-stone-700 font-mono">joins</code>, <code className="text-stone-700 font-mono">dijkstra</code>, or <code className="text-stone-700 font-mono">spring</code>.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Featured Laboratories */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest px-2">Featured Research Laboratories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Dijkstra Graph Laboratory",
              desc: "An interactive exploration of single-source shortest path routing on custom spatial coordinate grids. Examines mathematical convergence and path optimization.",
              path: "/dsa/dijkstra",
              icon: Compass,
              accent: "from-stone-50 to-stone-100 border-stone-200 text-amber-700 bg-amber-500/5"
            },
            {
              title: "SQL Relational Engine",
              desc: "A visual intersection simulator for relational algebra. Maps set theory concepts directly to Left, Right, Inner, and Full database joins.",
              path: "/sql/joins",
              icon: Tag,
              accent: "from-stone-50 to-stone-100 border-stone-200 text-cyan-700 bg-cyan-500/5"
            },
            {
              title: "Machine Learning Laboratory",
              desc: "An educational playground for gradient descent optimizations. Directly adjust learning rates and training iterations to visualize convergence.",
              path: "/ai/ml-interview-guide",
              icon: Cpu,
              accent: "from-stone-50 to-stone-100 border-stone-200 text-violet-700 bg-violet-500/5"
            }
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => registerVisit(item.path)}
                className={`p-6 rounded-3xl border bg-gradient-to-b ${item.accent} flex flex-col justify-between h-48 hover:scale-[1.01] hover:border-stone-300 hover:shadow-md transition-all group`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-stone-200 shadow-sm">
                    <ItemIcon className="w-4 h-4 text-stone-600" />
                  </div>
                  <h3 className="text-stone-900 text-xs font-bold font-sans mt-2 group-hover:text-stone-750 transition-colors">{item.title}</h3>
                  <p className="text-stone-600 text-[10px] leading-relaxed font-serif">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-700 transition-colors">
                  Launch Lab <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Grid of Library Catalog shelves */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {categories.map((cat, idx) => {
          const samplePage = cat.pages[0];
          const CatIcon = samplePage.icon;
          
          // Calculate category progress
          const catPages = cat.pages;
          const readCount = catPages.filter(p => visitedPages.includes(p.path)).length;
          const catPercentage = Math.round((readCount / catPages.length) * 100);

          return (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white border border-stone-200 hover:border-stone-300 rounded-[2rem] p-7 flex flex-col justify-between h-[380px] relative overflow-hidden group hover:shadow-sm transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border border-stone-200 bg-stone-50`}>
                    <CatIcon className="w-4.5 h-4.5 text-stone-600" />
                  </div>
                  <div>
                    <h3 className="text-stone-900 font-bold text-xs tracking-tight group-hover:text-stone-750 transition-colors">
                      {getFormalCategoryName(cat.name)}
                    </h3>
                    <span className="text-[9px] text-stone-500 font-sans font-bold uppercase tracking-wider block mt-0.5">{cat.pages.length} volumes</span>
                  </div>
                </div>

                {/* Sub Pages List */}
                <div className="space-y-1 w-full max-h-[220px] overflow-y-auto no-scrollbar">
                  {cat.pages.map((page, pIdx) => {
                    const PageIcon = page.icon;
                    const isPageVisited = visitedPages.includes(page.path);
                    return (
                      <Link
                        key={pIdx}
                        to={page.path}
                        onClick={() => registerVisit(page.path)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-100 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-all"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <PageIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isPageVisited ? 'text-teal-600 font-bold' : 'text-stone-400'}`} />
                          <span className="truncate">{page.title}</span>
                          {page.badge && (
                            <span className="px-1.5 py-0.2 bg-stone-100 border border-stone-200 text-stone-600 text-[7px] font-bold uppercase rounded scale-90">
                              {page.badge}
                            </span>
                          )}
                        </span>
                        <ChevronRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Progress Footer */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[9px] font-mono text-stone-550 uppercase tracking-widest mt-auto">
                <span className="flex items-center gap-1 font-sans font-bold text-[8px]">
                  <Tag className="w-3 h-3 text-stone-400" /> Catalogued: {readCount} / {catPages.length} ({catPercentage}%)
                </span>
                <div className="w-16 h-1 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-stone-400 transition-all duration-300"
                    style={{ width: `${catPercentage}%` }} 
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

const libraryQuotes = [
  {
    quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Skłodowska-Curie",
    title: "Nobel Laureate in Physics & Chemistry",
    category: "Science"
  },
  {
    quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    author: "Alan Mathison Turing",
    title: "Father of Modern Computer Science",
    category: "Technology"
  },
  {
    quote: "I would rather have questions that can't be answered than answers that can't be questioned.",
    author: "Richard Phillips Feynman",
    title: "Theoretical Physicist & Educator",
    category: "Science"
  },
  {
    quote: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
    author: "Albert Einstein",
    title: "Theoretical Physicist & Philosopher",
    category: "Science"
  },
  {
    quote: "That brain of mine is something more than merely mortal; as time will show.",
    author: "Ada Lovelace",
    title: "Pioneer of Computational Algorithms",
    category: "Technology"
  }
];
