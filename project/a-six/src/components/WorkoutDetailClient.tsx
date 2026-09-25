"use client";

import Image from "next/image";
import { useFitLog } from "@/context/FitLogContext";
import {
  Plus,
  Bookmark,
  Check,
  BookmarkCheck,
  Clock,
  Flame,
  Star,
  Dumbbell,
  BarChart2,
  Layers,
  Repeat,
} from "lucide-react";

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* Left Side — Visual/Media Column */}
        <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[620px] bg-[#121318] border border-zinc-800/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl sticky top-24">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Side — Workout Information */}
        <div className="flex flex-col">
          
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workout.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-sm"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-oswald text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-none mb-4">
            {workout.name}
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
            {workout.description}
          </p>

          {/* Key Specs Panel */}
          <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl p-6 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              KEY SPECS
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Dumbbell className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Equipment</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold truncate">
                  {workout.equipment}
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <BarChart2 className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Difficulty</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.difficulty}
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Sets</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Repeat className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Reps</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.reps}
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Duration</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Calories</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.calories} kcal
                </p>
              </div>

              <div className="bg-[#181920] p-3.5 rounded-xl border border-zinc-800/50 col-span-2 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium mb-1">
                  <Star className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Rating</span>
                </div>
                <p className="text-zinc-200 text-xs sm:text-sm font-bold">
                  {workout.rating} / 5.0
                </p>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mb-10">
            <h3 className="font-oswald text-2xl font-bold uppercase text-white tracking-wide mb-4">
              INSTRUCTIONS
            </h3>

            <ol className="space-y-3">
              {workout.instructions.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 bg-[#121318] border border-zinc-800/60 p-4 rounded-xl"
                >
                  <span className="w-7 h-7 rounded-full bg-[#1d2a05] text-[#ccff00] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToPlan}
              className={`flex-1 flex items-center justify-center gap-2 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer ${
                isPlanned
                  ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black active:scale-95"
              }`}
            >
              {isPlanned ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add to Today&apos;s Plan</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleSaved}
              className={`flex-1 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSaved
                  ? "bg-zinc-800 text-[#ccff00] border-[#ccff00]/40"
                  : "bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white active:scale-95"
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
                  <span>Save for Later</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}