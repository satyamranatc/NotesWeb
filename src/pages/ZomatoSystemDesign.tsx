import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, Zap, Database, Activity, 
  Terminal, Layers, ArrowRight, 
  CheckCircle2, Server, Eye, ShieldAlert
} from "lucide-react";
import CodeBlock from "../components/CodeBlock";
import zomatoConveyorBelt from "../assets/zomato_conveyor_belt.png";
import zomatoDatabases from "../assets/zomato_databases.png";

export default function ZomatoSystemDesign() {
  const [activeTab, setActiveTab] = useState<"conveyor" | "pantry" | "chefs" | "technical">("conveyor");
  const [activeStep, setActiveStep] = useState<number>(0);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  // Zomato Layman Order Simulator Steps
  const orderSteps = [
    {
      title: "1. Order Placed (Drop in the Box)",
      actor: "Customer App",
      tech: "HTTP/2, AWS EKS",
      desc: "You click 'Order' on your phone. This order goes to Zomato's gateway (the front door of the restaurant) and is instantly recorded as an event.",
      analogy: "Think of dropping a stamped order letter into a high-speed post slot."
    },
    {
      title: "2. The Conveyor Belt (Event Bus)",
      actor: "Apache Kafka",
      tech: "Kafka Partitioning",
      desc: "The order is dropped onto Kafka—Zomato's main digital conveyor belt. It streams past all department desks in milliseconds without blocking or losing orders.",
      analogy: "Like a sushi conveyor belt where chefs standing around it grab plates they need."
    },
    {
      title: "3. Stream Verification (Live Inspection)",
      actor: "Apache Flink",
      tech: "Flink SQL, Stream Joins",
      desc: "As the order moves, Flink analyzes it in real-time. It checks if your payment went through, runs fraud detection, and prepares ads matching your order.",
      analogy: "Like an automatic quality scanner looking over the belt items as they roll by."
    },
    {
      title: "4. Kitchen Sync (Restaurant Notification)",
      actor: "Ordering Microservice",
      tech: "MongoDB / Aurora DB",
      desc: "The ordering service grabs the event and pings the restaurant. The chef starts cooking, and the system saves details for billing.",
      analogy: "The kitchen printer goes off and the head chef reads the printed order slip."
    },
    {
      title: "5. Rider Match & Dispatch",
      actor: "Butterfly ML Engine",
      tech: "Python, Redis, DynamoDB",
      desc: "Zomato's ML model predicts the best delivery rider based on distance and traffic, then alerts the rider's phone.",
      analogy: "A coordinator on a megaphone matching available drivers outside to the kitchen status."
    },
    {
      title: "6. Order Dispatched & Tracked",
      actor: "Delivery Service",
      tech: "WebSockets, VictoriaMetrics",
      desc: "The rider picks up the food. Their GPS updates are streamed live to your app. If anything goes wrong, telemetry catches it.",
      analogy: "A supervisor tracking the rider's progress on a digital pinboard until they reach your door."
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500 text-[10px] font-bold uppercase tracking-widest">
          <ShoppingBag className="w-3 h-3 text-rose-500" /> System Design Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Zomato <span className="text-rose-500">System Design</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          An architectural look at Zomato's petabyte-scale logistics, analytics, and data pipeline. Explained in layman's terms with analogies, custom illustrations, and interactive walkthroughs.
        </p>
      </header>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Core Backbone", value: "Kafka & EKS", icon: Zap, border: "border-rose-500/20 text-rose-500 bg-rose-500/5" },
          { label: "Data Pipeline", value: "Apache Flink", icon: Activity, border: "border-amber-500/20 text-amber-500 bg-amber-500/5" },
          { label: "Primary Storage", value: "DynamoDB & Redis", icon: Database, border: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5" },
          { label: "Observability", value: "ClickHouse & VM", icon: Eye, border: "border-teal-500/20 text-teal-400 bg-teal-500/5" }
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

      {/* Navigation Tabs */}
      <section className="space-y-8">
        <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-2">
          {[
            { id: "conveyor", label: "01. Conveyor Belt (Events)", icon: Zap },
            { id: "pantry", label: "02. Storage Pantry (DBs)", icon: Database },
            { id: "chefs", label: "03. Chef Specialists (Services)", icon: Layers },
            { id: "technical", label: "04. Technical Recipe (Tech Stack)", icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-zinc-900/60 border-t-2 border-rose-500 text-rose-500"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: The Conveyor Belt (Kafka & Flink) */}
        {activeTab === "conveyor" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-bold text-white">How Orders Flow through the System</h3>
                <p className="text-zinc-400 leading-relaxed font-light">
                  Think of Zomato as a highly automated kitchen. Instead of staff running around yelling orders, they drop information onto a giant <strong>digital conveyor belt</strong>.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-5 bg-[#09090b] border border-zinc-900 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">Apache Kafka (The Conveyor Belt)</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        Whenever you make an order, add a review, or when drivers share coordinates, Kafka takes these messages and queues them up. It acts as the backbone so nothing is lost, even if there are millions of orders a second.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 bg-[#09090b] border border-zinc-900 rounded-2xl">
                    <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">Apache Flink (Real-Time Quality Check)</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        Flink sits on the side of the conveyor belt. It actively inspects the packages as they fly by. It aggregates stats, bills payments, and manages active restaurant ads instantly using SQL statements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Simulator */}
              <div className="lg:col-span-5 p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Order Life Cycle (Layman)</span>
                    <span className="text-[10px] text-rose-500 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                      Step {activeStep + 1} of {orderSteps.length}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="inline-block px-2.5 py-1 bg-rose-500/15 border border-rose-500/25 rounded-md text-[10px] text-rose-500 font-bold uppercase tracking-wider font-mono">
                      {orderSteps[activeStep].actor}
                    </div>
                    <h4 className="text-white font-bold text-lg leading-tight">{orderSteps[activeStep].title}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {orderSteps[activeStep].desc}
                    </p>
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-zinc-500 text-[11px] italic font-serif">
                      💡 <strong>Analogy:</strong> {orderSteps[activeStep].analogy}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-zinc-555 block font-semibold uppercase">Under the Hood:</span>
                      <span className="text-zinc-350 font-mono">{orderSteps[activeStep].tech}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 pt-2">
                    <button
                      onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : orderSteps.length - 1))}
                      className="px-3.5 py-2 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold rounded-xl cursor-pointer select-none transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(prev => (prev < orderSteps.length - 1 ? prev + 1 : 0))}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl cursor-pointer select-none flex items-center gap-1.5 transition-colors"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Illustration */}
            <div className="p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-4 text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Event Streaming Conveyor Belt</h4>
              <div className="flex justify-center">
                <img 
                  src={zomatoConveyorBelt} 
                  alt="Zomato Event-Driven Conveyor Belt Analogy" 
                  className="max-w-full h-auto max-h-[450px] object-contain rounded-2xl border border-zinc-900 bg-white p-2 shadow-inner"
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mt-2">
                Figure 2.1: Event Ingestion Conveyor Belt Analogy (Kafka Event Bus & Microservices)
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: The Storage Pantry (Databases) */}
        {activeTab === "pantry" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Database Pantry: Organized Storage</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                In a large restaurant, you wouldn't store flour in the freezer or ice cream in the dry pantry. Zomato stores different types of information in specialized storage spaces.
              </p>
            </div>

            {/* Grid of Database Analogies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-rose-500 font-bold uppercase tracking-wider block">The Fast Countertop</span>
                <h4 className="text-white font-bold text-sm">Redis (Cache)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  The items you reach for constantly are kept right on the counter. Redis stores quick things like active user sessions and current menu feeds so they can be retrieved instantly without opening cupboards.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block">The Organised Spice Rack</span>
                <h4 className="text-white font-bold text-sm">Cassandra (High-Availability Feed)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  A distributed rack where everything is organized and duplicate jars exist. Even if one side falls, the spices remain accessible. Cassandra holds the food feed so customer scrolls are always fast and reliable.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">The Bulk Dry Pantry</span>
                <h4 className="text-white font-bold text-sm">DynamoDB (High-Volume Storage)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Sturdy, deep shelves for bulk supplies. It scales automatically to hold millions of details. Zomato uses DynamoDB for billing details and offline machine learning features.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">The Recipe Binder</span>
                <h4 className="text-white font-bold text-sm">MongoDB (Product Data)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  A ring binder where recipes can have different lengths, layouts, and notes. MongoDB stores restaurant information and menu catalogs, allowing flexibility in items, options, and descriptions.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">The Accountant Ledger</span>
                <h4 className="text-white font-bold text-sm">Aurora RDS / Postgres (Transactions)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  The main double-entry registry book that must match down to the cent. Used for order history, security tools (Vinifera), and financial reconciliation where correctness is absolute.
                </p>
              </div>

              <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">The CCTV Log Drive</span>
                <h4 className="text-white font-bold text-sm">ClickHouse (Event Logs)</h4>
                <div className="h-px bg-zinc-900 w-full" />
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  A high-capacity hard drive storing raw footage continuously. ClickHouse compresses petabytes of raw system events and logs so engineers can query past traffic peaks in seconds.
                </p>
              </div>
            </div>

            {/* Custom Illustration */}
            <div className="p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-4 text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Database Pantry Illustration</h4>
              <div className="flex justify-center">
                <img 
                  src={zomatoDatabases} 
                  alt="Zomato Kitchen Database Pantry Analogy" 
                  className="max-w-full h-auto max-h-[450px] object-contain rounded-2xl border border-zinc-900 bg-white p-2 shadow-inner"
                />
              </div>
              <span className="text-[10px] text-zinc-555 font-mono uppercase tracking-widest block mt-2">
                Figure 2.2: The Storage Pantry System (Different databases mapped to kitchen storage containers)
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Chef Specialists (Microservices & DevOps) */}
        {activeTab === "chefs" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Microservices: A Team of Specialized Chefs</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                If one guy tries to cook, wash dishes, take payments, and deliver, the restaurant collapses if he gets tired. Zomato divides tasks among independent, specialized cooks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-lg">Specialized Chefs (Microservices)</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  Zomato's system is broken down into separate services: one handles menus, one processes payments, one manages reviews, and another assigns drivers. 
                  If the "Reviews" chef drops a plate or slows down, you can still search restaurants, pay, and get your food delivered.
                </p>
              </div>

              <div className="p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-lg">Floor Manager (Kubernetes & ArgoCD)</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  To coordinate thousands of microservices, Zomato uses Kubernetes (AWS EKS). It automatically hires more server capacity (EC2 spot instances) when demand spikes on New Year's Eve, and ArgoCD ensures chefs are working off the exact same cookbook recipes (Git manifests).
                </p>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-6">
              <h4 className="text-lg font-bold text-white">How the Kitchen Stays Up During Rush Hours</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                On peak celebration nights (like New Year's Eve), Zomato's systems experience surges of thousands of orders per minute. 
                Rather than buying permanent, expensive servers, Zomato dynamically registers <strong>AWS EC2 Spot Instances</strong>. These are spare servers rented at a massive discount. 
                Kubernetes coordinates them, spinning up new container instances in seconds to handle the peak, and turning them off when the city goes to sleep.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: The Technical Recipe (Tech Stack) */}
        {activeTab === "technical" && (
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">The Engineering Stack (Developer View)</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                The full map of Zomato's infrastructure, parsed directly from Zomato's official engineering disclosures and open technology sheets.
              </p>
            </div>

            {/* Grid layout for tech components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
              <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
                <h4 className="text-rose-500 font-bold uppercase tracking-wider">1. Core Platform & Ingestion</h4>
                <ul className="space-y-2 text-zinc-500">
                  <li><strong className="text-zinc-350">Apache Kafka:</strong> High-throughput event backbone distributing billing, analytics, and telemetry.</li>
                  <li><strong className="text-zinc-350">Apache Flink & Flink SQL:</strong> Stateful stream processor running real-time analytics and queries in SQL syntax.</li>
                  <li><strong className="text-zinc-350">Microservices:</strong> Split domain architecture (Go, Java, Kotlin) producing event-driven logs.</li>
                </ul>
              </div>

              <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
                <h4 className="text-amber-500 font-bold uppercase tracking-wider">2. DevOps & Cloud Deployments</h4>
                <ul className="space-y-2 text-zinc-500">
                  <li><strong className="text-zinc-350">AWS EKS:</strong> Managed Kubernetes clusters orchestrating ML models, Flink jobs, and services.</li>
                  <li><strong className="text-zinc-350">ArgoCD:</strong> GitOps continuous delivery tool reconciling cluster states from Git.</li>
                  <li><strong className="text-zinc-350">Docker & AWS ECR:</strong> Building container images and pushing to AWS Container Registry.</li>
                  <li><strong className="text-zinc-350">EC2 Spot Instances:</strong> Used extensively to scale compute and reduce hosting costs by up to 70%.</li>
                </ul>
              </div>

              <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
                <h4 className="text-indigo-400 font-bold uppercase tracking-wider">3. Service Mesh & Databases</h4>
                <ul className="space-y-2 text-zinc-500">
                  <li><strong className="text-zinc-350">Kuma Mesh & Envoy:</strong> Shifting traffic and routing dev/staging testing via custom header rules.</li>
                  <li><strong className="text-zinc-350">DynamoDB & Aurora RDS:</strong> Primary high-scale database and managed SQL store for billing systems.</li>
                  <li><strong className="text-zinc-350">Redis & Cassandra:</strong> Real-time caching, online feature stores, and high-reliability food feeds.</li>
                  <li><strong className="text-zinc-350">MongoDB & TiDB:</strong> Flexible document store for restaurant assets alongside distributed SQL.</li>
                </ul>
              </div>

              <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
                <h4 className="text-teal-400 font-bold uppercase tracking-wider">4. Analytics & Logging Telemetry</h4>
                <ul className="space-y-2 text-zinc-500">
                  <li><strong className="text-zinc-350">Trino, Hive & Pinot:</strong> OLAP querying engines routing across databases, HDFS, and Druid.</li>
                  <li><strong className="text-zinc-350">Airflow & Superset:</strong> Scheduled ETL DAG execution and BI dashboard consumption.</li>
                  <li><strong className="text-zinc-350">ClickHouse:</strong> Fast columns-oriented storage for logs queries.</li>
                  <li><strong className="text-zinc-350">VictoriaMetrics:</strong> Monitoring time-series metrics scraped from nodes, replacing Prometheus.</li>
                </ul>
              </div>
            </div>

            {/* One-liner system path */}
            <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl space-y-2">
              <h4 className="text-rose-500 font-bold text-xs uppercase tracking-widest font-mono">One-Line Architecture Flow</h4>
              <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                App/Web/Mobile ➔ Events to Kafka ➔ Stream Processing via Flink ➔ Storage in Redis/Cassandra/DynamoDB/MongoDB/Aurora/TiDB ➔ Query Engines (Trino/Pinot) ➔ Deployments on Kubernetes (EKS) via ArgoCD ➔ Observability via VictoriaMetrics & ClickHouse.
              </p>
            </div>

            {/* Code Block Spec */}
            <div className="space-y-4">
              <h4 className="text-md font-bold text-white uppercase tracking-wider">Zomato Order Ingestion Schema (Kafka Event Payload)</h4>
              <CodeBlock
                filename="zomato_order_event.json"
                language="json"
                code={`{
  "event_id": "evt-7729-zomato-901",
  "timestamp": 1780064705000,
  "event_type": "ORDER_CREATED",
  "data": {
    "order_id": "ord-883921-zmt",
    "customer": {
      "user_id": "usr-88129",
      "delivery_address": {
        "latitude": 28.6139,
        "longitude": 77.2090
      }
    },
    "restaurant": {
      "restaurant_id": "rest-89212",
      "name": "The Spicy Kitchen",
      "pantry_node": "mongodb-shard-03"
    },
    "cart": {
      "items": [
        { "item_id": "it-092", "name": "Butter Chicken", "qty": 1, "price": 450.00 },
        { "item_id": "it-883", "name": "Garlic Naan", "qty": 2, "price": 80.00 }
      ],
      "totals": {
        "subtotal": 610.00,
        "tax": 30.50,
        "delivery_fee": 40.00,
        "grand_total": 680.50
      }
    },
    "payment_gateway": {
      "transaction_id": "tx-88912-aurora",
      "method": "UPI",
      "status": "CAPTURED"
    }
  }
}`}
              />
            </div>
          </div>
        )}
      </section>

      {/* Tradeoffs & Strengths */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white">System Strengths & Tradeoffs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-3">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Architectural Strengths
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light text-xs">
              <li className="flex gap-2"><span>✓</span> <strong>Conveyor Reliability:</strong> Kafka queues cushion peaks, preventing crashes when order traffic spikes.</li>
              <li className="flex gap-2"><span>✓</span> <strong>Real-Time Fast Decisions:</strong> Flink evaluates billing and ads instantly as events move down the belt.</li>
              <li className="flex gap-2"><span>✓</span> <strong>Elastic Cost Saving:</strong> Kubernetes Spot Instances allow scaling computing power up and down dynamically.</li>
            </ul>
          </div>

          <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl space-y-3">
            <h4 className="text-rose-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" /> System Tradeoffs
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light text-xs">
              <li className="flex gap-2"><span>•</span> <strong>Complex Database Sprawl:</strong> Managing Redis, Cassandra, MongoDB, Aurora, and TiDB creates massive storage schema fragmentation.</li>
              <li className="flex gap-2"><span>•</span> <strong>Eventual Caching Gaps:</strong> A fast countertop (Redis) can sometimes mismatch with the dry pantry (MongoDB) for short sync lags.</li>
              <li className="flex gap-2"><span>•</span> <strong>High Monitoring Overhead:</strong> Keeping track of VictoriaMetrics and ClickHouse requires an active team of SRE specialists.</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
