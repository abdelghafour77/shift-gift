import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Collaborator } from "../types";

interface GlobalState {
  collaborator: Collaborator | null;
  setCollaborator: (collaborator: Collaborator) => void;
  clear: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      collaborator: null,
      recentShifts: [],

      setCollaborator: (value) => set({ collaborator: value }),
      clear: () => {
        set({
          collaborator: null,
        });
        useGlobalStore.persist.clearStorage();
      },
    }),
    {
      name: "Global-storage",
    }
  )
);
