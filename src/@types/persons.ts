export interface Person {
	id: number;
	firstName: string;
	lastName: string;
	surName: string;
	role?:string
  }

  export interface Student extends Person {
	isLeader?: boolean
}

export interface IInfo {
	id: number;
	shortName: string;
	fullName: string;
  }
  
  export interface ISearchPersonWorker extends Person {
	avatar?: string;
	scienceDegree: string;
	faculty: IInfo;
  }
  
  export interface ISearchPersonStudent extends Person {
	avatar?: string;
	isStudent: boolean;
	faculty: IInfo;
	group: IInfo & { leader?: { id: number } };
  }

  export interface workerFullInfo extends Person {
	avatar?: string;
	scienceDegree: string;
	faculty?: IInfo;
	cafedra?: IInfo //s.name f.name id
	group?: IInfo | null
  }

  export interface IfreeWorker extends Person {
	scienceDegree: string
  }