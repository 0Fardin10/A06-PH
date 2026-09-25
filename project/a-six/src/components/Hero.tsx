"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToLibrary = () => {
    const librarySection = document.getElementById("library");
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Dark Card Container */}
      <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl md:rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
        
        {/* Left Side: Content */}
        <div className="flex-1 max-w-2xl text-left z-10">
          <p className="text-[#ccff00] font-bold tracking-widest text-xs sm:text-sm uppercase mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[1.05] mb-6">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            onClick={scrollToLibrary}
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all duration-200 transform active:scale-95 cursor-pointer"
          >
            <span>BROWSE WORKOUTS</span>
            {/* <ArrowDown className="w-4 h-4 stroke-[3]" /> */}
          </button>
        </div>

        {/* Right Side: Banner Image */}
        <div className="flex-1 w-full flex justify-center md:justify-end items-center z-10">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] flex items-center justify-center">
            <Image
              src="/assets/banner.png"
              alt="FitLog Gym Companion"
              width={450}
              height={450}
              className="object-contain w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}