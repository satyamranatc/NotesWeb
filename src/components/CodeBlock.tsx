import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "", filename = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="my-6 border border-zinc-800/80 bg-[#0b0c10] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-950/60">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
          {filename || language || "Code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-semibold cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto text-[13px] leading-relaxed text-zinc-300 font-mono no-scrollbar bg-black/40">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
