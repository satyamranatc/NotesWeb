import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, FileText, Layout, Monitor, Cpu, Database, Link2, Key, Layers, 
  GitBranch, ShieldCheck, Server, Globe, Activity, TrendingUp, RefreshCw, 
  AlertTriangle, Play, Check, User
} from "lucide-react";

// Types
interface Step {
  id: number;
  name: string;
  category: "Discovery" | "Design" | "Engineering" | "Storage & Services" | "Operations & Scaling" | "Evolution" | "Security";
  icon: React.ComponentType<any>;
  description: string;
  questions: string[];
  examples: string[];
  tools: string[];
  accentClass: string;
  bgAccentClass: string;
}

// 18 Steps list
const steps: Step[] = [
  {
    id: 1,
    name: "Problem / Idea Phase",
    category: "Discovery",
    icon: Brain,
    description: "Before coding, define the purpose. What problem are we solving? Who are the target users? What is the medium (web, mobile, desktop)? Real-world scale starts here.",
    questions: [
      "What core problem does this application solve?",
      "Who are our primary target users?",
      "Is real-time functionality or low latency required?",
      "Is this a single-user tool or will it host millions of users?"
    ],
    examples: [
      "A food delivery app mapping local restaurant menus to hungry users.",
      "An AI-powered hospital management platform streamlining doctor-patient schedules."
    ],
    tools: ["Miro", "Figma Jam", "Productboard", "Google Workspace"],
    accentClass: "text-cyan-400 border-cyan-500/30",
    bgAccentClass: "bg-cyan-500/10"
  },
  {
    id: 2,
    name: "Planning & Requirements",
    category: "Discovery",
    icon: FileText,
    description: "Establish features, budgets, timelines, and roles. Clearly segregate features into functional requirements (e.g. login, payment integration) and non-functional requirements (e.g. latency under 100ms, data redundancy).",
    questions: [
      "What are the functional requirements (features users interact with)?",
      "What are the non-functional requirements (security, availability, throughput)?",
      "What is the development timeline, sprint velocity, and budget allocation?"
    ],
    examples: [
      "Functional Requirement: 'Users must be able to securely login and link their credit cards.'",
      "Non-Functional Requirement: 'The application must support up to 50,000 concurrent database connections without latency degradation.'"
    ],
    tools: ["Jira", "Confluence", "Trello", "Asana"],
    accentClass: "text-indigo-400 border-indigo-500/30",
    bgAccentClass: "bg-indigo-500/10"
  },
  {
    id: 3,
    name: "UI/UX Design",
    category: "Design",
    icon: Layout,
    description: "Design user interfaces, visual assets, brand styling, typography, component hierarchies, and interactive layouts prior to writing frontend code.",
    questions: [
      "How does the user logically navigate through the interface?",
      "What UI/UX component library or design tokens will the project reuse?",
      "Are target layouts responsive across mobile, tablet, and widescreen monitors?"
    ],
    examples: [
      "Creating interactive low-fidelity wireframes followed by high-fidelity clickable mockups of user checkout dashboards."
    ],
    tools: ["Figma", "Adobe XD", "Sketch", "Framer"],
    accentClass: "text-purple-400 border-purple-500/30",
    bgAccentClass: "bg-purple-500/10"
  },
  {
    id: 4,
    name: "Frontend Development",
    category: "Engineering",
    icon: Monitor,
    description: "Building the visible user interface. Handles rendering layout nodes, global state management, routing, client-side validation, caching, and calling backend services.",
    questions: [
      "Which framework/library is appropriate (React, Vue, Next.js, Flutter)?",
      "How will global application state be managed (Redux, Zustand, Context)?",
      "How do we handle responsive styling and accessibility (ARIA, semantical HTML)?"
    ],
    examples: [
      "Developing a responsive single-page web app using React, Vite, and Tailwind CSS."
    ],
    tools: ["React", "Next.js", "Vite", "Tailwind CSS", "Zustand", "TypeScript"],
    accentClass: "text-sky-400 border-sky-500/30",
    bgAccentClass: "bg-sky-500/10"
  },
  {
    id: 5,
    name: "Backend Development",
    category: "Engineering",
    icon: Cpu,
    description: "The engine and brain of the application. Processes business logic, executes database queries, handles payments, validates inputs, handles sessions, and builds REST or GraphQL routes.",
    questions: [
      "What programming language matches our performance needs (Python, Node.js, Java, Go)?",
      "How is routing, middleware checks, and global error handling structured?",
      "How is communication with databases and caching systems established?"
    ],
    examples: [
      "Developing API endpoints using Spring Boot or Express, implementing order validation and processing logic."
    ],
    tools: ["Node.js / Express", "Python / FastAPI", "Java / Spring Boot", "Go / Gin", "Django"],
    accentClass: "text-rose-400 border-rose-500/30",
    bgAccentClass: "bg-rose-500/10"
  },
  {
    id: 6,
    name: "Database Layer",
    category: "Storage & Services",
    icon: Database,
    description: "Persistent data storage. Structured transactional databases (SQL) store tabular relationships, while flexible document collections (NoSQL) capture nested objects and high-velocity logs.",
    questions: [
      "Does the data model require strict relational tables (SQL) or flexible JSON documents (NoSQL)?",
      "What indexing and query optimization strategies are required?",
      "How do we secure connection pools, data migration strategies, and backups?"
    ],
    examples: [
      "SQL: PostgreSQL for ledger transactions. NoSQL: MongoDB for unstructured product catalogs."
    ],
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase Database"],
    accentClass: "text-emerald-400 border-emerald-500/30",
    bgAccentClass: "bg-emerald-500/10"
  },
  {
    id: 7,
    name: "APIs / Communication",
    category: "Storage & Services",
    icon: Link2,
    description: "The communication network between clients and servers. Common formats include REST (standard endpoints), GraphQL (client-defined queries), WebSockets (real-time channels), and gRPC (high-performance RPC).",
    questions: [
      "Which communication protocol is best suited for the data transfer demands?",
      "How do we version endpoints (e.g. `/api/v1/...`) to avoid breaking API client integrations?",
      "What is the payload structure (JSON, XML, or binary Protobuf)?"
    ],
    examples: [
      "Client requests `GET /api/v1/orders/12` and receives a structured JSON payload representing order items."
    ],
    tools: ["Postman", "REST APIs", "GraphQL", "WebSockets", "gRPC"],
    accentClass: "text-amber-400 border-amber-500/30",
    bgAccentClass: "bg-amber-500/10"
  },
  {
    id: 8,
    name: "Auth & Authorization",
    category: "Security",
    icon: Key,
    description: "Authentication validates identity ('Who are you?'), while Authorization verifies permissions ('What are you allowed to do?'). Crucial for secure client-server architectures.",
    questions: [
      "How do we safely authenticate users (JWT tokens, Sessions, OAuth2)?",
      "How do we enforce Role-Based Access Control (RBAC) across server routes?",
      "How are user passwords hashed in the database?"
    ],
    examples: [
      "Authentication: User logs in and receives a signature-verified JWT token.",
      "Authorization: Checks token claims and blocks standard users from executing a database deletion."
    ],
    tools: ["JWT", "Auth0", "Clerk", "Firebase Auth", "bcrypt"],
    accentClass: "text-teal-400 border-teal-500/30",
    bgAccentClass: "bg-teal-500/10"
  },
  {
    id: 9,
    name: "Backend as a Service (BaaS)",
    category: "Storage & Services",
    icon: Layers,
    description: "Managed backend infrastructure providing cloud databases, user auth, and file storage. Allows accelerated development of MVPs without writing custom backend servers.",
    questions: [
      "Does this application benefit from serverless, cloud-managed backends?",
      "How do we manage database access rules securely from client-side direct calls?"
    ],
    examples: [
      "Building a chat prototype in a day using Firebase Firestore for instant message sync and Firebase Auth."
    ],
    tools: ["Firebase", "Supabase", "PocketBase", "Appwrite"],
    accentClass: "text-violet-400 border-violet-500/30",
    bgAccentClass: "bg-violet-500/10"
  },
  {
    id: 10,
    name: "Version Control",
    category: "Engineering",
    icon: GitBranch,
    description: "Collaborative code tracking system. Enables developers to work on parallel features (branches), conduct code reviews, track repository history, and safely rollback changes.",
    questions: [
      "What branching strategy is preferred (GitFlow, trunk-based, feature-branching)?",
      "How do we review, approve, and merge Pull Requests securely?",
      "How do we resolve code conflicts between team members?"
    ],
    examples: [
      "Creating a feature branch `feature/otp-login`, committing changes, pushing to GitHub, and getting a team leader's code review."
    ],
    tools: ["Git", "GitHub", "GitLab", "Bitbucket"],
    accentClass: "text-cyan-400 border-cyan-500/30",
    bgAccentClass: "bg-cyan-500/10"
  },
  {
    id: 11,
    name: "Testing & Quality",
    category: "Design", // Re-categorized/Visual grouping
    icon: ShieldCheck,
    description: "Automated verification routines. Features Unit tests (testing functions in isolation), Integration tests (modules collaborating), and End-to-End tests (simulating browser-user scenarios).",
    questions: [
      "How much code coverage is acceptable to maintain application stability?",
      "Are APIs tested automatically for expected schemas and status response codes?",
      "Do we run browser test scripts before committing code to production?"
    ],
    examples: [
      "Writing a Jest script to verify that database items are formatted correctly before being returned by a route."
    ],
    tools: ["Jest", "Vitest", "Playwright", "Cypress", "JUnit"],
    accentClass: "text-indigo-400 border-indigo-500/30",
    bgAccentClass: "bg-indigo-500/10"
  },
  {
    id: 12,
    name: "DevOps & Infrastructure",
    category: "Operations & Scaling",
    icon: Server,
    description: "Automating compilation, integration, and container setups. DevOps packages code in isolated boxes (containers) and builds automation pipelines (CI/CD) to test code on every commit.",
    questions: [
      "How do we package the application so it runs identically in dev, staging, and production?",
      "How do we automate tests and compiles on code push?",
      "How is our network architecture (VPCs, domains, reverse proxies) defined?"
    ],
    examples: [
      "Writing a Dockerfile to package a backend server, and setting up a GitHub Actions workflow to build and test it."
    ],
    tools: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "Terraform"],
    accentClass: "text-purple-400 border-purple-500/30",
    bgAccentClass: "bg-purple-500/10"
  },
  {
    id: 13,
    name: "Deployment",
    category: "Operations & Scaling",
    icon: Globe,
    description: "Hosting the live code on internet-facing cloud architectures. Frontends are deployed to global content networks, while backends run on scalable cloud clusters.",
    questions: [
      "Where should our frontends and API servers be hosted for maximum global speed?",
      "Do we utilize Serverless Functions (AWS Lambda) or persistent Virtual Machines (EC2)?",
      "How do we perform database migrations under zero-downtime guidelines?"
    ],
    examples: [
      "Hosting a static React website on Vercel CDN network and deploying a Node server container to AWS ECS or Railway."
    ],
    tools: ["AWS", "Vercel", "Railway", "Render", "Netlify"],
    accentClass: "text-sky-400 border-sky-500/30",
    bgAccentClass: "bg-sky-500/10"
  },
  {
    id: 14,
    name: "Monitoring & Analytics",
    category: "Operations & Scaling",
    icon: Activity,
    description: "Tracking runtime stability in production. Sinks metrics on CPU loads, memory footprint, request latencies, and application error traces to trigger real-time developer alerts.",
    questions: [
      "Is the application currently healthy and available?",
      "Are users facing runtime execution exceptions?",
      "How do developers receive crash alerts (Slack notifications, emails)?"
    ],
    examples: [
      "Setting up Sentry to capture a database lookup exception and alert the development team instantly before users submit support tickets."
    ],
    tools: ["Sentry", "Grafana", "Prometheus", "Datadog", "LogRocket"],
    accentClass: "text-rose-400 border-rose-500/30",
    bgAccentClass: "bg-rose-500/10"
  },
  {
    id: 15,
    name: "Scaling",
    category: "Operations & Scaling",
    icon: TrendingUp,
    description: "Designing for traffic. Load balancers split request queues, caches (Redis) remember database records, CDNs serve global visual assets close to users, and horizontal instances spawn dynamically.",
    questions: [
      "How do we manage traffic spikes without database starvation?",
      "Can we save DB bandwidth by caching read-heavy endpoints?",
      "Are server clusters capable of autoscaling based on CPU usage?"
    ],
    examples: [
      "Placing Redis in front of PostgreSQL to cache product details, reducing direct database queries by 85%."
    ],
    tools: ["Redis", "Nginx Load Balancers", "Cloudflare CDN", "AWS Auto Scaling"],
    accentClass: "text-emerald-400 border-emerald-500/30",
    bgAccentClass: "bg-emerald-500/10"
  },
  {
    id: 16,
    name: "Security Auditing",
    category: "Security",
    icon: ShieldCheck,
    description: "Protecting the system against threats. Secure servers enforce HTTPS encryption, prevent SQL injection, sanitize inputs, restrict domain permissions, and implement rate limits against brute force.",
    questions: [
      "Is all client-server traffic strictly encrypted via HTTPS?",
      "Are database queries protected against malicious script inputs (SQL injection)?",
      "Do we utilize rate limiters to block malicious DDoS or scraper bots?"
    ],
    examples: [
      "Using parameterized database queries (like Prisma ORM or prepared SQL statements) to eliminate SQL injection vulnerabilities."
    ],
    tools: ["OWASP Top 10", "Helmet.js", "Cloudflare WAF", "Vault Secrets"],
    accentClass: "text-amber-400 border-amber-500/30",
    bgAccentClass: "bg-amber-500/10"
  },
  {
    id: 17,
    name: "Maintenance & Updates",
    category: "Evolution",
    icon: RefreshCw,
    description: "Continuous care of the deployed app. Resolves runtime bugs, updates third-party libraries to patch security exploits, and runs database indexing migrations to speed up queries.",
    questions: [
      "How are node packages or Java dependencies audited for security threats?",
      "How do we deploy database migrations without locking operational tables?"
    ],
    examples: [
      "Running package vulnerability checks and releasing hotfixes to patch security holes in server dependencies."
    ],
    tools: ["Dependabot", "Snyk", "npm audit", "Flyway / Prisma Migrate"],
    accentClass: "text-teal-400 border-teal-500/30",
    bgAccentClass: "bg-teal-500/10"
  },
  {
    id: 18,
    name: "Product Evolution",
    category: "Evolution",
    icon: TrendingUp,
    description: "Evolving features based on data. Product managers study user conversion funnels, click mapping, and feature engagement patterns to outline the next roadmap iteration.",
    questions: [
      "Are users successfully converting through the purchase funnel?",
      "Which features are rarely engaged or cause page exits?",
      "How can A/B experiments guide the UI refinement?"
    ],
    examples: [
      "Using A/B tests to check if a simplified checkout layout improves completed orders by 15%."
    ],
    tools: ["Google Analytics", "Mixpanel", "Hotjar", "PostHog"],
    accentClass: "text-violet-400 border-violet-500/30",
    bgAccentClass: "bg-violet-500/10"
  }
];

export default function SE_Industry() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  // Request Flow Simulator State
  const [simulatorStep, setSimulatorStep] = useState<"idle" | "client" | "api" | "backend" | "db" | "success">("idle");
  const [simulatorLogs, setSimulatorLogs] = useState<string[]>([]);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState<boolean>(false);

  // SQL vs NoSQL State
  const [activeDbTab, setActiveDbTab] = useState<"sql" | "nosql">("sql");
  const [simulatedDbOutput, setSimulatedDbOutput] = useState<string>("// Click the buttons below to generate data templates");

  // Auth & Authz State
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [authTokenValid, setAuthTokenValid] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<"Guest" | "Developer" | "Admin">("Guest");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authzLogs, setAuthzLogs] = useState<string[]>([]);

  // Function: Trigger Simulator
  const runSimulator = () => {
    if (isSimulatorRunning) return;
    setIsSimulatorRunning(true);
    setSimulatorLogs(["🚀 Request initiated: User clicks 'Buy Ticket'"]);
    setSimulatorStep("client");

    setTimeout(() => {
      setSimulatorStep("api");
      setSimulatorLogs(prev => [
        ...prev, 
        "📡 Client calls API endpoint: POST /api/v1/orders",
        "🛎️ API Gateway (Waiter) receives request, checks CORS policy, and forwards payload"
      ]);

      setTimeout(() => {
        setSimulatorStep("backend");
        setSimulatorLogs(prev => [
          ...prev, 
          "🧠 Backend (Brain) receives request",
          "🔐 Decrypting Auth header: JWT valid, User ID extracted",
          "🛡️ Verification: User authorized to create order",
          "📈 Creating query model using Prisma/Hibernate ORM (No direct SQL endpoint exposed to client!)"
        ]);

        setTimeout(() => {
          setSimulatorStep("db");
          setSimulatorLogs(prev => [
            ...prev, 
            "🗄️ Database receives prepared query from Backend Driver",
            "⚡ SQL Executed: INSERT INTO Orders (user_id, item_id) VALUES (42, 908)",
            "💾 Data written to persistent SSD storage",
            "↩️ Database returns Success status & ID: #78291 to Backend Driver"
          ]);

          setTimeout(() => {
            setSimulatorStep("backend");
            setSimulatorLogs(prev => [
              ...prev, 
              "🧠 Backend registers DB response",
              "📦 Assembling JSON response: { orderId: 78291, status: 'confirmed' }"
            ]);

            setTimeout(() => {
              setSimulatorStep("api");
              setSimulatorLogs(prev => [
                ...prev, 
                "🛎️ API receives JSON from Backend and sends it back as HTTP 201 Created Response"
              ]);

              setTimeout(() => {
                setSimulatorStep("success");
                setSimulatorLogs(prev => [
                  ...prev, 
                  "🎉 Client renders UI: 'Order Confirmed! Your Ticket is booked.'",
                  "✅ Pipeline lifecycle complete!"
                ]);
                setIsSimulatorRunning(false);
              }, 600);
            }, 600);
          }, 700);
        }, 850);
      }, 850);
    }, 700);
  };

  const resetSimulator = () => {
    setSimulatorStep("idle");
    setSimulatorLogs([]);
    setIsSimulatorRunning(false);
  };

  // Generate DB Code examples
  const generateDbExample = (type: "sql-insert" | "sql-select" | "nosql-insert" | "nosql-select") => {
    if (type === "sql-insert") {
      setSimulatedDbOutput(`-- SQL: Strict Structured Schema Insertion
INSERT INTO users (id, name, email, role, created_at)
VALUES (101, 'Satyam Rana', 'satyam@prime.com', 'Admin', NOW());

INSERT INTO orders (id, user_id, amount, status)
VALUES (7829, 101, 1500.00, 'PAID'); -- Foreign key link to users table`);
    } else if (type === "sql-select") {
      setSimulatedDbOutput(`-- SQL: Relational Join Query
SELECT users.name, orders.amount, orders.status
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE users.email = 'satyam@prime.com';`);
    } else if (type === "nosql-insert") {
      setSimulatedDbOutput(`// NoSQL: Flexible Document Insertion (MongoDB Collection)
db.users.insertOne({
  name: "Satyam Rana",
  email: "satyam@prime.com",
  role: "Admin",
  meta: {
    lastLogin: ISODate("2026-05-26T14:30:00Z"),
    skills: ["React", "Spring Boot", "Docker"]
  },
  orders: [ // Nested documents - no strict foreign keys needed
    { id: 7829, amount: 1500.00, status: "PAID", date: new Date() }
  ]
});`);
    } else if (type === "nosql-select") {
      setSimulatedDbOutput(`// NoSQL: Document Filter and Projection
db.users.find(
  { email: "satyam@prime.com" },
  { name: 1, "orders.amount": 1, "orders.status": 1, _id: 0 }
);`);
    }
  };

  // Auth Simulation Functions
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setGeneratedToken(null);
    setAuthTokenValid(false);

    if (emailInput.toLowerCase() === "satyam@prime.com" && passwordInput === "admin123") {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({
        sub: "user_101",
        email: "satyam@prime.com",
        role: selectedRole,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor((Date.now() + 3600000) / 1000)
      }));
      const signature = "signature_256_hash_value";
      const token = `${header}.${payload}.${signature}`;

      setGeneratedToken(token);
      setAuthTokenValid(true);
      setAuthzLogs([`🔑 Authentication Successful: User identity verified as ${emailInput}. JWT issued.`]);
    } else {
      setAuthError("Invalid credentials! Try satyam@prime.com / admin123");
      setAuthzLogs([`❌ Authentication Failed: Password mismatch.`]);
    }
  };

  const testAuthorizedAction = (actionName: string, requiredRole: "Guest" | "Developer" | "Admin") => {
    let rolesHierarchy = { "Guest": 1, "Developer": 2, "Admin": 3 };
    let currentRoleScore = rolesHierarchy[selectedRole];
    let requiredRoleScore = rolesHierarchy[requiredRole];

    if (!authTokenValid) {
      setAuthzLogs(prev => [
        ...prev, 
        `🛑 ACCESS DENIED for [${actionName}]: User is not authenticated. Please log in first.`
      ]);
      return;
    }

    if (currentRoleScore >= requiredRoleScore) {
      setAuthzLogs(prev => [
        ...prev, 
        `🟢 ACCESS GRANTED for [${actionName}]: User role '${selectedRole}' satisfies requirements (needs '${requiredRole}').`
      ]);
    } else {
      setAuthzLogs(prev => [
        ...prev, 
        `🛑 ACCESS DENIED for [${actionName}]: Role '${selectedRole}' is insufficient. Required role is '${requiredRole}'.`
      ]);
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
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24 text-zinc-300"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[10px] font-bold uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Industry Knowledge Base
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Software Engineering <span className="text-teal-400">&amp; Industry Lifecycle</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          A real-world breakdown of the complete product pipeline—from initial discovery, ui design, and full-stack development to devops pipelines, load-balanced scaling, and post-launch maintenance.
        </p>
      </header>

      {/* Section 1: The 18 Steps Stepper */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-teal-400">01.</span> Complete SDLC Step-by-Step
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            Modern software engineering consists of many parallel roles and layers. Step through the timeline below to examine details, key questions, and industry standard tools for each phase.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-900">
          {(["Discovery", "Design", "Engineering", "Storage & Services", "Operations & Scaling", "Security", "Evolution"] as const).map(cat => {
            const stepsInCat = steps.filter(s => s.category === cat || (cat === "Security" && s.category === "Security"));
            const isSelected = stepsInCat.some(s => s.id === activeStepId);
            return (
              <button
                key={cat}
                onClick={() => {
                  const firstInCat = stepsInCat[0];
                  if (firstInCat) setActiveStepId(firstInCat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  isSelected 
                    ? "bg-teal-500/15 text-teal-400 border border-teal-500/25" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Visual Stepper Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-2">
          {steps.map(s => {
            const isActive = s.id === activeStepId;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStepId(s.id)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isActive 
                    ? "bg-zinc-900 border-teal-500/80 shadow-md scale-[1.05]" 
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-550 hover:text-zinc-300 hover:border-zinc-800"
                }`}
                title={s.name}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${isActive ? "text-teal-400" : ""}`} />
                <span className="font-mono text-xs font-bold leading-none">{String(s.id).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 bg-zinc-950 border border-zinc-900 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.03] pointer-events-none -mr-40 -mt-40 ${activeStep.bgAccentClass}`}></div>

            <div className="lg:col-span-7 space-y-6">
              {/* Category tag */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400">
                  Phase {activeStep.id} • {activeStep.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                  <span className="text-teal-400 font-mono">0{activeStep.id}.</span> {activeStep.name}
                </h3>
                <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {/* Key Questions */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Critical Questions Solved:</h4>
                <ul className="space-y-1.5">
                  {activeStep.questions.map((q, idx) => (
                    <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500/80 mt-1.5 shrink-0"></span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-900 pt-6 lg:pt-0 lg:pl-8 space-y-6">
              {/* Examples */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Real-World Sandbox Example:</h4>
                <div className="p-3.5 bg-zinc-900/30 border border-zinc-900/60 rounded-2xl space-y-2.5">
                  {activeStep.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-zinc-400 leading-normal font-light">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Industry Standard Tools:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.tools.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 rounded-xl text-xs font-semibold text-zinc-350 hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Section 2: Request Flow Simulator */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-teal-400">02.</span> Visual Request Pipeline Simulator
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            One of the most common beginner mistakes is assuming that backend and databases connect via APIs. In reality, the database is queried directly using **Drivers or ORMs** within the secure server environment, while **APIs** bridge the client app and the server.
          </p>
        </div>

        {/* Visual Pipeline Container */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950 p-6 md:p-8 space-y-8 relative shadow-xl">
          
          {/* Node Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Client (Frontend App) */}
            <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${
              simulatorStep === "client" 
                ? "bg-teal-500/10 border-teal-500 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]" 
                : "bg-zinc-900/35 border-zinc-900"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold text-zinc-500">Client Side</span>
                <Monitor className={`w-5 h-5 ${simulatorStep === "client" ? "text-teal-400" : "text-zinc-650"}`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Frontend Web App</h4>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-light">
                  Captures inputs, triggers events, handles local state, and fires API requests.
                </p>
              </div>
            </div>

            {/* API Gateway (The Waiter) */}
            <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 relative ${
              simulatorStep === "api" 
                ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                : "bg-zinc-900/35 border-zinc-900"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold text-zinc-500">API Gateway</span>
                <Link2 className={`w-5 h-5 ${simulatorStep === "api" ? "text-sky-400" : "text-zinc-650"}`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">HTTP API / Endpoint</h4>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-light">
                  Validates origins, blocks bad CORS headers, routes paths (e.g. <code>POST /orders</code>).
                </p>
              </div>
              {/* Connector line detail */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-0.5 bg-zinc-900 hidden md:block"></div>
            </div>

            {/* Server (Backend Brain) */}
            <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 relative ${
              simulatorStep === "backend" 
                ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                : "bg-zinc-900/35 border-zinc-900"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold text-zinc-500">Server Side</span>
                <Cpu className={`w-5 h-5 ${simulatorStep === "backend" ? "text-violet-400" : "text-zinc-650"}`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Backend Engine</h4>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-light">
                  Runs business controllers, applies validation laws, handles auth, and builds queries.
                </p>
              </div>
              {/* Connector line detail */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-0.5 bg-zinc-900 hidden md:block"></div>
            </div>

            {/* Database Layer */}
            <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 ${
              simulatorStep === "db" 
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]" 
                : "bg-zinc-900/35 border-zinc-900"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold text-zinc-500">Storage Layer</span>
                <Database className={`w-5 h-5 ${simulatorStep === "db" ? "text-emerald-400" : "text-zinc-650"}`} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Database Engine</h4>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-light">
                  Reads &amp; writes structured table indices or document fields directly onto disk.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex gap-2.5 justify-center">
            <button
              onClick={runSimulator}
              disabled={isSimulatorRunning}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              {isSimulatorRunning ? "Simulator Running..." : "Trigger Request Flow"}
            </button>
            <button
              onClick={resetSimulator}
              disabled={isSimulatorRunning}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Live Terminal logs */}
          <div className="bg-black/50 border border-zinc-900 rounded-2xl p-5 min-h-[160px] font-mono text-xs flex flex-col justify-between">
            <div className="space-y-1.5 overflow-y-auto max-h-[140px] scrollbar-thin">
              {simulatorLogs.length > 0 ? (
                simulatorLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <span className="text-teal-400 font-bold shrink-0">&gt;</span>
                    <span className="text-zinc-400 leading-normal">{log}</span>
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 italic text-center py-8">
                  Click 'Trigger Request Flow' to execute packet delivery.
                </div>
              )}
            </div>

            {simulatorStep === "success" && (
              <div className="mt-3 pt-3 border-t border-zinc-900 flex items-center justify-between text-emerald-400 font-sans font-extrabold uppercase text-[10px] tracking-widest">
                <span>Request status code</span>
                <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-mono">
                  201 Created
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: SQL vs NoSQL */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-teal-400">03.</span> SQL vs. NoSQL Database Playground
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            In modern application architecture, picking the right database format determines how easily you can run aggregations, write data, or alter schemas. Compare structured relationships against document collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DB Matrix card */}
          <div className="lg:col-span-5 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Structural Comparison</span>
              
              <div className="flex gap-2 p-1 bg-zinc-900 border border-zinc-850 rounded-xl">
                <button
                  onClick={() => setActiveDbTab("sql")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDbTab === "sql" ? "bg-zinc-850 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  SQL (Relational)
                </button>
                <button
                  onClick={() => setActiveDbTab("nosql")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDbTab === "nosql" ? "bg-zinc-850 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  NoSQL (Document)
                </button>
              </div>

              <div className="space-y-4 pt-2">
                {activeDbTab === "sql" ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Model Structure</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Strict relational tables with predefined rows, columns, and primary/foreign keys.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Scaling Pattern</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Vertical scaling (buying bigger servers with more CPU/RAM). Sharding is complex.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Best Use Case</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Banking systems, hospital patient link structures, eCommerce checkout ledgers (ACID compliance required).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Model Structure</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Flexible dynamic schema. Data is saved as JSON documents.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Scaling Pattern</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Horizontal scaling (partitioning documents across multiple database cluster nodes).
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Best Use Case</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Real-time logs, live chat platforms, user feeds, fluid product specifications where schema changes hourly.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex gap-2">
              {activeDbTab === "sql" ? (
                <>
                  <button 
                    onClick={() => generateDbExample("sql-insert")}
                    className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-850 text-[10px] font-bold text-zinc-350 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer"
                  >
                    SQL INSERT Template
                  </button>
                  <button 
                    onClick={() => generateDbExample("sql-select")}
                    className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-850 text-[10px] font-bold text-zinc-350 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer"
                  >
                    SQL JOIN Template
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => generateDbExample("nosql-insert")}
                    className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-850 text-[10px] font-bold text-zinc-350 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer"
                  >
                    NoSQL INSERT Template
                  </button>
                  <button 
                    onClick={() => generateDbExample("nosql-select")}
                    className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-850 text-[10px] font-bold text-zinc-350 hover:text-white rounded-lg border border-zinc-800 transition-all cursor-pointer"
                  >
                    NoSQL FIND Template
                  </button>
                </>
              )}
            </div>
          </div>

          {/* DB Code editor */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-black/40 border border-zinc-900 rounded-3xl p-5 min-h-[300px] font-mono text-[11px]">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3 text-zinc-550 uppercase tracking-widest text-[9px] font-bold">
              <span>Database Query Output</span>
              <span className="text-teal-500 font-bold">{activeDbTab.toUpperCase()} Shell</span>
            </div>
            
            <div className="flex-1 text-zinc-400 overflow-x-auto whitespace-pre leading-relaxed select-text font-mono no-scrollbar">
              {simulatedDbOutput}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-zinc-600 text-[10px]">
              <span>💡 Queries compiled locally on driver stack</span>
              <span>UTF-8 Connection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Auth & Authorization */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-teal-400">04.</span> Authentication vs. Authorization Playground
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            **Authentication** (AuthN) proves identity—who you are. **Authorization** (AuthZ) checks permission levels—what you are allowed to execute. Test the logic flow in this sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Auth Card */}
          <form 
            onSubmit={handleAuthSubmit}
            className="lg:col-span-5 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Authentication Gate</span>
              
              <div className="bg-zinc-900/30 border border-zinc-900/80 p-3 rounded-xl text-[10px] text-zinc-500 leading-relaxed">
                🔑 Credentials: <span className="text-zinc-400 font-mono">satyam@prime.com</span> / <span className="text-zinc-400 font-mono">admin123</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Email Address</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. satyam@prime.com"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 font-medium focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Password</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="e.g. admin123"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 font-medium focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Role Claim</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-700"
                  >
                    <option value="Guest">Guest (Read Only)</option>
                    <option value="Developer">Developer (Read/Write)</option>
                    <option value="Admin">Admin (All Access)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-900">
              {authError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}
              <button 
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
              >
                Simulate Authentication Login
              </button>
            </div>
          </form>

          {/* Authz Gate Card */}
          <div className="lg:col-span-7 p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Authorization Panel</span>
              
              <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  authTokenValid ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : "bg-zinc-900 text-zinc-600 border-zinc-850"
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-zinc-500">Session User Profile</div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {authTokenValid ? `satyam@prime.com (Role: ${selectedRole})` : "Anonymous (Unauthenticated)"}
                  </div>
                </div>
              </div>

              {authTokenValid && generatedToken && (
                <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1 font-mono text-[9px] text-zinc-500 break-all select-all">
                  <span className="text-[8px] font-bold text-teal-500 uppercase tracking-widest block">Active JWT Token Bearer:</span>
                  {generatedToken}
                </div>
              )}

              {/* Action grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => testAuthorizedAction("Read Wiki Notes", "Guest")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-850 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-bold text-xs">Read Wiki Notes</h5>
                    <p className="text-[9px] text-zinc-550 mt-0.5">Min Role: Guest</p>
                  </div>
                  <Check className="w-4 h-4 text-zinc-650" />
                </button>

                <button
                  onClick={() => testAuthorizedAction("Edit Page Content", "Developer")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-850 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-bold text-xs">Edit Page Content</h5>
                    <p className="text-[9px] text-zinc-550 mt-0.5">Min Role: Developer</p>
                  </div>
                  <Check className="w-4 h-4 text-zinc-650" />
                </button>

                <button
                  onClick={() => testAuthorizedAction("Delete User Database", "Admin")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-850 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-bold text-xs">Delete Database</h5>
                    <p className="text-[9px] text-zinc-550 mt-0.5">Min Role: Admin</p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-zinc-650" />
                </button>

                <button
                  onClick={() => testAuthorizedAction("Deploy App Servers", "Admin")}
                  className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-850 text-left transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-white font-bold text-xs">Deploy App Servers</h5>
                    <p className="text-[9px] text-zinc-550 mt-0.5">Min Role: Admin</p>
                  </div>
                  <Globe className="w-4 h-4 text-zinc-650" />
                </button>
              </div>
            </div>

            {/* Authz Action Logs */}
            <div className="bg-black/50 border border-zinc-900 rounded-2xl p-4 min-h-[90px] font-mono text-[10px] space-y-1.5 max-h-[110px] overflow-y-auto no-scrollbar">
              {authzLogs.length > 0 ? (
                authzLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold shrink-0">&gt;</span>
                    <span className="text-zinc-400 leading-normal">{log}</span>
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 italic py-4 text-center">
                  Trigger actions or authenticate above to inspect gateway logs.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Panel: Core Correction */}
      <section className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-teal-400" />
            Common Pitfall: 'We connect backend and database with APIs'
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            In standard architecture, databases do **NOT** expose REST APIs to the backend, and backends do not call database APIs to read or write data. Instead:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-2xl">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-black text-rose-400 block">❌ The Wrong Model</span>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                <code>Client ➔ REST API ➔ Backend ➔ REST API ➔ Database</code>
                <br />
                databases do not run web servers to host client endpoints. This is highly inefficient and creates security exploits.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest font-black text-teal-400 block">✅ The Industry Standard</span>
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                <code>Client ➔ REST/GraphQL API ➔ Backend (Driver/ORM) ➔ TCP Socket Database Query</code>
                <br />
                The Backend connects directly to the DB via secure, stateful network sockets using drivers/queries to read/write tables.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
