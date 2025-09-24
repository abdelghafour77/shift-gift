import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PointageState {}

export const usePointageStore = create<PointageState>()(
  persist(() => ({}), {
    name: "Pointage-storage",
  })
);
