"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WorkoutItem {
  id: string;
  name: string;
  muscle?: string;
  equipment?: string;
  image?: string;
  duration?: number;
  calories?: number;
  rating?: number;
  isCompleted?: boolean;
}

interface FitLogContextType {
  plan: WorkoutItem[];
  saved: WorkoutItem[];
  isLoaded: boolean;
  toastMessage: string | null;
  showToast: (message: string) => void;
  addToPlan: (item: WorkoutItem) => void;
  toggleSaved: (item: WorkoutItem) => void;
  toggleDone: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<WorkoutItem[]>([]);
  const [saved, setSaved] = useState<WorkoutItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (e) {
      console.error("LocalStorage load error:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToPlan = (item: WorkoutItem) => {
    setPlan((prev) => {
      if (prev.some((p) => String(p.id) === String(item.id))) {
        showToast("Already in today's plan!");
        return prev;
      }
      showToast("Added to today's plan!");
      return [...prev, { ...item, isCompleted: false }];
    });
  };

  const toggleSaved = (item: WorkoutItem) => {
    setSaved((prev) => {
      const exists = prev.some((s) => String(s.id) === String(item.id));
      if (exists) {
        showToast("Removed from saved list");
        return prev.filter((s) => String(s.id) !== String(item.id));
      } else {
        showToast("Saved for later!");
        return [...prev, item];
      }
    });
  };

  const toggleDone = (id: string) => {
    setPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast("Removed from saved list");
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        toastMessage,
        showToast,
        addToPlan,
        toggleSaved,
        toggleDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}

      {/* Floating Toast Notification Pop-up */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1f28] border border-[#ccff00]/60 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}