import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Check, Copy, HardDrive } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

export default function Docker() {
  const [copied, setCopied] = useState(false);
  const [activeCommand, setActiveCommand] = useState("run");
  const [portHost, setPortHost] = useState("8080");
  const [portContainer, setPortContainer] = useState("80");
  const [containerName, setContainerName] = useState("my-app");
  const [imageName, setImageName] = useState("nginx:alpine");

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const getDockerCommand = () => {
    switch (activeCommand) {
      case "run":
        return `docker run -d --name ${containerName} -p ${portHost}:${portContainer} ${imageName}`;
      case "build":
        return `docker build -t ${imageName} .`;
      case "exec":
        return `docker exec -it ${containerName} sh`;
      case "logs":
        return `docker logs -f ${containerName}`;
      case "stop":
        return `docker stop ${containerName} && docker rm ${containerName}`;
      default:
        return "docker ps -a";
    }
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(getDockerCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          <Terminal className="w-3 h-3" /> DevOps Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Docker & <span className="text-blue-400">Containerization</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          A deep dive into packaging dependencies, isolating application states, and orchestrating deployment services consistently across any operating system.
        </p>
      </header>

      {/* 01. Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-blue-400">01.</span> What is Docker?
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Docker simplifies application distribution by packaging software alongside all libraries, binaries, and configurations it needs to run. Unlike full Virtual Machines which bundle an entire Guest OS, Docker containers run directly on top of the host kernel, making them lightweight and extremely fast to spin up.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Consistent Environments</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Solves the classic "it works on my machine" bug. The exact image built locally will execute byte-for-byte identically on VPS or enterprise cloud platforms.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Lightweight Resource Usage</h4>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">
              Because they share the host system's OS kernel, containers require zero hypervisor overhead, using a fraction of the RAM and CPU compared to standard VM nodes.
            </p>
          </div>
        </div>
      </section>

      {/* 02. Dockerfile Mastery */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-blue-400">02.</span> Dockerfile Blueprint
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          A Dockerfile is the build recipe. It describes instructions step-by-step to produce a container image.
        </p>

        <CodeBlock
          filename="Dockerfile"
          language="dockerfile"
          code={`# 1. Base Image
FROM node:18-alpine

# 2. Setup Working Directory inside Container
WORKDIR /usr/src/app

# 3. Handle Dependencies (cached layer optimization)
COPY package*.json ./
RUN npm install

# 4. Copy Application Source Code
COPY . .

# 5. Environment & Runtime configuration
ENV NODE_ENV=production
EXPOSE 3000

# 6. Command run when Container initializes
CMD ["npm", "start"]`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 bg-[#0b0c10] border border-zinc-900 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-zinc-800 text-[10px] text-zinc-300 font-mono font-bold rounded">FROM</span>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Defines the starter OS image. Prefer <code className="text-blue-400">-alpine</code> distributions to keep production files small and reduce security exposure.
            </p>
          </div>
          <div className="p-5 bg-[#0b0c10] border border-zinc-900 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-zinc-800 text-[10px] text-zinc-300 font-mono font-bold rounded">WORKDIR</span>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Creates and changes context into the designated folder. Any subsequent paths specified in commands will reside here.
            </p>
          </div>
          <div className="p-5 bg-[#0b0c10] border border-zinc-900 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-zinc-800 text-[10px] text-zinc-300 font-mono font-bold rounded">RUN vs CMD</span>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              <code className="text-blue-400">RUN</code> executes while the image builds (e.g. compiling binary code, installing dependencies). <code className="text-blue-400">CMD</code> sets the default runtime execute command.
            </p>
          </div>
          <div className="p-5 bg-[#0b0c10] border border-zinc-900 rounded-xl space-y-2">
            <span className="px-2 py-0.5 bg-zinc-800 text-[10px] text-zinc-300 font-mono font-bold rounded">COPY</span>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Moves files from the local repository directory into the container filesystem context.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Command Builder */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-blue-400">03.</span> Interactive CLI Builder
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Use the selector below to dynamically generate typical commands used to manage and deploy container nodes.
        </p>

        <div className="p-6 md:p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "run", label: "Run Container" },
              { id: "build", label: "Build Image" },
              { id: "exec", label: "SSH / Exec" },
              { id: "logs", label: "Stream Logs" },
              { id: "stop", label: "Stop & Remove" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveCommand(btn.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCommand === btn.id
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-zinc-850 hover:border-zinc-800"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Dynamic input options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCommand === "run" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Port Mapping (Host : Container)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={portHost}
                      onChange={(e) => setPortHost(e.target.value)}
                      className="w-1/2 bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-center font-mono font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700"
                    />
                    <span className="text-zinc-550">:</span>
                    <input
                      type="text"
                      value={portContainer}
                      onChange={(e) => setPortContainer(e.target.value)}
                      className="w-1/2 bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-center font-mono font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>
              </>
            )}

            {activeCommand === "build" && (
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Target Image Tag</label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700"
                />
              </div>
            )}

            {(activeCommand === "exec" || activeCommand === "logs" || activeCommand === "stop") && (
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Container ID / Name</label>
                <input
                  type="text"
                  value={containerName}
                  onChange={(e) => setContainerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-zinc-700"
                />
              </div>
            )}
          </div>

          {/* Result Terminal command */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Copy Command</span>
              <button
                onClick={handleCopyCommand}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#0b0c10] border border-zinc-900 rounded-2xl p-5 font-mono text-xs text-zinc-300 flex items-center justify-between">
              <span>{getDockerCommand()}</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
