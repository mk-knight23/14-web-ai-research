import { motion } from 'framer-motion';
import { Bot, Brain, Sparkles, ArrowRight, Clock, Tag, ChevronRight, MessageSquare, Zap, Code2, Database, Search, Github, Twitter, Linkedin, BookOpen } from 'lucide-react';

const POSTS = [
    { id: 1, title: "Building RAG Pipelines with LangChain 0.2", desc: "Learn how to construct production-grade retrieval-augmented generation systems using the latest LangChain patterns.", category: "Tutorial", date: "Jan 24, 2024", readTime: "18 min" },
    { id: 2, title: "Prompt Engineering: A Systems Approach", desc: "Move beyond simple prompts. Explore structured prompting, chain-of-thought, and self-consistency techniques.", category: "Deep Dive", date: "Jan 22, 2024", readTime: "25 min" },
    { id: 3, title: "Agents vs Chains: When to Use What", desc: "Understanding the architectural differences and making informed decisions for your LLM applications.", category: "Architecture", date: "Jan 18, 2024", readTime: "12 min" },
];

const TOOLS = [
    { icon: <Brain />, name: "LangChain", desc: "Framework for LLM apps" },
    { icon: <Database />, name: "Vector DBs", desc: "Semantic search at scale" },
    { icon: <Code2 />, name: "LLMs", desc: "OpenAI, Claude, Gemini" },
    { icon: <Zap />, name: "Agents", desc: "Autonomous AI systems" },
];

function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-white" role="application" aria-label="AI Chain Blog">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 z-50 px-6" role="navigation" aria-label="Main navigation">
                <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight uppercase leading-none">AI_<span className="text-emerald-400">CHAIN</span></h1>
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">LLM Engineering Blog</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['Tutorials', 'Deep Dives', 'Tools', 'Newsletter'].map(l => (
                            <a key={l} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors" aria-label={`Navigate to ${l}`}>{l}</a>
                        ))}
                    </div>

                    <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20" aria-label="Search articles">
                        <Search className="w-4 h-4" /> Search
                    </button>
                </div>
            </nav>

            <main className="pt-32 pb-20" role="main">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-40 text-center" aria-labelledby="hero-heading">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-10">
                            <Sparkles className="w-3 h-3 fill-current" /> Production-Ready AI Patterns
                        </span>

                        <h1 id="hero-heading" className="text-6xl md:text-[6rem] font-black leading-[0.85] tracking-tighter uppercase mb-10">
                            MASTER THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic">LLM</span> <br /> ENGINEERING STACK.
                        </h1>

                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                            Deep technical content on LangChain, prompt engineering, RAG architectures, and production AI systems.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 group">
                                Latest Posts <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button className="px-12 py-5 border-2 border-slate-800 hover:border-emerald-500 text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                                <MessageSquare className="w-4 h-4" /> Join Community
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Tools Grid */}
                <section className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-40" aria-labelledby="tools-heading">
                    <h2 id="tools-heading" className="sr-only">AI Tools & Technologies</h2>
                    {TOOLS.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl text-center group hover:border-emerald-500/50 transition-all cursor-pointer"
                        >
                            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                {t.icon}
                            </div>
                            <h3 className="font-black uppercase tracking-tight mb-2">{t.name}</h3>
                            <p className="text-xs text-slate-500 font-medium">{t.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* Featured Posts */}
                <section className="max-w-7xl mx-auto px-6 mb-40" aria-labelledby="posts-heading">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 id="posts-heading" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">LATEST <span className="text-slate-700 italic">DISPATCHES</span></h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">Deep technical content for AI engineers</p>
                        </div>
                        <button className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2 hover:text-white transition-colors">
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
                                className="p-10 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl group hover:border-emerald-500/50 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col lg:flex-row gap-10 items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-emerald-400">{p.category}</span>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                <Clock className="w-3 h-3" /> {p.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 group-hover:text-emerald-400 transition-colors leading-tight">
                                            {p.title}
                                        </h3>

                                        <p className="text-slate-400 font-medium leading-relaxed mb-6">
                                            {p.desc}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{p.date}</span>
                                            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 group-hover:text-white transition-colors">
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
                <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-white/5">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <BookOpen className="w-16 h-16 text-emerald-400 mx-auto mb-10" />
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">
                            STAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic">AHEAD</span> <br /> OF THE CURVE.
                        </h2>
                        <p className="text-lg text-slate-400 font-medium mb-12 max-w-xl mx-auto">
                            Weekly deep dives on LLM engineering, production patterns, and emerging AI architectures. No spam, unsubscribe anytime.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none placeholder-slate-600 uppercase text-[10px] tracking-widest"
                            />
                            <button className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-16 px-6" role="contentinfo">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-emerald-400" />
                        <span className="font-black uppercase tracking-tight">AI_<span className="text-emerald-400">CHAIN</span></span>
                    </div>
                    <div className="flex gap-6">
                        <button className="p-3 bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-white transition-all rounded-xl" aria-label="Visit GitHub">
                            <Github className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-white transition-all rounded-xl" aria-label="Visit Twitter">
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-white transition-all rounded-xl" aria-label="Visit LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2026 AI_CHAIN // DISPATCH • 21/30 DISPATCHED</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
