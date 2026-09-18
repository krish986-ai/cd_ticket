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
  GraduationCap, 
  Building2, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  QrCode, 
  RefreshCw, 
  ExternalLink,
  MapPin,
  Lock,
  Download
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

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

const STORAGE_KEY = "niet-codersera-registrations";

export default function TicketSystemPage() {
  const [activeTab, setActiveTab] = useState<"generate" | "lookup">("generate");
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [photo, setPhoto] = useState<string>();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Lookup state
  const [lookupTerm, setLookupTerm] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [passCount, setPassCount] = useState(0);

  const passRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const records: Registration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setPassCount(records.length);

      // Check if user already generated a pass recently in session
      const savedEmail = window.sessionStorage.getItem("niet-ticket-email");
      if (savedEmail) {
        const found = records.find((r) => r.email.toLowerCase() === savedEmail.toLowerCase());
        if (found) {
          setRegistration(found);
        }
      }
    } catch {
      setPassCount(0);
    }
  }, []);

  function handlePhoto(file?: File) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG or WEBP).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Photo size must be under 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
      
      const records: Registration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      
      const existing = records.find((r) => r.email.toLowerCase() === values.email.trim().toLowerCase());
      if (existing) {
        setRegistration(existing);
        setNotice("An active pass already exists for this email. Loaded your pass below!");
        setIsSubmitting(false);
        return;
      }

      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const ticketNumber = `NIET-2026-${randomSuffix}`;

      const next: Registration = {
        id: crypto.randomUUID ? crypto.randomUUID() : `reg-${Date.now()}`,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        studentId: values.studentId.trim().toUpperCase(),
        department: values.department,
        year: values.year,
        photoData: photo,
        ticketNumber,
        createdAt: new Date().toISOString(),
        verified: true,
      };

      const updated = [next, ...records];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.sessionStorage.setItem("niet-ticket-email", values.email);
      
      setRegistration(next);
      setPassCount(updated.length);
      setNotice(`Your official virtual pass has been generated!`);
    } catch {
      setError("An unexpected error occurred while saving your pass. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLookup(e: FormEvent) {
    e.preventDefault();
    setLookupError("");
    const term = lookupTerm.trim().toLowerCase();
    if (!term) return;

    try {
      const records: Registration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      const match = records.find(
        (r) => r.email.toLowerCase() === term || 
               r.studentId.toLowerCase() === term || 
               r.ticketNumber.toLowerCase() === term
      );

      if (match) {
        setRegistration(match);
        setNotice("Ticket retrieved successfully!");
      } else {
        setLookupError("No ticket found with this Email, Roll ID or Ticket number. Please generate a new pass.");
      }
    } catch {
      setLookupError("Unable to search ticket database. Please try again.");
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-[#09090b] editorial-grid text-[#fafafa] flex flex-col justify-between">
      
      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] hero-glow" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        {/* Floating Header */}
        <header className="w-full flex items-center justify-between nav-pill-container rounded-full px-5 py-3 mb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 p-0.5">
              <Image 
                src="/codersera-logo-original.jpg" 
                alt="CodersEra Logo" 
                width={36} 
                height={36} 
                className="h-full w-full rounded-full object-cover" 
                priority 
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white block leading-none">CodersEra</span>
              <span className="text-[10px] text-[#38bdf8] font-mono tracking-wider">VIRTUAL PASS PORTAL</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
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
              className="btn-sky-glow text-xs py-1.5 px-3.5"
            >
              WhatsApp Community
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Hero Title & Pill */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>Automate India NIET Chapter 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Event Virtual <span className="text-[#38bdf8]">Pass Portal</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Generate and verify your official student identification QR pass for CodersEra campus hackathons and developer conferences.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[#a1a1aa]">
            <span className="badge-pill-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> 100% Free Entry
            </span>
            <span className="badge-pill-zinc">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" /> Instant Gate QR Scan
            </span>
            <span className="badge-pill-sky">
              <Ticket className="h-3.5 w-3.5" /> {passCount} Passes Issued
            </span>
          </div>
        </div>

        {/* --- IF TICKET IS GENERATED / ACTIVE: SHOW PASS VIEW --- */}
        {registration ? (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Top Bar with Print & Reset */}
            <div className="flex items-center justify-between">
              <span className="badge-pill-emerald text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" /> Pass Ready for Check-in
              </span>
              <button
                type="button"
                onClick={handlePrint}
                className="btn-dark-pill text-xs py-2 px-3.5"
              >
                <Printer className="h-3.5 w-3.5" />
                Print / Save PDF
              </button>
            </div>

            {notice && (
              <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-[#34d399] flex items-center justify-between">
                <span>{notice}</span>
                <button onClick={() => setNotice("")} className="text-[#a1a1aa] hover:text-white text-xs">✕</button>
              </div>
            )}

            {/* Holographic Virtual Pass Card */}
            <div ref={passRef} className="ticket-card p-6 sm:p-8 backdrop-blur-2xl">
              
              {/* Pass Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 p-0.5 shadow-md">
                    <Image 
                      src="/codersera-logo-original.jpg" 
                      alt="CodersEra" 
                      width={44} 
                      height={44} 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-white leading-none">CodersEra</p>
                    <p className="text-[11px] text-[#38bdf8] font-mono mt-0.5">NIET CHAPTER 2026</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="badge-pill-emerald text-[11px]">
                    <ShieldCheck className="h-3 w-3" /> VERIFIED PASS
                  </span>
                  <p className="font-mono text-xs font-bold text-[#38bdf8] mt-1">{registration.ticketNumber}</p>
                </div>
              </div>

              {/* Pass Card Details */}
              <div className="grid sm:grid-cols-[1.3fr_0.7fr] gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">ATTENDEE NAME</p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{registration.name}</h3>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">{registration.email}</p>
                    <p className="text-xs text-[#a1a1aa]">{registration.phone}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-left">
                    <div>
                      <p className="text-[10px] uppercase text-[#a1a1aa]">ROLL ID</p>
                      <p className="text-xs font-bold text-white font-mono mt-0.5">{registration.studentId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[#a1a1aa]">BRANCH</p>
                      <p className="text-xs font-semibold text-white mt-0.5">{registration.department}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-[#a1a1aa]">YEAR</p>
                      <p className="text-xs font-semibold text-white mt-0.5">{registration.year}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-xs text-[#a1a1aa] space-y-1">
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                      <span>22 August 2026 • 10:00 AM IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#38bdf8]" />
                      <span>Auditorium, NIET Campus Greater Noida</span>
                    </div>
                  </div>
                </div>

                {/* QR Code & Avatar */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#09090b]/90 p-4 text-center">
                  {registration.photoData ? (
                    <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#38bdf8] shadow-md">
                      <img src={registration.photoData} alt={registration.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                      <User className="h-6 w-6" />
                    </div>
                  )}

                  <div className="rounded-xl bg-white p-2.5 shadow-md">
                    <QRCodeSVG 
                      value={JSON.stringify({
                        t: registration.ticketNumber,
                        n: registration.name,
                        i: registration.studentId,
                        d: registration.department,
                      })}
                      size={120}
                      level="H"
                    />
                  </div>
                  <p className="text-[10px] text-[#a1a1aa] mt-2 flex items-center gap-1">
                    <QrCode className="h-3 w-3" /> Gate Scan Code
                  </p>
                </div>
              </div>

              {/* Pass Footer */}
              <div className="mt-6 border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#71717a] gap-2">
                <span>CodersEra Student Developer Community</span>
                <span>Show this virtual pass on arrival</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRegistration(null);
                  setPhoto(undefined);
                  window.sessionStorage.removeItem("niet-ticket-email");
                }}
                className="btn-dark-pill text-xs py-2.5 px-4"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Issue Another Ticket
              </button>
            </div>

          </div>
        ) : (
          /* --- IF NO TICKET: SHOW GENERATE / LOOKUP TABS --- */
          <div className="max-w-2xl mx-auto codersera-card p-6 sm:p-9 shadow-2xl">
            
            {/* Action Switcher Tabs */}
            <div className="flex items-center p-1 rounded-2xl bg-[#18181b] border border-white/10 mb-8">
              <button
                type="button"
                onClick={() => { setActiveTab("generate"); setError(""); setLookupError(""); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "generate"
                    ? "bg-[#38bdf8] text-[#09090b] shadow-md"
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                <Ticket className="h-4 w-4" />
                Generate Event Pass
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("lookup"); setError(""); setLookupError(""); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "lookup"
                    ? "bg-[#38bdf8] text-[#09090b] shadow-md"
                    : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                <Search className="h-4 w-4" />
                Find My Pass
              </button>
            </div>

            {/* TAB 1: PASS GENERATION FORM */}
            {activeTab === "generate" && (
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Full Name (as per College ID) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    className="input-codersera"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#38bdf8]" />
                      College / Personal Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="student@college.edu"
                      className="input-codersera"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#38bdf8]" />
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      pattern="[0-9]{10}"
                      placeholder="10-digit number"
                      className="input-codersera"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[#38bdf8]" />
                      Roll ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="studentId"
                      placeholder="2201330..."
                      className="input-codersera font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-[#38bdf8]" />
                      Branch <span className="text-red-400">*</span>
                    </label>
                    <select required name="department" className="input-codersera text-xs">
                      <option value="">Select Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="CSE-AI&ML">CSE (AI & ML)</option>
                      <option value="CSE-DS">CSE (Data Science)</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="Other">Other Branch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                      Year <span className="text-red-400">*</span>
                    </label>
                    <select required name="year" className="input-codersera text-xs">
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5">
                    Student Photo (for QR Pass verification)
                  </label>
                  <div className="flex items-center gap-4 rounded-xl border border-dashed border-white/15 bg-[#18181b]/50 p-3.5 hover:border-[#38bdf8]/50 transition-colors">
                    {photo ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#38bdf8] shrink-0">
                        <img src={photo} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] shrink-0">
                        <Upload className="h-4 w-4" />
                      </div>
                    )}
                    
                    <div className="flex-1 text-xs">
                      <label className="cursor-pointer font-semibold text-[#38bdf8] hover:underline">
                        <span>{photo ? "Change student photo" : "Upload photo"}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handlePhoto(e.target.files?.[0])}
                          className="sr-only" 
                        />
                      </label>
                      <p className="text-[#a1a1aa] text-[10px]">JPG, PNG or WEBP · Max 2 MB</p>
                    </div>

                    {photo && (
                      <button
                        type="button"
                        onClick={() => setPhoto(undefined)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-sky-glow w-full py-3 text-xs sm:text-sm font-bold shadow-lg mt-3"
                >
                  <Ticket className="h-4 w-4" />
                  {isSubmitting ? "Generating Encrypted Pass..." : "Generate My Virtual Pass"}
                </button>
              </form>
            )}

            {/* TAB 2: PASS LOOKUP */}
            {activeTab === "lookup" && (
              <form onSubmit={handleLookup} className="space-y-4 py-2">
                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <Search className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Registered Email, Roll ID, or Ticket Number
                  </label>
                  <input
                    type="text"
                    required
                    value={lookupTerm}
                    onChange={(e) => setLookupTerm(e.target.value)}
                    placeholder="Enter email or Roll ID (e.g. student@college.edu)"
                    className="input-codersera"
                  />
                </div>

                {lookupError && (
                  <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                    {lookupError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-sky-glow w-full py-3 text-xs sm:text-sm font-bold shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  Find & Display Pass
                </button>
              </form>
            )}

          </div>
        )}

      </div>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-[#27272a] bg-[#09090b] py-6 px-4 text-center text-xs text-[#71717a]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CodersEra NIET Student Community. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/admin" className="text-[#a1a1aa] hover:text-[#38bdf8] flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Staff Admin Desk
            </Link>
            <a href="https://github.com/CodersEraa" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}