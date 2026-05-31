import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Check, Copy, ArrowRight, BookOpen, 
  Code, Award, ThumbsUp, AlertCircle, RefreshCw 
} from "lucide-react";

interface Rule {
  id: number;
  title: string;
  badge?: string;
  summary: string;
  badCode: string;
  goodCode: string;
  why: string;
  tips: string[];
}

export default function PythonCleanCode() {
  const [activeRuleId, setActiveRuleId] = useState(1);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  const rules: Rule[] = [
    {
      id: 1,
      title: "Avoid Deep Nesting",
      badge: "Guard Clauses",
      summary: "Exit early on negative or invalid conditions. Keeping the happy path unindented reduces the mental model stack size and makes the main execution path clean.",
      badCode: `if user:
    if user.is_active:
        if user.age >= 18:
            print("Allowed")`,
      goodCode: `if not user:
    return

if not user.is_active:
    return

if user.age < 18:
    return

print("Allowed")`,
      why: "This is the classic Guard Clause pattern. Instead of nesting logical assertions, test negative conditions first and return/raise immediately. This maintains a flat structure.",
      tips: [
        "Invert nested 'if' checks to check for failures first.",
        "Reduces horizontal scroll and keeps code block sizes predictable.",
        "Highly recommended for API endpoints and validator methods."
      ]
    },
    {
      id: 2,
      title: "Use Meaningful Conditions",
      badge: "Implicit Booleans",
      summary: "Python treats empty structures, None, and zero values as falsy. Avoid comparing directly to True or False.",
      badCode: `if status == True:
    process()

if status == False:
    cleanup()`,
      goodCode: `if status:
    process()

if not status:
    cleanup()`,
      why: "Explicit comparison with Boolean literals is redundant in Python. Using the implicit boolean value is cleaner, more readable, and standard practice (PEP 8).",
      tips: [
        "Use 'if obj:' to check if lists, dictionaries, or strings are non-empty.",
        "Compare explicitly to 'is None' or 'is not None' only if distinguishing between False and None matters."
      ]
    },
    {
      id: 3,
      title: "Avoid Unnecessary Else",
      badge: "Early Return",
      summary: "If a branch contains a return statement, the 'else' block is completely redundant and adds unnecessary nesting.",
      badCode: `if age >= 18:
    return "Adult"
else:
    return "Minor"`,
      goodCode: `if age >= 18:
    return "Adult"

return "Minor"`,
      why: "Since returning exits the function context immediately, the default fallback can simply live at the top-level indent. This is a subset of the guard clause pattern.",
      tips: [
        "Scan functions for 'return' inside 'if' blocks and check if you can lift the 'else' contents out.",
        "Keeps the overall complexity of functions lower and simpler to unit test."
      ]
    },
    {
      id: 4,
      title: "Ternary for Small Decisions",
      badge: "One-liners",
      summary: "Use Python's conditional expressions for simple variable assignments, but avoid nesting them which quickly leads to unreadable code.",
      badCode: `# Bad: Overusing or nesting ternaries
message = "A" if x > 10 else "B" if x > 5 else "C"`,
      goodCode: `# Good: Simple assignments
result = "Pass" if marks >= 40 else "Fail"

# Complex cases belong in explicit blocks:
if x > 10:
    message = "A"
elif x > 5:
    message = "B"
else:
    message = "C"`,
      why: "Ternaries are expressions, not statements. They are perfect for assigning single values based on a condition but quickly degrade code readability when chained.",
      tips: [
        "Limit ternaries to simple variable definitions.",
        "Never chain multiple 'if else' operators on a single line."
      ]
    },
    {
      id: 5,
      title: "Prefer Membership Checks",
      badge: "Set / Tuple in",
      summary: "Instead of chaining multiple 'or' statements, use membership checks. Using a set provides O(1) average lookup times and cleaner structure.",
      badCode: `if role == "admin" or role == "manager" or role == "owner":
    allow_access()`,
      goodCode: `if role in {"admin", "manager", "owner"}:
    allow_access()`,
      why: "Chaining 'or' clauses makes the code line longer, harder to read, and error-prone. Membership checks with sets are clean and highly performant.",
      tips: [
        "Use a set '{...}' for lookup tables as they offer faster lookup times than lists '[...]'.",
        "Keeps conditions readable when checking config keys or permission levels."
      ]
    },
    {
      id: 6,
      title: "Use Match-Case (Python 3.10+)",
      badge: "Pattern Matching",
      summary: "Replace large if-elif-else trees that match against constant patterns with Python's modern structural pattern matching.",
      badCode: `if choice == 1:
    print("Add")
elif choice == 2:
    print("Update")
elif choice == 3:
    print("Delete")
else:
    print("Invalid")`,
      goodCode: `match choice:
        case 1:
            print("Add")
        case 2:
            print("Update")
        case 3:
            print("Delete")
        case _:
            print("Invalid")`,
      why: "Match-case is not just a switch statement; it provides powerful structural pattern matching. It makes branches declarative and readable.",
      tips: [
        "Ideal for menu selections, command-line arguments parsing, and REST response shapes.",
        "Use '_' as a catch-all wildcard for fallbacks."
      ]
    },
    {
      id: 7,
      title: "Extract Complex Conditions",
      badge: "Self-Documenting",
      summary: "Chaining multiple boolean checks inside an 'if' clause makes it hard to parse. Extract logic into a descriptive variable or helper.",
      badCode: `if user.is_active and user.age >= 18 and user.country == "India":
    process_user()`,
      goodCode: `is_eligible = (
    user.is_active
    and user.age >= 18
    and user.country == "India"
)

if is_eligible:
    process_user()`,
      why: "Extracting conditions gives a name to the business logic. It document the intent of the check directly in the code without needing extra comments.",
      tips: [
        "Format multi-line conditions inside parentheses so Python handles wrapping automatically.",
        "Ensure variables have names that clearly describe the condition (e.g. 'is_eligible', 'can_checkout')."
      ]
    },
    {
      id: 8,
      title: "Use Early Returns",
      badge: "Function Guards",
      summary: "Design functions to fail fast. Handle negative cases, empty parameters, or validations first, raising exceptions or returning early.",
      badCode: `def login(user):
    if user:
        if user.is_active:
            return True
    return False`,
      goodCode: `def login(user):
    if not user:
        return False

    if not user.is_active:
        return False

    return True`,
      why: "Early returns prevent deep nesting in functional programming. It allows developers to read functions sequentially from top to bottom.",
      tips: [
        "Look for the main success return statement; it should generally live at the bottom-most line.",
        "Allows validators to run at the top, leaving the core implementation isolated."
      ]
    },
    {
      id: 9,
      title: "Prefer Polymorphism",
      badge: "Dict Mapping",
      summary: "Avoid huge switch statements or multi-branch checks that route values to functions. Use a mapping dictionary or objects instead.",
      badCode: `if animal == "dog":
    bark()
elif animal == "cat":
    meow()
elif animal == "cow":
    moo()`,
      goodCode: `sounds = {
    "dog": bark,
    "cat": meow,
    "cow": moo
}

sounds.get(animal, unknown_sound)()`,
      why: "Dictionary mapping makes the routing logic open to extension without changing code. You can easily register new keys dynamically without modifying code branches.",
      tips: [
        "Use '.get()' with a default callable to gracefully handle unknown values.",
        "Perfect for command maps, parser routing, and action dispatches."
      ]
    },
    {
      id: 10,
      title: "Follow PEP 8 Formatting",
      badge: "Standard Styling",
      summary: "Python style guidelines emphasize spacing, operator wrapping, and clean syntax structures. Do not wrap 'if' expressions in parentheses.",
      badCode: `if(age>=18 and country=="India"):
    allow_access()`,
      goodCode: `if age >= 18 and country == "India":
    allow_access()`,
      why: "Consistent style rules mean code written by one engineer looks exactly like code written by another, increasing overall team productivity.",
      tips: [
        "Do not write unnecessary parentheses around conditions (this is Python, not Javascript/C++).",
        "Ensure there are spaces around comparative operators."
      ]
    }
  ];

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopiedSection(id);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleQuizSubmit = () => {
    if (!selectedQuizOption) return;

    setQuizSubmitted(true);
    if (selectedQuizOption === "B") {
      setIsQuizCorrect(true);
      setQuizFeedback("Spot on! Option B is correct. By using early returns (guard clauses), we handle the error conditions first, keep the indentation shallow, and make the main success path clear.");
    } else if (selectedQuizOption === "A") {
      setIsQuizCorrect(false);
      setQuizFeedback("Incorrect. Option A compresses everything into a single ternary statement. While short, this creates a dense, unreadable block of code that violates the principle of simplicity.");
    } else {
      setIsQuizCorrect(false);
      setQuizFeedback("Incorrect. Option C overcomplicates validation. While dictionary maps (polymorphism) are useful for dispatch tables, applying them to simple procedural condition checking adds unnecessary complexity.");
    }
  };

  const handleQuizReset = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setQuizFeedback("");
    setIsQuizCorrect(false);
  };

  const activeRule = rules.find(r => r.id === activeRuleId) || rules[0];

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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-[10px] font-bold uppercase tracking-widest">
          <Terminal className="w-3 h-3" /> Python Programming
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
          Pythonic <span className="text-amber-500">Clean Code</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          Master the rules of readability, simplicity, and maintainability. Refactor nesting, replace complex else-branches, and write beautiful Python.
        </p>
      </header>

      {/* Pillars Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-white font-bold text-sm mt-0">01. Readability First</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-light">
            Python is designed to read like plain English. Clean styling, descriptive variable extractions, and standardized PEP 8 structure ensure quick developer onboarding.
          </p>
        </div>
        <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Code className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-white font-bold text-sm mt-0">02. Flatten Nesting</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-light">
            Deep indentation is the enemy of maintenance. By applying early return patterns and guard clauses, you keep complex control flows simple and linear.
          </p>
        </div>
        <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-teal-400" />
          </div>
          <h3 className="text-white font-bold text-sm mt-0">03. Maintainability</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-light">
            Dictionary mappings and match-case statements keep routing structures modular and open for future expansion without cluttering code templates.
          </p>
        </div>
      </section>

      {/* Rules Dashboard Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-amber-500">01.</span> Core Refactoring Rules
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Explore the ten foundational guidelines to clean up conditional statements, formatting, and structural routing in Python.
        </p>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Rules Navigation List (Left Sidebar inside page) */}
          <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {rules.map((rule) => (
              <button
                key={rule.id}
                onClick={() => setActiveRuleId(rule.id)}
                className={`w-full flex items-center justify-between text-left p-3.5 rounded-2xl border transition-all text-xs font-semibold cursor-pointer ${
                  activeRuleId === rule.id
                    ? "bg-zinc-900 border-zinc-800 text-white"
                    : "bg-zinc-950/40 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border ${
                    activeRuleId === rule.id
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "bg-zinc-950 border-zinc-900 text-zinc-500"
                  }`}>
                    {rule.id}
                  </span>
                  <span>{rule.title}</span>
                </div>
                {rule.badge && (
                  <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded border ${
                    activeRuleId === rule.id
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      : "bg-zinc-900/40 border-zinc-850 text-zinc-650"
                  }`}>
                    {rule.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active Rule Code Visualizer (Right Panel) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 md:p-8 bg-zinc-950/20 border border-zinc-900 rounded-3xl space-y-6">
              
              {/* Header Description */}
              <div className="space-y-2 border-b border-zinc-900/40 pb-4">
                <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest block">Rule {activeRule.id} principle</span>
                <h4 className="text-lg font-bold text-white leading-snug">{activeRule.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{activeRule.summary}</p>
              </div>

              {/* Code Sandbox (Side-by-side or stacked) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Bad Example */}
                <div className="flex flex-col border border-rose-500/20 rounded-2xl overflow-hidden bg-rose-500/5">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-rose-500/20 bg-rose-500/10">
                    <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider font-mono flex items-center gap-1">
                      ❌ Beginner / Bad
                    </span>
                    <button
                      onClick={() => handleCopy(activeRule.badCode, `bad-${activeRule.id}`)}
                      className="text-[10px] font-bold text-zinc-450 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSection === `bad-${activeRule.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-zinc-950 text-[11px] leading-relaxed text-zinc-300 font-mono no-scrollbar overflow-x-auto min-h-[140px] flex-1 flex items-center">
                    <code>{activeRule.badCode.trim()}</code>
                  </pre>
                </div>

                {/* Good Example */}
                <div className="flex flex-col border border-emerald-500/20 rounded-2xl overflow-hidden bg-emerald-500/5">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-emerald-500/20 bg-emerald-500/10">
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                      ✅ Pythonic / Better
                    </span>
                    <button
                      onClick={() => handleCopy(activeRule.goodCode, `good-${activeRule.id}`)}
                      className="text-[10px] font-bold text-zinc-450 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSection === `good-${activeRule.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-zinc-950 text-[11px] leading-relaxed text-zinc-300 font-mono no-scrollbar overflow-x-auto min-h-[140px] flex-1 flex items-center">
                    <code>{activeRule.goodCode.trim()}</code>
                  </pre>
                </div>

              </div>

              {/* Rationale & Tips Card */}
              <div className="p-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
                <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest block border-b border-zinc-900 pb-2">Why this matters</span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">{activeRule.why}</p>
                <div className="space-y-2 pt-1 border-t border-zinc-900/50">
                  <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-widest block mb-2">Best Practice Tips</span>
                  <ul className="space-y-1.5 list-none pl-0">
                    {activeRule.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-zinc-500 flex items-start gap-2 leading-relaxed">
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-500/80 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Refactoring Sandbox Quiz Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-amber-500">02.</span> Refactoring Challenge
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Put your skills to the test. Examine the messy beginner function below and select the refactored code that matches professional Pythonic guidelines.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Challenge Code (Left side, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/20 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Refactoring Target (Messy Code)
              </span>
            </div>
            
            <pre className="p-4 bg-zinc-950 text-[11px] leading-relaxed text-zinc-350 font-mono no-scrollbar overflow-x-auto flex-1 max-h-[360px]">
              {`def checkout(cart, user):
    if cart:
        if len(cart.items) > 0:
            if user:
                if user.is_logged_in:
                    if user.balance >= cart.total:
                        return True
                    else:
                        print("Insufficient balance")
                else:
                    print("Please log in")
            else:
                print("Invalid user")
        else:
            print("Cart is empty")
    return False`}
            </pre>
            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-[10px] text-zinc-500 leading-relaxed">
              <strong>Code smells found:</strong> Deeply nested checks (5 indents), unnecessary else routing for exit paths, redundant status evaluations.
            </div>
          </div>

          {/* Options & Quiz actions (Right side, 7 cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block">Choose the best refactored solution:</span>
              
              {/* Option A */}
              <button
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizOption("A")}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                  selectedQuizOption === "A"
                    ? "bg-zinc-900 border-amber-500 text-white"
                    : "bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                } ${quizSubmitted ? "opacity-60 cursor-default" : ""}`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                  selectedQuizOption === "A" ? "bg-amber-500 border-amber-500 text-zinc-950" : "border-zinc-700 text-zinc-500"
                }`}>A</span>
                <div className="space-y-1">
                  <span className="font-bold text-white block">Ternary Expression Compression</span>
                  <pre className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-lg text-[9.5px] text-zinc-400 font-mono overflow-x-auto no-scrollbar">
                    {`def checkout(cart, user):
    return True if cart and len(cart.items) > 0 and user and user.is_logged_in and user.balance >= cart.total else False`}
                  </pre>
                </div>
              </button>

              {/* Option B */}
              <button
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizOption("B")}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                  selectedQuizOption === "B"
                    ? "bg-zinc-900 border-amber-500 text-white"
                    : "bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                } ${quizSubmitted ? "opacity-60 cursor-default" : ""}`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                  selectedQuizOption === "B" ? "bg-amber-500 border-amber-500 text-zinc-950" : "border-zinc-700 text-zinc-500"
                }`}>B</span>
                <div className="space-y-1">
                  <span className="font-bold text-white block">Early Returns with Guard Clauses</span>
                  <pre className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-lg text-[9.5px] text-zinc-400 font-mono overflow-x-auto no-scrollbar">
                    {`def checkout(cart, user):
    if not cart or len(cart.items) == 0:
        print("Cart is empty")
        return False
    if not user or not user.is_logged_in:
        print("Please log in")
        return False
    if user.balance < cart.total:
        print("Insufficient balance")
        return False
    return True`}
                  </pre>
                </div>
              </button>

              {/* Option C */}
              <button
                disabled={quizSubmitted}
                onClick={() => setSelectedQuizOption("C")}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                  selectedQuizOption === "C"
                    ? "bg-zinc-900 border-amber-500 text-white"
                    : "bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                } ${quizSubmitted ? "opacity-60 cursor-default" : ""}`}
              >
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                  selectedQuizOption === "C" ? "bg-amber-500 border-amber-500 text-zinc-950" : "border-zinc-700 text-zinc-500"
                }`}>C</span>
                <div className="space-y-1">
                  <span className="font-bold text-white block">Dynamic Rules Validation Map</span>
                  <pre className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-lg text-[9.5px] text-zinc-400 font-mono overflow-x-auto no-scrollbar">
                    {`def checkout(cart, user):
    checks = [
        cart and len(cart.items) > 0,
        user and user.is_logged_in,
        user.balance >= cart.total
    ]
    return all(checks)`}
                  </pre>
                </div>
              </button>

            </div>

            {/* Quiz Action Buttons */}
            <div className="pt-2">
              <AnimatePresence mode="wait">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedQuizOption}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-650 text-xs font-bold text-zinc-950 disabled:cursor-not-allowed rounded-xl cursor-pointer transition-all"
                  >
                    Submit Refactoring Strategy <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-5 border rounded-2xl space-y-4 bg-zinc-950/45 border-zinc-900"
                  >
                    <div className="flex items-center gap-2">
                      {isQuizCorrect ? (
                        <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3 h-3" /> Correct Answer
                        </div>
                      ) : (
                        <div className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Try Again
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">{quizFeedback}</p>
                    <button
                      onClick={handleQuizReset}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[10px] font-bold text-white rounded-lg cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset Challenge
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Production Grade Walkthrough */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-amber-500">03.</span> Production Clean Refactoring
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          In production environments, clean code doesn't just return boolean outputs; it raises domain-specific exceptions, verifies parameters, and maintains clear logical structures. Let's look at the ultimate transition.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Beginner Production Style */}
          <div className="flex flex-col border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/20">
            <div className="px-5 py-3 border-b border-zinc-900 bg-zinc-950/40">
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest font-mono">
                ❌ Messy / Nested Production Check
              </span>
            </div>
            <pre className="p-6 text-[11px] leading-relaxed text-zinc-400 font-mono no-scrollbar overflow-x-auto bg-black/40 flex-1">
{`# Messy nested structure
def process_user_access(user):
    if user != None:
        if user.is_active == True:
            if user.age >= 18:
                print("Access Granted")
            else:
                print("Too Young")
        else:
            print("Inactive account")
    else:
        print("No user found")`}
            </pre>
            <div className="p-4 bg-zinc-950/60 border-t border-zinc-900 text-xs text-zinc-500 leading-relaxed">
              <strong>Issues:</strong> Uses explicit <code className="text-zinc-300">== True</code> comparisons, checks equality against <code className="text-zinc-300">!= None</code> instead of identity checks (<code className="text-zinc-300">is not None</code>), and fails silently with print statements instead of robust exception handling.
            </div>
          </div>

          {/* Clean Production Style */}
          <div className="flex flex-col border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/20">
            <div className="px-5 py-3 border-b border-zinc-900 bg-zinc-950/40">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest font-mono">
                ✅ Refactored & Pythonic Production Check
              </span>
            </div>
            <pre className="p-6 text-[11px] leading-relaxed text-zinc-350 font-mono no-scrollbar overflow-x-auto bg-black/40 flex-1">
{`# Professional Python structure
def process_user_access(user):
    if user is None:
        raise ValueError("User not found")

    if not user.is_active:
        raise PermissionError("Inactive account")

    if user.age < 18:
        raise PermissionError("Age requirement not met")

    print("Access Granted")`}
            </pre>
            <div className="p-4 bg-zinc-950/60 border-t border-zinc-900 text-xs text-zinc-500 leading-relaxed">
              <strong>Benefits:</strong> Strict guard assertions exit early, explicit ValueError and PermissionError exception propagation makes debugging stack traces simple, identity comparisons use standard <code className="text-zinc-300">is None</code> structures.
            </div>
          </div>

        </div>
      </section>

      {/* Quote summary footer */}
      <footer className="text-center py-6 border-t border-zinc-900/60">
        <blockquote className="inline-block text-sm text-zinc-500 max-w-xl mx-auto italic font-light">
          "Code is read far more often than it is written. If another developer can understand your if-else logic in 5 seconds, it's clean code."
        </blockquote>
      </footer>

    </motion.div>
  );
}
