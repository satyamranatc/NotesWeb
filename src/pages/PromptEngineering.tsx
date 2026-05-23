import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Sparkles, Check, Copy, Zap } from "lucide-react";

export default function PromptEngineering() {
  const [activeTab, setActiveTab] = useState<"guide" | "builder">("guide");
  const [selectedRole, setSelectedRole] = useState("Senior React Developer");
  const [selectedTask, setSelectedTask] = useState("Write a component");
  const [constraint, setConstraint] = useState("Provide only code, no explanations");
  const [copied, setCopied] = useState(false);

  const roles = [
    "Senior React Developer",
    "Database Administrator (PostgreSQL)",
    "Cybersecurity Specialist",
    "DevOps Automation Engineer"
  ];

  const tasksMap: Record<string, string[]> = {
    "Senior React Developer": [
      "Write a component with hooks",
      "Refactor a heavy state hook",
      "Write unit tests with Jest"
    ],
    "Database Administrator (PostgreSQL)": [
      "Optimize a slow JOIN query",
      "Design schema for e-commerce orders",
      "Write a trigger function for audit logs"
    ],
    "Cybersecurity Specialist": [
      "Audit code for XSS/SQL Injection",
      "Generate secure JWT config rules",
      "Verify authorization middleware"
    ],
    "DevOps Automation Engineer": [
      "Write a multi-stage Dockerfile",
      "Configure a GitHub Action build workflow",
      "Write a Docker Compose file for microservices"
    ]
  };

  const getTaskPrompt = () => {
    switch (selectedTask) {
      case "Write a component with hooks":
        return "Write a highly optimized React functional component that fetches data from an API, manages loading and error states, and supports aborting the fetch request on unmount.";
      case "Refactor a heavy state hook":
        return "Refactor the following heavy state logic from a React component into a clean, reusable custom hook. Highlight the state variables and side-effects optimized.";
      case "Write unit tests with Jest":
        return "Write comprehensive unit tests using Vitest/Jest and React Testing Library for a login form component, testing loading states, invalid inputs, and form submission success.";
      case "Optimize a slow JOIN query":
        return "Analyze and optimize this SQL query joining orders, users, and product catalogs. The users table has 5M records. Suggest index creation statements.";
      case "Design schema for e-commerce orders":
        return "Design a third-normal-form (3NF) relational schema for an e-commerce platform tracking customers, orders, inventory stocks, and payments.";
      case "Write a trigger function for audit logs":
        return "Write a PostgreSQL trigger function that automatically inserts record versions into an audit log table whenever updates occur on the core 'accounts' table.";
      case "Audit code for XSS/SQL Injection":
        return "Review this controller code for security vulnerabilities, focusing on input sanitization, potential SQL Injection routes, and Cross-Site Scripting (XSS).";
      case "Generate secure JWT config rules":
        return "Write a Node.js utility configuring JSON Web Token creation with key rotation, short expiration times, and secure HttpOnly cookie settings.";
      case "Verify authorization middleware":
        return "Create an Express middleware that checks JWT authorization headers, extracts role information, and grants access strictly to specified client roles.";
      case "Write a multi-stage Dockerfile":
        return "Write a secure, production-ready multi-stage Dockerfile for a Next.js application, reducing the output image size below 150MB.";
      case "Configure a GitHub Action build workflow":
        return "Create a GitHub Actions CI/CD workflow that triggers on main branch pushes, runs linting/tests, builds the production package, and reports status.";
      case "Write a Docker Compose file for microservices":
        return "Write a docker-compose.yml setting up a React frontend, Node.js API gateway, PostgreSQL instance with persistent volumes, and Nginx reverse proxy.";
      default:
        return "Perform general systems architecture audit.";
    }
  };

  const generatedPrompt = `Act as an expert ${selectedRole}.
Task: ${getTaskPrompt()}
Constraints:
- ${constraint}
- Ensure code follows modern industry best practices.
- Output clean, well-commented code.`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto px-6 py-16 md:py-24"
    >
      {/* Header */}
      <header className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" /> AI & Prompt Engineering
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
          The Art of <span className="text-indigo-400">Prompt Design</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Learn to construct rigorous prompts, apply strict execution constraints, and transition from writing boilerplate syntax to architecting systems.
        </p>

        {/* Tab navigation */}
        <div className="flex gap-2 mt-10 border-b border-zinc-900 pb-px">
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "guide"
                ? "border-indigo-400 text-indigo-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Guide
          </button>
          <button
            onClick={() => {
              setActiveTab("builder");
              // Sync task selection if needed
              if (!tasksMap[selectedRole].includes(selectedTask)) {
                setSelectedTask(tasksMap[selectedRole][0]);
              }
            }}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "builder"
                ? "border-indigo-400 text-indigo-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Prompt Builder Tool
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === "guide" ? (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-24"
          >
            {/* Introduction Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-indigo-400">01.</span> From Logic to Intent
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base font-light">
                In classic programming, we write microscopic step-by-step logic. The machine acts completely mechanically. In the generative era, LLMs act as translators of intent. By writing a prompt, we establish the boundary parameters within which the model generates logic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Early Era</div>
                  <h4 className="text-white font-bold text-sm mb-1">Standard Logic</h4>
                  <p className="text-zinc-500 text-xs">C, Assembly, Heuristics. Manual memory allocation and instruction code.</p>
                </div>
                <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">ML Era</div>
                  <h4 className="text-white font-bold text-sm mb-1">Pattern Mining</h4>
                  <p className="text-zinc-500 text-xs">Decision trees, regressions. Writing math to find code rules automatically.</p>
                </div>
                <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">LLM Era</div>
                  <h4 className="text-white font-bold text-sm mb-1">Intent Frameworks</h4>
                  <p className="text-zinc-400 text-xs">Vibe coding, semantic instructions, prompt systems compiling logic.</p>
                </div>
              </div>
            </section>

            {/* Core Concepts */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-indigo-400">02.</span> Five Pillars of Prompt Design
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed">
                Think of an LLM as a brilliant junior engineer: they have encyclopedic knowledge, but zero context. They will fulfill specifications with total, literal compliance. To direct them, apply these five constraints:
              </p>

              <div className="space-y-4">
                {[
                  { title: "Clarity", desc: "Define fields, schemas, structures explicitly. Avoid generic requirements like 'build an authentication page' and specify security protocols, frameworks, and JWT storage details." },
                  { title: "Constraints", desc: "Prevent resource leakages and hallucinations. Instruct the model what it CANNOT do. Explicitly ban deprecated packages, external frameworks, or markdown comments." },
                  { title: "Context", desc: "Provide codebase architectures, DB schemas, or target execution runtimes. An LLM works better when it understands the macro-level software system design." },
                  { title: "Iteration", desc: "Build in stages. Begin with basic skeletons, verify compiling, and then prompt for optimization (e.g. 'convert this O(N^2) array lookup to a HashMap lookup')." },
                  { title: "Few-Shot Examples", desc: "Provide input-output structural samples. Showing structured patterns (like JSON schema instances) enforces output uniformity." }
                ].map((concept, i) => (
                  <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-900 hover:border-zinc-850 rounded-2xl transition-colors">
                    <h3 className="text-zinc-200 font-bold text-sm mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-mono">{i + 1}</span>
                      {concept.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light pl-7">{concept.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prompting Patterns */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-indigo-400">03.</span> Role-Task-Constraint Pattern
              </h2>
              <p className="text-zinc-400 leading-relaxed font-light">
                Structuring inputs with explicit role models and boundaries forces the LLM to restrict its semantic search parameters to relevant domains.
              </p>
              
              <div className="bg-[#0b0c10] border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-indigo-500/10">
                  <Cpu className="w-24 h-24" />
                </div>
                <h4 className="text-indigo-400 text-xs uppercase tracking-widest font-bold">Standard Formula</h4>
                <div className="space-y-3 font-mono text-xs md:text-sm text-zinc-300">
                  <p><span className="text-zinc-550">[ROLE]:</span> "Act as a principal DevOps Engineer."</p>
                  <p><span className="text-zinc-550">[TASK]:</span> "Configure a secure Nginx reverse proxy configuration."</p>
                  <p><span className="text-zinc-550">[CONSTRAINTS]:</span> "Forward headers, block traffic exceeding 100 req/min, return only config syntax."</p>
                </div>
              </div>
            </section>

            {/* Before and After Cases */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-indigo-400">04.</span> Before & After Transformations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Case 1 */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-[9px] font-bold uppercase tracking-wider">
                    Amateur Prompt
                  </div>
                  <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl min-h-[140px] text-xs font-light text-zinc-400 leading-relaxed">
                    "Write code to parse this text block and get usernames and ages."
                    <div className="text-[10px] text-zinc-550 mt-4 border-t border-zinc-900 pt-2 font-bold uppercase">
                      Result: Explanatory text containing markdown blocks and unstructured text.
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                    Senior Prompt
                  </div>
                  <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl min-h-[140px] text-xs font-light text-zinc-300 leading-relaxed">
                    "Extract usernames and age variables from this text. Format output as a valid JSON array of objects conforming to schema: <code className="text-indigo-400">{'[{ "username": string, "age": integer }]'}</code>. Do not write markdown tags or text."
                    <div className="text-[10px] text-emerald-400 mt-4 border-t border-zinc-900 pt-2 font-bold uppercase">
                      Result: Clean compiled JSON array, ready for application parser.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="p-6 md:p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-400" /> Interactive Prompt Constructor
                </h3>
                <p className="text-zinc-500 text-xs font-light">
                  Dynamically adjust the role configuration, task description, and formatting constraints to build optimized prompts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Role select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => {
                      const role = e.target.value;
                      setSelectedRole(role);
                      setSelectedTask(tasksMap[role][0]);
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Task select */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Select Task Template</label>
                  <select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                  >
                    {tasksMap[selectedRole].map((task) => (
                      <option key={task} value={task}>{task}</option>
                    ))}
                  </select>
                </div>

                {/* Constraint select */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Format Constraint</label>
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) => setConstraint(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700"
                    placeholder="Enter custom formatting constraints..."
                  />
                </div>
              </div>
            </div>

            {/* Compiled Prompt View */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Generated Output Prompt</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {generatedPrompt}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
