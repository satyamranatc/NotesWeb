import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Shield, Zap, Terminal, Database, Server, Layers, Info, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

interface RequestResponseStep {
  title: string;
  sender: "client" | "dns" | "server" | "database";
  receiver: "client" | "dns" | "server" | "database";
  description: string;
  details: string;
}

const stepsList: RequestResponseStep[] = [
  {
    title: "1. Type URL & Init",
    sender: "client",
    receiver: "dns",
    description: "The user enters 'google.com' in the browser.",
    details: "The browser check its local cache first. If not found, it prepares to make a query to resolve this human-friendly domain into a machine-readable IP address."
  },
  {
    title: "2. DNS Query",
    sender: "client",
    receiver: "dns",
    description: "DNS resolution translates domain names to IP addresses.",
    details: "Your machine queries the recursive DNS resolver. The resolver checks its cache or routes the request to Root, TLD, and Authoritative Name Servers to find Google's IP (e.g. 142.250.190.46)."
  },
  {
    title: "3. TCP Handshake",
    sender: "client",
    receiver: "server",
    description: "Establish reliable connection via TCP Three-Way Handshake.",
    details: "Client sends SYN (Synchronize), Server replies with SYN-ACK, and Client sends ACK (Acknowledge). This guarantees that both devices are ready to transmit data reliably."
  },
  {
    title: "4. HTTPS Request",
    sender: "client",
    receiver: "server",
    description: "Client sends secure HTTP/HTTPS request package.",
    details: "The browser builds a GET request (headers, cookies, user-agent) encrypted via SSL/TLS, and transmits it over the established TCP socket to port 443."
  },
  {
    title: "5. Server Processing",
    sender: "server",
    receiver: "database",
    description: "The backend server processes route and parameters.",
    details: "A web server (Nginx/Apache) routes request to application server (Django/Express/Node). The server parses cookies, checks auth tokens, and determines necessary response."
  },
  {
    title: "6. Database Query",
    sender: "server",
    receiver: "database",
    description: "Data retrieval/mutations are executed.",
    details: "The application queries the database (PostgreSQL/MongoDB) to fetch relevant user details, search indexes, or content layouts."
  },
  {
    title: "7. Response Transmit",
    sender: "server",
    receiver: "client",
    description: "Server sends response payload (e.g., 200 OK).",
    details: "The server serializes database records, constructs HTTP headers, builds the response payload (HTML/JSON), encrypts it, and sends it back to the client."
  },
  {
    title: "8. Browser Render",
    sender: "client",
    receiver: "client",
    description: "Browser parses assets and paints pixels.",
    details: "The browser parses the HTML document, requests dependent assets (CSS, JS, images), builds DOM/CSSOM trees, compiles JS, and renders the visual viewport."
  }
];

interface PortInfo {
  port: number;
  service: string;
  type: string;
  description: string;
  usage: string;
}

const portsData: PortInfo[] = [
  { port: 80, service: "HTTP", type: "TCP", description: "Unencrypted web transfer protocol.", usage: "Used by default when visiting unsecured websites (http://)." },
  { port: 443, service: "HTTPS", type: "TCP", description: "Secure Web Transfer encrypted with SSL/TLS.", usage: "Standard secure web protocol for all modern apps (https://)." },
  { port: 22, service: "SSH", type: "TCP", description: "Secure Shell for remote server terminal access.", usage: "Used by DevOps engineers to log into cloud instances (e.g. AWS EC2)." },
  { port: 3000, service: "React/Node", type: "TCP", description: "Common local development port.", usage: "Used locally to serve dev bundles (Vite defaults to 5173, React to 3000)." },
  { port: 3306, service: "MySQL", type: "TCP", description: "MySQL Database connection port.", usage: "Relational database network connections." },
  { port: 5432, service: "PostgreSQL", type: "TCP", description: "PostgreSQL Database connection port.", usage: "Industry standard relational SQL database server link." },
  { port: 27017, service: "MongoDB", type: "TCP", description: "MongoDB NoSQL database port.", usage: "Document database connections." }
];

export default function Networking() {
  const [activeStep, setActiveStep] = useState(0);
  const [activePort, setActivePort] = useState(portsData[0]);
  const [simMode, setSimMode] = useState<"tcp" | "udp">("tcp");

  // TCP/UDP simulator states
  const [isPlaying, setIsPlaying] = useState(false);
  const [packets, setPackets] = useState<Array<{ id: number; status: "flying" | "received" | "lost" | "acked"; x: number }>>([]);
  const [serverReceived, setServerReceived] = useState<number[]>([]);
  const [clientAcks, setClientAcks] = useState<number[]>([]);
  const simTimerRef = useRef<any>(null);
  const packetIdCounterRef = useRef(1);

  // Restart packet simulator
  const handleResetSim = () => {
    setIsPlaying(false);
    setPackets([]);
    setServerReceived([]);
    setClientAcks([]);
    packetIdCounterRef.current = 1;
    if (simTimerRef.current) clearInterval(simTimerRef.current);
  };

  useEffect(() => {
    handleResetSim();
  }, [simMode]);

  useEffect(() => {
    if (isPlaying) {
      // Loop that fires a new packet every 1.8 seconds
      simTimerRef.current = setInterval(() => {
        const nextId = packetIdCounterRef.current++;
        
        // Push a new packet
        setPackets((prev) => [...prev, { id: nextId, status: "flying", x: 0 }]);

        // Animate packet movement
        let progress = 0;
        const animationInterval = setInterval(() => {
          progress += 5;
          
          setPackets((prev) => 
            prev.map((p) => {
              if (p.id === nextId) {
                // Introduce simulation path choices
                if (progress >= 100) {
                  clearInterval(animationInterval);
                  // Determine random loss for demonstration (e.g. 20% loss rate)
                  const isLost = nextId === 2 || nextId === 5; // explicitly lose packet 2 and 5 to make it educational
                  
                  if (isLost) {
                    return { ...p, status: "lost", x: 100 };
                  } else {
                    // Update server reception state
                    setServerReceived((rec) => {
                      if (simMode === "tcp") {
                        // In TCP, we only accept packets in order (simulate sliding window logic simplified)
                        // If it's the expected packet, accept.
                        const expected = rec.length + 1;
                        if (nextId === expected) {
                          // Send ACK back
                          setTimeout(() => {
                            setClientAcks((acks) => [...acks, nextId]);
                          }, 500);
                          return [...rec, nextId];
                        } else {
                          // Buffering / Out of order (in real TCP we buffer, here we reject for simplification)
                          return rec;
                        }
                      } else {
                        // UDP: accept anything immediately
                        return [...rec, nextId];
                      }
                    });
                    return { ...p, status: "received", x: 100 };
                  }
                }
                return { ...p, x: progress };
              }
              return p;
            })
          );
        }, 100);

      }, 1800);
    } else {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    }

    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, [isPlaying, simMode]);

  // Handle slide controls
  const handlePrevStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };
  const handleNextStep = () => {
    if (activeStep < stepsList.length - 1) setActiveStep(activeStep + 1);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  // Node position helpers for Lifecycle visualizer
  const getLifecycleNodeX = (role: string) => {
    if (role === "client") return "5%";
    if (role === "dns") return "35%";
    if (role === "server") return "65%";
    return "95%"; // database
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24"
    >
      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-[10px] font-bold uppercase tracking-widest">
          <Globe className="w-3 h-3" /> Web Library
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Networking <span className="text-sky-400">Essentials</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          “Networking is the invisible nervous system of software engineering.” Master the concepts that explain deployment, reverse proxies, and CORS.
        </p>
      </header>

      {/* 01. Request-Response Lifecycle */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">01.</span> Request-Response Lifecycle
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          What happens when you type <code>google.com</code> into your browser? Click through the stages below to visualize the end-to-end data route.
        </p>

        {/* Lifecycle Visualizer Card */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6 space-y-8">
          
          {/* Animated Node Diagram */}
          <div className="p-6 bg-black/40 rounded-2xl border border-zinc-900/60 relative h-36 flex items-center justify-between">
            
            {/* Connecting Channels */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-800/60 z-0 flex items-center">
              <AnimatePresence>
                {activeStep > 0 && stepsList[activeStep].sender !== stepsList[activeStep].receiver && (
                  <motion.div
                    initial={{ left: getLifecycleNodeX(stepsList[activeStep].sender), width: 0 }}
                    animate={{ 
                      left: [getLifecycleNodeX(stepsList[activeStep].sender), getLifecycleNodeX(stepsList[activeStep].receiver)],
                      width: ["0%", "30%", "0%"]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute h-1 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] rounded-full"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Client Node */}
            <div className="flex flex-col items-center gap-2 z-10 w-20">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                stepsList[activeStep].sender === "client" || stepsList[activeStep].receiver === "client"
                  ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-650"
              }`}>
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Client</span>
            </div>

            {/* DNS Node */}
            <div className="flex flex-col items-center gap-2 z-10 w-20">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                stepsList[activeStep].sender === "dns" || stepsList[activeStep].receiver === "dns"
                  ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-650"
              }`}>
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">DNS DNS</span>
            </div>

            {/* Server Node */}
            <div className="flex flex-col items-center gap-2 z-10 w-20">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                stepsList[activeStep].sender === "server" || stepsList[activeStep].receiver === "server"
                  ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-650"
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Server</span>
            </div>

            {/* DB Node */}
            <div className="flex flex-col items-center gap-2 z-10 w-20">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                stepsList[activeStep].sender === "database" || stepsList[activeStep].receiver === "database"
                  ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-650"
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Database</span>
            </div>

          </div>

          {/* Stepper details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold">
                Stage {activeStep + 1}
              </span>
              <h3 className="text-white font-bold text-lg">{stepsList[activeStep].title}</h3>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {stepsList[activeStep].description}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl bg-zinc-900/20 p-4 border border-zinc-900/60 rounded-xl font-mono">
              {stepsList[activeStep].details}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
            <div className="flex gap-2">
              <button
                disabled={activeStep === 0}
                onClick={handlePrevStep}
                className="px-4 py-2 border border-zinc-900 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={activeStep === stepsList.length - 1}
                onClick={handleNextStep}
                className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-xl text-xs font-bold text-sky-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1.5">
              {stepsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === activeStep ? "bg-sky-400" : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 02. TCP vs. UDP Simulator */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">02.</span> TCP vs. UDP Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Compare transmission characteristics. **TCP** guarantees delivery via handshakes and retransmissions. **UDP** fires packets rapidly without waiting for receipts.
        </p>

        {/* Simulator Grid */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6 space-y-6">
          
          {/* Mode Selector */}
          <div className="flex bg-zinc-950 p-1 border border-zinc-900 rounded-xl self-start w-max">
            {[
              { id: "tcp", label: "TCP Mode (Connection-Oriented)" },
              { id: "udp", label: "UDP Mode (Connectionless)" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSimMode(m.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  simMode === m.id
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Network Simulator Canvas */}
          <div className="p-6 bg-black/40 rounded-2xl border border-zinc-900/60 relative h-48 overflow-hidden">
            <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Network Wire</span>
            
            {/* Sender / Receiver Terminals */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-450">TX</div>
              <span className="text-[9px] text-zinc-550 uppercase font-mono">Client</span>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-450">RX</div>
              <span className="text-[9px] text-zinc-550 uppercase font-mono">Server</span>
            </div>

            {/* Wire link */}
            <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-900 z-0" />

            {/* Packets */}
            {packets.map((p) => {
              let colorClass = "bg-sky-400 text-black";
              if (p.status === "lost") colorClass = "bg-rose-500 text-white";
              if (p.status === "received") colorClass = "bg-emerald-500 text-black";

              return (
                <motion.div
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: `calc(4rem + ${p.x * 0.7}%)`,
                    top: "43%",
                    transform: "translateY(-50%)"
                  }}
                  className={`w-8 h-8 rounded-full border border-black/20 flex flex-col items-center justify-center font-mono text-[10px] font-black shadow-lg ${colorClass}`}
                >
                  P{p.id}
                </motion.div>
              );
            })}

            {/* educational note about lost packets */}
            {simMode === "tcp" && packets.some(p => p.id === 2 && p.status === "lost") && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-rose-400 font-mono text-center animate-pulse">
                ⚠️ Packet P2 lost! Client will buffer subsequent streams and schedule retransmission.
              </div>
            )}
          </div>

          {/* Simulator Info panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-1.5 font-mono text-xs">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Server Received Packets</span>
              <p className="text-zinc-300">
                {serverReceived.length > 0 ? serverReceived.map(id => `[P${id}]`).join("  ") : "None"}
              </p>
            </div>
            
            {simMode === "tcp" ? (
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-1.5 font-mono text-xs">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Client Acknowledged (ACK)</span>
                <p className="text-emerald-400">
                  {clientAcks.length > 0 ? clientAcks.map(id => `[ACK ${id}]`).join("  ") : "Waiting..."}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl space-y-1.5 font-mono text-xs">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">UDP Transmission Note</span>
                <p className="text-zinc-400">
                  No ACKs are requested. Packages transmit instantly. Unreliable packet delivery (lost packets are permanently skipped).
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 border border-zinc-900 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/40 cursor-pointer flex items-center gap-2 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Start Transmission
                  </>
                )}
              </button>
              
              <button
                onClick={handleResetSim}
                className="p-2 border border-zinc-900 hover:border-zinc-800 text-zinc-650 hover:text-rose-400 rounded-xl cursor-pointer transition-colors"
                title="Reset Simulator"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Status: {isPlaying ? <span className="text-emerald-400">Streaming</span> : "Idle"}
            </div>
          </div>

        </div>
      </section>

      {/* 03. Ports Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">03.</span> Developer Port Directory
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Machines host multiple services. Ports act as mailbox routes, mapping requests directly to running applications.
        </p>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Ports List */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
            {portsData.map((item) => (
              <button
                key={item.port}
                onClick={() => setActivePort(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  activePort.port === item.port
                    ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-md font-bold"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900/30"
                }`}
              >
                <div className="flex items-center gap-2.5 font-mono text-sm">
                  <span className="font-black">:{item.port}</span>
                  <span className="text-xs text-zinc-500 font-sans">{item.service}</span>
                </div>
                <span className="text-[9px] uppercase font-mono bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-500">{item.type}</span>
              </button>
            ))}
          </div>

          {/* Port Detail Card */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl md:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Service Info</span>
                <span className="text-xs text-sky-400 font-mono font-bold">Port {activePort.port}</span>
              </div>
              <h3 className="text-white font-bold text-2xl flex items-center gap-2">
                {activePort.service}
              </h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                {activePort.description}
              </p>
            </div>
            
            <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Real-world usage</span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {activePort.usage}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 04. Common HTTP Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">04.</span> HTTP Statuses & Methods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Status Categories */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" /> Response Status Categories
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">2xx</span>
                <div className="text-zinc-400">
                  <strong>Success:</strong> Request successfully received and fulfilled. <br />
                  <span className="text-[10px] text-zinc-550">e.g. 200 OK, 201 Created</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-t border-zinc-900/60 pt-3">
                <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">3xx</span>
                <div className="text-zinc-400">
                  <strong>Redirection:</strong> Further action is needed to complete. <br />
                  <span className="text-[10px] text-zinc-550">e.g. 301 Moved Permanently, 304 Not Modified</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-zinc-900/60 pt-3">
                <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">4xx</span>
                <div className="text-zinc-400">
                  <strong>Client Error:</strong> Bad request params or routing. <br />
                  <span className="text-[10px] text-zinc-550">e.g. 400 Bad Request, 401 Unauthorized, 404 Not Found</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-zinc-900/60 pt-3">
                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">5xx</span>
                <div className="text-zinc-400">
                  <strong>Server Error:</strong> Server failed to process a valid request. <br />
                  <span className="text-[10px] text-zinc-550">e.g. 500 Internal Server Error, 502 Bad Gateway</span>
                </div>
              </div>
            </div>
          </div>

          {/* HTTP Methods */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-400" /> HTTP Request Methods
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-sky-400 font-bold">GET</span>
                <span className="text-zinc-400 font-light">Retrieves data from resource. Safe & Idempotent.</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-emerald-400 font-bold">POST</span>
                <span className="text-zinc-400 font-light">Submits new data payload to target resource.</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-indigo-400 font-bold">PUT</span>
                <span className="text-zinc-400 font-light">Replaces all target resource occurrences.</span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                <span className="text-amber-400 font-bold">PATCH</span>
                <span className="text-zinc-400 font-light">Applies partial updates to a resource.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-500 font-bold">DELETE</span>
                <span className="text-zinc-400 font-light">Removes target resource. Idempotent.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 05. Key Pitfalls & Takeaways */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">05.</span> Developer Mental Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-400" /> localhost != internet
            </h3>
            <p className="text-xs text-zinc-450 font-light leading-relaxed">
              New developers often make the mistake of setting backend urls to <code>127.0.0.1</code> or <code>localhost</code> when deploying websites. Remember: your computer's local loopback port does not translate to public internet requests.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-400" /> DNS Propagation Delay
            </h3>
            <p className="text-xs text-zinc-450 font-light leading-relaxed">
              When updating domain records (like moving domain paths to new cloud providers), modifications require hours to reflect worldwide. Resolvers keep caches governed by TTL (Time To Live).
            </p>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
