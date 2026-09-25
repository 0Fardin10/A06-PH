"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const plan: string[] = [];
  const saved: string[] = [];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d10] border-b border-zinc-800/80">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16">
        
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link
            href="/"
            className="font-oswald text-2xl font-black tracking-wider text-white hover:opacity-90 transition"
          >
            FITLOG
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="navbar-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                isActive("/")
                  ? "bg-[#1d2600] text-[#ccff00]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                isActive("/my-plan")
                  ? "bg-[#1d2600] text-[#ccff00]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              My Plan
            </Link>
          </div>
        </div>

        {/* Right: Status Badges */}
        <div className="navbar-end gap-4">
          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition"
          >
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition"
          >
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full border border-zinc-700 text-zinc-300 font-medium text-xs flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}