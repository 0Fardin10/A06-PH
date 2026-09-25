"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = useFitLog();

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  return (
    <header className="border-b border-zinc-800/80 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="font-oswald text-2xl font-black tracking-wider text-white flex items-center gap-2">
          FITLOG
        </Link>

        {/* Main Navigation */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider transition ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider transition ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Plan & Saved Badges Counter */}
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 bg-[#12141c] border border-zinc-800 px-3 py-1.5 rounded-full hover:border-zinc-700 transition"
          >
            <span className="text-zinc-300 font-extrabold">PLAN</span>
            <span className="bg-[#ccff00] text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 bg-[#12141c] border border-zinc-800 px-3 py-1.5 rounded-full hover:border-zinc-700 transition"
          >
            <span className="text-zinc-300 font-extrabold">SAVED</span>
            <span className="bg-zinc-800 text-zinc-300 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}