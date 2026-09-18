"use client";

import { FormEvent, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Lock, 
  Mail, 
  QrCode, 
  Ticket, 
  Upload, 
  Printer, 
  User, 
  Phone, 
  GraduationCap, 
  Building2, 
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  RefreshCw
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

export default function RegisterPage() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [photo, setPhoto] = useState<string>();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passRef = useRef<HTMLDivElement>(null);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
      
      const records: Registration[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      
      if (records.some((record) => record.email.toLowerCase() === values.email.toLowerCase())) {
        setError("This email address already has a generated ticket. Please check your email or contact support.");
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
      setNotice(`Your virtual pass has been generated and activated!`);
    } catch {
      setError("An unexpected error occurred while saving your pass. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  // --- RENDER PASS TICKET VIEW ---
  if (registration) {
    return (
      <main className="min-h-screen bg-[#09090b] editorial-grid px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          
          {/* Top Back Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#a1a1aa] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/20 p-0.5">
                <Image 
                  src="/codersera-logo-original.jpg" 
                  alt="CodersEra Logo" 
                  width={24} 
                  height={24} 
                  className="h-full w-full rounded-full object-cover" 
                />
              </div>
              <span>Back to CodersEra Home</span>
            </Link>

            <button
              onClick={handlePrint}
              type="button"
              className="btn-codersera-secondary text-xs py-2 px-3.5"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save Pass
            </button>
          </div>

          {/* Success Banner */}
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center justify-between text-xs text-[#34d399]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span><strong>Registration Successful!</strong> Your verified virtual ticket is active.</span>
            </div>
            <span className="font-mono">{registration.ticketNumber}</span>
          </div>

          {/* Holographic Virtual Pass Card */}
          <div ref={passRef} className="rounded-3xl ticket-hologram p-6 sm:p-10 relative overflow-hidden backdrop-blur-2xl">
            {/* Background Light Glows */}
            <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38bdf8]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />

            {/* Ticket Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 p-0.5 shadow-md">
                  <Image 
                    src="/codersera-logo-original.jpg" 
                    alt="CodersEra Logo" 
                    width={48} 
                    height={48} 
                    className="h-full w-full rounded-full object-cover" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-white tracking-tight">CodersEra</h2>
                    <span className="badge-sky text-[10px] py-0.5 px-2">NIET CHAPTER</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">Automate India Hackathon 2026 · Verified Pass</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge-emerald text-xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  AUTHENTICATED ENTRY
                </span>
              </div>
            </div>

            {/* Ticket Body Content */}
            <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-8 pt-8 items-center">
              {/* Left Student Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">ATTENDEE NAME</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{registration.name}</h3>
                  <p className="text-xs text-[#a1a1aa] mt-1">{registration.email} · {registration.phone}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#a1a1aa]">STUDENT ID</p>
                    <p className="text-sm font-bold text-white font-mono mt-0.5">{registration.studentId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#a1a1aa]">DEPARTMENT</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{registration.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#a1a1aa]">ACADEMIC YEAR</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{registration.year}</p>
                  </div>
                </div>

                {/* Event Location & Date Strip */}
                <div className="rounded-xl bg-white/5 border border-white/5 p-3.5 text-xs text-[#a1a1aa] space-y-1.5">
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                    <span>Saturday, 22 August 2026 • 10:00 AM IST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#38bdf8]" />
                    <span>Auditorium, NIET Campus, Knowledge Park II, Greater Noida</span>
                  </div>
                </div>
              </div>

              {/* Right QR Code & Avatar Badge */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#09090b]/80 p-6 text-center">
                {/* Photo Avatar if uploaded */}
                {registration.photoData ? (
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-[#38bdf8] shadow-lg">
                    <img 
                      src={registration.photoData} 
                      alt={registration.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                    <User className="h-8 w-8" />
                  </div>
                )}

                {/* High contrast QR Code */}
                <div className="rounded-xl bg-white p-3 shadow-inner">
                  <QRCodeSVG 
                    value={JSON.stringify({
                      t: registration.ticketNumber,
                      n: registration.name,
                      i: registration.studentId,
                      d: registration.department,
                    })}
                    size={140}
                    level="H"
                  />
                </div>

                <p className="font-mono text-xs font-bold text-[#38bdf8] mt-3 tracking-wider">
                  {registration.ticketNumber}
                </p>
                <p className="text-[10px] text-[#a1a1aa] mt-0.5 flex items-center gap-1">
                  <QrCode className="h-3 w-3" /> Scan at campus gate
                </p>
              </div>
            </div>

            {/* Pass Footer */}
            <div className="mt-8 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717a]">
              <span>Issued by CodersEra NIET Student Community • Supported by Azure</span>
              <span>Keep this pass handy on your mobile during check-in</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setRegistration(null);
                setPhoto(undefined);
              }}
              className="btn-codersera-secondary text-xs py-2.5 px-4"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Register Another Student
            </button>
            <Link 
              href="/"
              className="btn-codersera-primary text-xs py-2.5 px-4"
            >
              Return to Public Site
            </Link>
          </div>

        </div>
      </main>
    );
  }

  // --- RENDER REGISTRATION FORM ---
  return (
    <main className="min-h-screen bg-[#09090b] editorial-grid px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Top Header & Navigation */}
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2.5 text-xs font-semibold text-[#a1a1aa] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/20 p-0.5">
            <Image 
              src="/codersera-logo-original.jpg" 
              alt="CodersEra Logo" 
              width={24} 
              height={24} 
              className="h-full w-full rounded-full object-cover" 
            />
          </div>
          <span>Back to CodersEra</span>
        </Link>

        {/* 2-Column Grid: Left Info & Right Form */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          
          {/* Left Side: Brand Story & Event Highlights */}
          <div className="space-y-6 lg:pt-4">
            <span className="badge-sky">
              <Sparkles className="h-3.5 w-3.5" /> Official Event Registration
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
              Make your <br />
              <span className="text-[#38bdf8]">entrance.</span>
            </h1>

            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Register once for the <strong>Automate India NIET Chapter 2026</strong> hackathon & developer conference.
              Receive your authenticated virtual identification pass instantly.
            </p>

            <div className="space-y-3.5 border-t border-white/10 pt-6 text-xs text-[#a1a1aa]">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#34d399]">
                  <Check className="h-4 w-4" />
                </div>
                <span>Free admission for all verified students</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                  <QrCode className="h-4 w-4" />
                </div>
                <span>Instant high-speed QR check-in at auditorium</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
                  <Lock className="h-4 w-4" />
                </div>
                <span>Single identity verification (Anti-duplicate protection)</span>
              </div>
            </div>

            {/* Quick Event Summary Box */}
            <div className="rounded-2xl border border-white/10 bg-[#121215]/80 p-5 text-xs text-[#a1a1aa] space-y-2">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Event Details</p>
              <p className="text-white font-medium">Automate India NIET Chapter 2026</p>
              <p>22 August 2026 • 10:00 AM – 6:00 PM</p>
              <p>Auditorium, NIET Greater Noida</p>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="rounded-3xl border border-white/10 bg-[#121215]/90 p-6 sm:p-9 shadow-2xl backdrop-blur-2xl">
            <div className="border-b border-white/10 pb-5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a1a1aa]">STUDENT PASS ISSUANCE</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">Create Your Verified Pass</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
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

              {/* Email & Phone Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Email Address <span className="text-red-400">*</span>
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

              {/* Student ID, Department, Year */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[#38bdf8]" />
                    College Roll / ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="studentId"
                    placeholder="e.g. 2101330100..."
                    className="input-codersera font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Department <span className="text-red-400">*</span>
                  </label>
                  <select required name="department" className="input-codersera text-xs">
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="CSE-AI&ML">CSE (AI & ML)</option>
                    <option value="CSE-DS">CSE (Data Science)</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Other">Other Branch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                    Academic Year <span className="text-red-400">*</span>
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

              {/* Photo Upload with Live Preview */}
              <div>
                <label className="block text-xs font-semibold text-[#fafafa] mb-1.5">
                  Student Photo (for QR Pass verification)
                </label>
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-white/15 bg-[#18181b]/50 p-4 hover:border-[#38bdf8]/50 transition-colors">
                  {photo ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#38bdf8] shrink-0">
                      <img src={photo} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] shrink-0">
                      <Upload className="h-5 w-5" />
                    </div>
                  )}
                  
                  <div className="flex-1 text-xs">
                    <label className="cursor-pointer font-semibold text-[#38bdf8] hover:underline">
                      <span>{photo ? "Change student photo" : "Upload student photo"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handlePhoto(e.target.files?.[0])}
                        className="sr-only" 
                      />
                    </label>
                    <p className="text-[#a1a1aa] text-[11px] mt-0.5">JPG, PNG or WEBP · Max 2 MB</p>
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

              {/* Error Message */}
              {error && (
                <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Notice Message */}
              {notice && (
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-[#34d399]">
                  {notice}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-codersera-sky w-full py-3 text-sm font-bold shadow-lg shadow-[#38bdf8]/20"
              >
                <Ticket className="h-4 w-4" />
                {isSubmitting ? "Generating Encrypted Pass..." : "Generate My Virtual Pass"}
              </button>

              <p className="text-center text-[11px] text-[#71717a]">
                By generating this pass, you confirm your student details are accurate for verification.
              </p>
            </form>
          </div>

        </div>

      </div>
    </main>
  );
}