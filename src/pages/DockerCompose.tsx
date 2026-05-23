import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Database, Server, Globe, AlertTriangle, ChevronRight } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

export default function DockerCompose() {
  const [selectedService, setSelectedService] = useState<"frontend" | "backend" | "mongo">("frontend");

  const serviceDetails = {
    frontend: {
      name: "React Frontend Container",
      icon: Globe,
      colorClass: "text-sky-400 border-sky-500/20 bg-sky-500/10",
      description: "Served using a high-performance production Nginx instance. Exposes port 80 to public clients.",
      ports: "80:80 (Public)",
      volume: "None (Static Build Assets copied at build-time)",
      env: "None",
      dockerfile: `FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80`
    },
    backend: {
      name: "Express Backend Container",
      icon: Server,
      colorClass: "text-blue-400 border-blue-500/20 bg-blue-500/10",
      description: "Node.js REST API server executing business logic. Accessible only inside docker network default.",
      ports: "5000:5000 (Internal/External)",
      volume: "None",
      env: "MONGO_URI=mongodb://mongo:27017/mydb (Access database container by name)",
      dockerfile: `FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]`
    },
    mongo: {
      name: "MongoDB Database Container",
      icon: Database,
      colorClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      description: "NoSQL Database storage. Utilizes Docker Volumes to persist JSON document writes across container restarts.",
      ports: "27017:27017 (Internal)",
      volume: "mongo-data mapped to /data/db",
      env: "None",
      dockerfile: "None (Pulls official MongoDB image from Docker Hub)"
    }
  };

  const currentService = serviceDetails[selectedService];
  const ServiceIcon = currentService.icon;

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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-[10px] font-bold uppercase tracking-widest">
          <Layers className="w-3 h-3" /> DevOps Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Docker <span className="text-sky-400">Compose</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl font-sans">
          Orchestrate multi-container microservice stacks, design virtual bridge networks, and configure persistent database volumes declarative-style.
        </p>
      </header>

      {/* MERN Stack Visualizer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">01.</span> Stack Architecture Visualizer
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Click on any service block below to inspect its internal config, environment details, and file setups.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* Services Column Selector */}
          <div className="col-span-1 space-y-2.5">
            {[
              { id: "frontend", name: "frontend (Nginx)", icon: Globe, accent: "text-sky-400 border-sky-500/20" },
              { id: "backend", name: "backend (Express)", icon: Server, accent: "text-blue-400 border-blue-500/20" },
              { id: "mongo", name: "mongo (Database)", icon: Database, accent: "text-emerald-400 border-emerald-500/20" }
            ].map((srv) => {
              const SrvIcon = srv.icon;
              const isSelected = selectedService === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id as any)}
                  className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-zinc-900 border-zinc-800 text-zinc-100 font-semibold"
                      : "bg-zinc-950/40 hover:bg-zinc-950 border-zinc-900/60 text-zinc-400"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? srv.accent.split(' ')[0] + ' bg-zinc-900 border border-zinc-800' : 'bg-zinc-900/40 border border-zinc-900 text-zinc-550'}`}>
                      <SrvIcon className="w-4 h-4" />
                    </span>
                    <span className="text-xs uppercase tracking-wider">{srv.name}</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 text-zinc-650 transition-transform ${isSelected ? "translate-x-0.5" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Info Sheet */}
          <div className="col-span-1 lg:col-span-2 p-6 md:p-8 bg-zinc-900/20 border border-zinc-900 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${currentService.colorClass}`}>
                <ServiceIcon className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-sm">{currentService.name}</h3>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              {currentService.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono border-t border-b border-zinc-900 py-4">
              <div>
                <span className="text-zinc-550 block uppercase tracking-wider font-bold mb-1">Port Mapping</span>
                <span className="text-zinc-300 font-semibold">{currentService.ports}</span>
              </div>
              <div>
                <span className="text-zinc-550 block uppercase tracking-wider font-bold mb-1">Docker Volume</span>
                <span className="text-zinc-300 font-semibold">{currentService.volume}</span>
              </div>
              <div className="col-span-2">
                <span className="text-zinc-550 block uppercase tracking-wider font-bold mb-1">Environment Config</span>
                <span className="text-zinc-300 font-semibold">{currentService.env}</span>
              </div>
            </div>

            {currentService.dockerfile !== "None" && (
              <div className="space-y-2">
                <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Associated Dockerfile blueprint</span>
                <pre className="p-4 bg-[#0a0b0d] border border-zinc-900 rounded-xl overflow-x-auto text-[11px] font-mono text-zinc-400 no-scrollbar">
                  <code>{currentService.dockerfile}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 02. docker-compose.yml */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">02.</span> Declaring Composition
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          A single <code className="text-sky-400">docker-compose.yml</code> matches the above architecture, linking containers dynamically inside a bridge network.
        </p>

        <CodeBlock
          filename="docker-compose.yml"
          language="yaml"
          code={`version: "3.8"

services:
  mongo:
    image: mongo:latest
    container_name: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: backend
    restart: always
    ports:
      - "5000:5000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:`}
        />
      </section>

      {/* Common Pitfalls */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">03.</span> Deployment Pitfalls & Explanations
        </h2>

        <div className="space-y-4">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-zinc-200 font-bold text-sm">Hardcoding localhost</h4>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                <span className="text-rose-400 font-semibold">Wrong:</span> Connecting backend via <code className="text-zinc-300">mongodb://localhost:27017</code>.
              </p>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">
                <span className="text-emerald-400 font-semibold">Why:</span> Each container is isolated and maps <code className="text-zinc-300">localhost</code> to its own scope. To connect other servers, reference them by service names (e.g. <code className="text-emerald-400">mongodb://mongo:27017</code>) which are automatically resolved to container IPs by Docker DNS.
              </p>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-zinc-200 font-bold text-sm">Running Node dev servers in production</h4>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                <span className="text-rose-400 font-semibold">Wrong:</span> Running React using <code className="text-zinc-300">npm start</code> inside production containers.
              </p>
              <p className="text-zinc-500 text-xs font-light leading-relaxed">
                <span className="text-emerald-400 font-semibold">Why:</span> React dev servers compile files on the fly and lack security optimizations. Perform a multi-stage Docker build, output compiled static files via <code className="text-zinc-300">npm run build</code>, and configure Nginx to server the directory over port 80.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Workflow */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-sky-400">04.</span> VPS Execution Guide
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Commands to execute on a brand new Ubuntu VPS to deploy your containerized MERN application:
        </p>

        <div className="space-y-4">
          <div className="p-6 bg-[#0a0b0d] border border-zinc-900 rounded-2xl space-y-3">
            <h4 className="text-zinc-350 font-bold text-xs uppercase tracking-wider">Step 1: Install Docker Daemon</h4>
            <code className="bg-black p-3.5 rounded-xl block text-xs text-zinc-400 font-mono">
              apt update && apt install docker.io docker-compose -y
            </code>
          </div>
          <div className="p-6 bg-[#0a0b0d] border border-zinc-900 rounded-2xl space-y-3">
            <h4 className="text-zinc-350 font-bold text-xs uppercase tracking-wider">Step 2: Copy Files and Build Stacks</h4>
            <code className="bg-black p-3.5 rounded-xl block text-xs text-zinc-400 font-mono">
              docker-compose up -d --build
            </code>
            <p className="text-[10px] text-zinc-550 leading-relaxed font-light">
              The <code className="text-zinc-400">-d</code> flag daemonizes execution to run containers in background, and the <code className="text-zinc-400">--build</code> flag enforces rebuilding image layers.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
