import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

// Flexible interface to handle potential variations in the live API response
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

async function getWorkouts(): Promise<Workout[]> {
  try {
    // Fetching from the provided API endpoint
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store", // Ensures fresh data; change to "force-cache" for static generation
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return []; // Return an empty array on failure so the UI doesn't crash
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

      {/* Workout Grid */}
      {workouts.length === 0 ? (
        <div className="text-zinc-400 text-center py-20 border border-zinc-800/80 rounded-2xl">
          No workouts found. Please check your API connection.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => {
            // Normalizing live API data properties to ensure the UI doesn't break
            const id = workout.id || workout._id || Math.random().toString();
            const title = workout.name || workout.title || "Unknown Workout";
            const image = workout.image || workout.imageUrl || "/assets/banner.png";
            // Handle both array-based categories and string-based muscle groups
            const tags = workout.categories 
              ? workout.categories 
              : workout.muscle 
                ? [workout.muscle] 
                : ["General"];

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

                {/* Card Content */}
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
                    {workout.equipment || "Bodyweight"}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-5 text-zinc-400 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 stroke-[2.5]" />
                      <span>{workout.duration || 15} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 stroke-[2.5]" />
                      <span>{workout.calories || 120} kcal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 stroke-[2.5]" />
                      <span>{workout.rating || "4.5"}</span>
                    </div>
                  </div>
                  
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}