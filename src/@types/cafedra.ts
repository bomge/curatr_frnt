import type { ExtentedGroup, Group } from "./group";
import type { Person, workerFullInfo } from "./persons";

export interface CafedraInfo {
	id: number;
	shortName: string;
	fullName: string;
	dean: Person | null;
	headCafedra: Person | null;
	workers: Person[];
	groups: Group[];
  }

  export interface ExtendedCafedra extends CafedraInfo {
	groups: ExtentedGroup[];
}

export interface CafedraFullWorker extends CafedraInfo {
	workers: workerFullInfo[]
	groups: ExtentedGroup[]
  }