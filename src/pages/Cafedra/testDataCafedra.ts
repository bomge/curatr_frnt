import { CafedraInfo, Person, Group, FacultyInfo } from "./Cafedras.page";

  const persons: Person[] = [
	{ id: 1, firstName: 'Алексей', lastName: 'Иванов', surName: 'Петрович', role: 'Профессор' },
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
	  fullName: 'Кафедра Компьютерных Технологий и Программирования',
	  dean: null,//persons[0],
	  headCafedra: null,//persons[1],
	  workers: [],
	//   workers: [persons[2], persons[3]],
	  groups: [
		// groups[0], groups[1],
	  ]
	},
	{
	  id: 2,
	  shortName: 'ЭиМ',
	  fullName: 'Кафедра Экономики и Менеджмента',
	  dean: persons[4],
	  headCafedra: persons[5],
	  workers: [persons[6], persons[7]],
	  groups: [groups[2]]
	},
	{
	  id: 3,
	  shortName: 'ГУиП',
	  fullName: 'Кафедра Государственного Управления и Политологии',
	  dean: persons[8],
	  headCafedra: persons[9],
	  workers: [persons[10], persons[11]],
	  groups: [groups[3], groups[4], groups[5]]
	},
	{
	  id: 4,
	  shortName: 'ПМиВТ',
	  fullName: 'Кафедра Прикладной Математики и Вычислительной Техники',
	  dean: persons[12],
	  headCafedra: persons[13],
	  workers: [persons[14], persons[15]],
	  groups: [groups[6]]
	},
	{
	  id: 5,
	  shortName: 'ЛиП',
	  fullName: 'Кафедра Лингвистики и Перевода',
	  dean: persons[16],
	  headCafedra: persons[17],
	  workers: [persons[18], persons[19]],
	  groups: [groups[7], groups[8], groups[9]]
	},
	{
	  id: 6,
	  shortName: 'ИТиКБ',
	  fullName: 'Кафедра Информационных Технологий и Кибербезопасности',
	  dean: persons[20],
	  headCafedra: persons[21],
	  workers: [persons[22], persons[23]],
	  groups: [groups[10], groups[11]]
	},
	{
	  id: 7,
	  shortName: 'БиТиМ',
	  fullName: 'Кафедра Бизнеса и Технологического Менеджмента',
	  dean: persons[24],
	  headCafedra: persons[25],
	  workers: [persons[26], persons[27]],
	  groups: [groups[12], groups[13], groups[14]]
	},
	{
	  id: 8,
	  shortName: 'СиС',
	  fullName: 'Кафедра Социальных Исследований и Статистики',
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
  