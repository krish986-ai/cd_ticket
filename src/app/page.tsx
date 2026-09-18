"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Ticket, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Printer, 
  User, 
  Mail, 
  Phone, 
  Hash, 
  BookOpen, 
  Users, 
  Layers, 
  Calendar, 
  Lock, 
  CheckCircle2, 
  QrCode, 
  RefreshCw, 
  Download, 
  Share2, 
  Bell, 
  Menu, 
  X, 
  Award,
  Building,
  Check,
  ExternalLink
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

type PassRegistration = {
  id: string;
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
  college: string;
  degreeBranch: string;
  teamName: string;
  teamRole: string;
  problemStatementId: string;
  yearOfStudy: string;
  domain: string;
  photoData?: string;
  ticketNumber: string;
  createdAt: string;
  verified: boolean;
};

const STORAGE_KEY = "niet-codersera-sih-registrations";

export default function CodersEraPassPortal() {
  const [activeTab, setActiveTab] = useState<"issue" | "find">("issue");
  const [passData, setPassData] = useState<PassRegistration | null>(null);
  const [photo, setPhoto] = useState<string>();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [passCount, setPassCount] = useState(0);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupError, setLookupError] = useState("");

  const passCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const records: PassRegistration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setPassCount(records.length);

      const savedEmail = window.sessionStorage.getItem("codersera-pass-email");
      if (savedEmail) {
        const found = records.find((r) => r.email.toLowerCase() === savedEmail.toLowerCase());
        if (found) {
          setPassData(found);
        }
      }
    } catch {
      setPassCount(0);
    }
  }, []);

  function handlePhotoUpload(file?: File) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, or WEBP).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Student photo must be under 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function handleIssuePass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

      // Anti-spam security challenge verification (Answer: 133)
      if (data.securityCode?.trim() !== "133") {
        setError("Security code is incorrect. Please enter the official NIET code: 133.");
        setIsSubmitting(false);
        return;
      }

      const records: PassRegistration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");

      // Check duplicate
      const existing = records.find(
        (r) => r.email.toLowerCase() === data.email.trim().toLowerCase() ||
               r.rollNumber.toLowerCase() === data.rollNumber.trim().toLowerCase()
      );

      if (existing) {
        setPassData(existing);
        setNotice("An active pass was found for your Roll Number / Email. Displaying your pass below.");
        setIsSubmitting(false);
        return;
      }

      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const ticketNumber = `NIET-SIH-${new Date().getFullYear()}-${randomSuffix}`;

      const newPass: PassRegistration = {
        id: crypto.randomUUID ? crypto.randomUUID() : `pass-${Date.now()}`,
        fullName: data.fullName.trim(),
        rollNumber: data.rollNumber.trim().toUpperCase(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        college: "Noida Institute of Engineering & Technology (NIET)",
        degreeBranch: data.degreeBranch.trim(),
        teamName: data.teamName.trim(),
        teamRole: data.teamRole,
        problemStatementId: data.problemStatementId.trim().toUpperCase(),
        yearOfStudy: data.yearOfStudy,
        domain: data.domain,
        photoData: photo,
        ticketNumber,
        createdAt: new Date().toISOString(),
        verified: true,
      };

      const updated = [newPass, ...records];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.sessionStorage.setItem("codersera-pass-email", data.email.trim());

      setPassData(newPass);
      setPassCount(updated.length);
      setNotice("🎉 Congratulations! Your verified SIH Virtual Pass has been generated.");
    } catch {
      setError("An error occurred while generating your pass. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePassLookup(e: FormEvent) {
    e.preventDefault();
    setLookupError("");
    const query = lookupQuery.trim().toLowerCase();
    if (!query) return;

    try {
      const records: PassRegistration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const match = records.find(
        (r) => r.email.toLowerCase() === query ||
               r.rollNumber.toLowerCase() === query ||
               r.ticketNumber.toLowerCase() === query ||
               r.phone.toLowerCase() === query
      );

      if (match) {
        setPassData(match);
        setNotice("Ticket retrieved successfully!");
      } else {
        setLookupError("No ticket found with this Email, AKTU Roll ID or Ticket number. Please issue a new pass.");
      }
    } catch {
      setLookupError("Unable to search ticket database. Please try again.");
    }
  }

  function handlePrintPass() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased flex flex-col font-sans selection:bg-[#38bdf8]/20">
      
      {/* Fixed Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#38bdf8]/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-2/3 left-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Official Fixed Floating Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl rounded-full transition-all duration-300 border bg-[#09090b]/75 border-[#27272a]/80 backdrop-blur-md py-3.5 px-6 shadow-2xl">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#27272a] p-0.5 group-hover:scale-105 transition-transform">
              <Image 
                src="/codersera-logo-original.jpg" 
                alt="CodersEra Logo" 
                width={36} 
                height={36} 
                className="h-full w-full rounded-full object-cover" 
                priority 
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">CodersEra</span>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] font-bold hidden sm:inline-block">
                Virtual Pass Portal
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#18181b]/80 rounded-full px-2 py-1 border border-[#27272a] backdrop-blur-md">
            <a href="https://www.codersera.in/" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all text-[#a1a1aa] hover:text-white">
              Home
            </a>
            <Link href="/" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all bg-[#09090b] text-[#38bdf8] shadow-xs font-bold border border-[#38bdf8]/30">
              Virtual Pass
            </Link>
            <a href="https://www.codersera.in/about" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all text-[#a1a1aa] hover:text-white">
              About
            </a>
            <a href="https://www.codersera.in/events" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all text-[#a1a1aa] hover:text-white">
              Events
            </a>
            <a href="https://www.codersera.in/team" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all text-[#a1a1aa] hover:text-white">
              Team
            </a>
            <a href="https://www.codersera.in/community" className="relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all text-[#a1a1aa] hover:text-white">
              Community
            </a>
          </nav>

          {/* Right Action Icons & Admin Gate */}
          <div className="flex items-center gap-2.5">
            <div className="relative hidden sm:block">
              <button 
                type="button" 
                className="p-2 rounded-full bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-white transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#38bdf8] rounded-full animate-pulse" />
              </button>
            </div>

            <Link 
              href="/admin" 
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#38bdf8] text-black text-xs font-extrabold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm shadow-[#38bdf8]/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Gate</span>
            </Link>

            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#18181b] border border-[#27272a] text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#27272a] flex flex-col gap-2 animate-fade-in">
            <a href="https://www.codersera.in/" className="px-3 py-2 rounded-xl text-xs text-[#a1a1aa] hover:text-white">Home</a>
            <Link href="/" className="px-3 py-2 rounded-xl text-xs font-bold text-[#38bdf8] bg-[#38bdf8]/10">Virtual Pass Portal</Link>
            <a href="https://www.codersera.in/events" className="px-3 py-2 rounded-xl text-xs text-[#a1a1aa] hover:text-white">Events</a>
            <a href="https://www.codersera.in/community" className="px-3 py-2 rounded-xl text-xs text-[#a1a1aa] hover:text-white">Community</a>
            <Link href="/admin" className="px-3 py-2 rounded-xl text-xs text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" /> Admin Gate Verification Desk
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-20 pt-24 sm:pt-28 pb-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Card Container with Top Cyan Gradient Line */}
          <div className="relative w-full bg-[#121215] border border-[#27272a] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-md">
            
            {/* Top Cyan Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />

            {/* Sub-Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-8 py-5 sm:py-6 border-b border-[#27272a] bg-[#18181b]/50">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <Image 
                  src="/codersera-logo-original.jpg" 
                  alt="CodersEra Logo" 
                  width={44} 
                  height={44} 
                  className="h-10 w-10 sm:h-11 sm:w-11 object-contain rounded-full border border-[#27272a] shadow-sm shrink-0" 
                />
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-white">
                      CodersEra Virtual Pass Portal
                    </h1>
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/25 text-[#38bdf8] font-bold tracking-wider">
                      NIET CHAPTER
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">
                    Official Identification Pass for Seminar Hall & Hackathons
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#a1a1aa] self-start sm:self-center">
                <span>Active Passes:</span>
                <span className="font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/20">
                  {passCount} Issued
                </span>
              </div>
            </div>

            {/* Action Switcher Bar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#27272a] bg-[#09090b]/60 overflow-x-auto gap-2">
              <div className="flex items-center gap-2.5 min-w-max">
                <button
                  type="button"
                  onClick={() => { setActiveTab("issue"); setError(""); setLookupError(""); }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "issue" && !passData
                      ? "bg-[#38bdf8] text-black shadow-md shadow-[#38bdf8]/25 font-extrabold"
                      : "bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]"
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>Issue New Pass</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab("find"); setError(""); setLookupError(""); }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "find" && !passData
                      ? "bg-[#38bdf8] text-black shadow-md shadow-[#38bdf8]/25 font-extrabold"
                      : "bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Find My Pass</span>
                </button>

                <Link
                  href="/admin"
                  className="px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer bg-[#18181b] text-[#a1a1aa] hover:text-white border border-[#27272a]"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Gate Verification Desk</span>
                </Link>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-4 sm:p-7 md:p-8 space-y-6">

              {/* Status Notice */}
              {notice && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{notice}</span>
                  </div>
                  <button onClick={() => setNotice("")} className="text-[#a1a1aa] hover:text-white text-xs">✕</button>
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW 1: ACTIVE PASS / RESULT VIEW                        */}
              {/* ======================================================== */}
              {passData ? (
                <div className="space-y-6">
                  
                  {/* Top Bar Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="badge-pill-emerald text-xs">
                        <Check className="h-3.5 w-3.5" /> Authenticated Entry Pass
                      </span>
                      <span className="font-mono text-xs text-[#38bdf8] font-bold">
                        {passData.ticketNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrintPass}
                        className="btn-dark-pill text-xs py-2 px-3.5 flex items-center gap-1.5"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Print Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPassData(null);
                          setPhoto(undefined);
                          window.sessionStorage.removeItem("codersera-pass-email");
                        }}
                        className="btn-sky-glow text-xs py-2 px-3.5 flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Issue Another Pass
                      </button>
                    </div>
                  </div>

                  {/* Holographic Virtual Pass Card */}
                  <div ref={passCardRef} className="ticket-card p-6 sm:p-9 relative overflow-hidden backdrop-blur-2xl">
                    
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 p-0.5 shadow-md">
                          <Image 
                            src="/codersera-logo-original.jpg" 
                            alt="CodersEra" 
                            width={48} 
                            height={48} 
                            className="h-full w-full rounded-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-extrabold text-white tracking-tight">CodersEra</h2>
                            <span className="badge-pill-sky text-[9px] py-0.5 px-2">SIH & NIET CHAPTER 2026</span>
                          </div>
                          <p className="text-xs text-[#a1a1aa] mt-0.5">Official Student Identification Gate Pass</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="badge-pill-emerald text-[11px] font-bold">
                          <ShieldCheck className="h-3.5 w-3.5" /> GATE VERIFIED
                        </span>
                        <p className="font-mono text-xs font-bold text-[#38bdf8] mt-1">{passData.ticketNumber}</p>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">ATTENDEE NAME</p>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{passData.fullName}</h3>
                          <p className="text-xs text-[#a1a1aa] mt-0.5">{passData.email} · {passData.phone}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/10 pt-3 text-left text-xs">
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">ROLL NUMBER</p>
                            <p className="font-mono font-bold text-white mt-0.5">{passData.rollNumber}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">BRANCH</p>
                            <p className="font-semibold text-white mt-0.5">{passData.degreeBranch}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">YEAR</p>
                            <p className="font-semibold text-white mt-0.5">{passData.yearOfStudy}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">SIH TEAM</p>
                            <p className="font-semibold text-[#38bdf8] mt-0.5">{passData.teamName} ({passData.teamRole})</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">PROBLEM ID</p>
                            <p className="font-mono font-bold text-white mt-0.5">{passData.problemStatementId}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-[#a1a1aa]">DOMAIN</p>
                            <p className="font-semibold text-[#34d399] mt-0.5 truncate">{passData.domain}</p>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-xs text-[#a1a1aa] space-y-1">
                          <div className="flex items-center gap-2 text-white">
                            <Building className="h-3.5 w-3.5 text-[#38bdf8]" />
                            <span>{passData.college}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                            <span>Seminar Hall & Innovation Center • Check-in Gate</span>
                          </div>
                        </div>
                      </div>

                      {/* QR Code & Avatar */}
                      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#09090b]/90 p-5 text-center">
                        {passData.photoData ? (
                          <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#38bdf8] shadow-md">
                            <img src={passData.photoData} alt={passData.fullName} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                            <User className="h-7 w-7" />
                          </div>
                        )}

                        <div className="rounded-xl bg-white p-2.5 shadow-inner">
                          <QRCodeSVG 
                            value={JSON.stringify({
                              ticket: passData.ticketNumber,
                              name: passData.fullName,
                              roll: passData.rollNumber,
                              team: passData.teamName,
                              role: passData.teamRole,
                              college: "NIET",
                            })}
                            size={120}
                            level="H"
                          />
                        </div>

                        <p className="font-mono text-xs font-bold text-[#38bdf8] mt-2.5 tracking-wider">
                          {passData.ticketNumber}
                        </p>
                        <p className="text-[10px] text-[#a1a1aa] mt-0.5 flex items-center gap-1">
                          <QrCode className="h-3 w-3" /> Gate Scan Code
                        </p>
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="mt-8 border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#71717a] gap-2">
                      <span>Organized by CodersEra & Hack Briven • Supported by Microsoft Azure</span>
                      <span>Keep this pass handy on your mobile during arrival</span>
                    </div>

                  </div>
                </div>
              ) : activeTab === "issue" ? (
                
                /* ======================================================== */
                /* VIEW 2: FULL SIH & NIET PASS REGISTRATION FORM           */
                /* ======================================================== */
                <div className="space-y-6">
                  
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#18181b]/70 border border-[#27272a]">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                      NIET Student Verification Portal
                    </h2>
                    <p className="text-xs text-[#a1a1aa] mt-1 leading-relaxed">
                      Enter your enrolled NIET details below. Passes are issued with collision-free verification and cryptographic QR tokens.
                    </p>
                  </div>

                  <div className="w-full">
                    <div className="max-w-3xl mx-auto rounded-2xl p-4 sm:p-7 md:p-8 bg-[#121215] border border-[#27272a] shadow-xl">
                      
                      <div className="border-b border-[#27272a] pb-4 mb-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                              <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                              College Student Verification Gate
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                              Automate India & SIH Pass Registration
                            </h2>
                          </div>
                          <div className="h-10 w-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center shrink-0 text-[#38bdf8]">
                            <Lock className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleIssuePass} className="space-y-4 sm:space-y-5">
                        
                        {/* Name & Roll Number */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Full Name <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <User className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                name="fullName"
                                placeholder="e.g. Aarav Sharma"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              College / AKTU Roll Number <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Hash className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                name="rollNumber"
                                placeholder="e.g. 2201330100012"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-mono outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Official College Email (@niet.co.in) <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Mail className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                type="email"
                                name="email"
                                placeholder="student.cse22@niet.co.in"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-mono outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              WhatsApp / Phone Number <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Phone className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                name="phone"
                                pattern="[0-9]{10}"
                                placeholder="10-digit number"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Host Institution & Branch */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase flex items-center justify-between">
                              <span>Host Institution</span>
                              <span className="text-[10px] text-[#38bdf8] font-bold">LOCKED TO NIET</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#38bdf8]">
                                <Lock className="h-4 w-4" />
                              </div>
                              <input 
                                readOnly
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono cursor-not-allowed outline-none"
                                name="college"
                                value="Noida Institute of Engineering & Technology (NIET)"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Degree & Branch <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                name="degreeBranch"
                                placeholder="e.g. B.Tech CSE (Core / AIML / Cyber)"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Team Name, Role, Problem ID */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              SIH Team Name <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Users className="h-4 w-4" />
                              </div>
                              <input 
                                required
                                name="teamName"
                                placeholder="e.g. CodeCrafters"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Team Role <span className="text-rose-400">*</span>
                            </label>
                            <select 
                              name="teamRole"
                              required
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white font-sans outline-none transition-all cursor-pointer"
                            >
                              <option value="Team Leader">Team Leader</option>
                              <option value="Team Member">Team Member</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Problem Statement ID <span className="text-rose-400">*</span>
                            </label>
                            <input 
                              required
                              name="problemStatementId"
                              placeholder="e.g. SIH-1520"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white placeholder-slate-500 font-mono outline-none transition-all"
                            />
                          </div>
                        </div>

                        {/* Year & Domain */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              Year of Study <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Calendar className="h-4 w-4" />
                              </div>
                              <select 
                                name="yearOfStudy"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white font-sans outline-none transition-all cursor-pointer"
                              >
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                              SIH 2026 Theme <span className="text-rose-400">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                <Layers className="h-4 w-4" />
                              </div>
                              <select 
                                name="domain"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] text-sm text-white font-sans outline-none transition-all cursor-pointer"
                              >
                                <option value="Smart Automation & Robotics">Smart Automation & Robotics</option>
                                <option value="AI & Machine Learning">AI & Machine Learning</option>
                                <option value="Clean & Green Technology">Clean & Green Technology</option>
                                <option value="HealthTech & MedTech">HealthTech & MedTech</option>
                                <option value="Cybersecurity & Blockchain">Cybersecurity & Blockchain</option>
                                <option value="Disaster Management">Disaster Management</option>
                                <option value="Smart Education">Smart Education</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Student Photo Upload (Optional) */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
                          {photo ? (
                            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#38bdf8] shrink-0">
                              <img src={photo} alt="Student Avatar" className="h-full w-full object-cover" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#38bdf8] shrink-0">
                              <User className="h-5 w-5" />
                            </div>
                          )}

                          <div className="flex-1 text-xs">
                            <label className="cursor-pointer font-semibold text-[#38bdf8] hover:underline">
                              <span>{photo ? "Change Student Photo" : "Upload Student Avatar (Optional)"}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handlePhotoUpload(e.target.files?.[0])}
                                className="sr-only" 
                              />
                            </label>
                            <p className="text-slate-400 text-[10px]">JPG or PNG · Appears on holographic pass</p>
                          </div>

                          {photo && (
                            <button type="button" onClick={() => setPhoto(undefined)} className="text-xs text-rose-400 hover:text-rose-300">
                              Remove
                            </button>
                          )}
                        </div>

                        {/* Security Challenge Anti-Spam */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-mono text-slate-300 uppercase flex items-center gap-1.5">
                              <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                              Campus Human Security Challenge
                            </label>
                            <span className="text-[10px] font-mono text-slate-400">Anti-Spam Filter</span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Enter the official AKTU institute code for NIET Greater Noida (Answer: <code className="text-[#38bdf8] font-bold">133</code>):
                          </p>
                          <input 
                            required
                            name="securityCode"
                            placeholder="Enter 133"
                            className="w-36 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-[#38bdf8] text-xs font-mono text-white outline-none"
                          />
                        </div>

                        {error && (
                          <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
                            {error}
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full group relative flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-mono font-bold text-sm tracking-wider shadow-lg shadow-violet-900/40 hover:shadow-cyan-900/50 transition-all duration-300 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                        >
                          <span>{isSubmitting ? "GENERATING ENCRYPTED PASS..." : "GENERATE VERIFIED SIH PASS"}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                
                /* ======================================================== */
                /* VIEW 3: FIND / LOOKUP PASS TAB                           */
                /* ======================================================== */
                <div className="max-w-xl mx-auto py-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#18181b]/70 border border-[#27272a] mb-6">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#38bdf8]" />
                      Retrieve Existing Virtual Pass
                    </h2>
                    <p className="text-xs text-[#a1a1aa] mt-1">
                      Enter your AKTU Roll Number, College Email, or Pass Number to immediately display your pass.
                    </p>
                  </div>

                  <form onSubmit={handlePassLookup} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                        Registered Email, Roll Number, or Ticket ID
                      </label>
                      <input 
                        required
                        value={lookupQuery}
                        onChange={(e) => setLookupQuery(e.target.value)}
                        placeholder="e.g. 2201330100012 or student.cse22@niet.co.in"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#38bdf8] text-sm text-white font-mono outline-none"
                      />
                    </div>

                    {lookupError && (
                      <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
                        {lookupError}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-sky-glow w-full py-3 text-xs font-bold"
                    >
                      <Search className="h-4 w-4" />
                      Find & Retrieve Pass
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Official Footer matching codersera.netlify.app */}
      <footer className="relative z-10 bg-[#09090b] pt-16 pb-10 border-t border-[#27272a] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-12">
            
            {/* Brand column */}
            <div className="md:col-span-4 lg:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-5 group inline-flex">
                <Image 
                  src="/codersera-logo-original.jpg" 
                  alt="CodersEra Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10 object-contain rounded-full border border-[#27272a] group-hover:scale-105 transition-transform" 
                />
                <span className="font-extrabold text-xl tracking-tight text-white">CodersEra</span>
              </Link>
              <p className="text-[#a1a1aa] mb-6 max-w-sm leading-relaxed text-xs sm:text-sm font-normal">
                Home for ambitious student developers. We build open source projects, run hackathons, host workshops, and foster career growth together.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2.5">
                <a href="https://x.com/CODERS_ERA" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors border border-[#27272a]">
                  <span className="font-mono text-xs font-bold">𝕏</span>
                </a>
                <a href="https://github.com/CodersEraa" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors border border-[#27272a]">
                  <span className="font-mono text-xs font-bold">GH</span>
                </a>
                <a href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-[#18181b] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors border border-[#27272a]">
                  <span className="font-mono text-xs font-bold">WA</span>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Navigation</h4>
                <ul className="space-y-2 text-xs text-[#a1a1aa]">
                  <li><a href="https://www.codersera.in/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="https://www.codersera.in/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="https://www.codersera.in/events" className="hover:text-white transition-colors">Events</a></li>
                  <li><Link href="/admin" className="text-[#38bdf8] font-bold hover:underline">Admin Gate</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Community</h4>
                <ul className="space-y-2 text-xs text-[#a1a1aa]">
                  <li><a href="https://github.com/CodersEraa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Open Source Repos</a></li>
                  <li><a href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Global</a></li>
                  <li><a href="https://chat.whatsapp.com/IZFWh2YhwNh1Hzl5GDci2F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp NIET</a></li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Host Venue</h4>
                <p className="text-xs text-[#a1a1aa]">Noida Institute of Engineering & Technology (NIET)</p>
                <p className="text-[11px] text-[#71717a] mt-1">Knowledge Park II, Greater Noida, UP</p>
              </div>
            </div>

          </div>

          <div className="border-t border-[#27272a] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#71717a]">
            <p>© 2026 CodersEra. Built with obsession by student developers.</p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px]">subdomain: <span className="text-[#38bdf8] font-semibold">automate-india.codersera.in</span></span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}