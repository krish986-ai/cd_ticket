"use client";

import { motion } from "framer-motion";
import { Terminal, GitPullRequest, Users, Award, ArrowUpRight, Code, Cpu, Cloud, Shield } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Terminal,
    tag: "Sprint Culture",
    title: "Real Product Hackathons",
    text: "We build working software, push commits to GitHub, and deploy to live production URLs in intensive campus sprints.",
  },
  {
    icon: GitPullRequest,
    tag: "Open Source First",
    title: "Open Source Culture",
    text: "Learn Git workflows, pull requests, code reviews, and maintainership by contributing directly to open source repositories.",
  },
  {
    icon: Users,
    tag: "Peer Guidance",
    title: "Peer-to-Peer Mentorship",
    text: "Seniors mentor juniors with code reviews, modern tech stack selection, system architecture, and tech interview prep.",
  },
  {
    icon: Award,
    tag: "Career Growth",
    title: "Career & Placements",
    text: "Turn project portfolios into engineering offers. Members land internships and full-time roles at leading tech organizations.",
  },
];

export default function Features() {
  return (
    <section id="about" className="relative border-t border-[#27272a] bg-[#09090b] px-4 py-20 sm:px-6 md:px-8 lg:py-28 editorial-grid">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="badge-pill-sky mb-3">Why CodersEra</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-1 leading-[1.1]">
              Built by developers, <br />
              <span className="text-[#38bdf8]">for developers.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            Everything in CodersEra is designed around real technical growth, practical building, and a genuine human community.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="codersera-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#38bdf8]">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                  {pillar.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#38bdf8]">
                <span>Learn more</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stacks Strip */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-[#121215]/70 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
                <Code className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Web Engineering</span>
              </div>
              <h4 className="text-sm font-bold text-white">Full Stack React 19 & Next.js</h4>
              <p className="text-xs text-[#a1a1aa] mt-1">TypeScript, TailwindCSS & APIs</p>
            </div>

            <div className="border-b sm:border-b-0 lg:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#34d399] mb-1">
                <Cpu className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">AI & ML Track</span>
              </div>
              <h4 className="text-sm font-bold text-white">LLM Agents & PyTorch</h4>
              <p className="text-xs text-[#a1a1aa] mt-1">Python, RAG & Fine-tuning</p>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-4">
              <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
                <Cloud className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Cloud & Azure</span>
              </div>
              <h4 className="text-sm font-bold text-white">Docker & Cloud Systems</h4>
              <p className="text-xs text-[#a1a1aa] mt-1">CI/CD, Kubernetes & Serverless</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#f59e0b] mb-1">
                <Shield className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Cybersecurity</span>
              </div>
              <h4 className="text-sm font-bold text-white">Security & Auditing</h4>
              <p className="text-xs text-[#a1a1aa] mt-1">Ethical Hacking & Web Defense</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
