"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
export interface Workout {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  image: string;
}

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  toggleSaved: (workout: Workout) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export const FitLogProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // 1. Load from LocalStorage on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  // 2. Sync to LocalStorage when data changes
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  // Actions
  const addToPlan = (workout: Workout) => {
    if (!plan.find((w) => w.id === workout.id)) {
      setPlan([...plan, workout]);
      toast.success(`${workout.name} added to today's plan!`);
    } else {
      toast.error(`${workout.name} is already in your plan.`);
    }
  };

  const removeFromPlan = (id: string) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from plan.");
  };

  const toggleSaved = (workout: Workout) => {
    const isSaved = saved.find((w) => w.id === workout.id);
    if (isSaved) {
      setSaved(saved.filter((w) => w.id !== workout.id));
      toast.success("Removed from saved.");
    } else {
      setSaved([...saved, workout]);
      toast.success("Workout saved to library!");
    }
  };

  return (
    <FitLogContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, toggleSaved }}>
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (context === undefined) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
};