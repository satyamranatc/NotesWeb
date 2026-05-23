import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Route, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Check, Info } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface DijkstraStep {
  id: number;
  vertex: string | null;
  commentary: string;
  pq: string;
  visited: string[];
  distances: Record<string, string | number>;
  parents: Record<string, string>;
  activeEdges: string[];
  sptEdges: string[];
}

const stepsList: DijkstraStep[] = [
  {
    id: 0,
    vertex: null,
    commentary: "📍 Start from Location A: You are standing at A, so the distance to yourself is 0. Since you haven't traveled anywhere else yet, all other locations are marked as 'Unknown' (Infinity).",
    pq: "A(0)",
    visited: [],
    distances: { A: 0, B: "∞", C: "∞", D: "∞", E: "∞" },
    parents: { A: "-", B: "-", C: "-", D: "-", E: "-" },
    activeEdges: [],
    sptEdges: []
  },
  {
    id: 1,
    vertex: "A",
    commentary: "🚶‍♂️ Explore Roads from A: You look at the direct roads from A. You can reach C in 1 minute and B in 4 minutes. You write these down as your currently best known times and add them to the queue.",
    pq: "C(1), B(4)",
    visited: ["A"],
    distances: { A: 0, B: 4, C: 1, D: "∞", E: "∞" },
    parents: { A: "-", B: "A", C: "A", D: "-", E: "-" },
    activeEdges: ["AB", "AC"],
    sptEdges: ["AB", "AC"]
  },
  {
    id: 2,
    vertex: "C",
    commentary: "🔍 Visit C (the closest location): Since C is the closest place (1 min), you walk there first. From C, you explore new roads: you can reach D in 5 mins (1 min to C + 4 mins to D) and E in 6 mins (1 min to C + 5 mins to E). Both are added to the queue.",
    pq: "B(4), D(5), E(6)",
    visited: ["A", "C"],
    distances: { A: 0, B: 4, C: 1, D: 5, E: 6 },
    parents: { A: "-", B: "A", C: "A", D: "C", E: "C" },
    activeEdges: ["CD", "CE"],
    sptEdges: ["AB", "AC", "CD", "CE"]
  },
  {
    id: 3,
    vertex: "B",
    commentary: "👀 Visit B & Check for Shortcuts: Now you check B (4 mins). If you try to go to D through B, it would take 6 mins (4 to B + 2 to D). But you already know a faster way to D (5 mins via C)! You ignore this slower path.",
    pq: "D(5), E(6)",
    visited: ["A", "B", "C"],
    distances: { A: 0, B: 4, C: 1, D: 5, E: 6 },
    parents: { A: "-", B: "A", C: "A", D: "C", E: "C" },
    activeEdges: ["BD"],
    sptEdges: ["AB", "AC", "CD", "CE"]
  },
  {
    id: 4,
    vertex: "D",
    commentary: "🛣️ Visit D & Check for Shortcuts: Next, you visit D (5 mins). From D, you check if you can get to E faster. Going D → E takes 6 mins (5 to D + 1 to E). Since that's the same as your current route (6 mins via C), no change is needed.",
    pq: "E(6)",
    visited: ["A", "B", "C", "D"],
    distances: { A: 0, B: 4, C: 1, D: 5, E: 6 },
    parents: { A: "-", B: "A", C: "A", D: "C", E: "C" },
    activeEdges: ["DE"],
    sptEdges: ["AB", "AC", "CD", "CE"]
  },
  {
    id: 5,
    vertex: "E",
    commentary: "🏁 Visit E (the last location): Finally, you visit E (6 mins). Since there are no more unvisited locations, you have successfully visited every place in the city!",
    pq: "empty",
    visited: ["A", "B", "C", "D", "E"],
    distances: { A: 0, B: 4, C: 1, D: 5, E: 6 },
    parents: { A: "-", B: "A", C: "A", D: "C", E: "C" },
    activeEdges: [],
    sptEdges: ["AB", "AC", "CD", "CE"]
  },
  {
    id: 6,
    vertex: "complete",
    commentary: "🎉 GPS Calculations Done!: You now know the absolute fastest path to every node from A. The gold lines show the optimal routes: A-C (1 min), A-B (4 mins), A-C-D (5 mins), and A-C-E (6 mins).",
    pq: "empty",
    visited: ["A", "B", "C", "D", "E"],
    distances: { A: 0, B: 4, C: 1, D: 5, E: 6 },
    parents: { A: "-", B: "A", C: "A", D: "C", E: "C" },
    activeEdges: [],
    sptEdges: ["AB", "AC", "CD", "CE"]
  }
];

const nodesPosition = {
  A: { x: 180, y: 120 },
  B: { x: 500, y: 120 },
  C: { x: 180, y: 280 },
  D: { x: 500, y: 280 },
  E: { x: 340, y: 380 }
};

const allEdges = [
  { id: "AB", from: "A", to: "B", w: 4 },
  { id: "AC", from: "A", to: "C", w: 1 },
  { id: "BD", from: "B", to: "D", w: 2 },
  { id: "CD", from: "C", to: "D", w: 4 },
  { id: "CE", from: "C", to: "E", w: 5 },
  { id: "DE", from: "D", to: "E", w: 1 }
];

export default function Dijkstra() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"python" | "java" | "cpp">("python");
  const playIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < stepsList.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }, 3000);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStep < stepsList.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const currentInfo = stepsList[currentStep];

  // Helper to determine node colors
  const getNodeStyles = (node: string) => {
    const isVisited = currentInfo.visited.includes(node);
    const isCurrent = currentInfo.vertex === node;

    if (isCurrent) {
      return { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.15)", pulsing: true };
    }
    if (isVisited) {
      return { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.05)", pulsing: false };
    }
    return { stroke: "#3f3f46", fill: "#09090b", pulsing: false };
  };

  // Helper to determine edge styles
  const getEdgeStyles = (edgeId: string) => {
    const isActive = currentInfo.activeEdges.includes(edgeId);
    const inSpt = currentInfo.sptEdges.includes(edgeId);

    // Active (currently checking relaxation)
    if (isActive) {
      return { stroke: "#ef4444", width: 5, dasharray: "5,5", pulsing: true };
    }
    // Solid Shortest Path Tree link
    if (inSpt) {
      return { stroke: "#f59e0b", width: 4.5, dasharray: "none", pulsing: false };
    }
    // Default base state
    return { stroke: "#27272a", width: 3.5, dasharray: "none", pulsing: false };
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
      className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24"
    >
      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-bold uppercase tracking-widest">
          <Route className="w-3 h-3" /> DSA Series
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Dijkstra’s Algorithm — <br />
          <span className="text-amber-400">“Thinking Like a GPS”</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Imagine standing in a city with many roads and wanting to reach every place using the minimum possible distance. Dijkstra's Algorithm does exactly that—expanding outward carefully and greedily.
        </p>
      </header>

      {/* 01. Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-amber-400">01.</span> Core Intuition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400 font-light leading-relaxed">
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">The Golden Rule</h3>
            <blockquote className="p-4 border-l-2 border-amber-500 bg-amber-500/5 rounded-r-xl text-zinc-300 font-normal italic">
              “Once we find the shortest path to a node, we never need to revisit it.”
            </blockquote>
            <p>
              This works because all edge weights are non-negative, meaning no future path can magically become shorter later.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Where is it used?</h3>
            <ul className="grid grid-cols-2 gap-3 text-xs font-medium uppercase tracking-wider text-zinc-300">
              <li className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-2">📍 Google Maps</li>
              <li className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-2">🌐 Network Routing</li>
              <li className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-2">🛰️ GPS Systems</li>
              <li className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-2">🎮 Game AI Pathfinding</li>
            </ul>
          </div>
        </div>

        <div className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-2xl space-y-3 font-light text-zinc-400 leading-relaxed">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-400" /> What is Relaxation?
          </h3>
          <p>
            Relaxation is the heart of Dijkstra. If the currently recorded distance to node <code>v</code> is larger than the distance to node <code>u</code> plus the edge cost from <code>u</code> to <code>v</code>, we update it:
          </p>
          <div className="p-4 bg-black/60 rounded-xl text-amber-400 font-mono text-xs border border-zinc-800">
            if (dist[u] + weight(u, v) &lt; dist[v]) &#123; <br />
            &nbsp;&nbsp;dist[v] = dist[u] + weight(u, v); <br />
            &#125;
          </div>
        </div>
      </section>

      {/* 02. Interactive Visualizer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-amber-400">02.</span> Whiteboard Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Trace the exact whiteboard example from the notes. Visited nodes turn <span className="text-amber-400 font-semibold">gold</span>, active relaxation lines are <span className="text-red-400 font-semibold">dashed red</span>, and stable routes are <span className="text-amber-400 font-semibold">solid gold</span>.
        </p>

        {/* Visualizer Card */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Graph & Controls */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* SVG Frame */}
              <div className="flex justify-center bg-black/40 rounded-2xl p-6 border border-zinc-900/60 relative">
                <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Whiteboard Graph</span>
                <svg viewBox="140 80 400 340" className="w-full max-w-[550px] h-auto">
                  <defs>
                    <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Draw Edges */}
                  {allEdges.map((edge) => {
                    const fromNode = nodesPosition[edge.from as keyof typeof nodesPosition];
                    const toNode = nodesPosition[edge.to as keyof typeof nodesPosition];
                    const styles = getEdgeStyles(edge.id);

                    return (
                      <g key={edge.id}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke={styles.stroke}
                          strokeWidth={styles.width}
                          strokeDasharray={styles.dasharray}
                          className={styles.pulsing ? "animate-pulse" : ""}
                          style={{
                            transition: "all 0.3s ease",
                            ...(styles.stroke === "#f59e0b" ? { filter: "url(#glow-amber)" } : {})
                          }}
                        />
                        {/* Weight Label Box */}
                        <g transform={`translate(${(fromNode.x + toNode.x) / 2 - 10}, ${(fromNode.y + toNode.y) / 2 - 10})`}>
                          <rect width="20" height="20" rx="4" fill="#09090b" stroke="#18181b" />
                          <text x="10" y="14" fill="#71717a" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {edge.w}
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Draw Vertices */}
                  {Object.entries(nodesPosition).map(([name, pos]) => {
                    const styles = getNodeStyles(name);
                    return (
                      <g key={name} transform={`translate(${pos.x}, ${pos.y})`}>
                        <circle
                          r="20"
                          fill={styles.fill}
                          stroke={styles.stroke}
                          strokeWidth="3"
                          className={styles.pulsing ? "animate-pulse" : ""}
                          style={{
                            transition: "all 0.3s ease",
                            ...(styles.stroke === "#f59e0b" ? { filter: "url(#glow-amber)" } : {})
                          }}
                        />
                        <text
                          y="5"
                          fill="#f4f4f5"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                          fontSize="13"
                          textAnchor="middle"
                        >
                          {name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Simulator Controllers */}
              <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-zinc-900/50 rounded-2xl">
                <div className="flex gap-2">
                  <button
                    disabled={currentStep === 0}
                    onClick={handlePrev}
                    className="px-4 py-2 border border-zinc-900 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    disabled={currentStep === stepsList.length - 1}
                    onClick={handleNext}
                    className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
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
                        <Play className="w-3.5 h-3.5" /> Auto Play
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-2 border border-zinc-900 hover:border-zinc-800 text-zinc-650 hover:text-amber-400 rounded-xl cursor-pointer transition-colors"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column - Table, Steps & Commentary */}
            <div className="flex-1 flex flex-col gap-6 justify-between">
              
              {/* Step Commentary & Queue info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Step Commentary</span>
                  <p className="text-xs text-zinc-350 leading-relaxed min-h-[52px]">
                    {currentInfo.commentary}
                  </p>
                </div>

                <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Priority Queue (Min-Heap)</span>
                    <p className="text-xs text-amber-400 font-mono font-bold pt-1">
                      {currentInfo.pq}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-900/60 mt-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Processing Node</span>
                    <span className="inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                      {currentInfo.vertex || "None"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shortest Distances Table */}
              <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-black/20">
                <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950/60">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-550">Shortest Distances Table</span>
                </div>
                <div className="overflow-x-auto max-h-[190px] scrollbar-thin">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider bg-zinc-950/20">
                        <th className="p-2.5">Node</th>
                        <th className="p-2.5">Shortest Distance from A</th>
                        <th className="p-2.5">Path Walk</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 font-mono">
                      {Object.keys(nodesPosition).map((node) => {
                        const distance = currentInfo.distances[node];
                        const isSettled = currentInfo.visited.includes(node);

                        // Reconstruct path
                        let path = "";
                        if (distance !== "∞") {
                          let temp = node;
                          const pathList = [temp];
                          while (currentInfo.parents[temp] && currentInfo.parents[temp] !== "-") {
                            pathList.unshift(currentInfo.parents[temp]);
                            temp = currentInfo.parents[temp];
                          }
                          path = pathList.join(" → ");
                        } else {
                          path = "-";
                        }

                        return (
                          <tr 
                            key={node} 
                            className={`hover:bg-zinc-900/10 transition-colors ${
                              currentInfo.vertex === node ? "bg-amber-500/5 text-amber-400" : ""
                            }`}
                          >
                            <td className="p-2.5 font-bold">{node}</td>
                            <td className="p-2.5">
                              <span className={distance !== "∞" ? "text-zinc-200 font-bold" : "text-zinc-650"}>
                                {distance}
                              </span>
                            </td>
                            <td className="p-2.5 text-zinc-400 text-[10px]">{path}</td>
                            <td className="p-2.5">
                              {isSettled ? (
                                <span className="text-amber-400 flex items-center gap-1.5 text-[9px] font-bold uppercase">
                                  <Check className="w-3.5 h-3.5" /> Settled
                                </span>
                              ) : (
                                <span className="text-zinc-600 text-[9px] font-bold uppercase">Unvisited</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timeline steps */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-550 block">Simulation Steps</span>
                <div className="flex flex-wrap gap-1.5">
                  {stepsList.map((step, idx) => {
                    const isCurrent = idx === currentStep;
                    const isPassed = idx < currentStep;

                    let borderStyle = "border-zinc-900 text-zinc-500 bg-zinc-950/20";
                    if (isCurrent) {
                      borderStyle = "border-amber-500 text-amber-400 bg-amber-500/10 font-bold scale-[1.02]";
                    } else if (isPassed) {
                      borderStyle = "border-amber-500/30 text-amber-500/60 bg-amber-500/5";
                    }

                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStep(idx);
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono transition-all cursor-pointer ${borderStyle}`}
                      >
                        Step {idx} {step.vertex ? `(${step.vertex})` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 03. Code Implementation */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-amber-400">03.</span> Code Implementation
          </h2>
          {/* Language Selector */}
          <div className="inline-flex bg-zinc-950 p-1 border border-zinc-900 rounded-xl self-start sm:self-auto">
            {[
              { id: "python", label: "Python" },
              { id: "java", label: "Java" },
              { id: "cpp", label: "C++" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed font-light">
          Implementation of Dijkstra's algorithm matching the whiteboard structure. Standard Priority Queue usage gives an efficient runtime complexity.
        </p>

        {activeTab === "python" && (
          <div className="space-y-6">
            <CodeBlock
              filename="dijkstra.py"
              language="python"
              code={`import heapq

def dijkstra(graph, start):
    # Priority queue stores: (distance, node)
    pq = [(0, start)]

    # Store shortest distances
    distances = {}

    # Initialize all nodes with infinity
    for node in graph:
        distances[node] = float('inf')

    distances[start] = 0

    while pq:
        # Get node with smallest distance
        current_distance, current_node = heapq.heappop(pq)

        # Ignore outdated entries
        if current_distance > distances[current_node]:
            continue

        # Explore neighbors
        for neighbor, weight in graph[current_node]:

            # New possible distance
            distance = current_distance + weight

            # Relaxation step
            if distance < distances[neighbor]:
                distances[neighbor] = distance

                # Push updated distance
                heapq.heappush(pq, (distance, neighbor))

    return distances


# Graph Representation
graph = {
    'A': [('B', 4), ('C', 1)],
    'B': [('D', 2)],
    'C': [('D', 4), ('E', 5)],
    'D': [('E', 1)],
    'E': []
}

result = dijkstra(graph, 'A')
print(result) # {'A': 0, 'B': 4, 'C': 1, 'D': 5, 'E': 6}`}
            />
            <div className="p-5 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-3 font-light text-xs text-zinc-450 leading-relaxed">
              <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-[10px]">Python Code Highlights</h4>
              <p><strong>Priority Queue:</strong> <code className="text-amber-400 bg-amber-400/5 px-1 py-0.5 rounded">pq = [(0, start)]</code> stores pairs where the smallest distance is popped first.</p>
              <p><strong>Outdated checks:</strong> <code className="text-amber-400 bg-amber-400/5 px-1 py-0.5 rounded">if current_distance &gt; distances[current_node]: continue</code> prevents processing redundant queue entries.</p>
            </div>
          </div>
        )}

        {activeTab === "java" && (
          <div className="space-y-6">
            <CodeBlock
              filename="DijkstraAlgorithm.java"
              language="java"
              code={`import java.util.*;

class Pair {
    int node;
    int distance;

    Pair(int node, int distance) {
        this.node = node;
        this.distance = distance;
    }
}

public class DijkstraAlgorithm {

    public static void dijkstra(List<List<Pair>> graph, int source) {

        int n = graph.size();

        // Distance array
        int[] dist = new int[n];

        Arrays.fill(dist, Integer.MAX_VALUE);

        dist[source] = 0;

        // Min Heap Priority Queue
        PriorityQueue<Pair> pq =
            new PriorityQueue<>((a, b) -> a.distance - b.distance);

        pq.add(new Pair(source, 0));

        while (!pq.isEmpty()) {

            Pair current = pq.poll();

            int currentNode = current.node;
            int currentDistance = current.distance;

            // Ignore outdated entries
            if (currentDistance > dist[currentNode]) {
                continue;
            }

            // Explore neighbors
            for (Pair neighbor : graph.get(currentNode)) {

                int nextNode = neighbor.node;
                int weight = neighbor.distance;

                int newDistance =
                    currentDistance + weight;

                // Relaxation
                if (newDistance < dist[nextNode]) {

                    dist[nextNode] = newDistance;

                    pq.add(
                        new Pair(nextNode, newDistance)
                    );
                }
            }
        }

        // Print shortest distances
        for (int i = 0; i < n; i++) {
            System.out.println(
                "Distance from source to " +
                i + " = " + dist[i]
            );
        }
    }

    public static void main(String[] args) {

        int n = 5;

        List<List<Pair>> graph = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        // Add edges
        graph.get(0).add(new Pair(1, 4));
        graph.get(0).add(new Pair(2, 1));

        graph.get(1).add(new Pair(3, 2));

        graph.get(2).add(new Pair(3, 4));
        graph.get(2).add(new Pair(4, 5));

        graph.get(3).add(new Pair(4, 1));

        dijkstra(graph, 0);
    }
}`}
            />
            <div className="p-5 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-3 font-light text-xs text-zinc-455 leading-relaxed">
              <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-[10px]">Java Code Highlights</h4>
              <p><strong>Pair Utility:</strong> Encapsulates coordinates for adjacency lists and priorities.</p>
              <p><strong>Custom Comparator:</strong> <code className="text-amber-400 bg-amber-400/5 px-1 py-0.5 rounded">(a, b) -&gt; a.distance - b.distance</code> ensures queue serves as a Min-Heap.</p>
            </div>
          </div>
        )}

        {activeTab === "cpp" && (
          <div className="space-y-6">
            <CodeBlock
              filename="dijkstra.cpp"
              language="cpp"
              code={`#include <iostream>
#include <vector>
#include <queue>
#include <climits>

using namespace std;

typedef pair<int, int> pii; // {distance, node}

struct Pair {
    int node;
    int distance;
};

void dijkstra(const vector<vector<Pair>>& graph, int source) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    dist[source] = 0;

    // Min Heap Priority Queue: stores {distance, node}
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, source});

    while (!pq.empty()) {
        int currentNode = pq.top().second;
        int currentDistance = pq.top().first;
        pq.pop();

        // Ignore outdated entries
        if (currentDistance > dist[currentNode]) {
            continue;
        }

        // Explore neighbors
        for (const auto& neighbor : graph[currentNode]) {
            int nextNode = neighbor.node;
            int weight = neighbor.distance;

            int newDistance = currentDistance + weight;

            // Relaxation
            if (newDistance < dist[nextNode]) {
                dist[nextNode] = newDistance;
                pq.push({newDistance, nextNode});
            }
        }
    }

    // Print shortest distances
    for (int i = 0; i < n; i++) {
        cout << "Distance from source to " << i << " = " << dist[i] << endl;
    }
}

int main() {
    int n = 5;
    vector<vector<Pair>> graph(n);

    // Add edges
    graph[0].push_back({1, 4});
    graph[0].push_back({2, 1});
    graph[1].push_back({3, 2});
    graph[2].push_back({3, 4});
    graph[2].push_back({4, 5});
    graph[3].push_back({4, 1});

    dijkstra(graph, 0);

    return 0;
}`}
            />
            <div className="p-5 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-3 font-light text-xs text-zinc-455 leading-relaxed">
              <h4 className="text-zinc-300 font-bold uppercase tracking-wider text-[10px]">C++ Code Highlights</h4>
              <p><strong>Min-Priority Queue:</strong> Utilizes std::priority_queue with a custom greater comparator to act as a min-heap.</p>
            </div>
          </div>
        )}
      </section>

      {/* 04. Technical Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-amber-400">04.</span> Interview Triggers
          </h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            If you see any of the following parameters, your brain should immediately think of <strong>Dijkstra</strong>:
          </p>
          <ul className="space-y-2 text-sm text-zinc-300 font-medium">
            <li className="flex items-center gap-2">⚡ Shortest path finding</li>
            <li className="flex items-center gap-2">💰 Minimum cost search</li>
            <li className="flex items-center gap-2">📊 Weighted graphs</li>
            <li className="flex items-center gap-2">🛑 Non-negative edges only</li>
            <li className="flex items-center gap-2">🚗 Fastest/Cheapest path route</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-amber-400">05.</span> Limitations
          </h2>
          <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              ⚠️ Negative Weights Not Allowed
            </h3>
            <p className="text-xs text-zinc-450 font-light leading-relaxed">
              Dijkstra assumes that once a node is settled, its shortest path is final. If a negative weight is introduced, a shorter path could be discovered later, breaking the greedy invariant. 
            </p>
            <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-400 text-xs">
              💡 For negative weights, use <strong>Bellman-Ford Algorithm</strong>.
            </div>
          </div>
        </div>

      </section>
    </motion.div>
  );
}
