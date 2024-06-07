import type { Student, Person } from "./persons";

export interface Group {
	id: number;
	shortName: string;
	fullName: string;
  }

  export interface ExtentedGroup extends Group {
	students: Student[]
	curator?: Person | null
	leader?: Person | null
}