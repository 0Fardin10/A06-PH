"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export interface Workout {
  id: string | number;
  _id?: string | number;
  name?: string;
  title?: string;
  muscle?: string;
  equipment?: string;
  image?: string;
  imageUrl?: string;
  gifUrl?: string;
  duration?: number;
  calories?: number;
  rating?: number;
}

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout) => {
        const workoutId = String(workout.id || workout._id || "");

        const workoutPayload = {
          id: workoutId,
          name: workout.name || workout.title || "Workout",
          muscle: workout.muscle || "GENERAL",
          equipment: workout.equipment || "Standard Equipment",
          image: workout.image || workout.gifUrl || workout.imageUrl || "/assets/banner.png",
          duration: workout.duration || 25,
          calories: workout.calories || 150,
          rating: workout.rating || 4.8,
        };

        return (
          <Link
            key={workoutId}
            href={`/workout/${workoutId}`}
            className="bg-[#12141c] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all shadow-lg group flex flex-col justify-between"
          >
            {/* Top Image */}
            <div className="relative w-full h-48 bg-zinc-900 overflow-hidden">
              <Image
                src={workoutPayload.image}
                alt={workoutPayload.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                {/* Muscle/Category Badges */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded">
                    GENERAL
                  </span>
                  <span className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded">
                    {workoutPayload.muscle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-oswald text-xl font-extrabold uppercase text-white tracking-wide truncate mb-1">
                  {workoutPayload.name}
                </h3>

                {/* Equipment */}
                <p className="text-xs text-zinc-400 font-medium truncate mb-4">
                  {workoutPayload.equipment}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-300 border-t border-zinc-800/60 pt-3 mt.auto">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{workoutPayload.duration} min</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-lime-400" />
                  <span>{workoutPayload.calories} kcal</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>{workoutPayload.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}