export type IEventType = 'Академическое' | "Культурное" | "Спортивное" | 'Социальное'
export type IEventStatus = 'Предстоящее' | 'В процессе' | 'Завершено' | 'Отменено' | 'Перенесено'

export interface IEvent {
	id:number,
	name:string
	startDate:string
	endDate:string
	status:IEventStatus
	type:IEventType
	creator: string
	groups: string[]
	isImportant:boolean
}