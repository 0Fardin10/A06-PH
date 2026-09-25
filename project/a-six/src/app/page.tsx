import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let workouts = [];

  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        workouts = data;
      } else if (data && Array.isArray(data.workouts)) {
        workouts = data.workouts;
      }
    }
  } catch (error) {
    console.error("API fetch error:", error);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. The Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-oswald text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Library Component */}
        <WorkoutLibrary workouts={workouts} />
      </section>
    </main>
  );
}