import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Brain, Activity, Sparkles, Workflow, ArrowRight, Check, Eye, 
  MessageSquare, Bot, Settings, ShieldAlert, Award
} from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  details: string;
}

interface Pioneer {
  name: string;
  title: string;
  contribution: string;
  initials: string;
  accentClass: string;
}

export default function IntroToAI() {
  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  // Section 2: History Timeline State
  const [activeMilestone, setActiveMilestone] = useState(0);
  const milestones: Milestone[] = [
    {
      year: "1950",
      title: "The Turing Test",
      desc: "Alan Turing proposes a test of machine intelligence.",
      details: "Turing asked: 'Can machines think?' He created the imitation game (Turing Test) as a benchmark: if a human cannot reliably distinguish a machine from a human in text chat, the machine has passed."
    },
    {
      year: "1956",
      title: "Dartmouth Conference",
      desc: "The birth of 'Artificial Intelligence' as a field.",
      details: "John McCarthy organized a summer workshop where the term 'Artificial Intelligence' was officially coined. Pioneers gathered to write code thinking computers could solve math and construct logic in a few weeks."
    },
    {
      year: "1970s",
      title: "First AI Winter",
      desc: "Funding dry-ups due to over-promises.",
      details: "Early algorithms struggled with simple translation and parsing due to limited memory and compute power. Academic and government funding was severely cut, stalling research for a decade."
    },
    {
      year: "1980s",
      title: "Expert Systems Boom",
      desc: "Commercializing logical database engines.",
      details: "Companies built specialized databases containing 'if-then' rules written by human industry experts. While successful in narrow industrial loops, they were brittle and expensive to maintain."
    },
    {
      year: "1990s",
      title: "Machine Learning Era",
      desc: "Transition from manual rules to statistical data models.",
      details: "IBM's Deep Blue defeated world chess champion Garry Kasparov. Algorithms focused on training models using statistics rather than programming logical rules manually."
    },
    {
      year: "2012",
      title: "Deep Learning Boom",
      desc: "Neural networks solve ImageNet vision tasks.",
      details: "Geoffrey Hinton and his team demonstrated that deep neural networks (AlexNet) trained on graphics cards (GPUs) could identify images with unprecedented accuracy, initiating the modern deep learning boom."
    },
    {
      year: "2017",
      title: "The Transformer",
      desc: "Google publishes the 'Attention Is All You Need' paper.",
      details: "Introduced the Transformer architecture, replacing recurrent pipelines with parallel attention mechanisms. This enabled neural networks to process context across millions of words simultaneously."
    },
    {
      year: "2020s",
      title: "Generative AI Era",
      desc: "Large Language Models reach consumer scale.",
      details: "OpenAI releases ChatGPT, showcasing human-like dialogue, code composition, and multi-step reasoning, making AI a mainstream global technology."
    }
  ];

  // Section 3: Training Pipeline Stepper State
  const [activeStep, setActiveStep] = useState(0);
  const pipelineSteps = [
    {
      title: "1. Data Collection & Curation",
      concept: "The Raw Material",
      desc: "AI requires high-quality fuel. We gather massive datasets of text, photos, or raw telemetry sensors. For example, to teach AI to translate, we feed it millions of bilingual books.",
      analogy: "Like reading thousands of books to build vocabulary before attempting to write."
    },
    {
      title: "2. Data Preprocessing & Tokenization",
      concept: "Cleaning the Inputs",
      desc: "Raw data is messy. We remove duplicates, fix errors, and convert raw inputs into numbers (tokens) that neural networks can process mathematically.",
      analogy: "Like organizing scattered library archives into clean, structured dictionaries."
    },
    {
      title: "3. Neural Network Training",
      concept: "The Learning Loop",
      desc: "The neural network makes guesses, measures its errors using a loss function, and runs backpropagation to adjust mathematical weights, repeating this billions of times.",
      analogy: "Like practicing darts: throwing, seeing where it lands, and adjusting your arm angle until you hit the bullseye."
    },
    {
      title: "4. Evaluation & Alignment",
      concept: "Quality Control",
      desc: "We test the model on unseen data. If it performs well, we align its responses using human feedback (RLHF) to ensure safety and prevent harmful outputs.",
      analogy: "Like a teacher grading a student's final exam and correcting their reasoning path."
    },
    {
      title: "5. Production Inference",
      concept: "Answering Requests",
      desc: "The model is deployed. Users enter prompt variables and the model runs a fast mathematical forward pass to generate predictions, text, or coordinates.",
      analogy: "Like a trained doctor instantly identifying a symptom based on years of medical study."
    }
  ];



  // Section 6: Major AI Fields Selector State
  const [selectedField, setSelectedField] = useState("vision");
  const aiFields = [
    {
      id: "vision",
      name: "Computer Vision",
      icon: Eye,
      tag: "Teaching machines to see",
      desc: "Enables algorithms to parse pixel values and understand visual structures. Powering facial recognition, medical scan screening, and object boundary detection.",
      example: "Self-driving cars mapping pedestrians and stoplights in real-time."
    },
    {
      id: "nlp",
      name: "NLP (Language)",
      icon: MessageSquare,
      tag: "Teaching machines to speak",
      desc: "Natural Language Processing parses grammatical sequences to translate languages, analyze sentiments, and generate coherent code and text loops.",
      example: "Translation systems instantly converting spoken language into another tongue."
    },
    {
      id: "robotics",
      name: "Robotics",
      icon: Bot,
      tag: "Teaching machines to move",
      desc: "Combines sensor processing with motor actuators. Reinforcement learning helps robots balance, pick up fragile objects, and navigate uneven warehouse floors.",
      example: "Robotic arms sorting packages or humanoid robots walking across terrains."
    },
    {
      id: "healthcare",
      name: "Healthcare AI",
      icon: Activity,
      tag: "Accelerating science & diagnostics",
      desc: "Processes genomic structures, simulates protein folding dynamics, and cross-references patient symptoms with medical research libraries.",
      example: "AlphaFold predicting the 3D structures of millions of proteins in days."
    },
    {
      id: "vehicles",
      name: "Autonomous Vehicles",
      icon: Settings,
      tag: "Navigating spatial coordinates",
      desc: "Fuses lidar, camera streams, and radar data to predict nearby vehicle movement vectors, plan safe navigation routes, and react to emergencies.",
      example: "Robotaxis picking up and driving passengers without safety drivers."
    }
  ];

  // Section 7: Pioneers Data
  const pioneers: Pioneer[] = [
    {
      name: "Alan Turing",
      title: "Father of Computing",
      contribution: "Laid formal mathematical models for computer science, pioneered early codebreaking, and formulated the Turing Test.",
      initials: "AT",
      accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      name: "John McCarthy",
      title: "Founding Father of AI",
      contribution: "Coined the phrase 'Artificial Intelligence' in 1955, organized the historic Dartmouth Conference, and created LISP.",
      initials: "JM",
      accentClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      name: "Geoffrey Hinton",
      title: "Deep Learning Godfather",
      contribution: "Popularized the backpropagation optimization method, pioneered CNNs, and won the Turing Award.",
      initials: "GH",
      accentClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      name: "Yann LeCun",
      title: "CNN Pioneer",
      contribution: "Created early handwriting classification systems (LeNet) and championed Convolutional Neural Networks.",
      initials: "YL",
      accentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      name: "Yoshua Bengio",
      title: "Sequence Logic Leader",
      contribution: "Contributed deep learning advancements in language modeling, generative adversarial networks, and sequence models.",
      initials: "YB",
      accentClass: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      name: "Andrew Ng",
      title: "AI Democratization Educator",
      contribution: "Founded Google Brain, led AI at Baidu, and educated millions of students worldwide through Coursera.",
      initials: "AN",
      accentClass: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    },
    {
      name: "Demis Hassabis",
      title: "DeepMind Innovator",
      contribution: "Co-founded DeepMind, developed DQN (classic arcade mastery), AlphaGo, and the Nobel-winning AlphaFold biological pipeline.",
      initials: "DH",
      accentClass: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      name: "Sam Altman",
      title: "OpenAI Scaling Leader",
      contribution: "Led OpenAI during the development and release of GPT models, converting AI research into popular applications.",
      initials: "SA",
      accentClass: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      name: "Ilya Sutskever",
      title: "GPT Technical Architect",
      contribution: "Co-created AlexNet, pioneered Sequence-to-Sequence models, and served as Chief Scientist leading OpenAI's GPT model scaling.",
      initials: "IS",
      accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    }
  ];

  // Section 9: Myths vs Reality Active Card Index
  const [activeMyth, setActiveMyth] = useState(0);
  const myths = [
    {
      myth: "AI is conscious and feels emotions just like a human.",
      reality: "AI has zero feelings, awareness, or consciousness. It is advanced mathematical pattern matching. It predicts the most likely next word or pixel based on calculations, not internal thoughts."
    },
    {
      myth: "AI will replace all human workers within a few years.",
      reality: "AI is a powerful productivity enhancer that automates repetitive tasks. While some roles will evolve, the future is human-AI collaboration where AI acts as a smart assistant."
    },
    {
      myth: "AI can learn new things and solve any task instantly.",
      reality: "AI models are restricted by their training datasets. They cannot think outside the scope of their data and frequently fail or hallucinate when presented with novel scenarios."
    }
  ];

  // Canvas Neural Network Background Logic
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Node objects
    const numNodes = 45;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5
      });
    }

    // Mouse coordinates tracker
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-28 relative overflow-hidden"
    >
      {/* Background Interactive Neural Net Canvas wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Main Page Title Header */}
      <header className="space-y-6 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
          <Brain className="w-3.5 h-3.5" /> AI Overview Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Introduction to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Artificial Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Demystify machine intelligence. Explore AI history, neural network mechanics, and the transition from prompt-based Generative models to autonomous Agentic systems.
        </p>
      </header>

      {/* Section 1: What is AI? */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            01
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">What is AI?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 flex flex-col justify-between backdrop-blur-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">AI in Layman Terms</span>
              <p className="text-white text-lg font-medium leading-relaxed">
                Imagine teaching a child to recognize a dog. Instead of giving them a strict dictionary definition of a dog, you show them photos of dogs, and eventually they identify one on their own.
              </p>
              <p className="text-zinc-450 text-sm leading-relaxed font-light">
                That is AI. Instead of writing strict, manual rule scripts, we feed computer processors thousands of data examples. The computer processes these examples, discovers patterns, and generates its own mathematical rules.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-900 mt-6 flex flex-wrap gap-3">
              <div className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-zinc-400 font-semibold">🔍 Dynamic Learning</div>
              <div className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-zinc-400 font-semibold">🔄 Self-Correction</div>
              <div className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-zinc-400 font-semibold">📊 Pattern Mining</div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Traditional Rules vs AI Models</span>
            
            <div className="space-y-4">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Traditional Program code</span>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">
                  "If user input text has word 'hello', print 'Hi'. If not, print 'Error'." (Brittle, manual coding rules).
                </p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-mono">AI Model Pipeline</span>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">
                  Processes millions of chat histories to understand syntax, tone, and context, generating natural, fluid responses.
                </p>
              </div>
            </div>

            <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center gap-3.5">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                <strong>Result</strong>: AI adapts dynamically to unique inputs, typos, and syntax layouts that break traditional programming scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: History of AI with Interactive Timeline */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            02
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">History & Milestones</h2>
        </div>

        <div className="bg-zinc-900/20 border border-zinc-900 rounded-[2rem] p-6 md:p-8 space-y-8 backdrop-blur-sm">
          {/* Horizontal Timeline Scroller */}
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar border-b border-zinc-900/60">
            {milestones.map((ms, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMilestone(idx)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all border shrink-0 ${
                  activeMilestone === idx
                    ? "bg-zinc-900 border-zinc-800 text-cyan-400"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="block text-[10px] text-zinc-650 font-mono font-bold tracking-wider mb-0.5">{ms.year}</span>
                {ms.title}
              </button>
            ))}
          </div>

          {/* Active Milestone Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl text-center space-y-2">
              <span className="text-[28px] font-black text-cyan-400 font-mono leading-none block">
                {milestones[activeMilestone].year}
              </span>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block">Active Epoch</span>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-white">
                {milestones[activeMilestone].title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                <strong>Overview</strong>: {milestones[activeMilestone].desc}
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">
                {milestones[activeMilestone].details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How AI Works & Training Pipeline Stepper */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            03
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">How AI Learns</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Concept summary */}
          <div className="lg:col-span-1 p-8 bg-zinc-900/30 border border-zinc-900 rounded-[2rem] flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Under the Hood</span>
              <h3 className="text-white font-extrabold text-xl leading-snug">Neural Networks & Feedback Loops</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                Like brains, neural networks are composed of nodes that receive numerical inputs, process them with weights, and output predictions.
              </p>
              <p className="text-zinc-500 text-xs leading-relaxed font-light">
                To improve, the model calculates how wrong its guess was (Loss) and sends corrections back down the layers (Backpropagation) to tune nodes.
              </p>
            </div>
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl font-mono text-[10px] text-cyan-400/90 leading-normal">
              Loss = ActualY - PredictedY<br />
              Weights = Weights - (LearningRate * Gradient)
            </div>
          </div>

          {/* Pipeline Stepper Visualizer */}
          <div className="lg:col-span-2 p-6 md:p-8 bg-zinc-900/20 border border-zinc-900 rounded-[2rem] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest">Interactive Training Pipeline</span>
              <div className="flex gap-1.5">
                {pipelineSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                      activeStep === i 
                        ? "bg-cyan-500 text-black" 
                        : "bg-zinc-950 text-zinc-550 border border-zinc-900 hover:text-zinc-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Step info block */}
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-wider uppercase block">
                {pipelineSteps[activeStep].concept}
              </span>
              <h4 className="text-white font-bold text-base leading-snug">
                {pipelineSteps[activeStep].title}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-light max-w-2xl">
                {pipelineSteps[activeStep].desc}
              </p>
              <div className="p-4 bg-black/45 border border-zinc-950 rounded-xl text-zinc-500 text-xs italic font-light flex items-center gap-2 max-w-2xl">
                <Workflow className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Analogy</strong>: {pipelineSteps[activeStep].analogy}</span>
              </div>
            </div>

            {/* Next buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-900/60">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous Step
              </button>
              <button
                disabled={activeStep === pipelineSteps.length - 1}
                onClick={() => setActiveStep(activeStep + 1)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Generative AI vs Agentic AI */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            04
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Generative AI vs. Agentic AI</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Generative */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-lg">Generative AI</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                Generates text, images, or code based on prompt inputs. Focuses on content creation and language mapping, behaving as an interactive editor or catalog copywriter.
              </p>
              <ul className="space-y-2 text-zinc-550 text-xs font-light">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Writes code on demand</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Synthesizes/Summarizes text</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Draws creative visuals</li>
              </ul>
            </div>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 mt-6">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block mb-1">Example Platform</span>
              <p className="text-white text-xs font-semibold">ChatGPT / Midjourney</p>
            </div>
          </div>

          {/* Card Agentic */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-white font-extrabold text-lg">Agentic AI</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                Acts autonomously to solve goals. Creates its own step plans, utilizes computers/APIs, evaluates outcomes, and corrects errors dynamically.
              </p>
              <ul className="space-y-2 text-zinc-550 text-xs font-light">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Uses external terminals & APIs</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Multi-step strategic planning</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Autonomous debugging loops</li>
              </ul>
            </div>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 mt-6">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block mb-1">Example Platform</span>
              <p className="text-white text-xs font-semibold">Devin / Agentic Coding Assistants</p>
            </div>
          </div>

          {/* Structural Matrix */}
          <div className="p-6 bg-[#09090b] border border-zinc-900 rounded-[2rem] flex flex-col justify-between">
            <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block mb-4 px-2">Operational Comparison</span>
            <div className="overflow-x-auto border border-zinc-900 rounded-2xl shadow-xl flex-1 flex flex-col justify-center scrollbar-thin">
              <table className="w-full min-w-[300px] md:min-w-0 text-left border-collapse text-[11px] font-sans">
                <thead>
                  <tr className="bg-zinc-900/30 border-b border-zinc-900 font-mono text-[9px] text-zinc-500">
                    <th className="px-4 py-3">Vector</th>
                    <th className="px-4 py-3">Generative</th>
                    <th className="px-4 py-3">Agentic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-450">
                  <tr className="hover:bg-zinc-900/10">
                    <td className="px-4 py-3 font-semibold text-zinc-300">Action</td>
                    <td className="px-4 py-3">Responds to prompts</td>
                    <td className="px-4 py-3 text-cyan-400">Initiates multi-steps</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="px-4 py-3 font-semibold text-zinc-300">Memory</td>
                    <td className="px-4 py-3">Chat session context</td>
                    <td className="px-4 py-3 text-cyan-400">Persistent scratchpads</td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="px-4 py-3 font-semibold text-zinc-300">Tool Use</td>
                    <td className="px-4 py-3">None</td>
                    <td className="px-4 py-3 text-cyan-400">Runs shells & APIs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Types of AI */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            05
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Types of AI</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Artificial Narrow Intelligence (ANI)",
              level: "Existing",
              desc: "Algorithms trained for highly specific tasks. A chess engine beats champions but cannot write text, filter emails, or recognize audio templates."
            },
            {
              title: "Artificial General Intelligence (AGI)",
              level: "Theoretical (Future)",
              desc: "A machine possessing human-level cognitive faculties across all sciences, logic structures, and creative arts. Capable of learning any skill."
            },
            {
              title: "Artificial Superintelligence (ASI)",
              level: "Hypothetical (Future)",
              desc: "AI systems exceeding collective human cognitive abilities in every area, developing scientific algorithms beyond human comprehension."
            }
          ].map((type, i) => (
            <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-900 rounded-3xl space-y-3 backdrop-blur-sm">
              <span className="px-2 py-0.5 bg-zinc-950 text-[10px] text-cyan-400 border border-zinc-900 font-semibold rounded">
                {type.level}
              </span>
              <h4 className="text-white font-bold text-sm pt-1">{type.title}</h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Major AI Fields Selector Grid */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            06
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Major AI Fields</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selector List */}
          <div className="lg:col-span-1 space-y-2">
            {aiFields.map((f) => {
              const Icon = f.icon;
              const isSelected = selectedField === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedField(f.id)}
                  className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-zinc-900 border-zinc-800 text-cyan-400 font-bold shadow-lg"
                      : "bg-zinc-950/40 border-zinc-900/40 text-zinc-550 hover:text-zinc-300"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">{f.name}</span>
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 text-zinc-700 transition-transform ${isSelected ? "translate-x-0.5 text-cyan-400" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Details Card */}
          {(() => {
            const active = aiFields.find((x) => x.id === selectedField) || aiFields[0];
            const ActiveIcon = active.icon;
            return (
              <div className="lg:col-span-2 p-6 md:p-8 bg-zinc-900/30 border border-zinc-900 rounded-[2rem] flex flex-col justify-between space-y-6 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-extrabold text-sm">{active.name}</h3>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{active.tag}</span>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">{active.desc}</p>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1.5">
                  <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider block">Real-world Use Case</span>
                  <p className="text-white text-xs font-semibold leading-relaxed">{active.example}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Section 7: Pioneers of AI Grid */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            07
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Pioneers of AI</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pioneers.map((p, idx) => (
            <div
              key={idx}
              className="p-6 bg-zinc-900/30 hover:bg-zinc-800/30 border border-white/5 hover:border-cyan-500/20 rounded-[2rem] flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden group backdrop-blur-sm"
            >
              {/* Profile Card Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border font-mono font-black text-sm ${p.accentClass}`}>
                    {p.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-sm group-hover:text-cyan-400 transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider mt-0.5 block">
                      {p.title}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-450 text-xs leading-relaxed font-light">
                  {p.contribution}
                </p>
              </div>

              {/* Award Tag Icon */}
              <div className="mt-6 pt-4 border-t border-zinc-950/80 flex items-center justify-between text-[9px] font-bold text-zinc-550 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-zinc-650" /> Pioneer Profile</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Future of AI */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            08
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">The Future Horizon</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Fields of Impact</span>
            <div className="space-y-4">
              {[
                { title: "Personalised Education", desc: "AI tutors that map a student's cognitive speed and customize textbook curriculum, diagrams, and coding exercises in real-time." },
                { title: "Healthcare Revolution", desc: "Instant clinical diagnosis, automated radiology scans, and simulating molecular compound properties to invent drugs in hours rather than decades." },
                { title: "Jobs & Careers", desc: "Shift from typing syntax code manually to orchestrating AI agent networks. Key skills will center around prompt systems architecture and system audits." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-white text-sm font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item.title}
                  </h4>
                  <p className="text-zinc-450 text-xs font-light leading-relaxed pl-3.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-900 rounded-[2rem] p-8 space-y-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Ethical Safety Boundaries</span>
              <p className="text-white text-base font-semibold leading-relaxed">
                As networks scale, ensuring AI systems align with human goals is critical.
              </p>
              <p className="text-zinc-450 text-xs leading-relaxed font-light">
                Key challenges involve preventing automated bias (arising from poisoned training datasets), defending against identity theft deepfakes, and ensuring secure code execution models.
              </p>
            </div>
            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              <p className="text-xs text-zinc-450 leading-relaxed font-light">
                <strong>Alignment Goal</strong>: Creating models that are robust, explainable, and under human control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Myths vs Reality Card Deck */}
      <section className="space-y-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold">
            09
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">AI Myths vs. Reality</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Selector */}
          <div className="lg:col-span-1 space-y-2">
            {[
              "1. Consciousness",
              "2. Job Replacement",
              "3. Infinite Capabilities"
            ].map((m, i) => (
              <button
                key={i}
                onClick={() => setActiveMyth(i)}
                className={`w-full text-left px-5 py-4 border rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeMyth === i
                    ? "bg-zinc-900 border-zinc-800 text-cyan-400"
                    : "bg-zinc-950/40 border-zinc-900/40 text-zinc-550 hover:text-zinc-350"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Contrast Display Card */}
          <div className="lg:col-span-2 p-6 md:p-8 bg-[#09090b] border border-zinc-900 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch backdrop-blur-sm">
            <div className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] text-rose-400 font-bold uppercase tracking-wider">Myth</span>
                <p className="text-white text-xs leading-relaxed font-medium">
                  "{myths[activeMyth].myth}"
                </p>
              </div>
              <span className="text-rose-500/50 text-[28px] font-black font-mono self-end">✕</span>
            </div>

            <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Reality Fact</span>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  {myths[activeMyth].reality}
                </p>
              </div>
              <span className="text-emerald-500/50 text-[28px] font-black font-mono self-end">✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Conclusion (Cosmos to Code) */}
      <section className="relative z-10 py-12">
        <div className="bg-gradient-to-br from-zinc-900/50 via-zinc-950/50 to-cyan-950/10 border border-zinc-900 rounded-[2.5rem] p-8 md:p-14 text-center space-y-8 relative overflow-hidden backdrop-blur-md">
          {/* Radial decorative glow */}
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-cyan-500/5 filter blur-3xl" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em] block">
              Cosmos to Code
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Bridging Biological and Silicon Intelligence
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Human consciousness is the product of billions of years of biological evolution—stardust organized into synapses. Through computing chips and compilers, we are starting to write a new legacy. AI is not the end of human thought, but the beginning of our reflection: code mapping the structures of our own minds.
            </p>
          </div>
          
          <div className="w-16 h-px bg-zinc-800 mx-auto" />
          
          <p className="text-zinc-650 text-[10px] uppercase font-bold tracking-[0.3em]">
            The Prime Step Library • Artificial Mind Series
          </p>
        </div>
      </section>
    </motion.div>
  );
}
