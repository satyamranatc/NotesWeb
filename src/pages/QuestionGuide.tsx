import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Check, Info } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

interface Step {
  number: string;
  title: string;
  laymanTitle: string;
  description: string;
  checklist: string[];
}

const interviewSteps: Step[] = [
  {
    number: "01",
    title: "Understand & Clarify",
    laymanTitle: "Ask Questions & Draw Boundaries",
    description: "Never jump straight into coding. Take a breath and make sure you understand every aspect of the question.",
    checklist: [
      "Confirm the inputs (e.g. integer array, string, null nodes?)",
      "Confirm the output format (e.g. index, boolean, list?)",
      "Clarify constraints (e.g. can the array contain negative numbers? How big is the input?)",
      "Explain edge cases (e.g. empty array, single element, duplicates?)"
    ]
  },
  {
    number: "02",
    title: "Visualizing & Examples",
    laymanTitle: "Draw Test Cases by Hand",
    description: "Draw a custom test case on the whiteboard. Walk through it manually to understand the relationship between elements.",
    checklist: [
      "Avoid simple or trivial test cases (e.g. use an array of size 5-6 instead of 2)",
      "Manually trace the solution with indicators or diagrams",
      "Note what information your brain naturally uses to solve it"
    ]
  },
  {
    number: "03",
    title: "Brute Force Baseline",
    laymanTitle: "Get a Working Solution First",
    description: "Formulate a simple, straightforward solution to guarantee you have a working baseline. Don't be ashamed of brute force.",
    checklist: [
      "State the brute force approach clearly to the interviewer",
      "Analyze its Time & Space complexity (usually O(N^2) or O(2^N))",
      "Acknowledge the inefficiencies before optimizing"
    ]
  },
  {
    number: "04",
    title: "Optimize Strategically",
    laymanTitle: "Search for Shortcuts & Patterns",
    description: "Look for bottlenecks in your brute force and match them against common algorithmic blueprints.",
    checklist: [
      "Can we use extra space (like a Hash Map) to trade O(N^2) time for O(N) time?",
      "Can we sort the input to use Two Pointers or Binary Search?",
      "Are we doing repeated work? Can we cache results (Dynamic Programming)?"
    ]
  },
  {
    number: "05",
    title: "Write Clean Code",
    laymanTitle: "Code Modularly & Readably",
    description: "Write code that reads like a story. Keep variables named clearly and functions split modularly.",
    checklist: [
      "Use descriptive names (e.g. leftPointer, maxProfit instead of l, mp)",
      "Explain your class/variable declarations out loud",
      "Handle null checks and edge cases at the very beginning"
    ]
  },
  {
    number: "06",
    title: "Dry-Run & Test",
    laymanTitle: "Trace Code with Variables",
    description: "Test your code manually using your visual test cases. Do not wait for the interviewer to find bugs.",
    checklist: [
      "Write a dry-run variable trace table on the whiteboard",
      "Trace through loops line-by-line using your sample values",
      "Check loops boundary index offsets (e.g. index out of bounds?)"
    ]
  }
];

interface Pattern {
  id: string;
  name: string;
  layman: string;
  triggers: string[];
  leetcode: string[];
  blueprint: string;
}

const patternsData: Pattern[] = [
  {
    id: "two-pointers",
    name: "Two Pointers",
    layman: "Using two indexes moving from boundaries or at different speeds to compare elements without nested loops.",
    triggers: [
      "Sorted array or string inputs",
      "Searching for a pair or triplet matching a condition",
      "Reversing arrays, partition checks, or palindromes"
    ],
    leetcode: [
      "Two Sum II (Medium)",
      "3Sum (Medium)",
      "Container With Most Water (Medium)"
    ],
    blueprint: `def two_pointers(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need a larger sum
        else:
            right -= 1 # Need a smaller sum
    return []`
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    layman: "Maintaining a sub-segment (window) of elements and moving its start/end boundaries dynamically to analyze contiguous sections.",
    triggers: [
      "Contiguous subarrays or substrings",
      "Finding longest, shortest, or target sub-elements",
      "O(N^2) brute force loops check subarrays"
    ],
    leetcode: [
      "Maximum Subarray of Size K (Easy)",
      "Longest Substring Without Repeating Characters (Medium)",
      "Minimum Size Subarray Sum (Medium)"
    ],
    blueprint: `def sliding_window(arr, target):
    left = 0
    current_sum = 0
    min_length = float('inf')
    
    for right in range(len(arr)):
        current_sum += arr[right]  # Expand window
        
        # Shrink window as long as condition is satisfied
        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= arr[left]
            left += 1
            
    return min_length if min_length != float('inf') else 0`
  },
  {
    id: "binary-search",
    name: "Binary Search",
    layman: "Repeatedly halving your search space. Best for locating targets in pre-sorted data or optimization bounds in logarithmic time.",
    triggers: [
      "Pre-sorted arrays or sequences",
      "Finding closest/target elements in O(log N)",
      "Searching index threshold (binary search on answer)"
    ],
    leetcode: [
      "Binary Search (Easy)",
      "Search in Rotated Sorted Array (Medium)",
      "Find Minimum in Rotated Sorted Array (Medium)"
    ],
    blueprint: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = low + (high - low) // 2 # Avoid overflow
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`
  },
  {
    id: "dfs",
    name: "DFS (Depth-First)",
    layman: "Exploring down a single path or branch as deep as possible before backtracking to check remaining routes.",
    triggers: [
      "Path finding, maze checks, or subset generation",
      "Tree traversals (Pre-order, In-order, Post-order)",
      "Connected components or recursive relationships"
    ],
    leetcode: [
      "Path Sum (Easy)",
      "Number of Islands (Medium)",
      "Word Search (Medium)"
    ],
    blueprint: `def dfs(node, visited):
    if not node or node in visited:
        return
        
    visited.add(node)
    
    # Process current node logic here
    
    for neighbor in node.neighbors:
        dfs(neighbor, visited) # Recurse deep`
  },
  {
    id: "bfs",
    name: "BFS (Breadth-First)",
    layman: "Exploring nodes layer-by-layer (ripple effect). Best for finding the absolute shortest route in unweighted graphs.",
    triggers: [
      "Shortest path in unweighted graphs or grids",
      "Level-order traversal of trees",
      "Minimum steps to convert states"
    ],
    leetcode: [
      "Binary Tree Level Order Traversal (Medium)",
      "Shortest Path in Binary Matrix (Medium)",
      "Word Ladder (Hard)"
    ],
    blueprint: `from collections import deque

def bfs(start_node):
    queue = deque([start_node])
    visited = {start_node}
    
    while queue:
        # Process current level nodes
        curr = queue.popleft()
        
        for neighbor in curr.neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor) # Push to next layer`
  }
];

interface ComplexityItem {
  structure: string;
  access: string;
  search: string;
  insert: string;
  delete: string;
  space: string;
}

const complexityData: ComplexityItem[] = [
  { structure: "Array / String", access: "O(1)", search: "O(N)", insert: "O(N)", delete: "O(N)", space: "O(N)" },
  { structure: "Hash Map / Set", access: "N/A", search: "O(1) average", insert: "O(1) average", delete: "O(1) average", space: "O(N)" },
  { structure: "Stack / Queue", access: "O(N)", search: "O(N)", insert: "O(1)", delete: "O(1)", space: "O(N)" },
  { structure: "Balanced BST", access: "O(log N)", search: "O(log N)", insert: "O(log N)", delete: "O(log N)", space: "O(N)" },
  { structure: "Min/Max Heap", access: "O(1) lookup", search: "O(N)", insert: "O(log N)", delete: "O(log N) extract", space: "O(N)" },
  { structure: "Graph (Adjacency List)", access: "N/A", search: "O(V + E) via BFS/DFS", insert: "O(1)", delete: "O(V + E)", space: "O(V + E)" }
];

export default function QuestionGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [activePattern, setActivePattern] = useState(patternsData[0]);
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({});

  const toggleRule = (rule: string) => {
    setCheckedRules((prev) => ({ ...prev, [rule]: !prev[rule] }));
  };

  const handlePrevStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleNextStep = () => {
    if (activeStep < interviewSteps.length - 1) setActiveStep(activeStep + 1);
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-[10px] font-bold uppercase tracking-widest">
          <BookOpen className="w-3 h-3" /> DSA Series
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Interview <span className="text-violet-400">Question Guide</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
          The structural blueprint to solving coding questions under pressure. Learn the step-by-step whiteboard method and master core algorithmic patterns.
        </p>
      </header>

      {/* 01. Whiteboard Step Method */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-violet-400">01.</span> Whiteboard Attack Plan
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Follow these 6 stages in every interview to demonstrate structured problem-solving. Use the controllers to step through the blueprint.
        </p>

        {/* Stepper Visualizer Card */}
        <div className="border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden shadow-2xl p-6 space-y-6">
          
          {/* Stepper Timeline nodes */}
          <div className="flex justify-between items-center relative py-4 overflow-x-auto no-scrollbar">
            
            {/* Connecting Wire */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-800/60 z-0" />

            {interviewSteps.map((step, idx) => {
              const isCurrent = idx === activeStep;
              const isPassed = idx < activeStep;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center gap-2 z-10 min-w-[70px] cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCurrent
                      ? "bg-violet-500/15 border-violet-500 text-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.3)] scale-110"
                      : isPassed
                      ? "bg-violet-500/5 border-violet-500/40 text-violet-400/70"
                      : "bg-zinc-950 border-zinc-800 text-zinc-650"
                  }`}>
                    {step.number}
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-bold transition-colors hidden sm:block ${
                    isCurrent ? "text-zinc-200" : "text-zinc-550"
                  }`}>
                    {step.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Details Display */}
          <div className="p-6 bg-black/40 rounded-2xl border border-zinc-900/60 space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-violet-400 block font-mono">
                Phase {interviewSteps[activeStep].number} — {interviewSteps[activeStep].laymanTitle}
              </span>
              <h3 className="text-white font-bold text-xl">{interviewSteps[activeStep].title}</h3>
              <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-2xl">
                {interviewSteps[activeStep].description}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Actions & Verifications</span>
              <ul className="space-y-2.5 text-xs text-zinc-300 font-mono">
                {interviewSteps[activeStep].checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-violet-400 block pt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stepper Controllers */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
            <div className="flex gap-2">
              <button
                disabled={activeStep === 0}
                onClick={handlePrevStep}
                className="px-4 py-2 border border-zinc-900 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={activeStep === interviewSteps.length - 1}
                onClick={handleNextStep}
                className="px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 rounded-xl text-xs font-bold text-violet-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">
              Steps Tracker: {activeStep + 1} / {interviewSteps.length}
            </div>
          </div>

        </div>
      </section>

      {/* 02. Pattern Selector Dashboard */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-violet-400">02.</span> Core Algorithmic Patterns
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Coding questions usually stem from a few core patterns. Learn how to recognize them instantly and study their code blueprints.
        </p>

        {/* Patterns Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Patterns list selection */}
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
            {patternsData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePattern(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  activePattern.id === item.id
                    ? "bg-violet-500/10 border-violet-500 text-violet-400 shadow-md font-bold"
                    : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900/30"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold font-sans">{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          {/* Pattern Details Panel */}
          <div className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-3xl md:col-span-2 space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Pattern Details</span>
              <h3 className="text-white font-bold text-2xl">{activePattern.name}</h3>
              <p className="text-sm text-zinc-350 font-light leading-relaxed">
                {activePattern.layman}
              </p>
            </div>

            {/* Triggers */}
            <div className="space-y-2 pt-2 border-t border-zinc-900/60">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">How to Recognize:</span>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
                {activePattern.triggers.map((trigger, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold block">•</span>
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* High-frequency LeetCode */}
            <div className="space-y-2 pt-2 border-t border-zinc-900/60">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">LeetCode Exercises:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {activePattern.leetcode.map((problem, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-900 text-[10px] text-zinc-400 font-mono font-medium">
                    {problem}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Blueprint */}
            <div className="space-y-2 pt-2 border-t border-zinc-900/60">
              <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 block">Blueprint Code:</span>
              <CodeBlock
                filename="pattern_blueprint.py"
                language="python"
                code={activePattern.blueprint}
              />
            </div>

          </div>

        </div>
      </section>

      {/* 03. Complexity Cheat Sheet */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-violet-400">03.</span> Complexity Cheat Sheet
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          A compact reference of data structures and algorithms boundaries. Memorizing these is essential for evaluating optimization options.
        </p>

        <div className="border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider bg-zinc-950/30">
                  <th className="p-4">Data Structure</th>
                  <th className="p-4">Access</th>
                  <th className="p-4">Search</th>
                  <th className="p-4">Insert</th>
                  <th className="p-4">Delete</th>
                  <th className="p-4">Space Complexity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 font-mono text-zinc-300">
                {complexityData.map((item) => (
                  <tr key={item.structure} className="hover:bg-zinc-900/10 transition-colors">
                    <td className="p-4 font-bold text-white">{item.structure}</td>
                    <td className="p-4">{item.access}</td>
                    <td className="p-4 text-violet-400">{item.search}</td>
                    <td className="p-4">{item.insert}</td>
                    <td className="p-4">{item.delete}</td>
                    <td className="p-4 text-zinc-450">{item.space}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 04. Behavioral Guidelines Checklist */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-violet-400">04.</span> Behavioral Prep Checklist
        </h2>
        <p className="text-zinc-400 leading-relaxed font-light">
          Technical competency is only half of the battle. Interviewers track how you communicate and handle hints. Make sure you practice these habits:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div 
            onClick={() => toggleRule("talk")}
            className={`p-6 border rounded-3xl cursor-pointer transition-all flex items-start gap-4 select-none ${
              checkedRules["talk"]
                ? "bg-violet-500/5 border-violet-500 text-zinc-200"
                : "bg-zinc-900/30 border-zinc-900 text-zinc-450 hover:bg-zinc-900/40"
            }`}
          >
            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
              checkedRules["talk"] ? "bg-violet-500 border-violet-500 text-black" : "border-zinc-800"
            }`}>
              {checkedRules["talk"] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">Talk Out Loud (Verbalize Thought Process)</h3>
              <p className="text-xs font-light leading-relaxed">
                Do not sit in silence while thinking. If you stay quiet for more than 30 seconds, the interviewer cannot gauge your logic. Speak your thoughts: "I am currently thinking of checking a sliding window because we need to find contiguous elements..."
              </p>
            </div>
          </div>

          <div 
            onClick={() => toggleRule("hints")}
            className={`p-6 border rounded-3xl cursor-pointer transition-all flex items-start gap-4 select-none ${
              checkedRules["hints"]
                ? "bg-violet-500/5 border-violet-500 text-zinc-200"
                : "bg-zinc-900/30 border-zinc-900 text-zinc-450 hover:bg-zinc-900/40"
            }`}
          >
            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
              checkedRules["hints"] ? "bg-violet-500 border-violet-500 text-black" : "border-zinc-800"
            }`}>
              {checkedRules["hints"] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">Listen Intently to Hints</h3>
              <p className="text-xs font-light leading-relaxed">
                If the interviewer says: "Can we do this in O(1) space?" or "What if the array is sorted?", they are literally handing you the answer. Do not ignore them; stop and adjust your plan immediately.
              </p>
            </div>
          </div>

          <div 
            onClick={() => toggleRule("force")}
            className={`p-6 border rounded-3xl cursor-pointer transition-all flex items-start gap-4 select-none ${
              checkedRules["force"]
                ? "bg-violet-500/5 border-violet-500 text-zinc-200"
                : "bg-zinc-900/30 border-zinc-900 text-zinc-450 hover:bg-zinc-900/40"
            }`}
          >
            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
              checkedRules["force"] ? "bg-violet-500 border-violet-500 text-black" : "border-zinc-800"
            }`}>
              {checkedRules["force"] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">Do Not Jump Straight to Coding</h3>
              <p className="text-xs font-light leading-relaxed">
                Beginners often open the editor and write code immediately. This is a red flag. Only start typing after you and the interviewer have aligned on the algorithm, complexity, and edge cases.
              </p>
            </div>
          </div>

          <div 
            onClick={() => toggleRule("tradeoff")}
            className={`p-6 border rounded-3xl cursor-pointer transition-all flex items-start gap-4 select-none ${
              checkedRules["tradeoff"]
                ? "bg-violet-500/5 border-violet-500 text-zinc-200"
                : "bg-zinc-900/30 border-zinc-900 text-zinc-450 hover:bg-zinc-900/40"
            }`}
          >
            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
              checkedRules["tradeoff"] ? "bg-violet-500 border-violet-500 text-black" : "border-zinc-800"
            }`}>
              {checkedRules["tradeoff"] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm">Analyze Trade-offs Verbally</h3>
              <p className="text-xs font-light leading-relaxed">
                Compare solutions openly. "We can solve this in O(1) auxiliary space using heaps, but sorting the array beforehand would take O(N log N) time. The current HashMap uses O(N) space but runs in linear time."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 05. General Advice */}
      <section className="p-6 border border-zinc-900 bg-zinc-950/40 rounded-3xl space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-violet-400" /> A Note on Prep Consistency
        </h3>
        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          Understanding the patterns on paper is easy, but applying them in real-time under pressure is hard. Consistency beats cramming. Solve 1-2 questions daily focusing on the step method and verbalizing your actions. Over time, identifying the correct algorithmic pattern will become natural.
        </p>
      </section>

    </motion.div>
  );
}
