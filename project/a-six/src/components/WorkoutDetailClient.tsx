"use client";

import Image from "next/image";
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

  const isPlanned = plan.some((item) => String(item.id) === String(workout.id));
  const isSaved = saved.some((item) => String(item.id) === String(workout.id));

  const workoutPayload = {
    id: String(workout.id),
    name: workout.name,
    muscle: workout.categories[0] || "Chest",
    equipment: workout.equipment,
    image: workout.image,
    duration: workout.duration,
    calories: workout.calories,
    rating: workout.rating,
  };

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.calories} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Image */}
        <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] bg-[#12141c] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <h1 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white tracking-wide mb-2.5">
            {workout.name}
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
            {workout.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {workout.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-[11px] tracking-wider uppercase px-3.5 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl p-5 mb-6">
            <div className="divide-y divide-zinc-800/60">
              {specRows.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                  <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase">
                    {spec.label}
                  </span>
                  <span className="text-zinc-200 font-bold text-xs sm:text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-oswald text-base font-bold uppercase text-white tracking-wide mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2.5">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  <span className="font-bold text-zinc-400 shrink-0">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            {/* 1. Add to Today's Plan */}
            <button
              onClick={() => addToPlan(workoutPayload)}
              className={`flex-1 flex items-center justify-center gap-2 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer ${
                isPlanned
                  ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black active:scale-95 shadow-lg shadow-[#ccff00]/10"
              }`}
            >
              {isPlanned ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to today&apos;s plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            {/* 2. Save for Later */}
            <button
              onClick={() => toggleSaved(workoutPayload)}
              className={`flex-1 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border transition-all cursor-pointer ${
                isSaved
                  ? "bg-zinc-800 text-[#ccff00] border-[#ccff00]/40"
                  : "bg-[#12141c] border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white active:scale-95"
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