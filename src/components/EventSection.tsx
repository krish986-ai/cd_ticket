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
  Award
} from "lucide-react";

type EventItem = {
  id: string;
  category: "hackathon" | "masterclass" | "meetup";
  status: "Registration Open" | "Upcoming" | "Announcing Soon";
  badgeClass: string;
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
    badgeClass: "badge-pill-emerald",
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
    badgeClass: "badge-pill-sky",
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
    badgeClass: "badge-pill-zinc",
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
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge-pill-sky mb-3">Official Schedule</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-1 leading-[1.1]">
              Campus Events & <span className="text-[#38bdf8]">Sprints</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-[#a1a1aa]">
              Participate in high-craft hackathons, workshops, and peer build sessions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#18181b] border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
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

        {/* Featured Main Event Card */}
        {filteredEvents.some((e) => e.id === "automate-india-2026") && (
          <div className="mb-10 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121215] via-[#16161c] to-[#0d1520] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="badge-pill-emerald">
                    <Sparkles className="h-3 w-3" /> Registration Open
                  </span>
                  <span className="badge-pill-sky">
                    Supported by Microsoft Azure
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Automate India <br />
                  <span className="text-[#38bdf8]">NIET Chapter 2026</span>
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
                  Flagship GenAI & Blockchain hackathon by CodersEra. Form a team of 2–3 members, build real-world
                  solutions, compete for Azure credits, and connect directly with mentors.
                </p>

                {/* Metadata Grid */}
                <div className="mt-6 grid sm:grid-cols-2 gap-3 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-2.5 text-xs text-[#fafafa]">
                    <Calendar className="h-4 w-4 text-[#38bdf8]" />
                    <span>22 August 2026 • 10:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#fafafa]">
                    <MapPin className="h-4 w-4 text-[#38bdf8]" />
                    <span>Auditorium, NIET Greater Noida</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#fafafa]">
                    <Users className="h-4 w-4 text-[#38bdf8]" />
                    <span>Team Size: 2–3 Members</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#fafafa]">
                    <Trophy className="h-4 w-4 text-[#34d399]" />
                    <span>Prizes & Azure Recognition</span>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/register" className="btn-sky-glow text-xs sm:text-sm py-2.5 px-5">
                    <Ticket className="h-4 w-4" />
                    Get Your Virtual Pass
                  </Link>
                  <a 
                    href="https://chat.whatsapp.com/IZFWh2YhwNh1Hzl5GDci2F" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-dark-pill text-xs sm:text-sm py-2.5 px-5"
                  >
                    Join NIET Chapter
                  </a>
                </div>
              </div>

              {/* Tracks Info */}
              <div className="rounded-2xl border border-white/10 bg-[#18181b]/80 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-[#38bdf8]" />
                  Hackathon Tracks
                </p>

                <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                  <p className="text-xs font-semibold text-white">Track 01: GenAI & LLM Innovation</p>
                  <p className="text-[11px] text-[#a1a1aa] mt-0.5">Build agentic workflows, chatbots, and AI productivity tools.</p>
                </div>

                <div className="rounded-xl bg-white/5 p-3 border border-white/5">
                  <p className="text-xs font-semibold text-white">Track 02: Blockchain & Smart Contracts</p>
                  <p className="text-[11px] text-[#a1a1aa] mt-0.5">Decentralized protocols, verifiable compute & security.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredEvents.filter((e) => e.id !== "automate-india-2026").map((item) => (
            <div 
              key={item.id} 
              className="codersera-card p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={item.badgeClass}>{item.status}</span>
                  <span className="text-[11px] text-[#a1a1aa]">{item.partner}</span>
                </div>

                <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs font-semibold text-[#38bdf8] mt-0.5">{item.subtitle}</p>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2.5 leading-relaxed">{item.description}</p>

                <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#a1a1aa] border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.venue}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#38bdf8]" /> {item.time}</span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
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
