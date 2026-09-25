import { notFound } from "next/navigation";
import WorkoutDetailClient, { WorkoutDetail } from "@/components/WorkoutDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSingleWorkout(id: string): Promise<WorkoutDetail | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch workout details");
    }

    const data = await res.json();

    return {
      id: data.id || data._id || id,
      name: data.name || data.title || "Barbell Bench Press",
      description:
        data.description ||
        "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
      categories: data.categories || (data.muscle ? [data.muscle, "Arms"] : ["Chest", "Arms"]),
      equipment: data.equipment || "Barbell, Bench",
      difficulty: data.difficulty || "Intermediate",
      sets: data.sets || 4,
      reps: data.reps || "6-8",
      duration: data.duration || 25,
      calories: data.calories || 180,
      rating: data.rating || 4.8,
      instructions: data.instructions || [
        "Lie flat on the bench with feet firm on the floor and grip the bar slightly wider than shoulder-width.",
        "Unrack the bar and lower it smoothly to mid-chest while keeping elbows at a 45-degree angle.",
        "Press the bar explosively back up to the starting position without locking out elbows aggressively.",
        "Rerack safely after completing all reps in the set.",
      ],
      image: data.image || data.imageUrl || "/assets/banner.png",
    };
  } catch (error) {
    console.error("Single Workout Fetch Error:", error);
    return null;
  }
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getSingleWorkout(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailClient workout={workout} />;
}