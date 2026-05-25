import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Server, Database, Shield, Zap, Terminal, Layers, 
  RotateCcw, Send, Check, Key, Lock
} from "lucide-react";
import CodeBlock from "../components/CodeBlock";

// Port Info Type
interface PortDetails {
  port: number;
  service: string;
  protocol: string;
  description: string;
  useCase: string;
  accentClass: string;
}

// Port data representing building rooms
const portsList: PortDetails[] = [
  {
    port: 80,
    service: "HTTP",
    protocol: "TCP",
    description: "HyperText Transfer Protocol - Default web traffic. Plain text, unencrypted, and vulnerable to snooping.",
    useCase: "Legacy websites, local redirection, or initial handshakes prior to upgrading to HTTPS.",
    accentClass: "border-sky-500/30 text-sky-400 bg-sky-500/10 hover:bg-sky-500/20"
  },
  {
    port: 443,
    service: "HTTPS",
    protocol: "TCP",
    description: "HyperText Transfer Protocol Secure - Encrypted via SSL/TLS. Protects credentials and private data.",
    useCase: "Standard production port for all web applications, APIs, and modern secure sites.",
    accentClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-200/20"
  },
  {
    port: 3000,
    service: "Node.js Server",
    protocol: "TCP",
    description: "Custom Node.js/Express app runner. Handles API routes, server side logic, and middlewares.",
    useCase: "Local development port for building REST APIs, backend microservices, or custom scripts.",
    accentClass: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20"
  },
  {
    port: 5173,
    service: "Vite App",
    protocol: "TCP",
    description: "Frontend development runner. Packs JavaScript/TypeScript and hot-reloads the user interface.",
    useCase: "Serving dev builds of modern React, Vue, or Svelte user interfaces locally.",
    accentClass: "border-rose-500/30 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20"
  },
  {
    port: 27017,
    service: "MongoDB",
    protocol: "TCP",
    description: "NoSQL document database default connection. Receives connection streams from backend application drivers.",
    useCase: "Storing user profiles, chat messages, or unstructured logging data in document format.",
    accentClass: "border-teal-500/30 text-teal-400 bg-teal-500/10 hover:bg-teal-500/20"
  },
  {
    port: 5432,
    service: "PostgreSQL",
    protocol: "TCP",
    description: "Relational database network link. Listens for SQL execution statements and transaction controls.",
    useCase: "Enterprise grade storage requiring acid compliance, foreign keys, or complex analytical query joins.",
    accentClass: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
  }
];

// Mock User interface for sandbox database
interface MockUser {
  id: number;
  name: string;
  age: number;
}

export default function BackendApiTheory() {
  // DNS lookup state
  const [dnsDomain, setDnsDomain] = useState("google.com");
  const [dnsStatus, setDnsStatus] = useState<"idle" | "resolving" | "resolved">("idle");
  const [dnsIp, setDnsIp] = useState("");
  const [dnsLogs, setDnsLogs] = useState<string[]>([]);
  
  // Active port selected in host building diagram
  const [selectedPort, setSelectedPort] = useState<PortDetails>(portsList[1]);

  // URL Segment selector
  const [selectedUrlPart, setSelectedUrlPart] = useState<string | null>(null);
  
  // REST API Simulator database state
  const [users, setUsers] = useState<MockUser[]>([
    { id: 1, name: "Satyam", age: 22 },
    { id: 2, name: "Alice", age: 24 }
  ]);
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "LOGIN">("GET");
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [loginEmail, setLoginEmail] = useState("satyam@gmail.com");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxResponse, setSandboxResponse] = useState<{ status: string; code: number; body: string; headers: string } | null>(null);
  const [sandboxAnimStep, setSandboxAnimStep] = useState<"idle" | "client-to-server" | "server-to-db" | "db-to-server" | "server-to-client">("idle");
  
  // HTTP vs WebSockets states
  const [activeSocketMode, setActiveSocketMode] = useState<"http" | "websocket">("http");
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketMessages, setSocketMessages] = useState<{ sender: "client" | "server"; text: string; time: string }[]>([]);
  const [wsInput, setWsInput] = useState("");
  const [socketLatency, setSocketLatency] = useState<number | null>(null);
  const [httpStatusText, setHttpStatusText] = useState("Idle");
  
  // Middleware states
  const [allowCors, setAllowCors] = useState(true);
  const [sendAuth, setSendAuth] = useState(true);
  const [middlewareAnimStep, setMiddlewareAnimStep] = useState<"idle" | "cors" | "auth" | "parser" | "handler" | "blocked" | "success">("idle");
  const [middlewareLogs, setMiddlewareLogs] = useState<string[]>([]);
  const [middlewareLoading, setMiddlewareLoading] = useState(false);

  // DNS Resolver logic
  const handleDnsResolve = () => {
    setDnsStatus("resolving");
    setDnsLogs(["🔍 Initiating resolution request...", "🛰️ Contacting ISP local DNS Cache..."]);
    
    setTimeout(() => {
      setDnsLogs(prev => [...prev, "❌ Cache Miss! Querying Root Name Server..."]);
      setTimeout(() => {
        setDnsLogs(prev => [...prev, "🌐 Root redirected to Top-Level Domain (.com) Nameserver..."]);
        setTimeout(() => {
          setDnsLogs(prev => [...prev, "🏢 TLD resolved to Authoritative DNS for target domain..."]);
          setTimeout(() => {
            let finalIp = "";
            switch (dnsDomain.trim().toLowerCase()) {
              case "google.com":
                finalIp = "142.250.183.14";
                break;
              case "instagram.com":
                finalIp = "157.240.22.174";
                break;
              case "youtube.com":
                finalIp = "172.217.16.142";
                break;
              case "localhost":
                finalIp = "127.0.0.1";
                break;
              default:
                // Generate a consistent pseudo-random IP
                const hash = dnsDomain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
                finalIp = `192.168.${hash % 255}.${(hash * 3) % 255}`;
            }
            setDnsLogs(prev => [...prev, `✅ Resolution Complete! Resolved to IP: ${finalIp}`]);
            setDnsIp(finalIp);
            setDnsStatus("resolved");
          }, 600);
        }, 500);
      }, 500);
    }, 450);
  };

  // REST API Sandbox execution
  const executeSandboxRequest = () => {
    if (sandboxLoading) return;
    setSandboxLoading(true);
    setSandboxResponse(null);
    setSandboxAnimStep("client-to-server");

    // Phase 1: Client to Server animation
    setTimeout(() => {
      setSandboxAnimStep("server-to-db");
      
      // Phase 2: Server to Database query
      setTimeout(() => {
        setSandboxAnimStep("db-to-server");
        
        // Phase 3: Database resolves and returns
        setTimeout(() => {
          setSandboxAnimStep("server-to-client");
          
          // Phase 4: Server replies to Client
          setTimeout(() => {
            setSandboxAnimStep("idle");
            setSandboxLoading(false);
            
            // Execute method action
            let headers = "Content-Type: application/json\nConnection: keep-alive";
            if (method === "GET") {
              setSandboxResponse({
                status: "200 OK",
                code: 200,
                headers,
                body: JSON.stringify(users, null, 2)
              });
            } else if (method === "POST") {
              if (!inputName.trim()) {
                setSandboxResponse({
                  status: "400 BAD REQUEST",
                  code: 400,
                  headers,
                  body: JSON.stringify({ error: "Missing required parameter: 'name'" }, null, 2)
                });
                return;
              }
              const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                name: inputName,
                age: Number(inputAge) || 20
              };
              setUsers(prev => [...prev, newUser]);
              setSandboxResponse({
                status: "201 CREATED",
                code: 201,
                headers: headers + `\nLocation: /users/${newUser.id}`,
                body: JSON.stringify(newUser, null, 2)
              });
              setInputName("");
              setInputAge("");
            } else if (method === "PUT") {
              if (users.length === 0) {
                setSandboxResponse({
                  status: "404 NOT FOUND",
                  code: 404,
                  headers,
                  body: JSON.stringify({ error: "No users in DB to update!" }, null, 2)
                });
                return;
              }
              const targetId = users[0].id;
              const nameToUpdate = inputName.trim() || users[0].name;
              const ageToUpdate = inputAge.trim() ? Number(inputAge) : users[0].age;
              
              setUsers(prev => prev.map(u => u.id === targetId ? { ...u, name: nameToUpdate, age: ageToUpdate } : u));
              setSandboxResponse({
                status: "200 OK",
                code: 200,
                headers,
                body: JSON.stringify({ id: targetId, name: nameToUpdate, age: ageToUpdate }, null, 2)
              });
              setInputName("");
              setInputAge("");
            } else if (method === "DELETE") {
              if (users.length === 0) {
                setSandboxResponse({
                  status: "404 NOT FOUND",
                  code: 404,
                  headers,
                  body: JSON.stringify({ error: "No users in database to delete!" }, null, 2)
                });
                return;
              }
              const deletedId = users[users.length - 1].id;
              setUsers(prev => prev.filter(u => u.id !== deletedId));
              setSandboxResponse({
                status: "204 NO CONTENT",
                code: 204,
                headers: "Connection: keep-alive",
                body: `// Successfully deleted User ID: ${deletedId}. Response payload body is empty.`
              });
            } else if (method === "LOGIN") {
              if (loginEmail === "satyam@gmail.com" && loginPassword === "password123") {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic2F0eWFtQGdtYWlsLmNvbSJ9.abc123xyz_signature";
                setJwtToken(token);
                setSandboxResponse({
                  status: "200 OK",
                  code: 200,
                  headers: headers + "\nSet-Cookie: session_secure=true",
                  body: JSON.stringify({ success: true, token, message: "Logged in successfully! Token saved to Client state." }, null, 2)
                });
              } else {
                setSandboxResponse({
                  status: "401 UNAUTHORIZED",
                  code: 401,
                  headers,
                  body: JSON.stringify({ success: false, error: "Invalid credentials. Try satyam@gmail.com / password123" }, null, 2)
                });
              }
            }
          }, 800);
        }, 600);
      }, 700);
    }, 800);
  };

  // HTTP vs WebSockets Simulator logic
  const sendHttpMessage = () => {
    if (activeSocketMode !== "http") return;
    setHttpStatusText("1. Establishing TCP Handshake...");
    setSocketLatency(null);
    
    setTimeout(() => {
      setHttpStatusText("2. Connected. Sending POST Request...");
      setSocketMessages(prev => [...prev, {
        sender: "client",
        text: `POST /messages { body: "${wsInput || "Hello HTTP!"}" }`,
        time: new Date().toLocaleTimeString().split(" ")[0]
      }]);
      
      setTimeout(() => {
        setHttpStatusText("3. Server response received. Closing connection...");
        const randomReplies = [
          "Received! I am stateful of nothing (stateless). Nice meeting you briefly.",
          "Processed! My socket is closed. Catch me on another request.",
          "Done! Connection terminated. No persistent memory."
        ];
        const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
        setSocketMessages(prev => [...prev, {
          sender: "server",
          text: `HTTP/1.1 200 OK\nJSON: { reply: "${reply}" }`,
          time: new Date().toLocaleTimeString().split(" ")[0]
        }]);
        setWsInput("");
        setSocketLatency(240 + Math.floor(Math.random() * 80)); // HTTP handshake overhead
        setHttpStatusText("Disconnected (Closed)");
      }, 500);
    }, 400);
  };

  const toggleWebsocket = () => {
    if (socketConnected) {
      // Disconnect
      setSocketConnected(false);
      setSocketMessages(prev => [...prev, {
        sender: "server",
        text: "⚡ WebSocket Connection Closed.",
        time: new Date().toLocaleTimeString().split(" ")[0]
      }]);
    } else {
      // Connect
      setHttpStatusText("Connecting WS...");
      setTimeout(() => {
        setSocketConnected(true);
        setSocketMessages(prev => [...prev, {
          sender: "server",
          text: "⚡ WebSocket Connection Established! Channel is live & bi-directional.",
          time: new Date().toLocaleTimeString().split(" ")[0]
        }]);
        setHttpStatusText("WS Open");
      }, 400);
    }
  };

  const sendWsMessage = () => {
    if (!socketConnected) return;
    const txt = wsInput.trim() || "Hi backend!";
    setSocketMessages(prev => [...prev, {
      sender: "client",
      text: txt,
      time: new Date().toLocaleTimeString().split(" ")[0]
    }]);
    setWsInput("");
    
    // Quick ping/pong response
    setTimeout(() => {
      const serverReplies = [
        "Instant reply! Latency was near 0ms.",
        "Pushing update: Stock values grew 2.4%",
        "Server broadcast: Notification sent to all users.",
        "Got it! Socket is kept open."
      ];
      setSocketMessages(prev => [...prev, {
        sender: "server",
        text: `[WebSocket Push] ${serverReplies[Math.floor(Math.random() * serverReplies.length)]}`,
        time: new Date().toLocaleTimeString().split(" ")[0]
      }]);
      setSocketLatency(2 + Math.floor(Math.random() * 8)); // near 0 overhead on active stream
    }, 80);
  };

  // Middleware pipeline logic
  const handleMiddlewareSimulate = () => {
    if (middlewareLoading) return;
    setMiddlewareLoading(true);
    setMiddlewareLogs(["🛫 Request dispatched from browser..."]);
    setMiddlewareAnimStep("cors");

    setTimeout(() => {
      // CORS Check
      if (!allowCors) {
        setMiddlewareLogs(prev => [...prev, "❌ Blocked by CORS Gatekeeper! Origin 'localhost:5173' is unauthorized by headers.", "🛑 Request terminated. (CORS Policy error)"]);
        setMiddlewareAnimStep("blocked");
        setMiddlewareLoading(false);
        return;
      }
      setMiddlewareLogs(prev => [...prev, "✅ CORS Check Passed: Origin 'localhost:5173' is allowed.", "➡️ Forwarding to Auth Checking Layer..."]);
      setMiddlewareAnimStep("auth");

      setTimeout(() => {
        // Auth Check
        if (!sendAuth) {
          setMiddlewareLogs(prev => [...prev, "❌ Auth Check Failed! Missing HTTP Authorization header (JWT).", "🛑 Request terminated with HTTP 401 Unauthorized."]);
          setMiddlewareAnimStep("blocked");
          setMiddlewareLoading(false);
          return;
        }
        setMiddlewareLogs(prev => [...prev, "✅ Auth Check Passed: Valid JWT Token decrypted.", "➡️ Forwarding to Body Parser middleware..."]);
        setMiddlewareAnimStep("parser");

        setTimeout(() => {
          // Body parser
          setMiddlewareLogs(prev => [...prev, "✅ Body Parser parsed request payload buffer as JSON.", "➡️ Handing over to Final Route Controller..."]);
          setMiddlewareAnimStep("handler");

          setTimeout(() => {
            // Success handler
            setMiddlewareLogs(prev => [...prev, "✅ Route Handler triggered: Returned User entity.", "🎉 HTTP 200 OK Sent back to client!"]);
            setMiddlewareAnimStep("success");
            setMiddlewareLoading(false);
          }, 800);
        }, 700);
      }, 800);
    }, 700);
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
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-[10px] font-bold uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Web Library
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Backend & <span className="text-violet-400">API Theory</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Dive deep into how the internet connects devices, how servers resolve requests, and how data moves between systems via protocols, endpoints, and middleware pipelines.
        </p>
      </header>

      {/* 01. The Network Layer (DNS & Port Directories) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">01.</span> DNS Resolver & Server Ports
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            Computers communicate using raw numerical addresses called **IP Addresses**, while services are run behind specific locks called **Ports**. A **DNS** acts as the phonebook translating names into addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DNS Lookup Card */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">DNS Resolver Simulator</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={dnsDomain}
                  onChange={(e) => setDnsDomain(e.target.value)}
                  placeholder="e.g. google.com"
                  className="flex-1 bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-300 font-semibold focus:outline-none focus:border-zinc-700"
                />
                <button
                  onClick={handleDnsResolve}
                  disabled={dnsStatus === "resolving" || !dnsDomain.trim()}
                  className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-xs font-bold text-white rounded-xl cursor-pointer transition-all"
                >
                  Resolve DNS
                </button>
              </div>
            </div>

            {/* DNS Logs Screen */}
            <div className="bg-black/40 border border-zinc-900 rounded-2xl p-4 min-h-[180px] font-mono text-[11px] space-y-2 text-zinc-400 flex flex-col justify-between">
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar">
                {dnsLogs.length > 0 ? (
                  dnsLogs.map((log, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-violet-400 font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-zinc-650 italic">Waiting for DNS lookup query...</span>
                )}
              </div>
              
              {dnsStatus === "resolved" && (
                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-zinc-500 uppercase text-[9px] font-bold">Resolved IP Address</span>
                  <span className="text-emerald-400 font-bold font-sans text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {dnsIp}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ports Server Host Diagram */}
          <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block mb-4">Click Server Port Doors</span>
              
              {/* Visual Rack Server */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 shadow-inner space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">Host Server Stack</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
                  </div>
                </div>
                
                {/* Port Doors Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {portsList.map((p) => {
                    const isSelected = selectedPort.port === p.port;
                    return (
                      <button
                        key={p.port}
                        onClick={() => setSelectedPort(p)}
                        className={`p-3 border rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-violet-500/10 border-violet-500 text-violet-400 font-bold scale-[1.03]" 
                            : "bg-zinc-900/40 border-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                        }`}
                      >
                        <span className="font-mono text-xs font-black">:{p.port}</span>
                        <span className="text-[9px] text-zinc-550 font-semibold">{p.service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Port Explain Panel */}
            <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-550">
                <span>Port details</span>
                <span className="text-violet-400 font-mono">Protocol: {selectedPort.protocol}</span>
              </div>
              <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                <Server className="w-4 h-4 text-violet-400" />
                Service: {selectedPort.service} (Port {selectedPort.port})
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {selectedPort.description}
              </p>
              <div className="pt-2 border-t border-zinc-900/40 text-[11px] text-zinc-500 font-light">
                <strong className="text-zinc-400 font-medium">Use Case:</strong> {selectedPort.useCase}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. URL Anatomy */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">02.</span> URL Anatomy Parser
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            A **URL** (Uniform Resource Locator) describes the path used to reach a server resource. Click on any segment in the interactive URL block below to parse it.
          </p>
        </div>

        {/* URL Box */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-1 p-6 bg-zinc-950 border border-zinc-900 rounded-2xl font-mono text-xs sm:text-sm md:text-base select-none">
            
            {/* Protocol */}
            <button
              onClick={() => setSelectedUrlPart("protocol")}
              onMouseEnter={() => setSelectedUrlPart("protocol")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedUrlPart === "protocol" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              https://
            </button>

            {/* Domain */}
            <button
              onClick={() => setSelectedUrlPart("domain")}
              onMouseEnter={() => setSelectedUrlPart("domain")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedUrlPart === "domain" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-zinc-200 hover:text-white"
              }`}
            >
              google.com
            </button>

            {/* Path */}
            <button
              onClick={() => setSelectedUrlPart("path")}
              onMouseEnter={() => setSelectedUrlPart("path")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedUrlPart === "path" ? "bg-violet-500/20 text-violet-400 border border-violet-500/30" : "text-violet-500 hover:text-violet-400"
              }`}
            >
              /search
            </button>

            {/* Query Params */}
            <button
              onClick={() => setSelectedUrlPart("query")}
              onMouseEnter={() => setSelectedUrlPart("query")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedUrlPart === "query" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-emerald-500 hover:text-emerald-400"
              }`}
            >
              ?q=cat&limit=10
            </button>
          </div>

          {/* Explanatory Panel */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedUrlPart === "protocol" && (
                <motion.div
                  key="protocol"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2 w-full"
                >
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Protocol segment</span>
                  <h3 className="text-white font-bold text-lg">https:// (HyperText Transfer Protocol Secure)</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Defines the language rule and communication channel. Adding the <code>s</code> ensures data encryption using SSL/TLS protocols to secure credentials and packets against sniffing.
                  </p>
                </motion.div>
              )}

              {selectedUrlPart === "domain" && (
                <motion.div
                  key="domain"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2 w-full"
                >
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Domain / Host segment</span>
                  <h3 className="text-white font-bold text-lg">google.com (Host Name)</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Human-readable name mapping back to the server's numeric IP address. DNS resolvers translate this name so the browser knows which server building to contact on the web.
                  </p>
                </motion.div>
              )}

              {selectedUrlPart === "path" && (
                <motion.div
                  key="path"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2 w-full"
                >
                  <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Path / Resource segment</span>
                  <h3 className="text-white font-bold text-lg">/search (API Route)</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Tells the server backend which controller function or files to retrieve. Path-based routing separates resources (e.g. <code>/users</code>, <code>/products</code>, or <code>/login</code>).
                  </p>
                </motion.div>
              )}

              {selectedUrlPart === "query" && (
                <motion.div
                  key="query"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2 w-full"
                >
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Query Parameters segment</span>
                  <h3 className="text-white font-bold text-lg">?q=cat&limit=10 (Filters & Options)</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    Appended parameters starting with <code>?</code> and separated by <code>&</code>. They pass parameters directly into backend controller handlers (e.g., search key <code>q</code> equal to <code>cat</code>, page limit equal to <code>10</code>).
                  </p>
                </motion.div>
              )}

              {!selectedUrlPart && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-zinc-550 italic text-xs"
                >
                  Hover or click on URL segments above to inspect anatomy breakdown.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 03. Client-Server-DB Flow Sandbox */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">03.</span> REST API Sandbox & Core flow
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            Explore how data executes. Selecting methods generates structured requests. Observe the packet journey from **Client ➔ Server ➔ DB** and back.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Sandbox panel */}
          <div className="lg:col-span-4 p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">REST Client Sandbox</span>
            
            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-900 text-[10px] font-bold">
              {["GET", "POST", "PUT", "DELETE", "LOGIN"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m as any)}
                  className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                    method === m ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Config Fields based on Method */}
            {method === "POST" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">New User Name</label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Satyam"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">User Age</label>
                  <input
                    type="number"
                    value={inputAge}
                    onChange={(e) => setInputAge(e.target.value)}
                    placeholder="e.g. 22"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {method === "PUT" && (
              <div className="space-y-3">
                <div className="bg-zinc-950 border border-zinc-900/60 p-2.5 rounded-xl text-[10px] text-zinc-500 leading-normal">
                  💡 Simulates updating the first database user (User ID: {users.length > 0 ? users[0].id : "None"}).
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Update Name</label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Satyam Rana"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Update Age</label>
                  <input
                    type="number"
                    value={inputAge}
                    onChange={(e) => setInputAge(e.target.value)}
                    placeholder="e.g. 23"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {method === "DELETE" && (
              <div className="bg-zinc-950 border border-zinc-900/60 p-3 rounded-xl text-[11px] text-zinc-500 leading-relaxed">
                💡 Simulates deleting the last record from the database. Current database size: <strong className="text-zinc-400">{users.length}</strong>.
              </div>
            )}

            {method === "LOGIN" && (
              <div className="space-y-3">
                <div className="bg-zinc-950 border border-zinc-900/60 p-2.5 rounded-xl text-[10px] text-zinc-500 leading-normal">
                  🔑 Valid user: <span className="text-zinc-400 font-mono">satyam@gmail.com</span> / <span className="text-zinc-400 font-mono">password123</span>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {method === "GET" && (
              <div className="bg-zinc-950 border border-zinc-900/60 p-3 rounded-xl text-[11px] text-zinc-500 leading-relaxed">
                💡 Simulates retrieving the full users entity. Expected Status: <strong className="text-emerald-400">200 OK</strong>.
              </div>
            )}

            <button
              onClick={executeSandboxRequest}
              disabled={sandboxLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-xs font-bold text-white rounded-xl cursor-pointer transition-all"
            >
              {sandboxLoading ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" /> Resolving...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Dispatch Request
                </>
              )}
            </button>
          </div>

          {/* Visual flow board */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
            
            {/* Packet Travel Pipeline */}
            <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl relative min-h-[140px] flex items-center justify-between overflow-hidden shadow-inner">
              <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Execution Pipeline</span>
              
              {/* Nodes and Links */}
              <div className="relative w-full flex items-center justify-between px-4 z-10">
                {/* Visual Line connector */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-900 z-0">
                  {/* Glowing line animation */}
                  {sandboxAnimStep !== "idle" && (
                    <motion.div
                      initial={{ 
                        left: sandboxAnimStep.includes("client") || sandboxAnimStep === "client-to-server" ? "0%" : "50%",
                        width: "0%" 
                      }}
                      animate={{ 
                        left: sandboxAnimStep === "client-to-server" ? ["0%", "50%"] 
                              : sandboxAnimStep === "server-to-db" ? ["50%", "100%"]
                              : sandboxAnimStep === "db-to-server" ? ["100%", "50%"]
                              : ["50%", "0%"],
                        width: ["0%", "30%", "0%"]
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute h-1 bg-violet-500 rounded shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    />
                  )}
                </div>

                {/* Node Client */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    sandboxAnimStep === "client-to-server"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-550"
                  }`}>
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 font-sans">Client</span>
                </div>

                {/* Node Server */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    sandboxAnimStep === "server-to-db" || sandboxAnimStep === "db-to-server"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-550"
                  }`}>
                    <Server className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 font-sans">Server</span>
                </div>

                {/* Node Database */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    sandboxAnimStep === "db-to-server"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-550"
                  }`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 font-sans">Database</span>
                </div>
              </div>

              {/* Status Note */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-500">
                {sandboxAnimStep === "client-to-server" && "HTTP Client Request: Client ➔ Server..."}
                {sandboxAnimStep === "server-to-db" && "Checking DB Records: Server ➔ Database..."}
                {sandboxAnimStep === "db-to-server" && "Data Fetched: Database ➔ Server..."}
                {sandboxAnimStep === "server-to-client" && "Sending Response Payload: Server ➔ Client..."}
                {sandboxAnimStep === "idle" && "System Idle. Ready to dispatch."}
              </div>
            </div>

            {/* Sandbox Response Output Console */}
            <div className="bg-[#09090b] border border-zinc-900 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">HTTP Response Output</span>
                {jwtToken && method === "LOGIN" && (
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    <Key className="w-3 h-3" /> Token Saved
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-zinc-900 p-4 rounded-xl min-h-[140px] flex flex-col justify-between font-mono text-xs">
                {sandboxResponse ? (
                  <>
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sandboxResponse.code >= 200 && sandboxResponse.code < 300 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                        {sandboxResponse.status}
                      </span>
                      <pre className="text-[9px] text-zinc-600 text-right">{sandboxResponse.headers}</pre>
                    </div>
                    <pre className="text-[11px] text-zinc-300 font-mono pt-3 overflow-x-auto no-scrollbar max-h-36">
                      <code>{sandboxResponse.body}</code>
                    </pre>
                  </>
                ) : (
                  <div className="h-full flex-1 flex items-center justify-center text-zinc-650 italic text-xs">
                    {sandboxLoading ? "Request in transit..." : "Dispatch request client sandbox to inspect payloads."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. HTTP (Stateless) vs WebSockets (Stateful/Persistent) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">04.</span> HTTP (Stateless) vs WebSockets (Stateful)
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            **HTTP** uses a stateless connection model: requests open, fetch, and close immediately. **WebSockets** establish a permanent bi-directional TCP line, ideal for chats, alerts, and live metrics.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 p-6 space-y-6">
          
          {/* Mode Selector */}
          <div className="flex bg-zinc-950 p-1 border border-zinc-900 rounded-xl self-start w-max">
            <button
              onClick={() => {
                setActiveSocketMode("http");
                setSocketConnected(false);
                setSocketMessages([]);
                setSocketLatency(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeSocketMode === "http" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Short-Lived HTTP (Stateless)
            </button>
            <button
              onClick={() => {
                setActiveSocketMode("websocket");
                setSocketConnected(false);
                setSocketMessages([]);
                setSocketLatency(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeSocketMode === "websocket" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Persistent WebSockets (Stateful)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visualizer wire stream */}
            <div className="lg:col-span-8 p-6 bg-black/40 rounded-2xl border border-zinc-900/60 relative h-48 overflow-hidden flex items-center justify-between">
              <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Connection Wire</span>
              
              {/* Client Terminal */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">TX</div>
                <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold">Client</span>
              </div>

              {/* Wire line */}
              <div className="relative flex-1 mx-4 h-[2px] bg-zinc-900 overflow-hidden">
                {activeSocketMode === "websocket" && socketConnected && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  />
                )}
              </div>

              {/* Server Terminal */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">RX</div>
                <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold">Server</span>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] font-mono">
                {activeSocketMode === "http" ? (
                  <span className="text-zinc-550">Status: {httpStatusText}</span>
                ) : (
                  <span className={socketConnected ? "text-emerald-400" : "text-rose-500"}>
                    Status: {socketConnected ? "⚡ WebSocket Connected" : "❌ Disconnected"}
                  </span>
                )}
                
                {socketLatency !== null && (
                  <span className="block text-[9px] text-zinc-600 mt-1">Round-trip overhead: ~{socketLatency}ms</span>
                )}
              </div>
            </div>

            {/* Chat/Message Log Console */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="bg-[#09090b] border border-zinc-900 rounded-2xl p-4 flex-1 flex flex-col justify-between min-h-[220px]">
                
                {/* Logs lists */}
                <div className="space-y-2 h-[160px] overflow-y-auto no-scrollbar font-mono text-[10px] pr-2">
                  {socketMessages.length > 0 ? (
                    socketMessages.map((msg, index) => (
                      <div key={index} className={`flex flex-col ${msg.sender === "client" ? "items-end" : "items-start"}`}>
                        <span className="text-[8px] text-zinc-600 mb-0.5">{msg.time} - {msg.sender === "client" ? "Client" : "Server"}</span>
                        <div className={`p-2 rounded-lg leading-relaxed ${
                          msg.sender === "client" 
                            ? "bg-violet-500/10 text-violet-300 border border-violet-500/20" 
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                        }`}>
                          <pre className="whitespace-pre-wrap">{msg.text}</pre>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-650 italic text-[11px] text-center">
                      {activeSocketMode === "websocket" && !socketConnected
                        ? "Connect socket and dispatch messages."
                        : "Type body query and fire HTTP test."}
                    </div>
                  )}
                </div>

                {/* Input action field */}
                <div className="pt-3 border-t border-zinc-900 flex gap-1.5">
                  <input
                    type="text"
                    value={wsInput}
                    onChange={(e) => setWsInput(e.target.value)}
                    placeholder={activeSocketMode === "http" ? "Payload (Hello)" : "Message body..."}
                    className="flex-1 bg-zinc-950 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-[11px] text-zinc-300 focus:outline-none"
                  />
                  
                  {activeSocketMode === "http" ? (
                    <button
                      onClick={sendHttpMessage}
                      disabled={!wsInput.trim()}
                      className="p-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button
                        onClick={toggleWebsocket}
                        className={`px-2.5 py-1.5 rounded-lg font-bold text-[10px] uppercase cursor-pointer border ${
                          socketConnected 
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20" 
                            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                      >
                        {socketConnected ? "Close" : "Open"}
                      </button>
                      <button
                        onClick={sendWsMessage}
                        disabled={!socketConnected || !wsInput.trim()}
                        className="p-2 bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg cursor-pointer transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Middleware Pipeline & CORS Shield */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">05.</span> Middleware Pipeline & CORS Shield
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            Requests pass through intermediate software checks called **Middleware** prior to executing final route calculations. **CORS** checks stop unauthorized domain hosts from stealing resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Toggles sandbox panel */}
          <div className="lg:col-span-4 p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Pipeline Security Config</span>
            
            {/* Toggle CORS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 font-sans">Allow CORS (Backend Setting)</span>
                <span className={`text-[9px] uppercase font-bold font-mono px-1.5 py-0.5 rounded ${allowCors ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                  {allowCors ? "Allowed" : "Blocked"}
                </span>
              </div>
              <p className="text-[10px] text-zinc-550 leading-relaxed">
                Determines if backend includes headers letting outside client origins (like our react app) fetch resources.
              </p>
              <button
                onClick={() => setAllowCors(!allowCors)}
                className={`w-full py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  allowCors 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20" 
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                }`}
              >
                Toggle CORS Access: {allowCors ? "Disable" : "Enable"}
              </button>
            </div>

            {/* Toggle Auth */}
            <div className="space-y-2 pt-4 border-t border-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 font-sans">HTTP Authorization header</span>
                <span className={`text-[9px] uppercase font-bold font-mono px-1.5 py-0.5 rounded ${sendAuth ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                  {sendAuth ? "Present" : "Missing"}
                </span>
              </div>
              <p className="text-[10px] text-zinc-550 leading-relaxed">
                Sends the authentication bearer JWT token alongside the HTTP header requests.
              </p>
              <button
                onClick={() => setSendAuth(!sendAuth)}
                className={`w-full py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sendAuth 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20" 
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                }`}
              >
                Toggle Header Token: {sendAuth ? "Omit Token" : "Attach Token"}
              </button>
            </div>

            <button
              onClick={handleMiddlewareSimulate}
              disabled={middlewareLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-650 text-xs font-bold text-white rounded-xl cursor-pointer transition-all"
            >
              Test Pipeline Execution
            </button>
          </div>

          {/* Pipeline Visual conveyor belt and logs output */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
            
            {/* Visual Middleware belt */}
            <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl relative min-h-[140px] flex items-center justify-between overflow-hidden shadow-inner">
              <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Conveyor Belt</span>
              
              {/* Conveyor path */}
              <div className="relative w-full flex items-center justify-between px-4 z-10">
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-900 z-0"></div>

                {/* Gate 1: CORS Gate */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    middlewareAnimStep === "cors"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)] animate-pulse"
                      : middlewareAnimStep === "blocked" && !allowCors
                      ? "bg-rose-500/10 border-rose-500 text-rose-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-650"
                  }`}>
                    {middlewareAnimStep === "blocked" && !allowCors ? <Shield className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  </div>
                  <span className="text-[9px] uppercase font-bold text-zinc-550 font-sans">CORS Check</span>
                </div>

                {/* Gate 2: Auth Gate */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    middlewareAnimStep === "auth"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)] animate-pulse"
                      : middlewareAnimStep === "blocked" && allowCors && !sendAuth
                      ? "bg-rose-500/10 border-rose-500 text-rose-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-650"
                  }`}>
                    {middlewareAnimStep === "blocked" && allowCors && !sendAuth ? <Lock className="w-4 h-4" /> : <Key className="w-4 h-4" />}
                  </div>
                  <span className="text-[9px] uppercase font-bold text-zinc-550 font-sans">Auth Header</span>
                </div>

                {/* Gate 3: Body Parser */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    middlewareAnimStep === "parser"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)] animate-pulse"
                      : "bg-zinc-950 border-zinc-800 text-zinc-650"
                  }`}>
                    <Terminal className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold text-zinc-550 font-sans">Body Parser</span>
                </div>

                {/* Gate 4: Controller Handler */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                    middlewareAnimStep === "handler"
                      ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.3)] animate-pulse"
                      : middlewareAnimStep === "success"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-650"
                  }`}>
                    {middlewareAnimStep === "success" ? <Check className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                  </div>
                  <span className="text-[9px] uppercase font-bold text-zinc-550 font-sans">Handler</span>
                </div>
              </div>
            </div>

            {/* Pipeline logs output screen */}
            <div className="bg-[#09090b] border border-zinc-900 rounded-3xl p-6 space-y-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Pipeline Logs Screen</span>
              <div className="bg-black/40 border border-zinc-900 p-4 rounded-xl min-h-[120px] font-mono text-[11px] space-y-1.5 text-zinc-400">
                {middlewareLogs.length > 0 ? (
                  middlewareLogs.map((log, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-violet-400 font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-zinc-650 italic">Execute the pipeline test to observe middleware triggers.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Static Concept Guides & Reference Cards */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-violet-400">06.</span> Developer Concept Cheat-Sheet
          </h2>
          <p className="text-zinc-400 leading-relaxed font-light">
            Quick reference handbook explaining REST operations, status code groups, and core backend framework tools.
          </p>
        </div>

        {/* Comparison grid boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Status groups */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
              <Layers className="w-5 h-5 text-violet-400" /> HTTP Status Code Classes
            </h3>
            
            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">2xx Success</span>
                <span className="text-zinc-400 font-light flex-1 leading-relaxed">
                  Request successfully processed. (e.g. <code>200 OK</code> for reads, <code>201 Created</code> for insertions).
                </span>
              </div>
              <div className="flex items-start gap-2.5 border-t border-zinc-900/60 pt-3">
                <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">3xx Redirect</span>
                <span className="text-zinc-400 font-light flex-1 leading-relaxed">
                  Client must execute redirects to resolve. (e.g. <code>301 Moved</code> or <code>304 Not Modified</code> cache matches).
                </span>
              </div>
              <div className="flex items-start gap-2.5 border-t border-zinc-900/60 pt-3">
                <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">4xx Client Err</span>
                <span className="text-zinc-400 font-light flex-1 leading-relaxed">
                  Client mistake. Bad route paths or payloads. (e.g. <code>400 Bad Request</code> or <code>404 Not Found</code>).
                </span>
              </div>
              <div className="flex items-start gap-2.5 border-t border-zinc-900/60 pt-3">
                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">5xx Server Err</span>
                <span className="text-zinc-400 font-light flex-1 leading-relaxed">
                  Server crashed or gateway failed to process. (e.g. <code>500 Internal Error</code> or <code>502 Bad Gateway</code>).
                </span>
              </div>
            </div>
          </div>

          {/* REST operations */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
              <Zap className="w-5 h-5 text-violet-400" /> REST Method Meanings
            </h3>
            
            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-sky-400 font-bold">GET</span>
                <span className="text-zinc-450 font-light font-sans text-right">Reads resources. Safe & Idempotent (no state change).</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-emerald-400 font-bold">POST</span>
                <span className="text-zinc-450 font-light font-sans text-right">Creates a resource. Non-idempotent (adds records).</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-indigo-400 font-bold">PUT</span>
                <span className="text-zinc-450 font-light font-sans text-right">Updates resource entirely. Idempotent.</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-amber-400 font-bold">PATCH</span>
                <span className="text-zinc-450 font-light font-sans text-right">Applies partial updates to resources. Non-idempotent.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-500 font-bold">DELETE</span>
                <span className="text-zinc-450 font-light font-sans text-right">Removes target resource records. Idempotent.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full flow Code Explanation */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-violet-400" /> Node.js & Express API routing example
          </h3>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            API servers map incoming routes and parse JSON. Middlewares intercept requests. This simple code handles a user creation payload and saves it.
          </p>

          <CodeBlock
            filename="server.js"
            language="javascript"
            code={`const express = require('express');
const cors = require('cors');
const app = express();

// 1. Middlewares pipeline registration
app.use(cors()); // Allow CORS requests
app.use(express.json()); // Body parser middleware parses JSON payload buffers

// Mock database store
let users = [{ id: 1, name: "Satyam" }];

// 2. GET API route handler
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// 3. POST API route handler
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing required field: 'name'" });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Start host on port 3000
app.listen(3000, () => console.log('API Server running on localhost:3000'));`}
          />
        </div>

        {/* Database & ORM brief guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Databases */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-violet-400">
              <Database className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">Databases (SQL vs NoSQL)</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Databases store data. **SQL Databases** (PostgreSQL, MySQL) store data in structured tables with strict schema rules and foreign keys. **NoSQL Databases** (MongoDB) use JSON-like document stores, offering high speed, loose schema requirements, and rapid scalability.
            </p>
          </div>

          {/* ORMs */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-violet-400">
              <Layers className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">ORMs (Object Relational Mappers)</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Object-Relational Mapping (ORM) is a technique that lets you query and manipulate databases using code instead of raw SQL queries (e.g. <code>SELECT * FROM users</code>). Popular examples include **Prisma**, **Sequelize**, and **Hibernate**.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
