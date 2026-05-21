import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ChevronRight, BookOpen, Clock, Tag } from "lucide-react";
import { categories } from "../components/Sidebar";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Extract all pages for flat searching
  const allPages = categories.flatMap(cat => 
    cat.pages.map(page => ({
      ...page,
      categoryName: cat.name
    }))
  );

  // Filter based on search query
  const filteredPages = allPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Container motion variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="text-center md:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[10px] font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" /> Workspace Active
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Prime Step</span> Library
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl">
          A premium documentation library compiling system designs, database management, algorithms, and prompt engineering tutorials with responsive mockups and interactive step visualizers.
        </p>
      </motion.div>

      {/* Global Portal Search */}
      <motion.div variants={itemVariants} className="max-w-2xl bg-zinc-900/40 p-4 border border-zinc-900 rounded-3xl backdrop-blur-md">
        <div className="relative group">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
          <input
            type="text"
            placeholder="Search prompt templates, docker compose YAML, code snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800/80 focus:border-zinc-700 focus:outline-none rounded-2xl pl-12 pr-4 py-3 text-sm md:text-base text-zinc-100 placeholder-zinc-500 transition-all font-medium shadow-inner"
          />
        </div>
      </motion.div>

      {/* Conditional: Search results or Category Grids */}
      {searchQuery ? (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs px-2 font-medium">
            <span>Found {filteredPages.length} matching pages</span>
            <button onClick={() => setSearchQuery("")} className="text-teal-400 hover:underline">Clear</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPages.length > 0 ? (
              filteredPages.map((page, idx) => {
                const PageIcon = page.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-4 bg-zinc-900/50 border border-zinc-850 hover:border-zinc-800 rounded-2xl flex items-center justify-between"
                  >
                    <Link to={page.path} className="flex-1 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${page.accentClass}`}>
                        <PageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-zinc-200 font-semibold text-sm">{page.title}</h4>
                        <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider font-sans mt-0.5 block">
                          {page.categoryName}
                        </span>
                      </div>
                    </Link>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-zinc-550 border border-dashed border-zinc-850 rounded-2xl">
                No matching notes found. Try looking for "docker", "kruskal", "django" or "springboot".
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Categories Grids */
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, idx) => {
            // Get category styling based on its first page
            const samplePage = cat.pages[0];
            const CatIcon = samplePage.icon;
            
            return (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <CardContainer containerClassName="py-0 flex items-stretch h-full w-full">
                  <CardBody className="bg-zinc-900/40 hover:bg-zinc-800/40 backdrop-blur-xl border border-white/5 hover:border-teal-500/20 rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500 shadow-2xl shadow-black/50 relative overflow-hidden group h-full w-full">
                    {/* Visual Accent Glow */}
                    <CardItem translateZ="20" className={`absolute -right-8 -top-8 w-24 h-24 rounded-full filter blur-2xl opacity-10 transition-opacity group-hover:opacity-15 bg-current ${samplePage.accentClass.split(' ')[0]}`} />

                    <div className="space-y-6">
                      {/* Category Header */}
                      <CardItem translateZ="40" className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-zinc-800 ${samplePage.accentClass}`}>
                          <CatIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-white font-bold text-sm tracking-tight">
                          {cat.name}
                        </h3>
                      </CardItem>

                      {/* Category Pages */}
                      <CardItem translateZ="30" className="space-y-2.5 w-full">
                        {cat.pages.map((page, pIdx) => {
                          const PageIcon = page.icon;
                          return (
                            <Link
                              key={pIdx}
                              to={page.path}
                              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-950/60 border border-transparent hover:border-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-semibold tracking-wide transition-all"
                            >
                              <span className="flex items-center gap-2">
                                <PageIcon className="w-3.5 h-3.5 text-zinc-550" />
                                {page.title}
                              </span>
                              <ChevronRight className="w-3 h-3 text-zinc-600" />
                            </Link>
                          );
                        })}
                      </CardItem>
                    </div>

                    <CardItem translateZ="20" className="mt-8 w-full pt-4 border-t border-zinc-900/80 flex items-center justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-zinc-500" /> {cat.pages.length} Pages</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-500" /> updated</span>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
