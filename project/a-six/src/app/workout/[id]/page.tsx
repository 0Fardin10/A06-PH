import WorkoutDetailClient from "@/components/WorkoutDetailClient";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let workout = null;

  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data) {
        workout = {
          id: String(data.id || id),
          name: (data.name || data.title || "EXERCISE WORKOUT").toUpperCase(),
          description:
            data.description ||
            "A compound exercise that targets core muscle groups for maximum hypertrophy.",
          categories:
            Array.isArray(data.categories) && data.categories.length > 0
              ? data.categories
              : [data.muscle || "Chest", "Arms"].filter(Boolean),
          equipment: data.equipment || "Standard Equipment",
          difficulty: data.difficulty || "Intermediate",
          sets: data.sets || 4,
          reps: data.reps || "6-8",
          duration: data.duration || 25,
          calories: data.calories || 180,
          rating: data.rating || 4.8,
          instructions:
            Array.isArray(data.instructions) && data.instructions.length > 0
              ? data.instructions
              : [
                  "Form a solid base and engage core before initiating movement.",
                  "Execute reps under strict control with full range of motion.",
                  "Exhale during effort and inhale during return phase.",
                ],
          // API theke je image URL or GIF link asbe, thik setai direct use hobe
          image:
            data.image ||
            data.gifUrl ||
            data.imageUrl ||
            data.img ||
            "/assets/banner.png",
        };
      }
    }
  } catch (e) {
    console.warn("API load error:", e);
  }

  // API response na pele default fallback
  if (!workout) {
    workout = {
      id: id,
      name: "BARBELL BENCH PRESS",
      description:
        "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
      categories: ["Chest", "Arms"],
      equipment: "Barbell, Bench",
      difficulty: "Intermediate",
      sets: 4,
      reps: "6-8",
      duration: 25,
      calories: 180,
      rating: 4.8,
      instructions: [
        "Lie flat on the bench with eyes under the bar and feet planted.",
        "Unrack with locked elbows and lower the bar to mid-chest.",
        "Press up in a slight arc until elbows lock without bouncing.",
        "Keep shoulder blades pinched and a natural arch in the back.",
      ],
      image: "/assets/banner.png",
    };
  }

  return <WorkoutDetailClient workout={workout} />;
}