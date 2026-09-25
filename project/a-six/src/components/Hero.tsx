"use client";

import Image from "next/image";

export default function Hero() {
  const scrollToLibrary = () => {
    const el = document.getElementById("library");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      <div className="bg-[#12141c] border border-zinc-800/80 rounded-3xl p-8 sm:p-12 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        
        {/* Left Content */}
        <div className="max-w-xl z-10 text-left">
          <span className="text-[#ccff00] font-extrabold text-xs tracking-widest uppercase mb-4 block">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-oswald text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] mb-5">
            TRAIN WITH INTENT. <br /> LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-md font-medium">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            onClick={scrollToLibrary}
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#ccff00]/10"
          >
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Right Gym Machine Image */}
        <div className="relative w-full md:w-[380px] h-[260px] sm:h-[320px] shrink-0 z-10 flex items-center justify-center">
          <Image
            src="/assets/banner.png"
            alt="Gym Machine"
            fill
            unoptimized
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}