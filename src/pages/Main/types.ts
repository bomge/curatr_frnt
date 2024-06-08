export type IEventType = 'Академическое' | "Культурное" | "Спортивное" | 'Социальное' | 'Административное'
export type IEventStatus = 'Предстоящее' | 'В процессе' | 'Завершено' | 'Отменено' | 'Перенесено'
export interface IReport {
	numParticipants: number;
	comment: string;
  }

export interface IEvent {
	id:number,
	name:string
	startDate:string
	endDate:string
	status:IEventStatus
	type:IEventType// | string
	creator: string
	groups: string[]
	isImportant:boolean
	report?: IReport;
}