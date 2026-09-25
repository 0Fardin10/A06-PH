"use client";

import Image from "next/image";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Plus, Bookmark, Check, BookmarkCheck } from "lucide-react";

export interface WorkoutDetail {
  id: string;
  name: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: number | string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
  image: string;
}

export default function WorkoutDetailClient({ workout }: { workout: WorkoutDetail }) {
  const { plan, saved, addToPlan, toggleSaved } = useFitLog();

  const isPlanned = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    addToPlan({
      id: workout.id,
      name: workout.name,
      muscle: workout.categories[0] || "General",
      equipment: workout.equipment,
      image: workout.image,
    });
  };

  const handleToggleSaved = () => {
    toggleSaved({
      id: workout.id,
      name: workout.name,
      muscle: workout.categories[0] || "General",
      equipment: workout.equipment,
      image: workout.image,
    });
  };

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.calories} kcal` },
    { label: "RATING", value: workout.rating.toString() },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        
        {/* Left Side — Visual Image */}
        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[600px] bg-[#121318] border border-zinc-800/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Side — Info & Specs */}
        <div className="flex flex-col">
          
          {/* Title */}
          <h1 className="font-oswald text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-wide mb-3">
            {workout.name}
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
            {workout.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Row Table */}
          <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl p-6 mb-8">
            <div className="divide-y divide-zinc-800/70">
              {specRows.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                  <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase">
                    {spec.label}
                  </span>
                  <span className="text-zinc-200 font-semibold text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-4">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-3">
              {workout.instructions.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 text-zinc-300 text-sm leading-relaxed"
                >
                  <span className="font-bold text-zinc-400 shrink-0">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToPlan}
              className={`flex-1 flex items-center justify-center gap-2 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all duration-200 cursor-pointer ${
                isPlanned
                  ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black active:scale-95"
              }`}
            >
              {isPlanned ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleSaved}
              className={`flex-1 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isSaved
                  ? "bg-zinc-800 text-[#ccff00] border-[#ccff00]/40"
                  : "bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white active:scale-95"
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#ccff00]" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save for later</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}