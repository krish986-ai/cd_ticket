"use client";

import { motion } from "framer-motion";
import { Terminal, GitPullRequest, Users, Award, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Terminal,
    tag: "Production Sprints",
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
    tag: "Industry Ready",
    title: "Career & Placements",
    text: "Turn project portfolios into engineering offers. Members land internships and full-time roles at leading tech organizations.",
  },
];

export default function Features() {
  return (
    <section id="about" className="relative border-t border-[#27272a] bg-[#09090b] px-4 py-20 sm:px-6 md:px-8 lg:py-28 editorial-grid">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="badge-sky mb-4">Why CodersEra</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2 leading-[1.1]">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#38bdf8]">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {pillar.text}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#38bdf8]">
                <span>Explore Track</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stacks Banner */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-[#121215]/60 p-8 sm:p-10 backdrop-blur-xl">
          <div className="grid lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">01. Web Engineering</span>
              <h4 className="text-lg font-bold text-white mt-1">Full Stack Next.js & React</h4>
              <p className="text-xs text-[#a1a1aa] mt-2">React 19, Next.js 15, TypeScript, TailwindCSS & GraphQL</p>
            </div>
            <div className="border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-xs font-bold text-[#34d399] uppercase tracking-wider">02. AI & ML</span>
              <h4 className="text-lg font-bold text-white mt-1">LLM Agents & PyTorch</h4>
              <p className="text-xs text-[#a1a1aa] mt-2">Python, RAG architectures, Fine-tuning & LangChain</p>
            </div>
            <div className="border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">03. Cloud & DevOps</span>
              <h4 className="text-lg font-bold text-white mt-1">Docker & Azure Systems</h4>
              <p className="text-xs text-[#a1a1aa] mt-2">Kubernetes, CI/CD Actions, Azure Cloud & Serverless</p>
            </div>
            <div>
              <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">04. Cybersecurity</span>
              <h4 className="text-lg font-bold text-white mt-1">Web Security & CTF</h4>
              <p className="text-xs text-[#a1a1aa] mt-2">Vulnerability auditing, Network defense & Ethical Hacking</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
