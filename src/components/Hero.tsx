"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Ticket, 
  Search, 
  ShieldCheck, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Menu, 
  X,
  ExternalLink
} from "lucide-react";

const STORAGE_KEY = "niet-codersera-registrations";

type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  photoData?: string;
  ticketNumber: string;
  createdAt: string;
  verified: boolean;
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"issue" | "find" | "admin">("issue");
  const [passCount, setPassCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lookupEmail, setLookupEmail] = useState("");
  const [foundTicket, setFoundTicket] = useState<Registration | null>(null);
  const [lookupError, setLookupError] = useState("");

  useEffect(() => {
    try {
      const records = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setPassCount(records.length);
    } catch {
      setPassCount(0);
    }
  }, []);

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLookupError("");
    setFoundTicket(null);
    if (!lookupEmail.trim()) return;

    try {
      const records: Registration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const match = records.find((r) => r.email.toLowerCase() === lookupEmail.trim().toLowerCase());
      if (match) {
        setFoundTicket(match);
      } else {
        setLookupError("No ticket found with this email. Please register to generate your pass.");
      }
    } catch {
      setLookupError("Unable to search passes. Please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#09090b] editorial-grid min-h-screen">
      {/* Radial Gradient Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[550px] glow-blue blur-3xl opacity-80" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/5 blur-3xl rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        
        {/* Floating Glass Pill Navbar */}
        <header className="sticky top-5 z-50 flex items-center justify-between glass-pill rounded-full px-5 py-3 shadow-2xl transition-all duration-200">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 p-0.5 transition-transform group-hover:scale-105">
              <Image 
                src="/codersera-logo-original.jpg" 
                alt="CodersEra Logo" 
                width={36} 
                height={36} 
                className="h-full w-full rounded-full object-cover" 
                priority 
              />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">CodersEra</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#18181b]/80 rounded-full px-2 py-1 border border-white/10 backdrop-blur-md">
            <Link 
              href="/" 
              className="relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 text-white"
            >
              <div className="absolute inset-0 bg-[#09090b] rounded-full border border-white/15 shadow-sm" />
              <span className="relative z-10">Home</span>
            </Link>
            <Link 
              href="#about" 
              className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 text-[#a1a1aa] hover:text-white"
            >
              About
            </Link>
            <Link 
              href="#events" 
              className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 text-[#a1a1aa] hover:text-white"
            >
              Events
            </Link>
            <Link 
              href="/register" 
              className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 text-[#38bdf8] hover:text-[#7dd3fc]"
            >
              Virtual Pass
            </Link>
            <Link 
              href="#community" 
              className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 text-[#a1a1aa] hover:text-white"
            >
              Community
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-[#a1a1aa] transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#38bdf8]" />
              Admin Desk
            </Link>
            <a 
              href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-codersera-sky text-xs py-2 px-4 shadow-sm"
            >
              Join Community
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full p-2 text-[#a1a1aa] hover:bg-white/10 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-[#121215]/95 p-5 backdrop-blur-2xl shadow-2xl animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold bg-white/5 text-white"
              >
                Home
              </Link>
              <Link 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#a1a1aa] hover:bg-white/5 hover:text-white"
              >
                About Us
              </Link>
              <Link 
                href="#events" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#a1a1aa] hover:bg-white/5 hover:text-white"
              >
                Upcoming Events
              </Link>
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#38bdf8] bg-[#38bdf8]/10"
              >
                Get Virtual Pass
              </Link>
              <Link 
                href="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#a1a1aa] hover:bg-white/5 hover:text-white"
              >
                <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                Admin Gate Verification
              </Link>
              <a 
                href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-codersera-sky mt-2 w-full text-center justify-center text-sm py-2.5"
              >
                Join WhatsApp Global
              </a>
            </nav>
          </div>
        )}

        {/* Hero Section Banner & Headline */}
        <div className="mt-14 sm:mt-20 text-center max-w-4xl mx-auto">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] shadow-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#38bdf8] animate-pulse" />
            <span>Supported by Azure • 22nd August 2026</span>
          </div>

          {/* Main Title Matching Official Website */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            The Home for <br className="hidden sm:inline" />
            <span className="text-[#38bdf8]">Ambitious Developers</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#a1a1aa] leading-relaxed mb-8">
            Official Virtual Pass & Identification Portal for <strong className="text-white">CodersEra NIET Chapter</strong>. 
            Generate your secure QR ticket, access hackathon sprint tracks, and experience high-craft developer events.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#a1a1aa] mb-12">
            <span className="flex items-center gap-1.5 badge-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> Verified Student Pass
            </span>
            <span className="flex items-center gap-1.5 badge-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> Instant QR Check-in
            </span>
            <span className="flex items-center gap-1.5 badge-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> 100% Free Entry
            </span>
            <span className="flex items-center gap-1.5 badge-sky">
              <Ticket className="h-3.5 w-3.5" /> {passCount} Passes Issued
            </span>
          </div>
        </div>

        {/* Interactive Virtual Pass Portal Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-[#121215]/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-6 py-4 gap-3 bg-[#18181b]/50">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setActiveTab("issue"); setFoundTicket(null); setLookupError(""); }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === "issue" 
                      ? "bg-white text-black shadow-md" 
                      : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Ticket className="h-4 w-4" />
                  Issue New Pass
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab("find"); setFoundTicket(null); setLookupError(""); }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === "find" 
                      ? "bg-white text-black shadow-md" 
                      : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Search className="h-4 w-4" />
                  Find My Pass
                </button>
              </div>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#a1a1aa] hover:bg-white/10 hover:text-white transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-[#34d399]" />
                Admin Gate Verification Desk
              </Link>
            </div>

            {/* Tab Body */}
            <div className="p-6 sm:p-10">
              {activeTab === "issue" && (
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                  <div>
                    <span className="badge-sky mb-3">
                      Automate India NIET Chapter 2026
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                      Generate Your Verified Event Pass
                    </h2>
                    <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed">
                      Register your student credentials once to obtain an authenticated virtual pass with encrypted QR check-in 
                      for the upcoming GenAI & Blockchain hackathon.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link 
                        href="/register" 
                        className="btn-codersera-sky text-sm"
                      >
                        Claim My Virtual Pass
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link 
                        href="#events" 
                        className="btn-codersera-secondary text-sm"
                      >
                        View Full Schedule
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#18181b]/60 p-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#a1a1aa]">Next Big Event</p>
                        <p className="text-sm font-bold text-white mt-0.5">Automate India 2026</p>
                      </div>
                      <span className="badge-emerald text-[11px]">Open</span>
                    </div>

                    <div className="mt-4 space-y-2.5 text-xs text-[#a1a1aa]">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#38bdf8]" />
                        <span>Saturday, 22nd August 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#38bdf8]" />
                        <span>Team Size: 2–3 Members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-[#38bdf8]" />
                        <span>Venue: NIET Campus Auditorium</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "find" && (
                <div className="max-w-xl">
                  <span className="badge-zinc mb-3">Pass Lookup</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                    Retrieve Existing Pass
                  </h2>
                  <p className="mt-2 text-sm text-[#a1a1aa]">
                    Enter the email you used during registration to view or re-download your official pass.
                  </p>

                  <form onSubmit={handleLookup} className="mt-6 flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="input-codersera flex-1"
                    />
                    <button type="submit" className="btn-codersera-primary sm:w-auto">
                      <Search className="h-4 w-4" />
                      Find Pass
                    </button>
                  </form>

                  {lookupError && (
                    <div className="mt-4 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                      {lookupError}
                    </div>
                  )}

                  {foundTicket && (
                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#18181b]/90 p-5 animate-scale-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#a1a1aa]">Ticket Found</p>
                          <h4 className="text-base font-bold text-white mt-0.5">{foundTicket.name}</h4>
                          <p className="font-mono text-xs text-[#38bdf8] mt-1">{foundTicket.ticketNumber}</p>
                        </div>
                        <Link 
                          href="/register" 
                          className="btn-codersera-sky text-xs py-2 px-3"
                        >
                          Open Pass Details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
