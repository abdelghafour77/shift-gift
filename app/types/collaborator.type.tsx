import type { Machine } from "./machine.type";

export interface Collaborator {
  id?: number;
  lastname: string;
  firstname: string;
  username: string;
  password: string;
  active: boolean;
  machine: Machine;
  serialNumber?: string;
  profile: "COLLABORATOR" | "ADMIN";
}
