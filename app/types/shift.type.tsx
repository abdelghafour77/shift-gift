import type { Collaborator } from "./collaborator.type";
import type { Machine } from "./machine.type";

export interface ShiftResponse {
  id?: number;
  shiftDate: string;
  duree: Number;
  status: "ENTREE" | "SORTIE";
  collaborator: Collaborator;
  machine: Machine;
}

export interface Shift {
  id?: number;
  shiftDate: string;
  shiftHour: string;
  sens: "ENTREE" | "SORTIE";
}

export interface ShiftRequest {
  id?: number;
  shiftDate: string;
  shiftHour: string;
  collaboratorId: number;
  status: "ENTREE" | "SORTIE";
}
