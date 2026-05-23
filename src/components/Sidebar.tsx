import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, BookOpen, Cpu, Terminal, GitBranch, Database, Globe, 
  ChevronRight, RefreshCw, Layers, Route, Brain
} from "lucide-react";

export interface DocPage {
  title: string;
  path: string;
  icon: any;
  accentClass: string;
  hoverAccentClass: string;
}

export interface Category {
  name: string;
  pages: DocPage[];
}

export const categories: Category[] = [
  {
    name: "AI & Prompt Eng",
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
        hoverAccentClass: "group-hover:text-amber-400 group-hover:bg-amber-500/5"
      },
      {
        title: "Interview Question Guide",
        path: "/dsa/question-guide",
        icon: BookOpen,
        accentClass: "text-violet-400 bg-violet-500/10 border-violet-500/20",
        hoverAccentClass: "group-hover:text-violet-400 group-hover:bg-violet-500/5"
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
        hoverAccentClass: "group-hover:text-cyan-400 group-hover:bg-cyan-500/5"
      }
    ]
  }
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter categories and pages based on query
  const filteredCategories = categories.map(cat => {
    const pages = cat.pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, pages };
  }).filter(cat => cat.pages.length > 0);

  return (
    <aside className="w-full md:w-80 bg-zinc-950 border-r border-zinc-900 h-full flex flex-col overflow-hidden">
      {/* Brand Logo Header — sticky so it stays pinned as nav scrolls */}
      <div className="sticky top-0 z-10 p-6 pb-4 border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md">
        <Link to="/" onClick={onLinkClick} className="flex items-center gap-3 group">
          <div className="w-12 h-12 border  border-zinc-800 rounded-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img 
              src="https://www.theprimestep.com/wp-content/uploads/2022/11/Logo_Tps-removebg-preview.png" 
              alt="Prime Step Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-extrabold text-sm tracking-tight leading-none">
              Prime Step
            </h1>
            <p className="text-teal-500/70 text-[10px] uppercase tracking-widest mt-1.5 font-bold">
              Prime Library
            </p>
          </div>
        </Link>
      </div>

      {/* Search Input */}
      <div className="px-6 py-4">
        <div className="relative group">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
          <input
            type="text"
            placeholder="Search wiki pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 focus:border-zinc-700 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 transition-all font-medium"
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 space-y-6 scrollbar-thin">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3">
                {cat.name}
              </h2>
              <div className="space-y-1">
                {cat.pages.map((page, pageIdx) => {
                  const PageIcon = page.icon;
                  const isActive = location.pathname === page.path;

                  return (
                    <Link
                      key={pageIdx}
                      to={page.path}
                      onClick={onLinkClick}
                      className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? "text-zinc-100 font-semibold" 
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {/* Sliding active background indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeLinkPill"
                          className="absolute inset-0 bg-zinc-900 border border-zinc-850 rounded-xl z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-3 z-10">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-transparent transition-colors ${
                          isActive 
                            ? page.accentClass
                            : `bg-zinc-900/40 text-zinc-500 border-zinc-800/40 ${page.hoverAccentClass}`
                        }`}>
                          <PageIcon className="w-4.5 h-4.5" />
                        </div>
                        <span>{page.title}</span>
                      </div>

                      <ChevronRight className={`w-3.5 h-3.5 text-zinc-650 transition-transform ${
                        isActive ? "translate-x-0.5 opacity-100 text-zinc-400" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      } z-10`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-zinc-500 text-sm">No pages found matching query.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-zinc-900 bg-zinc-950">
        <div className="flex items-center justify-between text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          <span>v3.0.0 (React)</span>
          <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}
