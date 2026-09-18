"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Download, 
  LogOut, 
  Search, 
  ShieldCheck, 
  Ticket, 
  Users, 
  UserCheck, 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  QrCode, 
  Trash2, 
  ExternalLink,
  Award,
  Layers
} from "lucide-react";

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
const ADMIN_PASSWORD = "@@cd_tic.1215";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [records, setRecords] = useState<PassRegistration[]>([]);
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [checkInCode, setCheckInCode] = useState("");
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = window.sessionStorage.getItem("niet-admin") === "true";
      setAuthenticated(isAuth);
      loadRecords();
    }
  }, []);

  function loadRecords() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setRecords(stored);
    } catch {
      setRecords([]);
    }
  }

  function saveRecords(updated: PassRegistration[]) {
    setRecords(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setMessage("Access denied. Invalid administrator password.");
      return;
    }
    window.sessionStorage.setItem("niet-admin", "true");
    setAuthenticated(true);
    setMessage("");
    loadRecords();
  }

  function handleLogout() {
    window.sessionStorage.removeItem("niet-admin");
    setAuthenticated(false);
    setPassword("");
  }

  function exportCsv() {
    if (records.length === 0) {
      setMessage("No registration data to export.");
      return;
    }

    const header = "Ticket Number,Full Name,Roll Number,Email,Phone,Degree & Branch,Team Name,Team Role,Problem Statement ID,Year,Domain,Verified,Date\n";
    const rows = filteredRecords.map((r) => [
      r.ticketNumber,
      r.fullName,
      r.rollNumber,
      r.email,
      r.phone,
      r.degreeBranch,
      r.teamName,
      r.teamRole,
      r.problemStatementId,
      r.yearOfStudy,
      r.domain,
      r.verified ? "Yes" : "No",
      r.createdAt,
    ].map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `codersera-sih-passes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Registration roster exported to CSV successfully.");
  }

  function toggleVerification(id: string) {
    const updated = records.map((r) => r.id === id ? { ...r, verified: !r.verified } : r);
    saveRecords(updated);
    setMessage("Attendee verification status updated.");
  }

  function deleteRecord(id: string) {
    if (!confirm("Are you sure you want to remove this registration pass?")) return;
    const updated = records.filter((r) => r.id !== id);
    saveRecords(updated);
    setMessage("Registration removed from roster.");
  }

  function addSampleData() {
    const samples: PassRegistration[] = [
      {
        id: "sample-1",
        fullName: "Aarav Sharma",
        rollNumber: "2201330100012",
        email: "aarav.cse22@niet.co.in",
        phone: "9876543210",
        college: "Noida Institute of Engineering & Technology (NIET)",
        degreeBranch: "B.Tech CSE (AIML)",
        teamName: "CodeCrafters",
        teamRole: "Team Leader",
        problemStatementId: "SIH-1520",
        yearOfStudy: "3rd Year",
        domain: "AI & Machine Learning",
        ticketNumber: "NIET-SIH-2026-X8K10",
        createdAt: new Date().toISOString(),
        verified: true,
      },
      {
        id: "sample-2",
        fullName: "Ananya Gupta",
        rollNumber: "2201330100045",
        email: "ananya.cse22@niet.co.in",
        phone: "9876543211",
        college: "Noida Institute of Engineering & Technology (NIET)",
        degreeBranch: "B.Tech CSE (Core)",
        teamName: "CodeCrafters",
        teamRole: "Team Member",
        problemStatementId: "SIH-1520",
        yearOfStudy: "3rd Year",
        domain: "AI & Machine Learning",
        ticketNumber: "NIET-SIH-2026-M4P90",
        createdAt: new Date().toISOString(),
        verified: true,
      },
      {
        id: "sample-3",
        fullName: "Rohan Verma",
        rollNumber: "2301330100112",
        email: "rohan.it23@niet.co.in",
        phone: "9876543212",
        college: "Noida Institute of Engineering & Technology (NIET)",
        degreeBranch: "B.Tech IT",
        teamName: "CyberKnights",
        teamRole: "Team Leader",
        problemStatementId: "SIH-1604",
        yearOfStudy: "2nd Year",
        domain: "Cybersecurity & Blockchain",
        ticketNumber: "NIET-SIH-2026-B2Z55",
        createdAt: new Date().toISOString(),
        verified: false,
      },
    ];

    const updated = [...samples, ...records.filter((r) => !samples.some((s) => s.email === r.email))];
    saveRecords(updated);
    setMessage("Sample SIH attendee passes loaded for testing.");
  }

  function handleFastCheckIn(e: React.FormEvent) {
    e.preventDefault();
    setCheckInResult(null);
    if (!checkInCode.trim()) return;

    const term = checkInCode.trim().toUpperCase();
    const matchIndex = records.findIndex(
      (r) => r.ticketNumber.toUpperCase() === term || r.rollNumber.toUpperCase() === term
    );

    if (matchIndex !== -1) {
      const match = records[matchIndex];
      const updated = [...records];
      updated[matchIndex] = { ...match, verified: true };
      saveRecords(updated);
      setCheckInResult({
        success: true,
        text: `Gate Verified: ${match.fullName} (Team: ${match.teamName} · Roll: ${match.rollNumber})`,
      });
      setCheckInCode("");
    } else {
      setCheckInResult({
        success: false,
        text: `No attendee found with Ticket/Roll: ${term}`,
      });
    }
  }

  const filteredRecords = records.filter((record) => {
    const matchesDomain = domainFilter === "all" || record.domain === domainFilter;
    const matchesStatus = statusFilter === "all" 
      || (statusFilter === "verified" && record.verified) 
      || (statusFilter === "pending" && !record.verified);
    
    const term = query.toLowerCase();
    const matchesQuery = !query.trim() || [
      record.fullName,
      record.email,
      record.rollNumber,
      record.teamName,
      record.ticketNumber,
      record.phone,
      record.problemStatementId
    ].some((val) => val && val.toLowerCase().includes(term));

    return matchesDomain && matchesStatus && matchesQuery;
  });

  const uniqueDomains = Array.from(new Set(records.map((r) => r.domain).filter(Boolean)));
  const verifiedCount = records.filter((r) => r.verified).length;

  // --- LOGIN SCREEN ---
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#09090b] editorial-grid px-4 py-8">
        <div className="w-full max-w-md codersera-card p-8 sm:p-10 shadow-2xl">
          
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
            <span>Public Site</span>
          </Link>

          <div className="flex items-center justify-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] shadow-inner">
              <ShieldCheck className="h-8 w-8" />
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="badge-pill-sky text-[11px] mb-2">STAFF CONTROL ROOM</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">Admin Verification Desk</h1>
            <p className="text-xs text-[#a1a1aa] mt-2">Private access for CodersEra event coordinators and staff.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#fafafa] mb-1.5 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#38bdf8]" />
                Admin Security Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode"
                className="input-codersera"
              />
            </div>

            {message && (
              <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn-sky-glow w-full py-3 text-xs font-bold"
            >
              Unlock Event Dashboard
            </button>
          </form>

          <p className="text-center text-[11px] text-[#71717a] mt-6">
            Authorized personnel only · CodersEra NIET 2026
          </p>
        </div>
      </main>
    );
  }

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <main className="min-h-screen bg-[#09090b] editorial-grid px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 p-0.5">
              <Image 
                src="/codersera-logo-original.jpg" 
                alt="CodersEra Logo" 
                width={44} 
                height={44} 
                className="h-full w-full rounded-full object-cover" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">SIH & Event Control Room</h1>
                <span className="badge-pill-sky text-[10px] py-0.5 px-2">LIVE DESK</span>
              </div>
              <p className="text-xs text-[#a1a1aa] mt-0.5">Automate India & SIH NIET Chapter 2026 · Attendee Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="btn-dark-pill text-xs py-2 px-3.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Public Portal
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-dark-pill text-xs py-2 px-3.5 text-red-400 hover:text-red-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Message */}
        {message && (
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4 flex items-center justify-between text-xs text-[#38bdf8]">
            <span>{message}</span>
            <button onClick={() => setMessage("")} className="text-[#a1a1aa] hover:text-white text-xs">Dismiss</button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="codersera-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">Total Registrations</p>
              <p className="text-3xl font-extrabold text-white mt-1">{records.length}</p>
              <p className="text-[11px] text-[#34d399] mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Live roster count
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="codersera-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">Verified & Checked-in</p>
              <p className="text-3xl font-extrabold text-[#34d399] mt-1">{verifiedCount}</p>
              <p className="text-[11px] text-[#a1a1aa] mt-1">
                {records.length > 0 ? `${Math.round((verifiedCount / records.length) * 100)}% of total` : "0%"}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#34d399]">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="codersera-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">Pending Check-in</p>
              <p className="text-3xl font-extrabold text-[#fbbf24] mt-1">{records.length - verifiedCount}</p>
              <p className="text-[11px] text-[#a1a1aa] mt-1">Awaiting gate scan</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[#fbbf24]">
              <Ticket className="h-6 w-6" />
            </div>
          </div>

          <div className="codersera-card p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">SIH Themes</p>
              <p className="text-3xl font-extrabold text-white mt-1">{uniqueDomains.length}</p>
              <p className="text-[11px] text-[#a1a1aa] mt-1">AI, Robotics, Web3, etc.</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
              <Layers className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Instant Gate Scanner / Fast Manual Check-In Bar */}
        <div className="codersera-card p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instant Gate Check-in</h3>
                <p className="text-xs text-[#a1a1aa]">Enter Ticket Number or AKTU Roll ID to verify attendee entrance immediately.</p>
              </div>
            </div>

            <form onSubmit={handleFastCheckIn} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={checkInCode}
                onChange={(e) => setCheckInCode(e.target.value)}
                placeholder="e.g. NIET-SIH-2026-X8K10"
                className="input-codersera font-mono text-xs w-full md:w-64"
              />
              <button
                type="submit"
                className="btn-sky-glow text-xs py-2.5 px-4 shrink-0"
              >
                Verify Entry
              </button>
            </form>
          </div>

          {checkInResult && (
            <div className={`mt-4 p-3 rounded-xl border text-xs ${
              checkInResult.success 
                ? "border-emerald-500/30 bg-emerald-500/10 text-[#34d399]" 
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}>
              {checkInResult.text}
            </div>
          )}
        </div>

        {/* Roster Controls & Table Section */}
        <section className="codersera-card overflow-hidden">
          
          {/* Table Toolbar Header */}
          <div className="p-6 border-b border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div>
              <span className="badge-pill-sky text-[10px] mb-1">REGISTRATION ROSTER</span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Attendee Database ({filteredRecords.length})</h2>
            </div>

            {/* Filter & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#71717a]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, roll, team..."
                  className="input-codersera pl-9 text-xs py-2"
                />
              </div>

              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="input-codersera text-xs py-2 w-auto"
              >
                <option value="all">All SIH Domains</option>
                {uniqueDomains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-codersera text-xs py-2 w-auto"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified Only</option>
                <option value="pending">Pending Only</option>
              </select>

              <button
                type="button"
                onClick={exportCsv}
                className="btn-sky-glow text-xs py-2 px-3.5"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>

              <button
                type="button"
                onClick={addSampleData}
                className="btn-dark-pill text-xs py-2 px-3"
                title="Add sample mock student passes"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Mock Data
              </button>
            </div>
          </div>

          {/* Registrations Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#18181b]/50 text-[#a1a1aa] font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4 pl-6">Student Info</th>
                  <th className="p-4">Roll Number & Branch</th>
                  <th className="p-4">SIH Team & Role</th>
                  <th className="p-4">Problem ID & Domain</th>
                  <th className="p-4">Ticket Number</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          {r.photoData ? (
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-[#38bdf8] shrink-0">
                              <img src={r.photoData} alt={r.fullName} className="h-full w-full object-cover" />
                            </div>
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] shrink-0 font-bold">
                              {r.fullName.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-white text-sm">{r.fullName}</p>
                            <p className="text-[#a1a1aa] text-[11px]">{r.email}</p>
                            <p className="text-[#71717a] text-[10px]">{r.phone}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <p className="font-mono font-bold text-white">{r.rollNumber}</p>
                        <p className="text-[#a1a1aa] text-[11px]">{r.degreeBranch} · {r.yearOfStudy}</p>
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-[#38bdf8]">{r.teamName}</p>
                        <p className="text-[#a1a1aa] text-[11px]">{r.teamRole}</p>
                      </td>

                      <td className="p-4">
                        <p className="font-mono font-semibold text-white">{r.problemStatementId}</p>
                        <p className="text-[#34d399] text-[11px] truncate max-w-[150px]">{r.domain}</p>
                      </td>

                      <td className="p-4 font-mono font-bold text-[#38bdf8]">
                        {r.ticketNumber}
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => toggleVerification(r.id)}
                          className={r.verified ? "badge-pill-emerald cursor-pointer" : "badge-pill-zinc cursor-pointer"}
                        >
                          {r.verified ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 text-yellow-400" />
                              Pending
                            </>
                          )}
                        </button>
                      </td>

                      <td className="p-4 pr-6 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleVerification(r.id)}
                          className="btn-dark-pill text-[11px] py-1.5 px-3"
                        >
                          {r.verified ? "Undo" : "Verify"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRecord(r.id)}
                          className="p-1.5 rounded-lg text-[#71717a] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete pass"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-[#71717a]">
                      No student passes found matching current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-[#18181b]/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#71717a] gap-2">
            <span>Showing {filteredRecords.length} of {records.length} registrations</span>
            <span>Tip: Click on any verification status badge to toggle gate check-in.</span>
          </div>

        </section>

      </div>
    </main>
  );
}