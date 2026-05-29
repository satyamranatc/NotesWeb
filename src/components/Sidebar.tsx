import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, BookOpen, Cpu, Terminal, GitBranch, Database, Globe, 
  ChevronRight, ChevronLeft, RefreshCw, Layers, Route, Brain, Compass,
  ChevronDown, ShoppingBag
} from "lucide-react";

export interface DocPage {
  title: string;
  path: string;
  icon: any;
  accentClass: string;
  hoverAccentClass: string;
  badge?: string;
}

export interface Category {
  name: string;
  pages: DocPage[];
}

export const categories: Category[] = [
  {
    name: "AI & Machine Learning",
    pages: [
      {
        title: "Introduction to AI",
        path: "/ai/intro-to-ai",
        icon: Brain,
        accentClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        hoverAccentClass: "group-hover:text-cyan-400 group-hover:bg-cyan-500/5"
      },
      {
        title: "Prompt Engineering",
        path: "/ai/prompt-engineering",
        icon: Cpu,
        accentClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        hoverAccentClass: "group-hover:text-indigo-400 group-hover:bg-indigo-500/5"
      },
      {
        title: "ML Interview Guide",
        path: "/ai/ml-interview-guide",
        icon: BookOpen,
        accentClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        hoverAccentClass: "group-hover:text-violet-400 group-hover:bg-violet-500/5",
        badge: "New"
      }
    ]
  },
  {
    name: "DevOps Series",
    pages: [
      {
        title: "Docker Basics",
        path: "/devops/docker",
        icon: Terminal,
        accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        hoverAccentClass: "group-hover:text-blue-400 group-hover:bg-blue-500/5"
      },
      {
        title: "Docker Compose",
        path: "/devops/docker-compose",
        icon: Layers,
        accentClass: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        hoverAccentClass: "group-hover:text-sky-400 group-hover:bg-sky-500/5"
      }
    ]
  },
  {
    name: "DSA Series",
    pages: [
      {
        title: "Kruskal's MST",
        path: "/dsa/kruskal-mst",
        icon: GitBranch,
        accentClass: "text-teal-400 bg-teal-500/10 border-teal-500/20",
        hoverAccentClass: "group-hover:text-teal-400 group-hover:bg-teal-500/5"
      },
      {
        title: "Dijkstra's Algorithm",
        path: "/dsa/dijkstra",
        icon: Route,
        accentClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        hoverAccentClass: "group-hover:text-amber-400 group-hover:bg-amber-500/5",
        badge: "Interactive"
      },
      {
        title: "Interview Question Guide",
        path: "/dsa/question-guide",
        icon: BookOpen,
        accentClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        hoverAccentClass: "group-hover:text-violet-400 group-hover:bg-violet-500/5"
      },
      {
        title: "Placement Roadmap",
        path: "/dsa/placement-roadmap",
        icon: Compass,
        accentClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        hoverAccentClass: "group-hover:text-rose-400 group-hover:bg-rose-500/5"
      }
    ]
  },
  {
    name: "Java & DB Series",
    pages: [
      {
        title: "JDBC Tutorial",
        path: "/java/jdbc",
        icon: Database,
        accentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        hoverAccentClass: "group-hover:text-purple-400 group-hover:bg-purple-500/5"
      },
      {
        title: "Hibernate & JPA",
        path: "/java/hibernate",
        icon: Database,
        accentClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        hoverAccentClass: "group-hover:text-violet-400 group-hover:bg-violet-500/5"
      },
      {
        title: "Spring Boot REST",
        path: "/java/springboot",
        icon: Cpu,
        accentClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        hoverAccentClass: "group-hover:text-rose-400 group-hover:bg-rose-500/5"
      }
    ]
  },
  {
    name: "Web Library",
    pages: [
      {
        title: "Django MVC/MVT",
        path: "/web/django",
        icon: Globe,
        accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        hoverAccentClass: "group-hover:text-emerald-400 group-hover:bg-emerald-500/5"
      },
      {
        title: "Networking Essentials",
        path: "/web/networking",
        icon: Globe,
        accentClass: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        hoverAccentClass: "group-hover:text-sky-400 group-hover:bg-sky-500/5"
      },
      {
        title: "Backend & API Theory",
        path: "/web/backend-api-theory",
        icon: Globe,
        accentClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        hoverAccentClass: "group-hover:text-violet-400 group-hover:bg-violet-500/5"
      },
      {
        title: "SE & Industry Lifecycle",
        path: "/web/se-industry",
        icon: Layers,
        accentClass: "text-teal-400 bg-teal-500/10 border-teal-500/20",
        hoverAccentClass: "group-hover:text-teal-400 group-hover:bg-teal-500/5"
      }
    ]
  },
  {
    name: "System Design",
    pages: [
      {
        title: "Uber System Design",
        path: "/system-design/uber",
        icon: Route,
        accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        hoverAccentClass: "group-hover:text-blue-400 group-hover:bg-blue-500/5"
      },
      {
        title: "Zomato System Design",
        path: "/system-design/zomato",
        icon: ShoppingBag,
        accentClass: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        hoverAccentClass: "group-hover:text-rose-500 group-hover:bg-rose-500/5",
        badge: "Interactive"
      }
    ]
  },
  {
    name: "SQL Folder",
    pages: [
      {
        title: "SQL Joins",
        path: "/sql/joins",
        icon: Database,
        accentClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        hoverAccentClass: "group-hover:text-cyan-400 group-hover:bg-cyan-500/5",
        badge: "Interactive"
      }
    ]
  }
];

interface SidebarProps {
  onLinkClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ onLinkClick, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Persist collapsible categories in LocalStorage
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("sidebar_collapsed_categories");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCategory = (catName: string) => {
    setCollapsedCategories(prev => {
      const next = { ...prev, [catName]: !prev[catName] };
      localStorage.setItem("sidebar_collapsed_categories", JSON.stringify(next));
      return next;
    });
  };

  // Filter categories and pages based on query
  const filteredCategories = categories.map(cat => {
    const pages = cat.pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, pages };
  }).filter(cat => cat.pages.length > 0);

  return (
    <aside className="w-full bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900/60 h-full flex flex-col overflow-hidden">
      {/* Brand Logo Header */}
      <div className={`sticky top-0 z-10 border-b border-zinc-900/60 bg-zinc-950/90 backdrop-blur-md transition-all duration-300 ${
        isCollapsed ? "p-3 py-4 flex flex-col items-center gap-4" : "p-6 pb-4 flex items-center justify-between"
      }`}>
          <Link to="/" onClick={onLinkClick} className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-zinc-900/80 rounded-xl flex items-center justify-center bg-zinc-900/30 group-hover:scale-105 group-hover:border-teal-500/30 transition-all duration-300 shrink-0 shadow-inner">
              <img 
                src="https://www.theprimestep.com/wp-content/uploads/2022/11/Logo_Tps-removebg-preview.png" 
                alt="Prime Step Logo" 
                className="w-7 h-7 object-contain"
              />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap"
              >
                <h1 className="text-white font-extrabold text-xs tracking-tight leading-none">
                  Prime Step
                </h1>
                <p className="text-teal-500/70 text-[9px] uppercase tracking-widest mt-1.5 font-bold">
                  Prime Library
                </p>
              </motion.div>
            )}
          </Link>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center border border-zinc-900 hover:border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shrink-0 shadow-sm"
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          )}
      </div>

      {/* Search Input */}
      {!isCollapsed ? (
        <div className="px-6 py-4 border-b border-zinc-900/40">
          <div className="relative group">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              placeholder="Search wiki pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-900 focus:border-zinc-800 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-300 placeholder-zinc-500 transition-all font-medium"
            />
          </div>
        </div>
      ) : (
        <div className="px-3 py-4 flex justify-center border-b border-zinc-900/40">
          <button 
            onClick={onToggleCollapse}
            className="p-2 rounded-xl bg-zinc-900/20 border border-zinc-900 text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
            title="Expand Sidebar"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className={`flex-1 overflow-y-auto overscroll-contain space-y-4 scrollbar-thin ${
        isCollapsed ? "px-2 py-4" : "px-4 py-4"
      }`}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => {
            const isGroupCollapsed = collapsedCategories[cat.name] && !searchQuery;
            return (
              <div key={idx} className="space-y-1">
                {!isCollapsed ? (
                  <button
                    onClick={() => toggleCategory(cat.name)}
                    className="w-full flex items-center justify-between text-[10px] font-bold text-zinc-550 uppercase tracking-widest px-3 py-1.5 hover:text-zinc-300 transition-colors cursor-pointer group/cat text-left"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className={`w-3 h-3 text-zinc-650 group-hover/cat:text-zinc-400 transition-transform ${isGroupCollapsed ? "-rotate-90" : ""}`} />
                  </button>
                ) : (
                  <div className="h-px bg-zinc-900/60 my-3" />
                )}

                <AnimatePresence initial={false}>
                  {(!isCollapsed && !isGroupCollapsed) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden space-y-0.5"
                    >
                      {cat.pages.map((page, pageIdx) => {
                        const PageIcon = page.icon;
                        const isActive = location.pathname === page.path;

                        return (
                          <Link
                            key={pageIdx}
                            to={page.path}
                            onClick={onLinkClick}
                            className={`group relative flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                              isActive 
                                ? "text-zinc-150 font-semibold bg-zinc-900/40 border border-zinc-850" 
                                : "text-zinc-450 hover:text-zinc-200 hover:bg-zinc-900/20 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 z-10 min-w-0">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                                isActive 
                                  ? page.accentClass
                                  : `bg-zinc-900/30 text-zinc-500 border-zinc-900/40 ${page.hoverAccentClass}`
                              }`}>
                                <PageIcon className="w-3.5 h-3.5" />
                              </div>
                              <span className="truncate">{page.title}</span>
                              {page.badge && (
                                <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded shrink-0 border ${
                                  page.badge === "New" 
                                    ? "bg-violet-500/10 border-violet-500/20 text-violet-400" 
                                    : "bg-teal-500/10 border-teal-500/20 text-teal-400"
                                }`}>
                                  {page.badge}
                                </span>
                              )}
                            </div>
                            <ChevronRight className={`w-3 h-3 text-zinc-650 transition-transform ${
                              isActive ? "translate-x-0.5 opacity-100 text-zinc-400" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                            } z-10`} />
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed view icons list */}
                {isCollapsed && (
                  <div className="space-y-1">
                    {cat.pages.map((page, pageIdx) => {
                      const PageIcon = page.icon;
                      const isActive = location.pathname === page.path;

                      return (
                        <Link
                          key={pageIdx}
                          to={page.path}
                          onClick={onLinkClick}
                          className={`group relative flex items-center justify-center p-2 rounded-xl transition-all ${
                            isActive 
                              ? "bg-zinc-900 border border-zinc-850" 
                              : "hover:bg-zinc-900/40"
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
                            isActive 
                              ? page.accentClass
                              : `bg-zinc-900/30 text-zinc-500 border-zinc-900/40 ${page.hoverAccentClass}`
                          }`}>
                            <PageIcon className="w-3.5 h-3.5" />
                          </div>
                          
                          {/* CSS hover tooltip */}
                          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 text-zinc-200 text-[10px] font-bold rounded-lg shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200 z-50 flex items-center gap-1.5">
                            <span>{page.title}</span>
                            {page.badge && (
                              <span className={`px-1 py-0.2 bg-teal-500/10 border border-teal-500/25 text-teal-400 text-[7px] font-bold uppercase tracking-wider rounded`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-zinc-500 text-xs">
              {!isCollapsed ? "No pages found matching query." : "empty"}
            </p>
          </div>
        )}
      </div>

      {/* Profile Card Footer */}
      {!isCollapsed ? (
        <div className="px-5 py-4 border-t border-zinc-900 bg-zinc-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-400 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center font-bold text-white text-[10px]">
                SR
              </div>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-200 text-xs font-bold truncate">Satyam Rana</h4>
              <p className="text-zinc-500 text-[9px] uppercase tracking-wider font-semibold truncate">Software Engineer</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 border-t border-zinc-900 flex justify-center bg-zinc-950/40">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-400 p-0.5 shadow-md flex-shrink-0" title="Satyam Rana">
            <div className="w-full h-full rounded-[10px] bg-zinc-950 flex items-center justify-center font-bold text-white text-[10px]">
              SR
            </div>
          </div>
        </div>
      )}

      {/* Global version info */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-zinc-900 bg-zinc-950 text-center flex items-center justify-between text-zinc-650 text-[9px] font-bold uppercase tracking-widest">
          <span>v3.0.0 (React)</span>
          <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
        </div>
      ) : (
        <div className="p-3 border-t border-zinc-900 bg-zinc-950 flex flex-col items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-zinc-650 hover:text-zinc-400 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
        </div>
      )}
    </aside>
  );
}
