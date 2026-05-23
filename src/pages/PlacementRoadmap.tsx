import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Compass, ChevronRight, Check, CheckCircle2, AlertTriangle, 
  Target, Code2, Monitor, Sparkles
} from "lucide-react";

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  goal: string;
  accent: string;
  bgAccent: string;
  borderColor: string;
  textAccent: string;
  sections: {
    title: string;
    items: string[];
    details: string;
  }[];
}

export default function PlacementRoadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<"java" | "python" | "js">("java");
  const [readinessChecks, setReadinessChecks] = useState<Record<string, boolean>>({
    "java-dsa": false,
    "basic-dsa": false,
    "hashing": false,
    "quant": false,
    "logical": false,
    "verbal": false,
    "react": false,
    "node": false,
    "sql": false,
    "projects": false,
    "resume": false,
    "github": false,
    "communication": false,
  });

  // Calculate readiness score
  const totalChecks = Object.keys(readinessChecks).length;
  const completedChecks = Object.values(readinessChecks).filter(Boolean).length;
  const readinessPercent = Math.round((completedChecks / totalChecks) * 100);

  const toggleCheck = (id: string) => {
    setReadinessChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const phases: Phase[] = [
    {
      id: 1,
      title: "Phase 1: Core Foundation",
      subtitle: "Build the Core",
      duration: "Months 1–2",
      goal: "Become comfortable writing code daily & master coding aptitude cutoffs.",
      accent: "from-violet-500 to-fuchsia-500",
      bgAccent: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      textAccent: "text-violet-400",
      sections: [
        {
          title: "Select & Stick to One Language",
          items: [
            "Java (Highly recommended for service & product placements)",
            "Python (Great for fast learning & AI-assisted coding tracks)",
            "JavaScript (Perfect if you want to focus exclusively on Web/Full Stack)"
          ],
          details: "Switching languages repeatedly is a major mistake. Master loop structures, memory references, and basic typing in ONE language first."
        },
        {
          title: "Learn DSA Basics (2–3 Questions Daily)",
          items: [
            "Arrays, Strings & Hashing (90% of basic screenings)",
            "Sorting & Searching (Binary Search is high frequency)",
            "Recursion, Linked Lists, Stacks & Queues"
          ],
          details: "You do NOT need competitive programming level. Focus on LeetCode easy/medium and GeeksforGeeks fundamentals."
        },
        {
          title: "Aptitude Prep (1 Hour Daily)",
          items: [
            "Quantitative Aptitude (Ratio, percentage, time/work)",
            "Logical Reasoning (Syllogisms, blood relations, series)",
            "Verbal Ability (Comprehension, grammar checks)"
          ],
          details: "Service companies like TCS, Infosys, and Wipro filter out over 60% of candidates in the initial round solely based on aptitude cutoffs."
        }
      ]
    },
    {
      id: 2,
      title: "Phase 2: Build Real Skills",
      subtitle: "Full Stack Specialization",
      duration: "Months 3–5",
      goal: "Acquire a practical development stack and deploy three defendable projects.",
      accent: "from-cyan-500 to-blue-500",
      bgAccent: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      textAccent: "text-cyan-400",
      sections: [
        {
          title: "The MERN/PERN Stack",
          items: [
            "Frontend: HTML, CSS, JavaScript, React.js",
            "Backend: Node.js & Express.js",
            "Database: MongoDB or PostgreSQL",
            "Extras: REST APIs, Git/GitHub, Authentication, Vercel/Render deployment"
          ],
          details: "Full stack development is the safest off-campus pathway for Tier-2/3 students due to local startup hiring and freelance opportunities."
        },
        {
          title: "Build 3 Defendable Projects (No tutorial clones)",
          items: [
            "Project 1: Full-stack CRUD application with Authentication",
            "Project 2: Real-time dashboard or data portal",
            "Project 3: AI-integrated project (e.g. AI Resume Analyzer, note summarizer)"
          ],
          details: "Recruiters love deployed links on resumes. Deploying to Vercel/Render demonstrates that you know how to ship software."
        }
      ]
    },
    {
      id: 3,
      title: "Phase 3: Placement Preparation",
      subtitle: "CS Core & Resume",
      duration: "Months 6–8",
      goal: "Master core computer science subjects, build a one-page resume, and align GitHub.",
      accent: "from-fuchsia-500 to-pink-500",
      bgAccent: "bg-fuchsia-500/10",
      borderColor: "border-fuchsia-500/20",
      textAccent: "text-fuchsia-400",
      sections: [
        {
          title: "Must-Know Computer Science Subjects",
          items: [
            "DBMS & SQL (Queries, joins, indexing, normalizations)",
            "Object-Oriented Programming (OOPs: inheritance, polymorphism)",
            "Operating Systems (OS: processes, threads, scheduling)",
            "Computer Networks (CN: TCP/IP, HTTP headers, OSI layers)"
          ],
          details: "Focus on practical interview answers rather than dry textbook theory. You will be grilled on SQL joins and OOPs constructs."
        },
        {
          title: "Resume & GitHub Clean-up",
          items: [
            "Create a strict 1-page resume (No hobbies, no long objectives)",
            "Place GitHub and deployed project links at the top",
            "Commit consistently to build a green GitHub contributions graph"
          ],
          details: "Recruiters check GitHub profiles of Tier-3 students to verify if they write their own code or just clone tutorials."
        }
      ]
    },
    {
      id: 4,
      title: "Phase 4: Interviews & Jobs",
      subtitle: "Aggressive Applications",
      duration: "Months 9–12",
      goal: "Conduct mock interviews, practice communication, and apply mass-scale off-campus.",
      accent: "from-emerald-500 to-teal-500",
      bgAccent: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      textAccent: "text-emerald-400",
      sections: [
        {
          title: "Application Strategy",
          items: [
            "On-Campus: Take every single test seriously, even lower LPA packages (first job is a stepping stone)",
            "Off-Campus: Mass-apply daily on LinkedIn, Naukri, Wellfound, and Internshala",
            "Target: Startups, service giants, and remote internships"
          ],
          details: "Hiring is a numbers game. Applying to 10 companies a day consistently is better than preparing endlessly and applying once."
        },
        {
          title: "Mock Interviews & Soft Skills",
          items: [
            "Practice explaining your projects out loud",
            "Do peer mock interviews to handle technical queries under stress",
            "Learn to listen to interviewer hints during coding tasks"
          ],
          details: "Many technically competent candidates fail interviews simply because they cannot articulate their code logic or project architectures."
        }
      ]
    }
  ];

  // Canvas floating path background logic
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.8,
        speedY: -(Math.random() * 0.3 + 0.1),
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background network connection paths (very light violet)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Draw grid paths
      for (let x = 0; x < width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw particles
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24 relative overflow-hidden"
    >
      {/* Background path canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Header section */}
      <header className="space-y-6 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-bold uppercase tracking-widest">
          <Compass className="w-4 h-4 animate-pulse" /> 2026 Placement Roadmap
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          The 0 → Job <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">1-Year Roadmap</span>
        </h1>
        <p className="text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl">
          A highly realistic, structured pathway designed for Tier-2/3 college students in India to build depth, compile strong portfolios, and break placement barriers.
        </p>
      </header>

      {/* Employability Score Calculator */}
      <section className="relative z-10 bg-zinc-900/30 border border-zinc-900 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 text-center lg:text-left space-y-4">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block font-mono">Interactive Tool</span>
            <h2 className="text-2xl font-black text-white">Job Readiness Checklist</h2>
            <p className="text-zinc-300 text-sm font-normal leading-relaxed">
              Check off your acquired skills to compute your estimated 2026 Employability Score. Track your progress across phases.
            </p>

            {/* Circular Progress widget */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" className="stroke-zinc-850" strokeWidth="6" fill="transparent" />
                  <circle cx="40" cy="40" r="34" className="stroke-violet-500 transition-all duration-500" strokeWidth="6" strokeDasharray={213} strokeDashoffset={213 - (213 * readinessPercent) / 100} strokeLinecap="round" fill="transparent" />
                </svg>
                <span className="absolute text-sm font-mono font-black text-white">{readinessPercent}%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Overall Readiness</span>
                <span className="text-lg font-black text-white block">
                  {readinessPercent < 30 ? "Foundation Stage" : readinessPercent < 70 ? "Skill Builder" : "Ready to Apply!"}
                </span>
              </div>
            </div>
          </div>

          {/* Checklist Grids */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "basic-dsa", label: "DSA Basic Structures (Arrays, Hashing)", group: "Foundation" },
              { id: "java-dsa", label: "Solve 2-3 DSA Questions Daily", group: "Foundation" },
              { id: "quant", label: "Quantitative Aptitude (Quant)", group: "Foundation" },
              { id: "logical", label: "Logical & Verbal Aptitude", group: "Foundation" },
              { id: "react", label: "Frontend Skills (React, Javascript)", group: "Tech Skills" },
              { id: "node", label: "Backend API Skills (Node, Express)", group: "Tech Skills" },
              { id: "sql", label: "Relational Database & SQL Core", group: "Tech Skills" },
              { id: "projects", label: "Build & Deploy 3 Unique Projects", group: "Tech Skills" },
              { id: "resume", label: "One-Page Tech Resume", group: "Placement" },
              { id: "github", label: "Consistent GitHub Profile Graph", group: "Placement" },
              { id: "communication", label: "Soft Skills & Mock Interviews", group: "Placement" },
            ].map(item => (
              <div 
                key={item.id} 
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 border rounded-2xl cursor-pointer select-none transition-all flex items-center justify-between ${
                  readinessChecks[item.id]
                    ? "bg-violet-500/5 border-violet-500/30 text-white"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    readinessChecks[item.id] ? "bg-violet-500 border-violet-500 text-black" : "border-zinc-800"
                  }`}>
                    {readinessChecks[item.id] && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                  </div>
                  <span className="text-xs font-sans font-medium tracking-wide text-zinc-200">{item.label}</span>
                </div>
                <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-850 uppercase">
                  {item.group}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language comparison builder */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            01
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Pick ONE Main Language</h2>
        </div>
        <p className="text-base text-zinc-300 leading-relaxed font-normal">
          For off-campus and on-campus screening filters, picking one base language and mastering it is critical. Review characteristics below:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {[
            {
              id: "java",
              name: "Java",
              label: "Safest for Placements",
              desc: "The absolute standard for enterprise and banking systems. Widely tested in campus drives (TCS, Infosys, Accenture) and core OOPs questions.",
              pros: "Strong memory structures, structural syntax, highly requested.",
              difficulty: "Medium"
            },
            {
              id: "python",
              name: "Python",
              label: "Fastest to Learn",
              desc: "Very clean syntax. Perfect for rapid coding, data pipelines, and implementing modern machine learning/AI workflows.",
              pros: "Excellent for quick coding scripts and AI tool prompts.",
              difficulty: "Easy"
            },
            {
              id: "js",
              name: "JavaScript",
              label: "Full-Stack Centric",
              desc: "Powering the modern web. Choose this if you want to jump straight into dynamic interfaces, browser systems, and backend servers.",
              pros: "Universal web usage, fast prototype rendering.",
              difficulty: "Medium"
            }
          ].map(lang => (
            <div 
              key={lang.id} 
              onClick={() => setSelectedLanguage(lang.id as any)}
              className={`p-6 border rounded-[2rem] cursor-pointer transition-all flex flex-col justify-between h-[250px] relative overflow-hidden group ${
                selectedLanguage === lang.id
                  ? "bg-zinc-900 border-violet-500/50 text-zinc-100 shadow-xl shadow-violet-500/5"
                  : "bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:bg-zinc-900/50"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                    selectedLanguage === lang.id ? "bg-violet-500/10 text-violet-400 border border-violet-500/25" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                  }`}>
                    {lang.label}
                  </span>
                  <span className="text-[10px] text-zinc-455 font-bold uppercase tracking-widest">Diff: {lang.difficulty}</span>
                </div>
                <h3 className={`text-xl font-black transition-colors ${selectedLanguage === lang.id ? "text-violet-400" : "text-white"}`}>
                  {lang.name}
                </h3>
                <p className="text-sm leading-relaxed font-normal text-zinc-300">{lang.desc}</p>
              </div>
              <div className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 pt-4 border-t border-zinc-900">
                <strong>Key Focus</strong>: {lang.pros}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Phase Roadmap Timeline Explorer */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            02
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">The 4-Phase Chronological Timeline</h2>
        </div>

        <div className="border border-zinc-900 rounded-[2.5rem] bg-zinc-950/20 overflow-hidden shadow-2xl p-6 md:p-8 space-y-8">
          {/* Timeline selector tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar border-b border-zinc-900/60">
            {phases.map((ph, idx) => (
              <button
                key={ph.id}
                onClick={() => setActivePhase(idx)}
                className={`px-5 py-3.5 rounded-2xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all border shrink-0 flex flex-col items-start gap-0.5 ${
                  activePhase === idx
                    ? "bg-zinc-900 border-zinc-800 text-violet-400"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="text-[9px] text-zinc-450 font-mono font-bold tracking-wider">{ph.duration}</span>
                {ph.title.split(": ")[1]}
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
            >
              {/* Goal Card */}
              <div className="lg:col-span-1 p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-[10px] text-violet-400 font-mono font-bold tracking-widest uppercase">
                    Phase {phases[activePhase].id} Goal
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {phases[activePhase].subtitle}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {phases[activePhase].goal}
                  </p>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center gap-3">
                  <Target className="w-5 h-5 text-violet-500 shrink-0" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Duration: {phases[activePhase].duration}
                  </span>
                </div>
              </div>

              {/* Learning Sections Checklist */}
              <div className="lg:col-span-2 space-y-6">
                {phases[activePhase].sections.map((sect, sIdx) => (
                  <div key={sIdx} className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
                    <h4 className="text-white font-black text-base flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                      {sect.title}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm text-zinc-300 font-normal pl-6 list-disc">
                      {sect.items.map((item, iIdx) => (
                        <li key={iIdx} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                    <div className="text-xs text-zinc-300 border-t border-zinc-900 pt-3 flex items-start gap-1.5 italic font-normal">
                      <span className="font-bold text-violet-400">Focus Tip:</span>
                      <span>{sect.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Project Showcase Cards */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            03
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Three Recommended Projects</h2>
        </div>
        <p className="text-base text-zinc-300 leading-relaxed font-normal">
          Say goodbye to generic tutorial clones. Build and deploy these three projects to make your resume stand out in 2026:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {[
            {
              title: "1. Full-Stack Auth Application",
              desc: "A production-grade app with token validation, sessions, secure password hashes, password recovery loops, and clean routing protection.",
              tech: ["React", "Node.js", "Express", "MongoDB/SQL"],
              icon: Code2,
              impact: "Demonstrates baseline full-stack database security understanding."
            },
            {
              title: "2. Real-Time Operations Portal",
              desc: "A rich admin dashboard tracking dynamic variables, filtering tables, displaying chart modules, and handling fast JSON database interactions.",
              tech: ["React.js", "Tailwind CSS", "PostgreSQL", "Charts.js"],
              icon: Monitor,
              impact: "Shows database indexing, joining, and rendering optimization capacity."
            },
            {
              title: "3. AI-Integrated Agent App",
              desc: "An intelligent web app that queries LLM APIs to scan text inputs, extract structure variables, format responses, and automate workflows.",
              tech: ["React", "OpenAI/Gemini API", "Node.js", "Vercel"],
              icon: Sparkles,
              impact: "Proves that you know how to build value using 2026 AI tool structures."
            }
          ].map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div 
                key={idx} 
                className="p-6 bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 rounded-[2rem] flex flex-col justify-between h-[320px] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-extrabold text-base leading-snug">{proj.title}</h3>
                  <p className="text-zinc-300 text-sm font-normal leading-relaxed">{proj.desc}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-900/60">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-zinc-950 text-[9px] font-mono text-zinc-400 border border-zinc-900 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-violet-400/90 font-mono font-bold block">
                    🚀 {proj.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strategy Loop flow */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            04
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">The Placement Strategy Loop</h2>
        </div>
        <p className="text-base text-zinc-300 leading-relaxed font-normal">
          Follow this exact tactical sequence. Do not jump stages—depth and consistency are your greatest defense mechanism in 2026.
        </p>

        {/* Visualized flow path */}
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-8 overflow-x-auto no-scrollbar scrollbar-thin">
          <div className="flex items-center justify-between min-w-[900px] gap-4">
            {[
              { title: "Basics", desc: "Choose One Language" },
              { title: "DSA + Aptitude", desc: "Daily Problem Sets" },
              { title: "Skills + GitHub", desc: "Build & Deploy Apps" },
              { title: "CS Core", desc: "SQL, OOPs & OS" },
              { title: "Resume Setup", desc: "One Page Only" },
              { title: "Applications", desc: "Mass Apply Daily" }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 flex-1 last:flex-initial">
                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-center flex-1 space-y-2 hover:border-zinc-800 transition-colors">
                  <span className="text-[10px] font-bold font-mono text-violet-400">Step 0{idx + 1}</span>
                  <h4 className="text-white font-black text-sm">{step.title}</h4>
                  <p className="text-[10px] text-zinc-400 font-normal leading-none">{step.desc}</p>
                </div>
                {idx < 5 && (
                  <ChevronRight className="w-5 h-5 text-zinc-700 animate-pulse shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mistakes Traps Cards */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            05
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Biggest Placement Traps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {[
            {
              title: "1. Tutorial Hell",
              trap: "Watching hours of development tutorials and courses without closing the video player and writing lines of custom code.",
              escape: "Escape: Write code side-by-side. If a tutorial builds a feature, stop the video and rebuild it immediately from scratch."
            },
            {
              title: "2. Learning Too Many Things",
              trap: "Attempting to learn AI, Blockchain, Web3, DevOps, ML, and Cyber together to populate resume keywords.",
              escape: "Escape: Restrict your tools. Focus solely on Java+DSA and MERN Stack. Deep domain capacity beats shallow keyword list."
            },
            {
              title: "3. Ignoring Aptitude Prep",
              trap: "Believing technical DSA skills are enough. Failing the initial aptitude screens of service companies.",
              escape: "Escape: Dedicate at least 1 hour daily to logical and quantitative question sets."
            },
            {
              title: "4. Neglecting Soft Skills",
              trap: "Mumbling or failing to clearly explain database relationships or logic structures to non-technical interviewers.",
              escape: "Escape: Conduct recorded mock interviews or speak to peers. Practice explaining your projects out loud."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-4 hover:border-zinc-800 transition-colors">
              <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
                <AlertTriangle className="w-4.5 h-4.5" />
                <span>{item.title}</span>
              </div>
              <div className="space-y-2 text-sm font-normal leading-relaxed">
                <p className="text-zinc-300">
                  <strong className="text-zinc-400 font-bold">The Trap:</strong> {item.trap}
                </p>
                <p className="text-zinc-200">
                  <strong className="text-fuchsia-400 font-bold font-sans">The Solution:</strong> {item.escape}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CS core reference table */}
      <section className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 font-bold font-mono text-sm">
            06
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">CS Fundamentals Checklist</h2>
        </div>
        <p className="text-base text-zinc-300 leading-relaxed font-normal">
          Review this standard cheat sheet of computer science subjects frequently asked in core rounds:
        </p>

        <div className="overflow-x-auto border border-zinc-900 rounded-2xl shadow-xl scrollbar-thin">
          <table className="w-full min-w-[700px] md:min-w-0 text-left border-collapse bg-zinc-950/20 text-xs">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-zinc-900">
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Subject</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">High Frequency Topics</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Why it is requested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-violet-400 text-xs">DBMS & SQL</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-300">SQL Joins, ACID properties, Indexing, Normalization, transactions.</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-400">Validates basic capacity to read, write, and structure server database logic.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-violet-400 text-xs">OOPs Core</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-300">Inheritance, Polymorphism, Abstraction, Encapsulation, Interface vs Class.</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-400">Confirms object-oriented architecture and system clean coding habits.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-violet-400 text-xs">Operating Systems</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-300">Process vs Thread, Deadlocks, Paging, Virtual Memory, CPU scheduling.</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-400">Tests understanding of hardware interactions, processes execution, and memory allocation.</td>
              </tr>
              <tr className="hover:bg-zinc-900/10">
                <td className="px-6 py-5 font-bold font-mono text-violet-400 text-xs">Computer Networks</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-300">TCP/IP vs UDP, DNS lookup, HTTP/HTTPS methods, cookies, OSI layers.</td>
                <td className="px-6 py-5 text-sm font-normal text-zinc-400">Validates API communication, network handshakes, and basic web routing safety.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategy advice summary */}
      <footer className="relative z-10 p-6 md:p-8 border border-zinc-900 bg-zinc-950/40 rounded-[2rem] space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-400" /> A Final Strategy Reminder
        </h3>
        <p className="text-sm text-zinc-300 font-normal leading-relaxed">
          Your Tier-3 college can slow you down, but in 2026 it absolutely does not limit your trajectory. Build deep skill competence, ship your projects on-site with clean deployed URLs, practice explaining your code logic, and stay consistent. Hiring managers value developers who can build real systems over certificate collection.
        </p>
      </footer>
    </motion.div>
  );
}
