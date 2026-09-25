"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d10] border-b border-zinc-800/80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* 1. Left: Text Logo (No Image) */}
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-90 transition">
            <span className="font-oswald text-2xl font-black tracking-widest text-white uppercase">
              FITLOG
            </span>
          </Link>
        </div>

        {/* 2 & 3. Middle: Nav Links with Active Highlight */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive("/")
                ? "bg-[#1d2a05] text-[#ccff00]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive("/my-plan")
                ? "bg-[#1d2a05] text-[#ccff00]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* 4. Right: Status Badges (Text + Circle Counter) */}
        <div className="flex items-center gap-6">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-white transition group"
          >
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-extrabold text-xs flex items-center justify-center group-hover:bg-[#b3e600] transition-colors">
              {plan.length}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition group"
          >
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full border border-zinc-700 bg-transparent text-zinc-400 font-semibold text-xs flex items-center justify-center group-hover:border-zinc-500 group-hover:text-zinc-200 transition-colors">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}