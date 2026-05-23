import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Database, Cpu, Layout, Play, RefreshCw } from "lucide-react";

export default function Django() {
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    {
      title: "1. HTTP Request (WSGI/ASGI)",
      actor: "Client Browser",
      desc: "Client fires an HTTP request (e.g., GET /articles/). WSGI server converts it to a standard Django request payload.",
      code: "GET /articles/ HTTP/1.1\nHost: mydomain.com"
    },
    {
      title: "2. Request Middleware",
      actor: "Security / Session Layer",
      desc: "Middlewares run hooks on the request. Processes session keys, checks CSRF tokens, parses cookies.",
      code: "SecurityMiddleware -> SessionMiddleware -> CsrfViewMiddleware"
    },
    {
      title: "3. URL Dispatcher (urls.py)",
      actor: "URL Router",
      desc: "Django compares request URL paths with route rules declared inside urls.py to resolve the matching view function.",
      code: "path('articles/', views.article_list, name='articles')"
    },
    {
      title: "4. View Controller (views.py)",
      actor: "Business Logic View",
      desc: "Executes target Python view class. Fetches database query outputs through Django ORM Model variables.",
      code: "def article_list(request):\n    articles = Article.objects.all()\n    return render(request, 'articles.html', {'list': articles})"
    },
    {
      title: "5. Model & ORM (models.py)",
      actor: "Object Database Interface",
      desc: "ORM converts python code to database SQL commands, pulls records, and translates columns back to Model objects.",
      code: "SELECT * FROM app_article;"
    },
    {
      title: "6. Template Engine (Jinja/DRF)",
      actor: "Presentation Layer",
      desc: "Injects context items directly into HTML template tags or runs Django REST serializers to format JSON payloads.",
      code: "{% for item in list %}\n  <li>{{ item.title }}</li>\n{% endfor %}"
    },
    {
      title: "7. HTTP Response",
      actor: "WSGI / Browser Output",
      desc: "Runs Response middleware hooks, packages payload details, and returns completed HTTP response status.",
      code: "HTTP/1.1 200 OK\nContent-Type: text/html"
    }
  ];

  const handlePlayAnimation = () => {
    setIsRunning(true);
    let current = 0;
    setActiveLifecycleStep(0);
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setActiveLifecycleStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1500);
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#44b78b]/10 border border-[#44b78b]/20 rounded-full text-[#44b78b] text-[10px] font-bold uppercase tracking-widest">
          <Leaf className="w-3 h-3" /> Web Architecture
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Django <span className="text-[#44b78b]">MVT Framework</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Dive deep into the batteries-included Python framework. Explore separation of concerns across Model, View, and Templates.
        </p>
      </header>

      {/* 01. MVT Model */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#44b78b]">01.</span> MVC vs MVT Pattern
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          While traditional architectures utilize Model-View-Controller (MVC) structures, Django operates as Model-View-Template (MVT). The controller role is implicitly handled by the Django core web server.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-white font-bold text-sm">Model (Data Layer)</h4>
            <p className="text-zinc-450 text-xs leading-relaxed font-light">
              Declarative database definition schema. Uses class fields to map Python datatypes to SQL table columns seamlessly.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#44b78b]/10 border border-[#44b78b]/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#44b78b]" />
            </div>
            <h4 className="text-white font-bold text-sm">View (Logic Layer)</h4>
            <p className="text-zinc-450 text-xs leading-relaxed font-light">
              Intercepts incoming payloads, triggers query parameters, interfaces with database models, and generates templates.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Layout className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="text-white font-bold text-sm">Template (UI/API Layer)</h4>
            <p className="text-zinc-450 text-xs leading-relaxed font-light">
              Server-rendered HTML page layouts containing Jinja structures, or serialized JSON blocks parsed for REST API responses.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Request Lifecycle Simulator */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#44b78b]">02.</span> Request Lifecycle Simulator
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Follow the step-by-step route an incoming client request takes to process a Django view logic node.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Active Flow Graph Visualizer */}
          <div className="col-span-1 lg:col-span-2 p-6 md:p-8 bg-[#09090b] border border-zinc-900 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Interactive Lifecycle Stack</span>
              <button
                onClick={handlePlayAnimation}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#44b78b]/10 hover:bg-[#44b78b]/20 border border-[#44b78b]/30 text-[#44b78b] disabled:opacity-40 disabled:cursor-not-allowed text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-all"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" /> Flowing...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Auto Play
                  </>
                )}
              </button>
            </div>

            {/* Vertically stacked step nodes */}
            <div className="relative space-y-3.5">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-850 z-0"></div>
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  onClick={() => !isRunning && setActiveLifecycleStep(idx)}
                  className={`relative flex gap-4 items-start p-3 rounded-2xl cursor-pointer transition-all z-10 ${
                    activeLifecycleStep === idx
                      ? "bg-zinc-900 border border-zinc-800"
                      : "border border-transparent hover:bg-zinc-950/40"
                  }`}
                >
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                    activeLifecycleStep === idx
                      ? "bg-[#44b78b]/20 border-[#44b78b] text-[#44b78b]"
                      : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold ${activeLifecycleStep === idx ? "text-white" : "text-zinc-450"}`}>
                      {st.title}
                    </h4>
                    <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block mt-0.5">
                      {st.actor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details inspection */}
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-5">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block border-b border-zinc-900 pb-2">
                Active Step Analysis
              </span>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white leading-snug">
                  {steps[activeLifecycleStep].title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {steps[activeLifecycleStep].desc}
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-3xl flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block border-b border-zinc-900/60 pb-2">
                  Code / Data Signature
                </span>
                <pre className="p-4 bg-black/60 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto leading-normal no-scrollbar">
                  <code>{steps[activeLifecycleStep].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Classic monolithic vs Modern Decoupled */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-[#44b78b]">03.</span> Architecture Paradigms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Server Rendered Jinja Monolith</span>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Django parses HTML files on the server directly, injecting variables dynamically. Ideal for dashboards, blogs, and SEO-critical static layouts.
            </p>
            <div className="bg-black/40 border border-zinc-950 p-4 rounded-xl text-[10px] text-zinc-500 font-mono">
              Browser ◀-- [Fully rendered HTML] -- Django View
            </div>
          </div>
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-4">
            <span className="text-[10px] text-[#44b78b] font-bold uppercase tracking-widest">Decoupled REST API (Django REST Framework)</span>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Django acts strictly as a data node, serving JSON objects. Decoupled frameworks (React, iOS) process views client-side.
            </p>
            <div className="bg-black/40 border border-zinc-950 p-4 rounded-xl text-[10px] text-[#44b78b] font-mono">
              React client ◀-- [JSON Payload] -- Django View (DRF)
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
