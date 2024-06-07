import type { CafedraFullWorker } from "./cafedra";

export interface FacultyInfo {
	id: number;
	shortName: string;
	fullName: string;
	cafedras: { id: number }[]
  }

  export interface FacultyFull extends FacultyInfo {
	cafedras: CafedraFullWorker[]
  }