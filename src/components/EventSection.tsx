"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  Ticket, 
  Sparkles, 
  Trophy,
  Code
} from "lucide-react";

type EventItem = {
  id: string;
  category: "hackathon" | "masterclass" | "meetup";
  status: "Registration Open" | "Upcoming" | "Announcing Soon";
  statusColor: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  partner?: string;
  actionUrl: string;
  actionText: string;
};

const events: EventItem[] = [
  {
    id: "automate-india-2026",
    category: "hackathon",
    status: "Registration Open",
    statusColor: "badge-emerald",
    title: "Automate India NIET Chapter 2026",
    subtitle: "Supported by Microsoft Azure · GenAI & Blockchain",
    description: "Build working software, push commits to GitHub, and deploy production URLs in an intensive sprint with mentorship and prizes.",
    date: "22 August 2026",
    time: "10:00 AM – 6:00 PM",
    venue: "Auditorium, NIET Greater Noida",
    teamSize: "2–3 Members",
    partner: "Microsoft Azure",
    actionUrl: "/register",
    actionText: "Claim Virtual Pass",
  },
  {
    id: "synapse-syntax",
    category: "masterclass",
    status: "Upcoming",
    statusColor: "badge-sky",
    title: "Synapse & Syntax Masterclass",
    subtitle: "Production Next.js 15 & LLM Architectures",
    description: "Hands-on deep dive into modern TypeScript architectures, server components, and production GenAI agent APIs.",
    date: "September 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "Computer Center Lab 4",
    teamSize: "Individual / Open",
    partner: "CodersEra Core Team",
    actionUrl: "/register",
    actionText: "Reserve Seat",
  },
  {
    id: "campus-oss-sprint",
    category: "meetup",
    status: "Announcing Soon",
    statusColor: "badge-zinc",
    title: "Campus Open Source Sprint & Review",
    subtitle: "Git PRs, Code Reviews & Mentorship",
    description: "Join fellow student contributors for live pull request triage, architecture discussions, and open source mentorship.",
    date: "October 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "Innovation Hub, NIET",
    teamSize: "Open to All",
    partner: "GitHub Campus",
    actionUrl: "https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06",
    actionText: "Join WhatsApp Group",
  },
];

const categories = [
  { id: "all", label: "All Events" },
  { id: "hackathon", label: "Hackathons" },
  { id: "masterclass", label: "Masterclasses" },
  { id: "meetup", label: "Meetups" },
];

export default function EventSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredEvents = events.filter(
    (e) => activeCategory === "all" || e.category === activeCategory
  );

  return (
    <section id="events" className="relative border-t border-[#27272a] bg-[#09090b] px-4 py-20 sm:px-6 md:px-8 lg:py-28 editorial-grid">
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="badge-sky mb-4">Official Schedule</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2 leading-[1.1]">
              Campus Events & <span className="text-[#38bdf8]">Sprints</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-[#a1a1aa]">
              Participate in high-craft hackathons, workshops, and peer build sessions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#18181b] border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-black shadow-sm"
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Big Event Card (Automate India 2026) */}
        {filteredEvents.some((e) => e.id === "automate-india-2026") && (
          <div className="mb-12 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121215] via-[#16161c] to-[#0d1520] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#38bdf8]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="badge-emerald">
                    <Sparkles className="h-3 w-3" /> Registration Open
                  </span>
                  <span className="badge-sky">
                    Supported by Microsoft Azure
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Automate India <br />
                  <span className="text-[#38bdf8]">NIET Chapter 2026</span>
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-2xl">
                  Flagship GenAI & Blockchain hackathon by CodersEra. Form a team of 2–3 members, build real-world
                  solutions, compete for recognitions, and connect directly with industry leaders.
                </p>

                {/* Metadata Grid */}
                <div className="mt-8 grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#fafafa]">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a1a1aa]">Date</p>
                      <p className="font-semibold">22 August 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#fafafa]">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a1a1aa]">Time</p>
                      <p className="font-semibold">10:00 AM – 6:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#fafafa]">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a1a1aa]">Venue</p>
                      <p className="font-semibold">Auditorium, NIET</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#fafafa]">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a1a1aa]">Team Size</p>
                      <p className="font-semibold">2–3 Members</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    href="/register" 
                    className="btn-codersera-sky text-sm py-3 px-6"
                  >
                    <Ticket className="h-4 w-4" />
                    Get Your Virtual Pass
                  </Link>
                  <a 
                    href="https://chat.whatsapp.com/IZFWh2YhwNh1Hzl5GDci2F" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-codersera-secondary text-sm py-3 px-6"
                  >
                    Join NIET Chapter Group
                  </a>
                </div>
              </div>

              {/* Pass Visual Highlight */}
              <div className="rounded-2xl border border-white/10 bg-[#18181b]/80 p-6 flex flex-col justify-between h-full backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Trophy className="h-4 w-4 text-[#38bdf8]" />
                    <span>HACKATHON PRIZES</span>
                  </div>
                  <span className="text-xs text-[#34d399] font-mono font-bold">Azure Credits</span>
                </div>

                <div className="py-6 space-y-3">
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <p className="text-xs font-semibold text-white">GenAI Innovation Track</p>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">Build LLM powered tools, agent workflows & RAG applications.</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <p className="text-xs font-semibold text-white">Blockchain & Web3 Track</p>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">Smart contracts, decentralized verification & tokenized systems.</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#a1a1aa]">
                  <span>Mandatory Pass Required</span>
                  <span className="text-[#38bdf8] font-mono">1 Student = 1 Pass</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Events List Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.filter((e) => e.id !== "automate-india-2026").map((item) => (
            <div 
              key={item.id} 
              className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={item.statusColor}>{item.status}</span>
                  <span className="text-xs text-[#a1a1aa]">{item.partner}</span>
                </div>

                <h4 className="text-xl font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs font-semibold text-[#38bdf8] mt-1">{item.subtitle}</p>
                <p className="text-sm text-[#a1a1aa] mt-3 leading-relaxed">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#a1a1aa] border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.venue}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.time}</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link 
                  href={item.actionUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:text-[#7dd3fc]"
                >
                  {item.actionText}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
