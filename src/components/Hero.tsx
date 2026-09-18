"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Ticket, 
  ShieldCheck, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Menu, 
  X,
  ExternalLink,
  MapPin,
  QrCode,
  Lock
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const STORAGE_KEY = "niet-codersera-registrations";

export default function Hero() {
  const [passCount, setPassCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const records = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setPassCount(records.length);
    } catch {
      setPassCount(0);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#09090b] editorial-grid min-h-screen">
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] hero-glow" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 flex flex-col items-center">
        
        {/* Floating Glass Pill Navbar */}
        <header className="w-full max-w-5xl sticky top-5 z-50 flex items-center justify-between nav-pill-container rounded-full px-5 py-3 transition-all duration-200">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
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
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">CodersEra</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#18181b]/90 rounded-full px-3 py-1 border border-white/10">
            <Link href="/" className="nav-link nav-link-active">Home</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#events" className="nav-link">Events</Link>
            <Link href="/register" className="nav-link text-[#38bdf8] font-semibold">Virtual Pass</Link>
            <Link href="#community" className="nav-link">Community</Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-[#a1a1aa] hover:bg-white/10 hover:text-white transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#38bdf8]" />
              Admin Desk
            </Link>
            <a 
              href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-sky-glow text-xs py-2 px-4 shadow-sm"
            >
              Join Community
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full p-2 text-[#a1a1aa] hover:bg-white/10 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="w-full max-w-5xl md:hidden mt-3 rounded-2xl border border-white/10 bg-[#121215]/95 p-5 backdrop-blur-2xl shadow-2xl z-50">
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 font-semibold bg-white/5 text-white">Home</Link>
              <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 text-[#a1a1aa] hover:text-white">About Us</Link>
              <Link href="#events" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 text-[#a1a1aa] hover:text-white">Upcoming Events</Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-2.5 text-[#38bdf8] font-bold bg-[#38bdf8]/10">Virtual Pass Portal</Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[#a1a1aa] hover:text-white">
                <ShieldCheck className="h-4 w-4 text-[#38bdf8]" /> Admin Gate Desk
              </Link>
              <a href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" target="_blank" rel="noopener noreferrer" className="btn-sky-glow mt-2 w-full text-center justify-center text-xs py-2.5">
                Join WhatsApp Global
              </a>
            </nav>
          </div>
        )}

        {/* Hero Headline Section */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center mt-12 sm:mt-16 mb-12">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#38bdf8] animate-pulse" />
            <span>Supported by Azure • 22nd August 2026</span>
          </div>

          {/* Main Title Matching Official Website */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            The Home for <br className="hidden sm:inline" />
            <span className="text-[#38bdf8]">Ambitious Developers</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#a1a1aa] leading-relaxed mb-8">
            Official Virtual Pass & Identification Portal for <strong className="text-white">CodersEra NIET Chapter</strong>. 
            Generate your secure QR ticket, access hackathon sprint tracks, and experience high-craft developer events.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <Link href="/register" className="btn-sky-glow text-sm py-3 px-6 shadow-lg">
              <Ticket className="h-4 w-4" />
              Claim Virtual Pass
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#events" className="btn-dark-pill text-sm py-3 px-6">
              View Schedule
            </Link>
            <Link href="/admin" className="btn-dark-pill text-sm py-3 px-5 text-[#a1a1aa] hover:text-white">
              <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
              Admin Verification Desk
            </Link>
          </div>

          {/* Centered Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-[#a1a1aa]">
            <span className="badge-pill-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> Verified Student Pass
            </span>
            <span className="badge-pill-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> Instant QR Gate Check-in
            </span>
            <span className="badge-pill-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> 100% Free Entry
            </span>
            <span className="badge-pill-sky">
              <Ticket className="h-3.5 w-3.5" /> {passCount} Passes Issued
            </span>
          </div>
        </div>

        {/* Big Interactive Hackathon Card & Live Ticket Preview */}
        <div className="w-full max-w-5xl codersera-card p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 items-center">
            
            {/* Left Event Details */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="badge-pill-emerald">
                  <Sparkles className="h-3 w-3" /> Registration Open
                </span>
                <span className="badge-pill-sky">
                  NIET Chapter Greater Noida
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Automate India <br />
                  <span className="text-[#38bdf8]">NIET Chapter 2026</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                  Join student builders, software engineers, and mentors in an intensive GenAI & Blockchain hackathon.
                  Push commits to GitHub, deploy live projects, and compete for exciting prizes.
                </p>
              </div>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#fafafa]">
                <div className="flex items-center gap-2.5 rounded-xl bg-white/5 p-3 border border-white/5">
                  <Calendar className="h-4 w-4 text-[#38bdf8] shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#a1a1aa]">Date</p>
                    <p className="font-semibold">22 August 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl bg-white/5 p-3 border border-white/5">
                  <Users className="h-4 w-4 text-[#38bdf8] shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#a1a1aa]">Team Size</p>
                    <p className="font-semibold">2–3 Members</p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-2.5 rounded-xl bg-white/5 p-3 border border-white/5">
                  <MapPin className="h-4 w-4 text-[#38bdf8] shrink-0" />
                  <div>
                    <p className="text-[10px] text-[#a1a1aa]">Venue</p>
                    <p className="font-semibold">Auditorium, NIET Campus, Greater Noida</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link href="/register" className="btn-sky-glow text-xs sm:text-sm py-3 px-6">
                  <Ticket className="h-4 w-4" />
                  Generate Your Event Pass
                </Link>
                <Link href="/register" className="btn-dark-pill text-xs sm:text-sm py-3 px-5">
                  Find Existing Pass
                </Link>
              </div>
            </div>

            {/* Right Side: Virtual Pass Sample Preview */}
            <div className="ticket-card p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 p-0.5">
                      <Image 
                        src="/codersera-logo-original.jpg" 
                        alt="CodersEra" 
                        width={32} 
                        height={32} 
                        className="h-full w-full rounded-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">CodersEra</p>
                      <p className="text-[10px] text-[#38bdf8] font-mono mt-0.5">VIRTUAL PASS</p>
                    </div>
                  </div>
                  <span className="badge-pill-emerald text-[10px] py-0.5 px-2">
                    <ShieldCheck className="h-3 w-3" /> VERIFIED
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#a1a1aa]">ATTENDEE</p>
                    <p className="text-sm font-bold text-white">Student Developer</p>
                    <p className="text-xs text-[#a1a1aa]">Automate India Hackathon 2026</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
                    <div>
                      <p className="text-[10px] text-[#a1a1aa]">BRANCH</p>
                      <p className="font-semibold text-white">CSE / AI & ML</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#a1a1aa]">STATUS</p>
                      <p className="font-semibold text-[#34d399]">Check-in Ready</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Center */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col items-center text-center">
                <div className="rounded-xl bg-white p-2 shadow-md">
                  <QRCodeSVG 
                    value="https://cdticket-bbimm4c00-k54165264-5130s-projects.vercel.app/register"
                    size={110}
                    level="M"
                  />
                </div>
                <p className="font-mono text-xs font-bold text-[#38bdf8] mt-2.5">
                  NIET-2026-PREVIEW
                </p>
                <p className="text-[10px] text-[#a1a1aa] mt-0.5 flex items-center gap-1">
                  <QrCode className="h-3 w-3" /> Scan at check-in desk
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
