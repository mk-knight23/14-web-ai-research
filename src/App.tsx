import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Brain,
  Sparkles,
  ArrowRight,
  Clock,
  Tag,
  ChevronRight,
  MessageSquare,
  Zap,
  Code2,
  Database,
  Search,
  Github,
  BookOpen,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from 'lucide-react';


const POSTS = [
  {
    id: 1,
    title: 'Building RAG Pipelines with LangChain 0.2',
    desc: 'Learn how to construct production-grade retrieval-augmented generation systems using the latest LangChain patterns.',
    category: 'Tutorial',
    date: 'Jan 24, 2024',
    readTime: '18 min',
  },
  {
    id: 2,
    title: 'Prompt Engineering: A Systems Approach',
    desc: 'Move beyond simple prompts. Explore structured prompting, chain-of-thought, and self-consistency techniques.',
    category: 'Deep Dive',
    date: 'Jan 22, 2024',
    readTime: '25 min',
  },
  {
    id: 3,
    title: 'Agents vs Chains: When to Use What',
    desc: 'Understanding the architectural differences and making informed decisions for your LLM applications.',
    category: 'Architecture',
    date: 'Jan 18, 2024',
    readTime: '12 min',
  },
];

const TOOLS = [
  { icon: <Brain />, name: 'LangChain', desc: 'Framework for LLM apps' },
  { icon: <Database />, name: 'Vector DBs', desc: 'Semantic search at scale' },
  { icon: <Code2 />, name: 'LLMs', desc: 'OpenAI, Claude, Gemini' },
  { icon: <Zap />, name: 'Agents', desc: 'Autonomous AI systems' },
];

function App() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // AI Sandbox state
  const [draftPrompt, setDraftPrompt] = useState('');
  const [promptStyle, setPromptStyle] = useState<'cot' | 'roleplay' | 'fewshot'>('cot');
  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const optimizePrompt = (prompt: string, style: 'cot' | 'roleplay' | 'fewshot') => {
    if (style === 'cot') {
      return `# System Role: Expert AI Assistant\n\n## Instructions\nYou are tasked with the following request:\n"""\n${prompt}\n"""\n\n## Execution steps\n1. Analyze the request step-by-step.\n2. Formulate a draft response outlining your logic.\n3. Verify consistency and constraints.\n4. Output the final correct solution clearly.\n\n## Output Format\nProvide your detailed chain-of-thought analysis in a collapsible <details> section, followed by your final direct answer.`;
    }
    if (style === 'roleplay') {
      return `# Role: Senior Systems Architect / AI Engineer\n\n## Profile\nYou have over 15 years of experience in system engineering, distributed infrastructure, and production AI orchestration. You write concise, optimized, clean code and provide architectural design specs.\n\n## Goal\nSolve the user's task with expert precision and professional standard:\n"""\n${prompt}\n"""\n\n## Constraints\n- Prioritize simplicity and security.\n- Avoid unnecessary imports or dependencies.\n- Keep explanations minimal, focusing on raw implementation.`;
    }
    if (style === 'fewshot') {
      return `# System: Few-Shot Specialized Engine\n\n## Context\nYou are a highly focused parser and converter.\n\n## Examples\n- Input: Convert a string to lowercase.\n- Output: { "action": "lowercase", "result": "output" }\n\n- Input: "${prompt}"\n- Output: <insert similar structured output here>`;
    }
    return prompt;
  };

  const handleCompile = () => {
    if (!draftPrompt) return;
    const optimized = optimizePrompt(draftPrompt, promptStyle);
    setCompiledPrompt(optimized);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const PROMPT_TEMPLATES = [
    {
      name: 'RAG Intent Router',
      desc: 'Route user query to the correct vector index or data store.',
      content: `# System Role: Query Router\n\n## Goal\nAnalyze the user's raw query and classify it into one of these storage sources:\n- [VECTOR_INDEX]: queries about company policies, onboarding documents, or guides.\n- [TRANSACTION_DB]: queries about invoice status, orders, or payment details.\n- [FAQ_CACHE]: simple greetings, common questions, or out-of-scope queries.\n\n## Classification Output\nOutput ONLY a valid JSON block of the format: { "target": "SOURCE", "confidence": float, "reason": "string" }\n\n## User Input\n"""\n{{USER_QUERY}}\n"""`
    },
    {
      name: 'LLM JSON Output Guard',
      desc: 'Force models to output raw valid JSON without markdown wrapping.',
      content: `# System Role: Strict JSON Parser\n\n## Instructions\n- You must output valid, standard JSON conforming to the schema below.\n- Do NOT wrap your output in markdown codeblocks (e.g. do NOT use \`\`\`json).\n- Do NOT include any intro or outro commentary.\n\n## Schema\n{{JSON_SCHEMA}}\n\n## Input Data\n{{INPUT_DATA}}`
    },
    {
      name: 'AI Agent Chain Specs',
      desc: 'System instructions for multi-agent loops and tool calls.',
      content: `# System Role: Orchestration Agent\n\n## Loop Protocol\n1. Analyze the objective: {{OBJECTIVE}}\n2. Review available tools: {{TOOLS}}\n3. Select tool to execute and output your thought and target execution payload in JSON format.\n4. Wait for the environment to return the tool execution result.\n5. Iterate until final goal is achieved.`
    }
  ];

  return (
    <div
      className="min-h-screen bg-transparent relative z-10 text-slate-900"
      role="application"
      aria-label="AI Chain Blog"
    >
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 h-20 bg-transparent backdrop-blur-2xl border-b border-white/30 z-50 px-6"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight uppercase leading-none">
                MK_<span className="text-indigo-600">NEURALLAB</span>
              </h1>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">
                AI Engineering Hub
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[{l:'Articles', href:'#articles'}, {l:'Sandbox', href:'#sandbox'}, {l:'Templates', href:'#templates'}].map(({l, href}) => (
              <a
                key={l}
                href={href}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors"
                aria-label={`Navigate to ${l}`}
              >
                {l}
              </a>
            ))}
          </div>

          <button
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 cursor-pointer"
            aria-label="Search articles"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20" role="main">
        {/* Hero Section */}
        <section
          className="max-w-7xl mx-auto px-6 mb-40 text-center"
          aria-labelledby="hero-heading"
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-10">
              <Sparkles className="w-3 h-3 fill-current animate-pulse" /> Production-Ready AI Patterns
            </span>

            <h1
              id="hero-heading"
              className="text-6xl md:text-[6rem] font-black leading-[0.85] tracking-tighter uppercase mb-10"
            >
              MASTER THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700 italic">
                LLM
              </span>{' '}
              <br /> ENGINEERING STACK.
            </h1>

            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
              Frosted sandbox tools and deep technical blueprints for LLM systems, prompt design, and RAG chains.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#sandbox" className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 group">
                AI Prompt Sandbox{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#articles" className="px-12 py-5 border-2 border-slate-800 hover:border-indigo-600 text-slate-900 font-black rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                <BookOpen className="w-4 h-4" /> Read Dispatches
              </a>
            </div>
          </motion.div>
        </section>

        {/* Tools Grid */}
        <section
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-40"
          aria-labelledby="tools-heading"
        >
          <h2 id="tools-heading" className="sr-only">
            AI Tools & Technologies
          </h2>
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl text-center group hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {t.icon}
              </div>
              <h3 className="font-black uppercase tracking-tight mb-2">{t.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{t.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* AI Engineering Sandbox Section */}
        <section id="sandbox" className="max-w-7xl mx-auto px-6 mb-40 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">AI Workbench</span>
            <h2 className="text-4xl font-black uppercase tracking-tight mt-2">Interactive Prompt Compiler</h2>
            <p className="text-slate-500 text-sm mt-3">
              Write your draft instruction, choose a structured pattern, and compile it into a production-grade LLM instruction spec.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Input card */}
            <div className="p-8 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl space-y-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <label htmlFor="draft-prompt-input" className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  1. Raw Prompt / Instruction
                </label>
                <textarea
                  id="draft-prompt-input"
                  rows={6}
                  placeholder="e.g. Write a python function to fetch stock prices using yfinance..."
                  value={draftPrompt}
                  onChange={(e) => setDraftPrompt(e.target.value)}
                  className="w-full bg-white/50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 rounded-2xl p-4 outline-none transition-all text-sm resize-none"
                />
              </div>

              <div className="space-y-4">
                <span className="block text-xs font-black uppercase tracking-wider text-slate-400">
                  2. Select Compiler Blueprint
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(['cot', 'roleplay', 'fewshot'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setPromptStyle(style)}
                      className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                        promptStyle === style
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                          : 'border-slate-200 hover:border-indigo-600/50 bg-white/20'
                      }`}
                    >
                      {style === 'cot' ? 'CoT Spec' : style === 'roleplay' ? 'Persona' : 'Few Shot'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCompile}
                disabled={!draftPrompt}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/25 cursor-pointer mt-4"
              >
                Compile System Prompt
              </button>
            </div>

            {/* Output card */}
            <div className="p-8 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Compiled Instructions Output
                  </span>
                  {compiledPrompt && (
                    <button
                      onClick={() => handleCopy(compiledPrompt, 'compiled')}
                      className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      {copiedType === 'compiled' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedType === 'compiled' ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
                {compiledPrompt ? (
                  <div className="flex-1 bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-y-auto max-h-[16.5rem] whitespace-pre-wrap text-left border border-slate-800">
                    {compiledPrompt}
                  </div>
                ) : (
                  <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 text-slate-400 min-h-[16.5rem]">
                    <Sparkles className="w-10 h-10 mb-3 text-slate-300 animate-pulse" />
                    <p className="text-xs font-bold">Your optimized prompt will compile here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Structured Templates Library */}
        <section id="templates" className="max-w-7xl mx-auto px-6 mb-40 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Templates</span>
            <h2 className="text-4xl font-black uppercase tracking-tight mt-2">Production prompt specs</h2>
            <p className="text-slate-500 text-sm mt-3">
              Production-ready templates for system routing, structured output enforcement, and orchestration loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROMPT_TEMPLATES.map((tmpl, idx) => (
              <div key={idx} className="p-8 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl space-y-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2">{tmpl.name}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{tmpl.desc}</p>
                </div>
                <button
                  onClick={() => handleCopy(tmpl.content, `template-${idx}`)}
                  className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    copiedType === `template-${idx}`
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                      : 'border-indigo-500 text-indigo-600 bg-indigo-50/20 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  {copiedType === `template-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                  {copiedType === `template-${idx}` ? 'Copied' : 'Copy Template'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        <section id="articles" className="max-w-7xl mx-auto px-6 mb-40" aria-labelledby="posts-heading">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2
                id="posts-heading"
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
              >
                LATEST <span className="text-slate-700 italic">DISPATCHES</span>
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">
                Deep technical content for AI engineers
              </p>
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2 hover:text-slate-900 transition-colors cursor-pointer">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-8">
            {POSTS.map((p, idx) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl group hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-600">
                        {p.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Clock className="w-3 h-3" /> {p.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                      {p.title}
                    </h3>

                    <p className="text-slate-600 font-medium leading-relaxed mb-6">{p.desc}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        {p.date}
                      </span>
                      <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 group-hover:text-slate-900 transition-colors cursor-pointer">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-white/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-10" />
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none text-white">
              STAY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 italic">
                AHEAD
              </span>{' '}
              <br /> OF THE CURVE.
            </h2>
            <p className="text-lg text-slate-400 font-medium mb-12 max-w-xl mx-auto">
              Subscribe to our weekly LLM engineering newsletter for deep dives on production patterns and emerging AI architectures. No spam, unsubscribe anytime.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center"
              >
                <p className="text-indigo-400 font-bold">🎉 Thank you for subscribing! We'll keep you updated.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                <div className="flex-1 relative">
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl py-3.5 px-5 focus:ring-2 focus:ring-indigo-500/50 outline-none text-white transition-all placeholder:text-slate-500 font-medium text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition-all uppercase tracking-widest text-xs cursor-pointer shadow-lg shadow-indigo-600/25"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-slate-100/50 dark:border-white/10 dark:bg-transparent py-16 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span className="font-black uppercase tracking-tight">
              MK_<span className="text-indigo-600">NEURALLAB</span>
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/mk-knight23/14-web-ai-research"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/50 border border-slate-200 hover:bg-indigo-600 hover:text-white transition-all rounded-xl"
              aria-label="Visit GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/mk_knight"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/50 border border-slate-200 hover:bg-indigo-600 hover:text-white transition-all rounded-xl"
              aria-label="Visit Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mk-knight"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/50 border border-slate-200 hover:bg-indigo-600 hover:text-white transition-all rounded-xl"
              aria-label="Visit LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
              © 2026 <a href="https://www.mkazi.live" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Qazi Musharof — Kazi Developer</a>. All rights reserved.
            </p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">No data collected · Free & open-source</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
