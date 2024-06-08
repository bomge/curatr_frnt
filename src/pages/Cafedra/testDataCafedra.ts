// import { extendsGroups } from "../Group/testDataGroup";

import type { CafedraInfo, CafedraFullWorker } from "@/@types/cafedra";
import type { FacultyInfo, FacultyFull } from "@/@types/faculty";
import type { ExtentedGroup, Group } from "@/@types/group";
import type { Person, workerFullInfo, IfreeWorker } from "@/@types/persons";

export  const persons: Person[] = [
	{ id: 1, firstName: 'Алексей', lastName: 'Иванов', surName: 'Петрович', role: 'Профессор', },
	{ id: 2, firstName: 'Мария', lastName: 'Смирнова', surName: 'Игоревна', role: 'Доктор наук' },
	{ id: 3, firstName: 'Сергей', lastName: 'Кузнецов', surName: 'Александрович', role: 'Куратор ИП-21' },
	{ id: 4, firstName: 'Ольга', lastName: 'Попова', surName: 'Владимировна', role: 'Доцент' },
	{ id: 5, firstName: 'Дмитрий', lastName: 'Соколов', surName: 'Николаевич', role: 'Куратор ИП-22' },
	{ id: 6, firstName: 'Анна', lastName: 'Лебедева', surName: 'Сергеевна', role: 'Ассистент' },
	{ id: 7, firstName: 'Иван', lastName: 'Козлов', surName: 'Петрович', role: 'Куратор ЭМ-31' },
	{ id: 8, firstName: 'Екатерина', lastName: 'Новикова', surName: 'Андреевна', role: 'Кандидат наук' },
	{ id: 9, firstName: 'Максим', lastName: 'Морозов', surName: 'Викторович', role: 'Куратор ГУП-41' },
	{ id: 10, firstName: 'Наталья', lastName: 'Павлова', surName: 'Дмитриевна', role: 'Куратор ГУП-42' },
	{ id: 11, firstName: 'Владимир', lastName: 'Богданов', surName: 'Иванович', role: 'Куратор ГУП-43' },
	{ id: 12, firstName: 'Татьяна', lastName: 'Воробьева', surName: 'Александровна', role: 'Лаборант' },
	{ id: 13, firstName: 'Григорий', lastName: 'Федоров', surName: 'Михайлович', role: 'Куратор ПМВ-21' },
	{ id: 14, firstName: 'Елена', lastName: 'Михайлова', surName: 'Григорьевна', role: 'Куратор ЛП-31' },
	{ id: 15, firstName: 'Юрий', lastName: 'Николаев', surName: 'Васильевич', role: 'Куратор ЛП-32' },
	{ id: 16, firstName: 'Светлана', lastName: 'Макарова', surName: 'Игоревна', role: 'Куратор ЛП-33' },
	{ id: 17, firstName: 'Андрей', lastName: 'Зайцев', surName: 'Павлович', role: 'Куратор ИТК-21' },
	{ id: 18, firstName: 'Алина', lastName: 'Соловьева', surName: 'Романовна', role: 'Куратор ИТК-22' },
	{ id: 19, firstName: 'Роман', lastName: 'Петров', surName: 'Борисович', role: 'Куратор БТМ-41' },
	{ id: 20, firstName: 'Марина', lastName: 'Васильева', surName: 'Геннадьевна', role: 'Куратор БТМ-42' },
	{ id: 21, firstName: 'Павел', lastName: 'Александров', surName: 'Леонидович', role: 'Куратор БТМ-43' },
	{ id: 22, firstName: 'Людмила', lastName: 'Мартынова', surName: 'Евгеньевна', role: 'Куратор СИС-31' },
	{ id: 23, firstName: 'Кирилл', lastName: 'Григорьев', surName: 'Степанович', role: 'Куратор СИС-32' },
	{ id: 24, firstName: 'Вера', lastName: 'Афанасьева', surName: 'Романовна', role: 'Старший преподаватель' },
	{ id: 25, firstName: 'Николай', lastName: 'Тихонов', surName: 'Сергеевич', role: 'Академик' },
	{ id: 26, firstName: 'Игорь', lastName: 'Казаков', surName: 'Александрович', role: 'Методист' },
	{ id: 27, firstName: 'София', lastName: 'Полякова', surName: 'Дмитриевна', role: 'Преподаватель' },
	{ id: 28, firstName: 'Валентин', lastName: 'Кузьмин', surName: 'Владимирович', role: 'Старший преподаватель' },
	{ id: 29, firstName: 'Лариса', lastName: 'Калинина', surName: 'Николаевна', role: 'Доцент' },
	{ id: 30, firstName: 'Станислав', lastName: 'Беляев', surName: 'Павлович', role: 'Преподаватель' },
	{ id: 31, firstName: 'Анастасия', lastName: 'Горбунова', surName: 'Геннадьевна', role: 'Преподаватель' },
	{ id: 32, firstName: 'Георгий', lastName: 'Терентьев', surName: 'Евгеньевич', role: 'Старший преподаватель' },
	{ id: 33, firstName: 'Милана', lastName: 'Орлова', surName: 'Степановна', role: 'Преподаватель' },
	{ id: 34, firstName: 'Руслан', lastName: 'Сидоров', surName: 'Романович', role: 'Преподаватель' },
	{ id: 35, firstName: 'Ева', lastName: 'Фомина', surName: 'Борисовна', role: 'Доцент' }
  ];

  const groups: Group[] = [
	{ id: 1, shortName: 'ИП-21', fullName: 'Информатика и программирование' },
	{ id: 2, shortName: 'ИП-22', fullName: 'Информатика и программирование' },
	{ id: 3, shortName: 'ЭМ-31', fullName: 'Экономика и менеджмент' },
	{ id: 4, shortName: 'ГУП-41', fullName: 'Государственное управление и политология' },
	{ id: 5, shortName: 'ГУП-42', fullName: 'Государственное управление и политология' },
	{ id: 6, shortName: 'ГУП-43', fullName: 'Государственное управление и политология' },
	{ id: 7, shortName: 'ПМВ-21', fullName: 'Прикладная математика и вычислительная техника' },
	{ id: 8, shortName: 'ЛП-31', fullName: 'Лингвистика и перевод' },
	{ id: 9, shortName: 'ЛП-32', fullName: 'Лингвистика и перевод' },
	{ id: 10, shortName: 'ЛП-33', fullName: 'Лингвистика и перевод' },
	{ id: 11, shortName: 'ИТК-21', fullName: 'Информационные технологии и кибербезопасность' },
	{ id: 12, shortName: 'ИТК-22', fullName: 'Информационные технологии и кибербезопасность' },
	{ id: 13, shortName: 'БТМ-41', fullName: 'Бизнес и технологический менеджмент' },
	{ id: 14, shortName: 'БТМ-42', fullName: 'Бизнес и технологический менеджмент' },
	{ id: 15, shortName: 'БТМ-43', fullName: 'Бизнес и технологический менеджмент' },
	{ id: 16, shortName: 'СИС-31', fullName: 'Социальные исследования и статистика' },
	{ id: 17, shortName: 'СИС-32', fullName: 'Социальные исследования и статистика' }
  ];


  export const cafedras: CafedraInfo[] = [
	{
	  id: 1,
	  shortName: 'КТиП',
	  fullName: 'Компьютерных Технологий и Программирования',
	  dean: null,//persons[0],
	  headCafedra: null,//persons[1],
	//   workers: [],
	  workers: [persons[2], persons[3]],
	  groups: [
		groups[0], groups[1],
	  ]
	},
	{
	  id: 2,
	  shortName: 'ЭиМ',
	  fullName: 'Экономики и Менеджмента',
	  dean: persons[4],
	  headCafedra: persons[5],
	  workers: [persons[6], persons[7]],
	  groups: [groups[2]]
	},
	{
	  id: 3,
	  shortName: 'ГУиП',
	  fullName: 'Государственного Управления и Политологии',
	  dean: persons[8],
	  headCafedra: persons[9],
	  workers: [persons[10], persons[11]],
	  groups: [groups[3], groups[4], groups[5]]
	},
	{
	  id: 4,
	  shortName: 'ПМиВТ',
	  fullName: 'Прикладной Математики и Вычислительной Техники',
	  dean: persons[12],
	  headCafedra: persons[13],
	  workers: [persons[14], persons[15]],
	  groups: [groups[6]]
	},
	{
	  id: 5,
	  shortName: 'ЛиП',
	  fullName: 'Лингвистики и Перевода',
	  dean: persons[16],
	  headCafedra: persons[17],
	  workers: [persons[18], persons[19]],
	  groups: [groups[7], groups[8], groups[9]]
	},
	{
	  id: 6,
	  shortName: 'ИТиКБ',
	  fullName: 'Информационных Технологий и Кибербезопасности',
	  dean: persons[20],
	  headCafedra: persons[21],
	  workers: [persons[22], persons[23]],
	  groups: [groups[10], groups[11]]
	},
	{
	  id: 7,
	  shortName: 'БиТиМ',
	  fullName: 'Бизнеса и Технологического Менеджмента',
	  dean: persons[24],
	  headCafedra: persons[25],
	  workers: [persons[26], persons[27]],
	  groups: [groups[12], groups[13], groups[14]]
	},
	{
	  id: 8,
	  shortName: 'СиС',
	  fullName: 'Социальных Исследований и Статистики',
	  dean: persons[28], // Using Мария Смирнова again as dean
	  headCafedra: persons[29], // Using Сергей Кузнецов again as headCafedra
	  workers: [persons[30], persons[31], persons[32], persons[33], persons[34]],
	  groups: [groups[15], groups[16]]
	}
  ];

  export const faculties: FacultyInfo[] = [
	{
	  id: 1,
	  shortName: 'ФИТ',
	  fullName: 'Факультет Информационных Технологий',
	  cafedras: [
		{ id: 1 }, // КТиП
		{ id: 6 }, // ИТиКБ
	  ]
	},
	{
	  id: 2,
	  shortName: 'ФУиЭ',
	  fullName: 'Факультет Управления и Экономики',
	  cafedras: [
		{ id: 2 }, // ЭиМ
		{ id: 3 }, // ГУиП
		{ id: 7 }, // БиТиМ
	  ]
	},
	{
	  id: 3,
	  shortName: 'ФМиВТ',
	  fullName: 'Факультет Математики и Вычислительной Техники',
	  cafedras: [
		{ id: 4 }, // ПМиВТ
		{ id: 8 }, // СиС
	  ]
	},
	{
	  id: 4,
	  shortName: 'ФЛиП',
	  fullName: 'Факультет Лингвистики и Перевода',
	  cafedras: [
		{ id: 5 }, // ЛиП
	  ]
	}
  ];

  export const workers: workerFullInfo[] = [
	{
	  id: 1,
	  firstName: "Алексей",
	  lastName: "Иванов",
	  surName: "Петрович",
	  scienceDegree: "Профессор",
	  faculty: faculties[2],
	  role: "Декан",
	  cafedra: cafedras[0], // КТиП is part of ФМиВТ
	  group: groups[0], // ИП-21 is part of КТиП
	},
	{
	  id: 2,
	  firstName: "Мария",
	  lastName: "Смирнова",
	  surName: "Игоревна",
	  scienceDegree: "Доктор наук",
	  faculty: faculties[2],
	  role: "Работник",
	  cafedra: cafedras[7], // СиС is part of ФМиВТ
	  group: groups[15], // СИС-31 is part of СиС
	},
	{
	  id: 3,
	  firstName: "Сергей",
	  lastName: "Кузнецов",
	  surName: "Александрович",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[2],
	  role: "Куратор",
	  cafedra: cafedras[7], // СиС is part of ФМиВТ
	  group: groups[15], // СИС-31 is part of СиС
	},
	{
	  id: 4,
	  firstName: "Ольга",
	  lastName: "Попова",
	  surName: "Владимировна",
	  scienceDegree: "Доцент",
	  faculty: faculties[2],
	  role: "Зав. кафедры",
	  cafedra: cafedras[0], // КТиП is part of ФМиВТ
	  group: groups[0], // ИП-21 is part of КТиП
	},
	{
	  id: 5,
	  firstName: "Дмитрий",
	  lastName: "Соколов",
	  surName: "Николаевич",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[2],
	  role: "Куратор",
	  cafedra: cafedras[0], // КТиП is part of ФМиВТ
	  group: groups[1], // ИП-22 is part of КТиП
	},
	{
	  id: 6,
	  firstName: "Анна",
	  lastName: "Лебедева",
	  surName: "Сергеевна",
	  scienceDegree: "Ассистент",
	  faculty: faculties[2],
	  role: "Работник",
	  cafedra: cafedras[0], // КТиП is part of ФМиВТ
	  group: groups[0], // ИП-21 is part of КТиП
	},
	{
	  id: 7,
	  firstName: "Иван",
	  lastName: "Козлов",
	  surName: "Петрович",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[1],
	  role: "Куратор",
	  cafedra: cafedras[2], // ГУиП is part of ФУиЭ
	  group: groups[3], // ГУП-41 is part of ГУиП
	},
	{
	  id: 8,
	  firstName: "Екатерина",
	  lastName: "Новикова",
	  surName: "Андреевна",
	  scienceDegree: "Кандидат наук",
	  faculty: faculties[1],
	  role: "Работник",
	  cafedra: cafedras[2], // ГУиП is part of ФУиЭ
	  group: groups[4], // ГУП-42 is part of ГУиП
	},
	{
	  id: 9,
	  firstName: "Максим",
	  lastName: "Морозов",
	  surName: "Викторович",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[3],
	  role: "Куратор",
	  cafedra: cafedras[4], // ЛиП is part of ФЛиП
	  group: groups[8], // ЛП-32 is part of ЛиП
	},
	{
	  id: 10,
	  firstName: "Наталья",
	  lastName: "Павлова",
	  surName: "Дмитриевна",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[3],
	  role: "Куратор",
	  cafedra: cafedras[4], // ЛиП is part of ФЛиП
	  group: groups[9], // ЛП-33 is part of ЛиП
	},
	{
	  id: 11,
	  firstName: "Владимир",
	  lastName: "Богданов",
	  surName: "Иванович",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[3],
	  role: "Декан",
	  cafedra: cafedras[4], // ЛиП is part of ФЛиП
	  group: groups[7], // ЛП-31 is part of ЛиП
	},
	{
	  id: 12,
	  firstName: "Татьяна",
	  lastName: "Воробьева",
	  surName: "Александровна",
	  scienceDegree: "Лаборант",
	  faculty: faculties[2],
	  role: "Работник",
	  cafedra: cafedras[7], // СиС is part of ФМиВТ
	  group: groups[16], // СИС-32 is part of СиС
	},
	{
	  id: 13,
	  firstName: "Григорий",
	  lastName: "Федоров",
	  surName: "Михайлович",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[2],
	  role: "Куратор",
	  cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФФиП has no cafedras)
	  group: groups[16], // СИС-32 is part of СиС
	},
	{
	  id: 14,
	  firstName: "Елена",
	  lastName: "Михайлова",
	  surName: "Григорьевна",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[3],
	  role: "Куратор",
	  cafedra: cafedras[6], // БиТиМ is part of ФУиЭ
	  group: groups[12], // БТМ-41 is part of БиТиМ
	},
	{
	  id: 15,
	  firstName: "Юрий",
	  lastName: "Николаев",
	  surName: "Васильевич",
	  scienceDegree: "Преподаватель",
	  faculty: faculties[3],
	  role: "Куратор",
	  cafedra: cafedras[6], // БиТиМ is part of ФУиЭ
	  group: groups[13], // БТМ-42 is part of БиТиМ
	},
	{
		id: 16,
		firstName: "Светлана",
		lastName: "Макарова",
		surName: "Игоревна",
		scienceDegree: "Преподаватель",
		faculty: faculties[3],
		role: "Декан",
		cafedra: cafedras[6], // БиТиМ is part of ФУиЭ
		group: groups[14], // БТМ-43 is part of БиТиМ
	  },
	  {
		id: 17,
		firstName: "Андрей",
		lastName: "Зайцев",
		surName: "Павлович",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Куратор",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФФиП has no cafedras)
		group: groups[15], // СИС-31 is part of СиС
	  },
	  {
		id: 18,
		firstName: "Алина",
		lastName: "Соловьева",
		surName: "Романовна",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Куратор",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФФиП has no cafedras)
		group: groups[16], // СИС-32 is part of СиС
	  },
	  {
		id: 19,
		firstName: "Роман",
		lastName: "Петров",
		surName: "Борисович",
		scienceDegree: "Преподаватель",
		faculty: faculties[3],
		role: "Куратор",
		cafedra: cafedras[2], // ГУиП is part of ФУиЭ (assuming ФПиА has no cafedras)
		group: groups[3], // ГУП-41 is part of ГУиП
	  },
	  {
		id: 20,
		firstName: "Марина",
		lastName: "Васильева",
		surName: "Геннадьевна",
		scienceDegree: "Преподаватель",
		faculty: faculties[3],
		role: "Куратор",
		cafedra: cafedras[2], // ГУиП is part of ФУиЭ (assuming ФПиА has no cafedras)
		group: groups[4], // ГУП-42 is part of ГУиП
	  },
	  {
		id: 21,
		firstName: "Павел",
		lastName: "Александров",
		surName: "Леонидович",
		scienceDegree: "Преподаватель",
		faculty: faculties[3],
		role: "Зав. кафедры",
		cafedra: cafedras[2], // ГУиП is part of ФУиЭ (assuming ФПиА has no cafedras)
		group: groups[5], // ГУП-43 is part of ГУиП
	  },
	  {
		id: 22,
		firstName: "Людмила",
		lastName: "Мартынова",
		surName: "Евгеньевна",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Куратор",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФХиБ has no cafedras)
		group: groups[15], // СИС-31 is part of СиС
	  },
	  {
		id: 23,
		firstName: "Кирилл",
		lastName: "Григорьев",
		surName: "Степанович",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Куратор",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФХиБ has no cafedras)
		group: groups[16], // СИС-32 is part of СиС
	  },
	  {
		id: 24,
		firstName: "Вера",
		lastName: "Афанасьева",
		surName: "Романовна",
		scienceDegree: "Старший преподаватель",
		faculty: faculties[2],
		role: "Работник",
		cafedra: cafedras[0], // КТиП is part of ФМиВТ
		group: groups[0], // ИП-21 is part of КТиП
	  },
	  {
		id: 25,
		firstName: "Николай",
		lastName: "Тихонов",
		surName: "Сергеевич",
		scienceDegree: "Академик",
		faculty: faculties[0],
		role: "Проректор",
		cafedra: cafedras[1], // ЭиМ is part of ФИТ
		group: groups[2], // ЭМ-31 is part of ЭиМ
	  },
	  {
		id: 26,
		firstName: "Игорь",
		lastName: "Казаков",
		surName: "Александрович",
		scienceDegree: "Методист",
		faculty: faculties[0],
		role: "Работник",
		cafedra: cafedras[5], // ИТиКБ is part of ФИТ
		group: groups[10], // ИТК-21 is part of ИТиКБ
	  },
	  {
		id: 27,
		firstName: "София",
		lastName: "Полякова",
		surName: "Дмитриевна",
		scienceDegree: "Преподаватель",
		faculty: faculties[1],
		role: "Работник",
		cafedra: cafedras[2], // ГУиП is part of ФУиЭ
		group: groups[3], // ГУП-41 is part of ГУиП
	  },
	  {
		id: 28,
		firstName: "Валентин",
		lastName: "Кузьмин",
		surName: "Владимирович",
		scienceDegree: "Старший преподаватель",
		faculty: faculties[3],
		role: "Работник",
		cafedra: cafedras[4], // ЛиП is part of ФЛиП
		group: groups[7], // ЛП-31 is part of ЛиП
	  },
	  {
		id: 29,
		firstName: "Лариса",
		lastName: "Калинина",
		surName: "Николаевна",
		scienceDegree: "Доцент",
		faculty: faculties[3],
		role: "Зав. кафедры",
		cafedra: cafedras[4], // ЛиП is part of ФЛиП
		group: groups[8], // ЛП-32 is part of ЛиП
	  },
	  {
		id: 30,
		firstName: "Станислав",
		lastName: "Беляев",
		surName: "Павлович",
		scienceDegree: "Преподаватель",
		faculty: faculties[3],
		role: "Работник",
		cafedra: cafedras[6], // БиТиМ is part of ФУиЭ
		group: groups[12], // БТМ-41 is part of БиТиМ
	  },{
		id: 31,
		firstName: "Анастасия",
		lastName: "Горбунова",
		surName: "Геннадьевна",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Работник",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФФиП has no cafедры)
		group: groups[15], // СИС-31 is part of СиС
	  },
	  {
		id: 32,
		firstName: "Георгий",
		lastName: "Терентьев",
		surName: "Евгеньевич",
		scienceDegree: "Старший преподаватель",
		faculty: faculties[3],
		role: "Работник",
		cafedra: cafedras[2], // ГУиП is part of ФУиЭ (assuming ФПиА has no cafедры)
		group: groups[4], // ГУП-42 is part of ГУиП
	  },
	  {
		id: 33,
		firstName: "Милана",
		lastName: "Орлова",
		surName: "Степановна",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Работник",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФХиБ has no cafедры)
		group: groups[16], // СИС-32 is part of СиС
	  },
	  {
		id: 34,
		firstName: "Руслан",
		lastName: "Сидоров",
		surName: "Романович",
		scienceDegree: "Преподаватель",
		faculty: faculties[2],
		role: "Декан",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФХиБ has no cafедры)
		group: groups[15], // СИС-31 is part of СиС
	  },
	  {
		id: 355,
		firstName: "Ева",
		lastName: "Фомина",
		surName: "Борисовна",
		scienceDegree: "Доцент",
		faculty: faculties[2],
		role: "Зав. кафедры",
		cafedra: cafedras[7], // СиС is part of ФМиВТ (assuming ФХиБ has no cafедры)
		group: groups[16], // СИС-32 is part of СиС
	  }
] 
export const freeWorkers:IfreeWorker[] = [
  {
    id: 100,
    firstName: "Александр",
    lastName: "Петров",
    surName: "Иванович",
    scienceDegree: "Кандидат наук",
    role: "Работник",
  },
  {
    id: 101,
    firstName: "Елизавета",
    lastName: "Соколова",
    surName: "Андреевна",
    scienceDegree: "Преподаватель",
    role: "Работник",
  },
  {
    id: 102,
    firstName: "Даниил",
    lastName: "Степанов",
    surName: "Михайлович",
    scienceDegree: "Лаборант",
    role: "Работник",
  },
  {
    id: 103,
    firstName: "Анжелика",
    lastName: "Волкова",
    surName: "Владимировна",
    scienceDegree: "Ассистент",
    role: "Работник",
  },
  {
    id: 104,
    firstName: "Егор",
    lastName: "Ковалев",
    surName: "Алексеевич",
    scienceDegree: "Доцент",
    role: "Работник",
  },
  {
    id: 105,
    firstName: "Виктория",
    lastName: "Никитина",
    surName: "Сергеевна",
    scienceDegree: "Преподаватель",
    role: "Работник",
  },
  {
    id: 106,
    firstName: "Тимур",
    lastName: "Ахметов",
    surName: "Ильдарович",
    scienceDegree: "Кандидат наук",
    role: "Работник",
  },
  {
    id: 107,
    firstName: "Ксения",
    lastName: "Филиппова",
    surName: "Евгеньевна",
    scienceDegree: "Преподаватель",
    role: "Работник",
  },
  {
    id: 108,
    firstName: "Артем",
    lastName: "Гусев",
    surName: "Игоревич",
    scienceDegree: "Старший преподаватель",
    role: "Работник",
  },
  {
    id: 109,
    firstName: "Полина",
    lastName: "Семенова",
    surName: "Дмитриевна",
    scienceDegree: "Ассистент",
    role: "Работник",
  },
];
export const extendsGroups: ExtentedGroup[] = [
	{
	  id: 1,
	  shortName: 'ИП-21',
	  fullName: 'Информатика и программирование',
	  students: [
	  ],
	  curator: persons[0],
	},
	{
	  id: 2,
	  shortName: 'ИП-22',
	  fullName: 'Информатика и программирование',
	  students: [
	  ],
	  curator: persons[1]
	},
	{
	  id: 3,
	  shortName: 'ЭМ-31',
	  fullName: 'Экономика и менеджмент',
	  students: [
	  ],
	  curator: persons[1]
	},
	{
	  id: 4,
	  shortName: 'ГУП-41',
	  fullName: 'Государственное управление и политология',
	  students: [
	  ],
	  curator: persons[2],
	},
	{
	  id: 5,
	  shortName: 'ГУП-42',
	  fullName: 'Государственное управление и политология',
	  students: [
	  ],
	  curator: persons[3],
	},
	{
		id: 6,
		shortName: 'ГУП-43',
		fullName: 'Государственное управление и политология',
		students: [
		],
	  },
	  {
		id: 7,
		shortName: 'ПМВ-21',
		fullName: 'Прикладная математика и вычислительная техника',
		students: []
	  },
	  {
		id: 8,
		shortName: 'ЛП-31',
		fullName: 'Лингвистика и перевод',
		students: []
	  },
	  {
		id: 9,
		shortName: 'ЛП-32',
		fullName: 'Лингвистика и перевод',
		students: []
	  },
	  {
		id: 10,
		shortName: 'ЛП-33',
		fullName: 'Лингвистика и перевод',
		students: []
	  },
	  {
		id: 11,
		shortName: 'ИТК-21',
		fullName: 'Информационные технологии и кибербезопасность',
		students: []
	  },
	  {
		id: 12,
		shortName: 'ИТК-22',
		fullName: 'Информационные технологии и кибербезопасность',
		students: []
	  },
	  {
		id: 13,
		shortName: 'БТМ-41',
		fullName: 'Бизнес и технологический менеджмент',
		students: []
	  },
	  {
		id: 14,
		shortName: 'БТМ-42',
		fullName: 'Бизнес и технологический менеджмент',
		students: []
	  },
	  {
		id: 15,
		shortName: 'БТМ-43',
		fullName: 'Бизнес и технологический менеджмент',
		students: []
	  },
	  {
		id: 16,
		shortName: 'СИС-31',
		fullName: 'Социальные исследования и статистика',
		students: []
	  },
	  {
		id: 17,
		shortName: 'СИС-32',
		fullName: 'Социальные исследования и статистика',
		students: []
	  }
  ];
export const cafedrasWorkers: CafedraFullWorker[] = [
	{
	  id: 1,
	  shortName: 'КТиП',
	  fullName: 'Компьютерных Технологий и Программирования',
	  dean: persons[0],
	  headCafedra: persons[1],
	//   workers: [],
	  workers: [workers[2], workers[3]],
	  groups: [
		extendsGroups[0], extendsGroups[1],
	  ]
	},
	{
	  id: 2,
	  shortName: 'ЭиМ',
	  fullName: 'Экономики и Менеджмента',
	  dean: persons[4],
	  headCafedra: persons[5],
	  workers: [workers[6], workers[7]],
	  groups: [extendsGroups[2]]
	},
	{
	  id: 3,
	  shortName: 'ГУиП',
	  fullName: 'Государственного Управления и Политологии',
	  dean: persons[8],
	  headCafedra: persons[9],
	  workers: [workers[10], workers[11]],
	  groups: [extendsGroups[3], extendsGroups[4], extendsGroups[5]]
	},
	{
	  id: 4,
	  shortName: 'ПМиВТ',
	  fullName: 'Прикладной Математики и Вычислительной Техники',
	  dean: persons[12],
	  headCafedra: persons[13],
	  workers: [workers[14], workers[15]],
	  groups: [extendsGroups[6]]
	},
	{
	  id: 5,
	  shortName: 'ЛиП',
	  fullName: 'Лингвистики и Перевода',
	  dean: persons[16],
	  headCafedra: persons[17],
	  workers: [workers[18], workers[19]],
	  groups: [extendsGroups[7], extendsGroups[8], extendsGroups[9]]
	},
	{
	  id: 6,
	  shortName: 'ИТиКБ',
	  fullName: 'Информационных Технологий и Кибербезопасности',
	  dean: persons[20],
	  headCafedra: persons[21],
	  workers: [workers[22], workers[23]],
	  groups: [extendsGroups[10], extendsGroups[11]]
	},
	{
	  id: 7,
	  shortName: 'БиТиМ',
	  fullName: 'Бизнеса и Технологического Менеджмента',
	  dean: persons[24],
	  headCafedra: persons[25],
	  workers: [workers[26], workers[27]],
	  groups: [extendsGroups[12], extendsGroups[13], extendsGroups[14]]
	},
	{
	  id: 8,
	  shortName: 'СиС',
	  fullName: 'Социальных Исследований и Статистики',
	  dean: persons[28], // Using Мария Смирнова again as dean
	  headCafedra: persons[29], // Using Сергей Кузнецов again as headCafedra
	  workers: [workers[30], workers[31], workers[32], workers[33], workers[34]],
	  groups: [extendsGroups[15], extendsGroups[16]]
	}
  ];
export const facultiesFull: FacultyFull[] = [
	{
	  id: 1,
	  shortName: 'ФИТ',
	  fullName: 'Факультет Информационных Технологий',
	  cafedras: [
		cafedrasWorkers[0], // КТиП
		cafedrasWorkers[5], // ИТиКБ
	  ]
	},
	{
	  id: 2,
	  shortName: 'ФУиЭ',
	  fullName: 'Факультет Управления и Экономики',
	  cafedras: [
		cafedrasWorkers[1], // ЭиМ
		cafedrasWorkers[2], // ГУиП
		cafedrasWorkers[6], // БиТиМ
	  ]
	},
	{
	  id: 3,
	  shortName: 'ФМиВТ',
	  fullName: 'Факультет Математики и Вычислительной Техники',
	  cafedras: [
		cafedrasWorkers[3], // ПМиВТ
		cafedrasWorkers[7], // СиС
	  ]
	},
	{
	  id: 4,
	  shortName: 'ФЛиП',
	  fullName: 'Факультет Лингвистики и Перевода',
	  cafedras: [
		cafedrasWorkers[4], // ЛиП
	  ]
	}
  ];