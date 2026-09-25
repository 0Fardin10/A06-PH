"use client";

import Link from "next/link";
import Image from "next/image";
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
        
        {/* 1. Left: Logo Image */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={110}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* 2 & 3. Middle: Nav Links (Workout & My Plan) with Active Highlight */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive("/")
                ? "bg-[#1d2600] text-[#ccff00]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive("/my-plan")
                ? "bg-[#1d2600] text-[#ccff00]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* 4. Right Status Badges */}
        <div className="flex items-center gap-3">
          {/* Plan Badge: Filled Pill with #ccff00 accent background */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full transition shadow-sm"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-black/20 text-black font-extrabold text-xs flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          {/* Saved Badge: Outline/Border Pill */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full transition"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}