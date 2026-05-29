import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Map, MapPin, Compass, Database, Zap, 
  Terminal, Layers, Activity, ArrowRight, CheckCircle2
} from "lucide-react";
import CodeBlock from "../components/CodeBlock";

export default function UberSystemDesign() {
  const [activeTab, setActiveTab] = useState<"architecture" | "geospatial" | "databases" | "devops">("architecture");
  const [activeStep, setActiveStep] = useState<number>(0);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  // Interactive Flow Steps
  const flowSteps = [
    {
      title: "Driver Location Streaming",
      actor: "Driver App",
      tech: "gRPC Stream / WebSockets, Redis, Go",
      desc: "Driver apps send GPS pings every 4 seconds. The location is processed by a high-throughput Gateway and written to Redis to maintain the latest coordinate states.",
      metrics: "Millions of pings/sec, < 50ms processing latency"
    },
    {
      title: "Geospatial Hex Ingestion",
      actor: "H3 Location Service",
      tech: "Uber H3 (Hexagonal Grid), Node.js / Go",
      desc: "The raw coordinates (latitude, longitude) are converted into H3 hexagon indices. This maps drivers to specific geographic cells in real-time, indexing supply.",
      metrics: "Resolution 8 to 10 hexagons, O(1) cell lookup"
    },
    {
      title: "Rider Demand & Surge Check",
      actor: "Rider App / Surge Service",
      tech: "Apache Pinot, Flink, Schemaless",
      desc: "Rider requests a ride. The Surge service evaluates historical supply/demand in the current H3 cell. If demand outstrips supply, dynamic surge pricing is applied.",
      metrics: "Real-time stream aggregation, < 100ms pricing calculation"
    },
    {
      title: "DISCO Matching Engine",
      actor: "Dispatch System",
      tech: "Go Microservices, Ringpop sharding",
      desc: "DISCO performs a ring-buffer search starting from the rider's H3 cell and expanding outwards. It finds the nearest idle drivers and sends them dispatch requests.",
      metrics: "Parallel search over neighboring hexes, matching completed in < 1s"
    },
    {
      title: "Routing & Route Ingestion",
      actor: "OSRM Engine",
      tech: "OSRM, Map Matching Service",
      desc: "Once matched, the OSRM (Open Source Routing Machine) calculates the optimal pick-up and drop-off paths, estimating ETAs based on live traffic telemetry.",
      metrics: "Contraction Hierarchies, pathing resolved in < 5ms"
    },
    {
      title: "Event Logging & Kafka",
      actor: "Data Pipeline",
      tech: "Apache Kafka, ScyllaDB, HDFS",
      desc: "The ride event (matched, picked up, completed) is pushed to Kafka. Telemetry is saved to ScyllaDB for active operations and HDFS/Pinot for offline analytics.",
      metrics: "Billions of events/day, durable replication"
    }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20"
    >
      {/* Page Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          <Compass className="w-3 h-3" /> System Design Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Uber <span className="text-blue-400">System Design</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          An in-depth architectural breakdown of Uber's highly scalable dispatch, geospatial, and data ingestion infrastructure. Explore the mathematical principles of H3, DevOps telemetry, and state management at scale.
        </p>
      </header>

      {/* Quick Tech Summary Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Core Language", value: "Go / Java / Python", icon: Terminal, border: "border-blue-500/20 text-blue-400 bg-blue-500/5" },
          { label: "Geospatial Index", value: "H3 Hexagonal Grid", icon: Map, border: "border-teal-500/20 text-teal-400 bg-teal-500/5" },
          { label: "Primary Database", value: "Schemaless (MySQL Core)", icon: Database, border: "border-purple-500/20 text-purple-400 bg-purple-500/5" },
          { label: "Messaging Bus", value: "Apache Kafka", icon: Zap, border: "border-amber-500/20 text-amber-400 bg-amber-500/5" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl border ${item.border} space-y-2`}>
              <Icon className="w-5 h-5" />
              <p className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">{item.label}</p>
              <h4 className="text-white font-bold text-sm">{item.value}</h4>
            </div>
          );
        })}
      </section>

      {/* Tabs Navigation */}
      <section className="space-y-8">
        <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-2">
          {[
            { id: "architecture", label: "01. Core Architecture Flow", icon: Layers },
            { id: "geospatial", label: "02. The Power of H3", icon: MapPin },
            { id: "databases", label: "03. Data & Storage Layers", icon: Database },
            { id: "devops", label: "04. DevOps & Observability", icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-zinc-900/60 border-t-2 border-blue-400 text-blue-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Architecture & Flow */}
        {activeTab === "architecture" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Text explanation */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold text-white">How Uber Matches Riders to Drivers</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  Uber operates a dynamic demand-and-supply network in real time. The architecture relies on thousands of microservices communicating asynchronously over Kafka pipelines and synchronously through RPC networks.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-5 bg-[#09090b] border border-zinc-900 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">Dynamic Supply Aggregation</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        Every active driver app initiates a streaming connection (WebSockets or long-lived gRPC channels) to raw coordinate ingest services. These coordinates update the supply location states inside Redis.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 bg-[#09090b] border border-zinc-900 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">DISCO (Dispatch Coordinator)</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        Written in Go, DISCO orchestrates matchmaking. When a request is placed, DISCO looks up available drivers matching the pickup location's spatial H3 index cell. If no drivers are in the immediate cell, it queries adjacent hexagonal cells iteratively (ring buffer search).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 bg-[#09090b] border border-zinc-900 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">Dynamic Pricing & Surge</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        Uber utilizes Flink stream processing and Apache Pinot to track historical and real-time ride request frequency. If request count exceeds available driver density, surge multipliers are recalculated and applied to local cells in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Flow Inspector */}
              <div className="lg:col-span-5 p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Interactive Ride Lifecycle</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Step {activeStep + 1} of {flowSteps.length}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="inline-block px-2.5 py-1 bg-blue-500/15 border border-blue-500/25 rounded-md text-[10px] text-blue-400 font-bold uppercase tracking-wider font-mono">
                      {flowSteps[activeStep].actor}
                    </div>
                    <h4 className="text-white font-bold text-lg leading-tight">{flowSteps[activeStep].title}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {flowSteps[activeStep].desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-zinc-550 block font-semibold uppercase">Tech Used:</span>
                      <span className="text-zinc-300 font-mono">{flowSteps[activeStep].tech}</span>
                    </div>
                    <div>
                      <span className="text-zinc-550 block font-semibold uppercase">Scale Metric:</span>
                      <span className="text-teal-400 font-mono font-semibold">{flowSteps[activeStep].metrics}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 pt-2">
                    <button
                      onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : flowSteps.length - 1))}
                      className="px-3.5 py-2 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold rounded-xl cursor-pointer select-none transition-colors"
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => (prev < flowSteps.length - 1 ? prev + 1 : 0))}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl cursor-pointer select-none flex items-center gap-1.5 transition-colors"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Flow Block Schema */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-white uppercase tracking-wider">System Flow Schema (gRPC Matching Event Payload)</h4>
              <CodeBlock
                filename="match_payload.json"
                language="json"
                code={`{
  "request_id": "req-98234-x981",
  "timestamp": 1779912041000,
  "rider": {
    "rider_id": "rider-88231",
    "location": { "lat": 37.7749, "lng": -122.4194 },
    "h3_index": "8928308280fffff"
  },
  "search_parameters": {
    "max_radius_hex_rings": 3,
    "vehicle_type": "uber_x",
    "surge_multiplier": 1.45
  },
  "candidate_drivers": [
    {
      "driver_id": "driver-09923",
      "h3_index": "8928308280fffff",
      "distance_meters": 240.5,
      "eta_seconds": 95
    },
    {
      "driver_id": "driver-88219",
      "h3_index": "8928308281fffff",
      "distance_meters": 670.2,
      "eta_seconds": 210
    }
  ]
}`}
              />
            </div>
          </div>
        )}

        {/* Tab 2: The Power of H3 (Geospatial) */}
        {activeTab === "geospatial" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Geospatial Indexing: Why Hexagons?</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                To partition the earth into discrete grids, developers typically choose between three regular polygons: Triangles, Squares, and Hexagons. Uber originally utilized Google's **S2** library (based on squares), but replaced it with their own open-sourced system, **H3** (based on hexagons).
              </p>
            </div>

            {/* Triangular vs Square vs Hexagonal comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider block">Option A</span>
                <h4 className="text-zinc-400 font-bold text-sm">Triangles</h4>
                <div className="h-0.5 bg-zinc-900 w-full" />
                <ul className="text-xs text-zinc-500 space-y-2.5 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">❌</span> Non-uniform neighbor orientation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">❌</span> 3 types of neighbors with varying distances.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Easy subdivision (split one to four smaller triangles).
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider block">Option B (Google S2)</span>
                <h4 className="text-zinc-400 font-bold text-sm">Squares</h4>
                <div className="h-0.5 bg-zinc-900 w-full" />
                <ul className="text-xs text-zinc-500 space-y-2.5 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">❌</span> 8 neighbors. Corner neighbors are diagonal ($\sqrt{2} d$ distance).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">❌</span> Dynamic path-finding requires complex adjustments for diagonals.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Perfect quadtree nesting (1 square decomposes into 4).
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl space-y-4">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Option C (Uber H3 - Selected)</span>
                <h4 className="text-white font-bold text-sm">Hexagons</h4>
                <div className="h-0.5 bg-blue-500/10 w-full" />
                <ul className="text-xs text-zinc-300 space-y-2.5 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Exactly 6 neighbors. All neighbors share a border.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Center-to-center distance to all 6 neighbors is **identical**.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">ℹ</span> Cannot subdivide *perfectly* into sub-hexagons (creates slight overlaps, handled via approximate hierarchical grids).
                  </li>
                </ul>
              </div>
            </div>

            {/* Deep dive math text section */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
              <h4 className="text-lg font-bold text-white">Uniform Neighbor Distance Math</h4>
              <p className="text-zinc-400 leading-relaxed font-light text-sm">
                Consider a search algorithm scanning a perimeter. If using a square grid, a search radius of 1 step checks 4 edge neighbors at distance $1.0$ and 4 diagonal corner neighbors at distance $\approx 1.41$. This means your search circle overlaps parts of the grids unequally, creating mathematical distortion in matching models.
              </p>
              <p className="text-zinc-400 leading-relaxed font-light text-sm">
                In a hexagon grid, every neighbor is exactly $1.0$ unit distance from the center. A ring-buffer search algorithm simply loops over rings of adjacent cells (Ring 1 has 6 cells, Ring 2 has 12 cells, Ring 3 has 18 cells, etc.). This makes calculating local supply density and dispatch rings incredibly efficient.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-black/40 border border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Resolution Hierarchy</span>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    H3 defines 16 resolution levels. Resolution 0 contains the largest hexagons covering the earth. Uber utilizes **Resolution 8** (edge length $\approx 461$m, area $\approx 0.73$ km²) for matching models, and **Resolution 10** for fine-grained GPS coordinate snaps.
                  </p>
                </div>
                <div className="p-5 bg-black/40 border border-zinc-900 rounded-xl space-y-2">
                  <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Dynamic Sharding</span>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Because city workloads are highly localized, H3 cells naturally act as partition keys. Instead of scanning a global database, memory nodes store drivers segmented by their current H3 index, enabling instant sharding and low database contention.
                  </p>
                </div>
              </div>
            </div>

            {/* Code example of converting coordinates to H3 using the JS client library */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-white uppercase tracking-wider">H3 Coordinates Snap Code (Javascript Node.js Sample)</h4>
              <CodeBlock
                filename="h3_indexing.js"
                language="javascript"
                code={`const h3 = require("h3-js");

// Latitude/Longitude of San Francisco pick-up point
const lat = 37.7749;
const lng = -122.4194;

// Convert Coordinates to H3 index at resolution 8 (matching index)
const h3Index = h3.latLngToCell(lat, lng, 8);
console.log(\`Matched H3 Hexagon: \${h3Index}\`); // Output: 8828308280fffff

// Get all neighboring hex rings (Radius 1 = immediate 6 neighbors)
const neighboringHexes = h3.gridDisk(h3Index, 1);
console.log("Searching supply in adjacent cells:", neighboringHexes);

// Compute distances between driver cell and rider cell
const driverHex = "8828308281fffff";
const hexDistance = h3.gridDistance(h3Index, driverHex);
console.log(\`Hexagon distance steps: \${hexDistance}\`);`}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Data & Storage Layers */}
        {activeTab === "databases" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">How Uber Manages Massive Transactional States</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                Ride hailing requires low-latency writes and horizontal scale. Traditional relational databases fail due to strict row locks, while NoSQL databases often lack required consistency guarantees. To solve this, Uber built a custom storage engine: **Schemaless**.
              </p>
            </div>

            {/* Database breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">Schemaless (MySQL Shards)</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Built on top of sharded MySQL nodes, Schemaless is an append-only, log-structured database. Instead of updating rows directly, updates are appended as new versions of records, preventing database locks and deadlocks.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">ScyllaDB / Cassandra</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  For storing high-frequency telemetry (raw GPS coordinate logs), ScyllaDB (C++ rewritten Cassandra) is used. It excels at fast write rates and automatically purges old coordinates using Time-To-Live (TTL) keys.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">Apache Pinot & Flink</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Pinot is a distributed OLAP database designed for low-latency analytics. Paired with Apache Flink, it handles real-time streams to calculate city-level supply/demand metrics and power dashboard telemetry.
                </p>
              </div>
            </div>

            {/* Deep dive Schemaless schema */}
            <div className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
              <h4 className="text-lg font-bold text-white">The Schemaless Storage Model</h4>
              <p className="text-zinc-400 leading-relaxed font-light text-sm">
                Schemaless divides data into **Cells**. A cell is indexed by a UUID `row_key`, a column name, and a `ref_key` (version offset). Because MySQL only receives inserts (no raw updates), replication lag is minimized and data is easily distributed.
              </p>

              <div className="border border-zinc-900 bg-black/40 rounded-2xl overflow-hidden font-mono text-[11px]">
                <div className="bg-zinc-950 px-5 py-3 border-b border-zinc-900 font-sans text-xs font-bold text-zinc-400 flex items-center justify-between">
                  <span>Logical Table Representation: `schemaless_cells`</span>
                  <span className="text-purple-400">Append Only Log</span>
                </div>
                <div className="p-5 overflow-x-auto text-zinc-400">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-550 font-bold text-[10px] uppercase">
                        <th className="py-2 pr-4">Row Key (UUID)</th>
                        <th className="py-2 pr-4">Column Name</th>
                        <th className="py-2 pr-4">Ref Key (Version)</th>
                        <th className="py-2 pr-4">Payload (Compressed JSON)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-900/60 font-light">
                        <td className="py-3 pr-4 text-zinc-300">trip-100234</td>
                        <td className="py-3 pr-4 text-purple-400">status</td>
                        <td className="py-3 pr-4">0</td>
                        <td className="py-3 pr-4 text-zinc-500">{"{\"state\": \"REQUESTED\", \"rider_id\": \"r-82\"}"}</td>
                      </tr>
                      <tr className="border-b border-zinc-900/60 font-light">
                        <td className="py-3 pr-4 text-zinc-300">trip-100234</td>
                        <td className="py-3 pr-4 text-purple-400">status</td>
                        <td className="py-3 pr-4">1</td>
                        <td className="py-3 pr-4 text-zinc-500">{"{\"state\": \"ACCEPTED\", \"driver_id\": \"d-09\"}"}</td>
                      </tr>
                      <tr className="font-light">
                        <td className="py-3 pr-4 text-zinc-300">trip-100234</td>
                        <td className="py-3 pr-4 text-purple-400">status</td>
                        <td className="py-3 pr-4">2</td>
                        <td className="py-3 pr-4 text-zinc-500">{"{\"state\": \"ON_TRIP\", \"eta_sec\": 450}"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Kafka pipeline explanation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-md font-bold text-white uppercase tracking-wider">Apache Kafka Broker Flow</h4>
                <p className="text-zinc-400 leading-relaxed font-light text-sm">
                  Kafka serves as the core event streaming layer. Every event—driver pings, ride bookings, payment triggers—is written to a dedicated Kafka topic. 
                </p>
                <p className="text-zinc-400 leading-relaxed font-light text-sm">
                  Consumers subscribe to these topics to process tasks in the background, like notifying the rider when a driver accepts, updating the maps page, sending invoices, or dumping logs into cold storage.
                </p>
              </div>

              <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Kafka Consumer Topics</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-3 bg-black/40 border border-zinc-900 rounded-xl">
                    <span className="text-zinc-400">topic.driver_locations</span>
                    <span className="text-zinc-500">24k events/sec</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/40 border border-zinc-900 rounded-xl">
                    <span className="text-zinc-400">topic.trip_state_changes</span>
                    <span className="text-zinc-500">800 events/sec</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/40 border border-zinc-900 rounded-xl">
                    <span className="text-zinc-400">topic.payment_events</span>
                    <span className="text-zinc-500">120 events/sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: DevOps & Observability */}
        {activeTab === "devops" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">DevOps, Telemetry & Infrastructure Observability</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                Managing thousands of services across distributed data centers requires robust observability. Traditional tooling cannot handle Uber's scale without massive compute overhead. Uber solved this by engineering specialized profiling and metrics infrastructure.
              </p>
            </div>

            {/* DevOps Tech Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Telemetry tools */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Core Observability Engines</h4>
                
                <div className="space-y-4">
                  <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-bold text-sm">Jaeger (Distributed Tracing)</h5>
                      <span className="text-[10px] text-blue-400 font-bold uppercase bg-blue-500/10 px-2 py-0.5 rounded">Developed by Uber</span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">
                      Jaeger traces the complete execution lifecycle of a request as it hops across microservices. When a ride fails, engineers can inspect the Jaeger UI to see exactly which RPC endpoint failed, capturing latency breakdowns per hop.
                    </p>
                  </div>

                  <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-bold text-sm">M3 & M3DB (Metrics Storage)</h5>
                      <span className="text-[10px] text-blue-400 font-bold uppercase bg-blue-500/10 px-2 py-0.5 rounded">Developed by Uber</span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">
                      M3 is a metrics aggregator and distributed time-series database. It is optimized to handle billions of telemetry points per second. M3 performs aggressive downsampling to store long-term dashboard trends efficiently.
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol and orchestration info */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Network Protocols & Container Orchestration</h4>
                
                <div className="space-y-4">
                  <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-2">
                    <h5 className="text-white font-bold text-sm">gRPC over HTTP/2</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">
                      Historically, Uber developed **TChannel** (a multiplexing RPC framer). However, they migrated to gRPC and Protocol Buffers. It provides high binary serialization performance, typed interfaces, and native support for bi-directional connection streams.
                    </p>
                  </div>

                  <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-2">
                    <h5 className="text-white font-bold text-sm">Orchestration: Kubernetes & Peloton</h5>
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">
                      Uber built **Peloton**, an orchestration framework on top of Apache Mesos, to schedule batch processing and microservices together. Over time, they transitioned workloads back to highly customized, federated **Kubernetes** clusters for standardized cloud deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protocol buffers configuration definition */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-white uppercase tracking-wider">Driver Location Stream Protobuf Spec</h4>
              <CodeBlock
                filename="location_service.proto"
                language="protobuf"
                code={`syntax = "proto3";

package uber.location.v1;

// Location updates for active drivers on trip
service LocationIngestionService {
  rpc StreamDriverLocation(stream DriverLocationRequest) returns (DriverLocationResponse);
}

message DriverLocationRequest {
  string driver_id = 1;
  double latitude = 2;
  double longitude = 3;
  int64 timestamp = 4;
  DriverStatus status = 5;
}

enum DriverStatus {
  DRIVER_STATUS_UNSPECIFIED = 0;
  DRIVER_STATUS_OFFLINE = 1;
  DRIVER_STATUS_ONLINE_IDLE = 2;
  DRIVER_STATUS_EN_ROUTE_PICKUP = 3;
  DRIVER_STATUS_ON_TRIP = 4;
}

message DriverLocationResponse {
  string ack_id = 1;
  bool success = 2;
}`}
              />
            </div>
          </div>
        )}
      </section>

      {/* DevOps and Infrastructure flow summary chart */}
      <section className="p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-6">
        <h3 className="text-xl font-bold text-white">Global DevOps Observability Hierarchy</h3>
        <p className="text-zinc-400 text-sm leading-relaxed font-light">
          A visualization of how telemetry and logs move from active containers to monitoring nodes inside Uber's infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-mono">
          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
            <span className="text-blue-400 font-bold uppercase text-[10px]">1. Container Node (Edge)</span>
            <div className="space-y-1.5 text-zinc-550">
              <p>• StatsD / Prometheus Daemon</p>
              <p>• Jaeger Agent Sidecar</p>
              <p>• Local Log Ring Buffer</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3">
            <span className="text-teal-400 font-bold uppercase text-[10px]">2. Aggregator Layer</span>
            <div className="space-y-1.5 text-zinc-550">
              <p>• M3 Coordinator clusters</p>
              <p>• Jaeger Collector pool</p>
              <p>• Kafka ingestion pipe</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-950 border border-blue-500/20 rounded-xl space-y-3">
            <span className="text-purple-400 font-bold uppercase text-[10px]">3. Query & Storage Engines</span>
            <div className="space-y-1.5 text-zinc-550">
              <p>• M3DB (Metrics Storage)</p>
              <p>• Elasticsearch (Span Store)</p>
              <p>• Grafana / Custom Dashboards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Checklist */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">System Strengths & Tradeoffs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-3">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Architectural Strengths
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light text-xs">
              <li className="flex gap-2"><span>✓</span> <strong>Extreme Write Scalability:</strong> Append-only Schemaless + ScyllaDB scales writes smoothly.</li>
              <li className="flex gap-2"><span>✓</span> <strong>Uniform Matching Distances:</strong> H3 hexagons eliminate S2 square corner mathematical distortion.</li>
              <li className="flex gap-2"><span>✓</span> <strong>Real-time surge capability:</strong> Flink & Pinot update pricing dynamically by monitoring active hexes.</li>
            </ul>
          </div>

          <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl space-y-3">
            <h4 className="text-rose-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 rotate-180 text-rose-400" /> System Tradeoffs
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light text-xs">
              <li className="flex gap-2"><span>•</span> <strong>Eventual Consistency:</strong> Log-structured replication can cause short match latency gaps.</li>
              <li className="flex gap-2"><span>•</span> <strong>Approximate nesting:</strong> H3 hexagons do not split perfectly into smaller hexes, requiring overlapping approximation logic.</li>
              <li className="flex gap-2"><span>•</span> <strong>Operational overhead:</strong> Running Jaeger, M3 DB, Schemaless, Kafka, and K8s federations demands massive DevOps staff.</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
