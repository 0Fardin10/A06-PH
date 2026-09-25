"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import { Trash2, ExternalLink, Dumbbell } from "lucide-react";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const { plan, saved, removeFromPlan, toggleSaved } = useFitLog();

  const currentList = activeTab === "plan" ? plan : saved;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-oswald text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-wide mb-2">
          MY WORKOUT PLAN
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Track your planned sessions and saved workouts for future training.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800/80 mb-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-4 px-4 font-oswald text-lg uppercase font-bold tracking-wider transition-colors relative cursor-pointer ${
            activeTab === "plan"
              ? "text-[#ccff00]"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Today&apos;s Plan ({plan.length})
          {activeTab === "plan" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-4 px-4 font-oswald text-lg uppercase font-bold tracking-wider transition-colors relative cursor-pointer ${
            activeTab === "saved"
              ? "text-[#ccff00]"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Saved Workouts ({saved.length})
          {activeTab === "saved" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
          )}
        </button>
      </div>

      {/* Content List */}
      {currentList.length === 0 ? (
        <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl p-12 text-center my-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="font-oswald text-xl font-bold uppercase text-white mb-2">
            No Workouts {activeTab === "plan" ? "In Today's Plan" : "Saved Yet"}
          </h3>
          <p className="text-zinc-500 text-sm max-w-md mb-6">
            {activeTab === "plan"
              ? "Browse the library and add exercises to lock in today's routine."
              : "Save exercises from the library to build your future training logs."}
          </p>
          <Link
            href="/"
            className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition"
          >
            Browse Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((workout) => (
            <div
              key={workout.id}
              className="bg-[#121318] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-44 bg-zinc-900">
                  <Image
                    src={workout.image || "/assets/banner.png"}
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="inline-block bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-sm mb-3">
                    {workout.muscle || "General"}
                  </span>
                  <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-1 truncate">
                    {workout.name}
                  </h3>
                  <p className="text-zinc-500 text-xs font-medium truncate mb-4">
                    {workout.equipment || "Standard Equipment"}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-5 pt-0 flex items-center gap-3">
                <Link
                  href={`/workout/${workout.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg border border-zinc-800 transition"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(workout.id)
                      : toggleSaved(workout)
                  }
                  title="Remove"
                  className="p-2.5 text-zinc-500 hover:text-red-400 bg-zinc-900/50 hover:bg-red-500/10 border border-zinc-800 rounded-lg transition"
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