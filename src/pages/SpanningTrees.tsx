import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Network, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, GitFork, GitBranch } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface Edge {
  id: string;
  u: string;
  v: string;
  w: number;
  action: "select" | "reject" | "complete";
  commentary: string;
  dsu: string;
}

const edgesList: Edge[] = [
  { id: "BC", u: "B", v: "C", w: 1, action: "select", commentary: "Examining Edge B-C (weight 1). B and C belong to separate components. Select it! Merge component {B} and {C}.", dsu: "{A}, {B, C}, {D}, {E}, {F}" },
  { id: "AC", u: "A", v: "C", w: 2, action: "select", commentary: "Examining Edge A-C (weight 2). A and C belong to separate components ({A} vs {B, C}). Select it! Merge them to create component {A, B, C}.", dsu: "{A, B, C}, {D}, {E}, {F}" },
  { id: "DE", u: "D", v: "E", w: 2, action: "select", commentary: "Examining Edge D-E (weight 2). D and E belong to separate components. Select it! Merge to component {D, E}.", dsu: "{A, B, C}, {D, E}, {F}" },
  { id: "EF", u: "E", v: "F", w: 3, action: "select", commentary: "Examining Edge E-F (weight 3). E and F belong to separate components ({D, E} vs {F}). Select it! Merge to {D, E, F}.", dsu: "{A, B, C}, {D, E, F}" },
  { id: "AB", u: "A", v: "B", w: 4, action: "reject", commentary: "Examining Edge A-B (weight 4). A and B already share a representative root (C) inside the component {A, B, C}. 🛑 Cycle Detected! Discard edge.", dsu: "{A, B, C}, {D, E, F}" },
  { id: "BD", u: "B", v: "D", w: 5, action: "select", commentary: "Examining Edge B-D (weight 5). B and D belong to separate components ({A, B, C} vs {D, E, F}). Select it! We have connected all components into a single spanning tree!", dsu: "{A, B, C, D, E, F}" },
  { id: "complete", u: "", v: "", w: 0, action: "complete", commentary: "🎉 Kruskal's algorithm is complete! We have connected all vertices using V-1 = 5 edges. Total MST Weight = 13.", dsu: "{A, B, C, D, E, F}" }
];

const nodesPosition = {
  A: { x: 120, y: 180 },
  B: { x: 280, y: 100 },
  C: { x: 240, y: 280 },
  D: { x: 440, y: 140 },
  E: { x: 400, y: 320 },
  F: { x: 560, y: 220 }
};

const allEdges = [
  { id: "BC", from: "B", to: "C", w: 1 },
  { id: "AC", from: "A", to: "C", w: 2 },
  { id: "DE", from: "D", to: "E", w: 2 },
  { id: "EF", from: "E", to: "F", w: 3 },
  { id: "AB", from: "A", to: "B", w: 4 },
  { id: "BD", from: "B", to: "D", w: 5 },
  { id: "DF", from: "D", to: "F", w: 6 },
  { id: "CD", from: "C", to: "D", w: 8 },
  { id: "CE", from: "C", to: "E", w: 10 }
];

export default function SpanningTrees() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"python" | "java" | "cpp">("python");
  const playIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < edgesList.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0; // loop back
          }
        });
      }, 2500);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStep < edgesList.length - 1) {
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

  const currentInfo = edgesList[currentStep];

  // Helper to determine node border/fill color based on current DSU partitions
  const getNodeColor = (node: string) => {
    if (currentStep === 0) return { stroke: "#4b5563", fill: "#09090b" };
    const stepInfo = edgesList[currentStep - 1];
    const dsu = stepInfo.dsu;

    if (dsu.includes("A, B, C, D, E, F")) {
      return { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.05)" };
    }

    if (["A", "B", "C"].includes(node)) {
      if (dsu.includes("A, B, C")) return { stroke: "#3b82f6", fill: "rgba(59, 130, 246, 0.05)" };
      if (dsu.includes("B, C") && ["B", "C"].includes(node)) return { stroke: "#3b82f6", fill: "rgba(59, 130, 246, 0.05)" };
    }

    if (["D", "E", "F"].includes(node)) {
      if (dsu.includes("D, E, F")) return { stroke: "#a855f7", fill: "rgba(168, 85, 247, 0.05)" };
      if (dsu.includes("D, E") && ["D", "E"].includes(node)) return { stroke: "#a855f7", fill: "rgba(168, 85, 247, 0.05)" };
    }

    return { stroke: "#4b5563", fill: "#09090b" };
  };

  // Helper to determine edge line attributes (stroke, width, animation)
  const getEdgeAttributes = (edgeId: string) => {
    // Current evaluated edge
    if (currentStep > 0 && currentStep < edgesList.length) {
      const evaluatingEdge = edgesList[currentStep - 1];
      if (evaluatingEdge.id === edgeId) {
        return {
          stroke: "#f59e0b",
          width: 5,
          dasharray: "none",
          pulsing: true
        };
      }
    }

    // Historical choices
    for (let i = 0; i < currentStep; i++) {
      const trace = edgesList[i];
      if (trace.id === edgeId) {
        if (trace.action === "select") {
          return {
            stroke: "#10b981",
            width: 5,
            dasharray: "none",
            pulsing: false
          };
        } else if (trace.action === "reject") {
          return {
            stroke: "#ef4444",
            width: 3,
            dasharray: "5,5",
            pulsing: false
          };
        }
      }
    }

    // Unvisited base state
    return {
      stroke: "#27272a",
      width: 3.5,
      dasharray: "none",
      pulsing: false
    };
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
      {/* Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          <Network className="w-3 h-3" /> DSA Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Minimum <span className="text-emerald-400">Spanning Trees</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          An algorithmic guide to undirected graphs, cycle detection with Union-Find (DSU), and greedy edge selections.
        </p>
      </header>

      {/* 01. Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">01.</span> What is a Spanning Tree?
        </h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed font-light">
          <p>
            For a connected, undirected graph $G = (V, E)$, a <strong>Spanning Tree</strong> is a subgraph that connects all $V$ vertices using exactly $V - 1$ edges without forming any cycle. If the edges have weights, the <strong>Minimum Spanning Tree (MST)</strong> is the configuration that minimizes the sum of edge costs.
          </p>
          <div className="p-5 border-l-2 border-emerald-500 bg-emerald-500/5 rounded-r-2xl text-zinc-300 font-normal">
            For any spanning tree, adding a single edge creates a cycle; removing any edge disconnects the graph.
          </div>
        </div>
      </section>

      {/* 02. Interactive Visualizer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">02.</span> Kruskal's Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Trace edge examinations in sorted order of weight. Watch cycle exclusions (red dashes) and DSU partitions updates dynamically.
        </p>

        {/* Visualizer Card */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6 space-y-6">
          
          {/* SVG Frame */}
          <div className="flex justify-center bg-black/40 rounded-2xl p-6 border border-zinc-900/60 relative">
            <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Graph View</span>
            <svg viewBox="0 0 680 400" className="w-full max-w-[580px] h-auto">
              <defs>
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw Edges */}
              {allEdges.map((edge) => {
                const fromNode = nodesPosition[edge.from as keyof typeof nodesPosition];
                const toNode = nodesPosition[edge.to as keyof typeof nodesPosition];
                const attrs = getEdgeAttributes(edge.id);

                return (
                  <g key={edge.id}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={attrs.stroke}
                      strokeWidth={attrs.width}
                      strokeDasharray={attrs.dasharray}
                      className={attrs.pulsing ? "animate-pulse" : ""}
                      style={{ transition: "all 0.3s ease", ...(attrs.stroke === "#10b981" ? { filter: "url(#glow-emerald)" } : {}) }}
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
                const nodeColors = getNodeColor(name);
                return (
                  <g key={name} transform={`translate(${pos.x}, ${pos.y})`}>
                    <circle
                      r="20"
                      fill={nodeColors.fill}
                      stroke={nodeColors.stroke}
                      strokeWidth="3"
                      style={{ transition: "all 0.3s ease" }}
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

          {/* Step Commentary & DSU Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl md:col-span-2 space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-550 block">Step Commentary</span>
              <p className="text-xs text-zinc-350 leading-relaxed min-h-[40px]">
                {currentStep === 0
                  ? "Kruskal initialized. Edges are sorted in increasing order of weight. Node sets are disjoint."
                  : currentInfo.commentary}
              </p>
            </div>
            <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-550 block">DSU Components</span>
              <p className="text-xs text-emerald-400 font-mono font-bold pt-1">
                {currentStep === 0 ? "{A}, {B}, {C}, {D}, {E}, {F}" : currentInfo.dsu}
              </p>
            </div>
          </div>

          {/* Edge Queue Tracker */}
          <div className="space-y-3 pt-2">
            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-550 block">Sorted Edges Queue</span>
            <div className="flex flex-wrap gap-2">
              {edgesList.map((e, idx) => {
                if (e.id === "complete") return null;
                const isCurrent = idx === currentStep - 1;
                const isPassed = idx < currentStep - 1;
                const isSelected = e.action === "select";

                let borderStyle = "border-zinc-900 text-zinc-500 bg-zinc-950/20";
                if (isCurrent) {
                  borderStyle = isSelected
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 font-bold"
                    : "border-rose-500 text-rose-400 bg-rose-500/10 font-bold";
                } else if (isPassed) {
                  borderStyle = isSelected
                    ? "border-emerald-500/30 text-emerald-500/60 bg-emerald-500/5"
                    : "border-rose-500/30 text-rose-500/60 bg-rose-500/5";
                }

                return (
                  <button
                    key={e.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(idx + 1);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${borderStyle}`}
                  >
                    {e.u}-{e.v} ({e.w})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simulator Controllers */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
            <div className="flex gap-2">
              <button
                disabled={currentStep === 0}
                onClick={handlePrev}
                className="px-4 py-2 border border-zinc-900 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={currentStep === edgesList.length - 1}
                onClick={handleNext}
                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
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
                className="p-2 border border-zinc-900 hover:border-zinc-800 text-zinc-650 hover:text-rose-400 rounded-xl cursor-pointer transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 03. Implementation Source */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-emerald-400">03.</span> Code Implementation
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
          A modular, production-ready implementation of Kruskal's MST employing union-by-rank and path compression.
        </p>

        {activeTab === "python" && (
          <CodeBlock
            filename="kruskal.py"
            language="python"
            code={`class DisjointSet:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, item):
        # Path compression: flattens structure during lookup
        if self.parent[item] != item:
            self.parent[item] = self.find(self.parent[item])
        return self.parent[item]

    def union(self, set1, set2):
        root1 = self.find(set1)
        root2 = self.find(set2)

        if root1 != root2:
            # Union by rank: attaches shallower tree to deeper root
            if self.rank[root1] > self.rank[root2]:
                self.parent[root2] = root1
            elif self.rank[root1] < self.rank[root2]:
                self.parent[root1] = root2
            else:
                self.parent[root2] = root1
                self.rank[root1] += 1
            return True
        return False

def kruskal(vertices, edges):
    # Sort edges primarily by weights
    sorted_edges = sorted(edges, key=lambda edge: edge[0])
    
    dsu = DisjointSet(vertices)
    mst = []
    mst_weight = 0
    
    for weight, u, v in sorted_edges:
        if dsu.union(u, v):
            mst.append((u, v, weight))
            mst_weight += weight
            if len(mst) == len(vertices) - 1:
                break
                
    return mst, mst_weight`}
          />
        )}

        {activeTab === "java" && (
          <CodeBlock
            filename="Kruskal.java"
            language="java"
            code={`import java.util.*;

class Kruskal {
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        public Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
        @Override
        public int compareTo(Edge other) {
            return Integer.compare(this.weight, other.weight);
        }
    }

    static class DisjointSet {
        int[] parent, rank;
        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        public int find(int i) {
            if (parent[i] != i) {
                parent[i] = find(parent[i]); // Path compression
            }
            return parent[i];
        }
        public boolean union(int i, int j) {
            int rootI = find(i);
            int rootJ = find(j);
            if (rootI != rootJ) {
                if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
                else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
                else { parent[rootJ] = rootI; rank[rootI]++; }
                return true;
            }
            return false;
        }
    }

    public static List<Edge> solve(int vertices, List<Edge> edges) {
        Collections.sort(edges);
        DisjointSet dsu = new DisjointSet(vertices);
        List<Edge> mst = new ArrayList<>();
        for (Edge e : edges) {
            if (dsu.union(e.src, e.dest)) {
                mst.add(e);
                if (mst.size() == vertices - 1) break;
            }
        }
        return mst;
    }
}`}
          />
        )}

        {activeTab === "cpp" && (
          <CodeBlock
            filename="kruskal.cpp"
            language="cpp"
            code={`#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Edge {
    int src, dest, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

class DisjointSet {
    vector<int> parent, rank;
public:
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] != i) {
            parent[i] = find(parent[i]); // Path compression
        }
        return parent[i];
    }
    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else { parent[rootJ] = rootI; rank[rootI]++; }
            return true;
        }
        return false;
    }
};

vector<Edge> kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DisjointSet dsu(n);
    vector<Edge> mst;
    for (const auto& edge : edges) {
        if (dsu.unite(edge.src, edge.dest)) {
            mst.push_back(edge);
            if (mst.size() == n - 1) break;
        }
    }
    return mst;
}`}
          />
        )}
      </section>

      {/* 04. Prim vs Kruskal comparison */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-emerald-400">04.</span> Kruskal vs Prim Comparison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <GitFork className="w-5 h-5 text-emerald-400" /> Kruskal's
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-light list-disc list-inside">
              <li><strong>Edge-centric:</strong> Sorts all edges and picks them sequentially.</li>
              <li><strong>DSU support:</strong> Relies on Disjoint Sets for cycle checks.</li>
              <li><strong>Optimized for:</strong> Sparse graphs where edge count $E$ is close to vertex count $V$.</li>
              <li><strong>Complexity:</strong> $O(E \log E)$ primarily due to the sorting step.</li>
            </ul>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-400" /> Prim's
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-light list-disc list-inside">
              <li><strong>Vertex-centric:</strong> Grows a single continuous tree from a start node.</li>
              <li><strong>Heap support:</strong> Relies on Min-Priority Queue (Binary/Fibonacci Heap).</li>
              <li><strong>Optimized for:</strong> Dense graphs where edge count $E$ approaches $V^2$.</li>
              <li><strong>Complexity:</strong> $O(E \log V)$ or $O(E + V \log V)$ with Fibonacci heaps.</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
