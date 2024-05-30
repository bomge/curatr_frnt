const profileData: IProfile = {
    firstName: "Александр",
    lastName: "Кожевин",
    surName: "Юрьевич",
    role: "Куратор",
    group: { id: 24, name: 'ИИ-1', departmentId: 16 },
    faculty:  { name: "АИС", id: 5 },
    department: { name: "Искусственный интеллект", id: 16, facultyId: 5 },
    birthdayDate: "2000-05-11",
    phone: "123-456-7890",
	img:null,
	email:'email@example.com'
}

import ProfileDetails from '@/components/Profile/ProfileDetails';
import { useAuthStore } from '@/store/useAuthStore';
import type React from 'react';

export interface NameId {
    name: string;
    id: number;
}
export interface IKafedra {
	name: string, id: number, facultyId: number
}
export  interface IProfile {
	firstName: string,
	lastName: string,
	surName: string,
	role: string,
	group?: IGroup,
	faculty:NameId | null | undefined,
	department?:IKafedra | null | undefined,
	birthdayDate: string,
	phone: string
	img: string | null
	email: string
}



export const facultyData: { name: string, id: number }[] = [
    { name: "Естественные науки", id: 1 },
    { name: "Гуманитарные науки", id: 2 },
    { name: "Технические науки", id: 3 },
    { name: "Медицина", id: 4 },
    { name: "АИС", id: 5 },
];



// Генерация массива кафедр (department)
export const kafedraData: IKafedra[] = [
    { name: "Математика", id: 1, facultyId: 1 },
    { name: "Физика", id: 2, facultyId: 1 },
    { name: "Химия", id: 3, facultyId: 1 },
    { name: "Биология", id: 4, facultyId: 1 },
    { name: "Литература", id: 5, facultyId: 2 },
    { name: "История", id: 6, facultyId: 2 },
    { name: "Языкознание", id: 7, facultyId: 2 },
    { name: "Информационные технологии", id: 8, facultyId: 3 },
    { name: "Машиностроение", id: 9, facultyId: 3 },
    { name: "Архитектура", id: 10, facultyId: 3 },
    { name: "Хирургия", id: 11, facultyId: 4 },
    { name: "Терапия", id: 12, facultyId: 4 },
    { name: "Педиатрия", id: 13, facultyId: 4 },
    { name: "Программная инженерия", id: 14, facultyId: 5 },
    { name: "Базы данных", id: 15, facultyId: 5 },
    { name: "Искусственный интеллект", id: 16, facultyId: 5 },
];
export interface IGroup {
	id:number,
	name:string
	departmentId:number
}
export const allGroups: IGroup[] = [
	{ id: 1, name: 'ПИ-1', departmentId: 14 },
	{ id: 2, name: 'ПИ-2', departmentId: 14 },
	{ id: 3, name: 'БД-1', departmentId: 15 },
	{ id: 4, name: 'БД-2', departmentId: 15 },
	{ id: 5, name: 'ИИ-1', departmentId: 16 },
	{ id: 6, name: 'М-1', departmentId: 1 },
	{ id: 7, name: 'М-2', departmentId: 1 },
	{ id: 8, name: 'Ф-1', departmentId: 2 },
	{ id: 9, name: 'Х-1', departmentId: 3 },
	{ id: 10, name: 'Х-2', departmentId: 3 },
	{ id: 11, name: 'Б-1', departmentId: 4 },
	{ id: 12, name: 'Л-1', departmentId: 5 },
	{ id: 13, name: 'Л-2', departmentId: 5 },
	{ id: 14, name: 'И-1', departmentId: 6 },
	{ id: 15, name: 'Я-1', departmentId: 7 },
	{ id: 16, name: 'Я-2', departmentId: 7 },
	{ id: 17, name: 'МШ-1', departmentId: 9 },
	{ id: 18, name: 'МШ-2', departmentId: 9 },
	{ id: 19, name: 'А-1', departmentId: 10 },
	{ id: 20, name: 'Х-3', departmentId: 11 },
	{ id: 21, name: 'Т-1', departmentId: 12 },
	{ id: 22, name: 'П-1', departmentId: 13 },
	{ id: 23, name: 'П-2', departmentId: 13 },
	{ id: 24, name: 'ИИИ-1', departmentId: 16 },
  ];

export const rolesData: NameId[]=[
	{name: 'Декан', id: 1},
	{name: 'Куратор', id: 2},
	{name: 'Проректор', id: 3},
	{name: 'Работник', id: 4},
	{name: 'Помощник', id: 5},
]

const ProfilePage: React.FC = () => {
//   return <div>Event Page</div>;
	const { userRole } = useAuthStore();
	return <ProfileDetails profileData={profileData} allGroups={allGroups} userRole={userRole} allFaculty={facultyData} allDepartments={kafedraData} allRoles={rolesData}/>
};

export default ProfilePage;