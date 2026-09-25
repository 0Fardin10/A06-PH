"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import { Clock, Flame, Star, ChevronDown, Loader2, Trash2 } from "lucide-react";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "name">("duration");
  const [mounted, setMounted] = useState(false);

  const { plan, saved, isLoaded, toggleDone, removeFromPlan, removeFromSaved } = useFitLog();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tabQuery === "saved") {
      setActiveTab("saved");
    } else if (tabQuery === "plan") {
      setActiveTab("plan");
    }
  }, [tabQuery]);

  const currentListRaw = activeTab === "plan" ? plan : saved;

  const currentList = useMemo(() => {
    return [...currentListRaw].sort((a, b) => {
      if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
      if (sortBy === "calories") return (b.calories || 0) - (a.calories || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      return 0;
    });
  }, [currentListRaw, sortBy]);

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, item) => acc + (item.duration || 0), 0);
  const totalCalories = plan.reduce((acc, item) => acc + (item.calories || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-oswald text-4xl sm:text-5xl font-black uppercase text-white tracking-wide mb-1.5">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm font-medium">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="bg-[#101217] border border-zinc-800/80 rounded-2xl grid grid-cols-3 divide-x divide-zinc-800/80 mb-8 p-6 sm:p-8">
        <div className="pr-4 sm:pr-8">
          <span className="text-zinc-400 font-medium text-xs tracking-wide block mb-1">
            Exercises
          </span>
          <div className="font-oswald text-4xl sm:text-5xl font-black text-[#ccff00]">
            {totalExercises}
          </div>
        </div>

        <div className="px-4 sm:px-8">
          <span className="text-zinc-400 font-medium text-xs tracking-wide block mb-1">
            Minutes
          </span>
          <div className="font-oswald text-4xl sm:text-5xl font-black text-white">
            {totalMinutes}
          </div>
        </div>

        <div className="pl-4 sm:pl-8">
          <span className="text-zinc-400 font-medium text-xs tracking-wide block mb-1">
            Calories
          </span>
          <div className="font-oswald text-4xl sm:text-5xl font-black text-white">
            {totalCalories}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="bg-[#12141c] p-1 rounded-xl border border-zinc-800/60 flex items-center gap-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 text-xs font-extrabold uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === "plan"
                ? "bg-[#252932] text-white shadow-md"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 text-xs font-extrabold uppercase rounded-lg transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#252932] text-white shadow-md"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-zinc-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-[#1c1f28] border border-zinc-800 text-xs font-bold text-white pl-3.5 pr-8 py-2 rounded-lg cursor-pointer focus:outline-none focus:border-zinc-600 transition"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="name">Name</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Item List */}
      {!mounted || !isLoaded ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-400">
          <Loader2 className="w-7 h-7 animate-spin text-[#ccff00]" />
          <p className="font-medium text-xs tracking-wider uppercase">Loading workouts…</p>
        </div>
      ) : currentList.length === 0 ? (
        <div className="border border-dashed border-zinc-800/90 rounded-2xl p-12 sm:p-20 text-center my-4 bg-[#101217]/50 flex flex-col items-center justify-center">
          <h3 className="font-oswald text-2xl sm:text-3xl font-black uppercase text-white tracking-wider mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mb-6 font-medium">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition shadow-md shadow-[#ccff00]/10"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((workout) => (
            <div
              key={workout.id}
              className={`bg-[#12141c] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                workout.isCompleted ? "opacity-60 border-green-900/40" : ""
              }`}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800/50">
                  <Image
                    src={workout.image || "/assets/banner.png"}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="font-oswald text-lg sm:text-xl font-bold uppercase text-white tracking-wide truncate">
                    {workout.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mb-2.5 truncate">
                    {workout.equipment || "Standard Equipment"}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>{workout.duration || 25} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-lime-400" />
                      <span>{workout.calories || 180} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span>{workout.rating || 4.8}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details, Mark as Done, and Remove Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                {/* View Details Button -> opens workout detail page */}
                <Link
                  href={`/workout/${workout.id}`}
                  className="bg-[#1c1f28] hover:bg-zinc-800 text-zinc-200 hover:text-white font-extrabold text-xs uppercase px-5 py-2.5 rounded-full border border-zinc-700/60 transition text-center"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => toggleDone(workout.id)}
                    className={`font-extrabold text-xs uppercase px-5 py-2.5 rounded-full transition cursor-pointer ${
                      workout.isCompleted
                        ? "bg-zinc-800 text-green-400 border border-green-500/40"
                        : "bg-[#ccff00] hover:bg-[#b3e600] text-black shadow-md shadow-[#ccff00]/10"
                    }`}
                  >
                    {workout.isCompleted ? "Done ✓" : "Mark as Done"}
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="text-zinc-500 hover:text-red-400 p-2 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white font-bold">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}