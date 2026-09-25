import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export interface Workout {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  muscle?: string;
  categories?: string[];
  equipment?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  image?: string;
  imageUrl?: string;
}

// Fallback dataset (12 workouts covering every major muscle group)
const fallbackWorkouts: Workout[] = [
  { id: "barbell-bench-press", name: "Barbell Bench Press", muscle: "Chest", equipment: "Barbell, Bench", duration: 25, calories: 180, rating: 4.8, image: "/assets/banner.png" },
  { id: "pull-up", name: "Pull-Up", muscle: "Back", equipment: "Pull-up Bar", duration: 15, calories: 120, rating: 4.7, image: "/assets/banner.png" },
  { id: "back-squat", name: "Back Squat", muscle: "Legs", equipment: "Barbell, Rack", duration: 30, calories: 240, rating: 4.9, image: "/assets/banner.png" },
  { id: "overhead-press", name: "Overhead Press", muscle: "Shoulders", equipment: "Barbell", duration: 20, calories: 150, rating: 4.8, image: "/assets/banner.png" },
  { id: "dumbbell-bicep-curl", name: "Dumbbell Bicep Curl", muscle: "Arms", equipment: "Dumbbells", duration: 12, calories: 80, rating: 4.9, image: "/assets/banner.png" },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscle: "Hamstrings", equipment: "Barbell", duration: 25, calories: 210, rating: 4.8, image: "/assets/banner.png" },
  { id: "incline-dumbbell-press", name: "Incline Dumbbell Press", muscle: "Chest", equipment: "Dumbbells, Incline Bench", duration: 20, calories: 160, rating: 4.7, image: "/assets/banner.png" },
  { id: "cable-tricep-pushdown", name: "Tricep Pushdown", muscle: "Arms", equipment: "Cable Machine", duration: 15, calories: 95, rating: 4.6, image: "/assets/banner.png" },
  { id: "lateral-raise", name: "Dumbbell Lateral Raise", muscle: "Shoulders", equipment: "Dumbbells", duration: 12, calories: 75, rating: 4.5, image: "/assets/banner.png" },
  { id: "leg-press", name: "Leg Press", muscle: "Legs", equipment: "Leg Press Machine", duration: 20, calories: 190, rating: 4.7, image: "/assets/banner.png" },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", muscle: "Core", equipment: "Pull-up Bar", duration: 10, calories: 60, rating: 4.6, image: "/assets/banner.png" },
  { id: "barbell-row", name: "Barbell Bent-Over Row", muscle: "Back", equipment: "Barbell", duration: 22, calories: 175, rating: 4.8, image: "/assets/banner.png" },
];

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch API data");
    const data = await res.json();
    return data && data.length > 0 ? data : fallbackWorkouts;
  } catch (error) {
    console.warn("Using fallback workouts due to API error:", error);
    return fallbackWorkouts;
  }
}

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="font-oswald text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-wide mb-2">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => {
          const id = workout.id || workout._id || `workout-${index}`;
          const title = workout.name || workout.title || "Workout";
          const image = workout.image || workout.imageUrl || "/assets/banner.png";
          const tags = workout.categories && workout.categories.length > 0 
            ? workout.categories 
            : [workout.muscle || "General", "Arms"];

          return (
            <Link
              key={id}
              href={`/workout/${id}`}
              className="group block bg-[#121318] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-600 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-52 bg-zinc-900 overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Body */}
              <div className="p-6">
                
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Equipment */}
                <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-1 truncate">
                  {title}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 font-medium truncate">
                  {workout.equipment || "Barbell, Bench"}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-5 text-zinc-400 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 stroke-[2.5]" />
                    <span>{workout.duration || 25} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 stroke-[2.5]" />
                    <span>{workout.calories || 180} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 stroke-[2.5]" />
                    <span>{workout.rating || 4.8}</span>
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}