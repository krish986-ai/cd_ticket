"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  GitBranch, 
  MessageSquare, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Heart,
  Users,
  MapPin,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="community" className="relative border-t border-[#27272a] bg-[#09090b] text-[#fafafa] editorial-grid">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8">
        
        {/* Top Community Banner */}
        <div className="mb-14 rounded-3xl border border-white/10 bg-gradient-to-r from-[#121215] via-[#18181b] to-[#121215] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="badge-sky mb-2">Connect with us</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">Join the CodersEra Developer Network</h3>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1">Get instant updates about upcoming hackathons, project reviews, and workshops.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-codersera-sky text-xs py-2.5 px-4"
            >
              WhatsApp Global
              <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href="https://chat.whatsapp.com/IZFWh2YhwNh1Hzl5GDci2F" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-codersera-secondary text-xs py-2.5 px-4"
            >
              WhatsApp NIET Group
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 p-0.5">
                <Image 
                  src="/codersera-logo-original.jpg" 
                  alt="CodersEra Logo" 
                  width={40} 
                  height={40} 
                  className="h-full w-full rounded-full object-cover" 
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">CodersEra</span>
            </Link>

            <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
              Home for ambitious student developers. We build open source projects, run hackathons, host workshops, and foster engineering careers together.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://github.com/CodersEraa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="GitHub Organization"
              >
                <GitBranch className="h-4 w-4" />
              </a>
              <a 
                href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a 
                href="mailto:contact@codersera.in" 
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Email Us"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#a1a1aa]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#events" className="hover:text-white transition-colors">Events & Hackathons</Link></li>
              <li><Link href="/register" className="text-[#38bdf8] font-semibold hover:text-[#7dd3fc] transition-colors">Virtual Pass Portal</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Verification Desk</Link></li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#a1a1aa]">
              <li><a href="https://github.com/CodersEraa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Organization</a></li>
              <li><a href="https://chat.whatsapp.com/H3x7iIZ857S7ne4eLIdb06" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Global Group</a></li>
              <li><a href="https://chat.whatsapp.com/IZFWh2YhwNh1Hzl5GDci2F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp NIET Chapter</a></li>
              <li><a href="https://www.codersera.in/events" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Official Website Events</a></li>
            </ul>
          </div>

          {/* Campus & Pass Desk */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">NIET Campus Portal</h4>
            <div className="space-y-3 text-xs text-[#a1a1aa]">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span>NIET Greater Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#34d399] shrink-0" />
                <span>5,000+ Active Student Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#38bdf8] shrink-0" />
                <span>Official Chapter Portal 2026</span>
              </div>
              <div className="pt-2">
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Staff Check-in Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© 2026 CodersEra. Built with obsession by student developers.</p>
          <div className="flex items-center gap-2">
            <span>Crafted for student innovation</span>
            <Heart className="h-3 w-3 text-red-500 inline fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}