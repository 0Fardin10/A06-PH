"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface PlanItem {
  id: string;
  name: string;
  muscle?: string;
  equipment?: string;
  image?: string;
}

interface FitLogContextType {
  plan: PlanItem[];
  saved: PlanItem[];
  addToPlan: (item: PlanItem) => void;
  removeFromPlan: (id: string) => void;
  toggleSaved: (item: PlanItem) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved state from LocalStorage on initial load
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (error) {
      console.error("Failed to parse local storage state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state changes with LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, isLoaded]);

  // Add item to Today's Plan
  const addToPlan = (item: PlanItem) => {
    if (plan.some((p) => p.id === item.id)) {
      toast("Already in today's plan!", { icon: "ℹ️" });
      return;
    }
    setPlan((prev) => [...prev, item]);
    toast.success("Added to today's plan");
  };

  // Remove item from Today's Plan
  const removeFromPlan = (id: string) => {
    setPlan((prev) => prev.filter((p) => p.id !== id));
    toast.success("Removed from today's plan");
  };

  // Toggle item in Saved list
  const toggleSaved = (item: PlanItem) => {
    const isAlreadySaved = saved.some((s) => s.id === item.id);
    if (isAlreadySaved) {
      setSaved((prev) => prev.filter((s) => s.id !== item.id));
      toast.success("Removed from saved workouts");
    } else {
      setSaved((prev) => [...prev, item]);
      toast.success("Saved for later");
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
};