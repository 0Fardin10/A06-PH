import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0a0a0c] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Logo Icon + FITLOG Text */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-oswald text-xl font-black tracking-wider text-white hover:opacity-90 transition"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span>FITLOG</span>
        </Link>

        {/* Right: Copyright Text */}
        <p className="text-zinc-500 text-xs sm:text-sm font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}