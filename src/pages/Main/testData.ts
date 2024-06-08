export const events = [
	{
	  id: 1,
	  name: 'Встреча факультета',
	  startDate: '2024-06-08T10:00',
	  endDate: '2024-06-10T12:00',
	  type: 'Административное',
	  status: 'Завершено',
	  creator: 'Декан Иван Петров',
	  groups: ['ИП-21', 'ИП-22'],
	  isImportant: false,
	},
	{
	  id: 2,
	  name: 'Выставка студенческих работ',
	  startDate: '2024-06-01T14:00',
	  endDate: '2024-06-06T18:00',
	  type: 'Культурное',
	  status: 'Завершено',
	  creator: 'Проф. Елена Андреева',
	  groups: ['ИП-22', 'ЭМ-31', 'ГУП-41', 'ГУП-42', 'БТМ-41'],
	  isImportant: true,
	},
	{
	  id: 3,
	  name: 'Научный симпозиум',
	  startDate: '2024-06-03T09:00',
	  endDate: '2024-06-03T17:00',
	  type: 'Академическое',
	  status: 'Завершено',
	  creator: 'Д-р Александр Петров',
	  groups: ['ЭМ-31', 'ГУП-43'],
	  isImportant: false,
	},
	{
	  id: 4,
	  name: 'Сетевое событие для выпускников',
	  startDate: '2024-06-05T18:00',
	  endDate: '2024-06-05T21:00',
	  type: 'Социальное',
	  status: 'Завершено',
	  creator: 'Отдел по работе с выпускниками',
	  groups: ['ГУП-41', 'ГУП-42', 'БТМ-42'],
	  isImportant: true,
	},
	{
	  id: 5,
	  name: 'Межвузовский футбольный турнир',
	  startDate: '2024-06-08T10:00',
	  endDate: '2024-06-12T18:00',
	  type: 'Спортивное',
	  status: 'Завершено',
	  creator: 'Тренер Сергей Иванов',
	  groups: ['ИТК-21', 'ИТК-22', 'СИС-31'],
	  isImportant: false,
	},
	{
	  id: 6,
	  name: 'Заседание Попечительского совета',
	  startDate: '2024-06-10T09:00',
	  endDate: '2024-06-10T15:00',
	  type: 'Административное',
	  status: 'Завершено',
	  creator: 'Секретарь Анна Кузнецова',
	  groups: ['БТМ-41', 'БТМ-42', 'ЛП-33'],
	  isImportant: true,
	},
	{
	  id: 7,
	  name: 'Концерт Музыкального отдела',
	  startDate: '2024-06-12T19:00',
	  endDate: '2024-06-12T22:00',
	  type: 'Культурное',
	  status: 'Завершено',
	  creator: 'Д-р Михаил Борисов',
	  groups: ['ЛП-31', 'ЛП-32', 'СИС-32'],
	  isImportant: false,
	},
	{
	  id: 8,
	  name: 'Церемония вручения дипломов',
	  startDate: '2024-06-15T10:00',
	  endDate: '2024-06-15T13:00',
	  type: 'Академическое',
	  status: 'Предстоящее',
	  creator: 'Академическое управление',
	  groups: ['ИП-21', 'ИП-22', 'ЭМ-31', 'ГУП-41', 'ГУП-42'],
	  isImportant: true,
	},
	{
	  id: 9,
	  name: 'Мастерская факультета',
	  startDate: '2024-06-17T14:00',
	  endDate: '2024-06-17T16:00',
	  type: 'Административное',
	  status: 'Предстоящее',
	  creator: 'Проф. Виктория Романова',
	  groups: ['ГУП-41', 'ГУП-42', 'ГУП-43'],
	  isImportant: false,
	},
	{
	  id: 10,
	  name: 'Выборы студенческого совета',
	  startDate: '2024-06-18T09:00',
	  endDate: '2024-06-18T17:00',
	  type: 'Административное',
	  status: 'Предстоящее',
	  creator: 'Ассоциация студенческого совета',
	  groups: ['ГУП-43', 'ИТК-21', 'ИТК-22'],
	  isImportant: true,
	},
	{
	  id: 11,
	  name: 'Постановка Театрального отдела',
	  startDate: '2024-06-19T19:00',
	  endDate: '2024-06-21T22:00',
	  type: 'Культурное',
	  status: 'Предстоящее',
	  creator: 'Проф. Ольга Соколова',
	  groups: ['ЛП-31', 'ЛП-32', 'ЛП-33', 'СИС-31'],
	  isImportant: false,
	},
	{
	  id: 12,
	  name: 'День общественных работ',
	  startDate: '2024-06-22T08:00',
	  endDate: '2024-06-22T17:00',
	  type: 'Социальное',
	  status: 'Предстоящее',
	  creator: 'Отдел общественных связей',
	  groups: ['СИС-31', 'СИС-32', 'БТМ-41', 'БТМ-42'],
	  isImportant: true,
	},
	{
	  id: 13,
	  name: 'Срок подачи заявок на грант',
	  startDate: '2024-06-24T23:59',
	  endDate: '2024-06-24T23:59',
	  type: 'Административное',
	  status: 'Предстоящее',
	  creator: 'Администрация научных исследований',
	  groups: ['ИТК-21', 'ИТК-22', 'ЭМ-31'],
	  isImportant: false,
	},
	{
		id: 14,
		name: 'Прием на выставке студенческих работ', 
		startDate: '2024-06-26T17:00',
		endDate: '2024-06-26T19:00',
		type: 'Культурное',
		status: 'Предстоящее',
		creator: 'Проф. Елизавета Степанова',
		groups: ['ИП-21', 'ИП-22'],
		isImportant: false,
	  },
	  {
		id: 15,
		name: 'День памяти (нет занятий)',
		startDate: '2024-06-29T00:00', 
		endDate: '2024-06-29T23:59',
		type: 'Административное',
		status: 'Предстоящее',
		creator: 'Академическое управление',
		groups: ['БТМ-41', 'БТМ-42', 'ГУП-41', 'ГУП-42'],
		isImportant: false,
	  },
	  {
		id: 16,
		name: 'Студенческая конференция по программированию',
		startDate: '2024-06-20T09:00',
		endDate: '2024-06-21T17:00',
		type: 'Академическое',
		status: 'Предстоящее',
		creator: 'Проф. Иван Сидоров',
		groups: ['ИТК-21', 'ИТК-22', 'СИС-31', 'СИС-32'],
		isImportant: true,
	  },
	  {
		id: 17, 
		name: 'Региональный турнир по шахматам',
		startDate: '2024-06-23T10:00',
		endDate: '2024-06-24T18:00',
		type: 'Спортивное',
		status: 'Предстоящее',
		creator: 'Тренер Анна Кузнецова',
		groups: ['ЛП-31', 'ЛП-32', 'ЛП-33'],
		isImportant: false,
	  },
	  {
		id: 18,
		name: 'Мастер-класс по живописи',
		startDate: '2024-06-25T14:00',
		endDate: '2024-06-25T17:00', 
		type: 'Культурное',
		status: 'Предстоящее',
		creator: 'Художник Петр Иванов',
		groups: ['ЛП-31', 'ЛП-33', 'ГУП-43'],
		isImportant: false,
	  },
	  {
		id: 19,
		name: 'Семинар по карьерному развитию', 
		startDate: '2024-06-28T16:00',
		endDate: '2024-06-28T19:00',
		type: 'Социальное',
		status: 'Предстоящее',
		creator: 'Карьерный центр',
		groups: ['ИП-22', 'ГУП-42', 'БТМ-42'],
		isImportant: true,
	  },
	  {
		id: 20,
		name: 'Форум студенческих организаций',
		startDate: '2024-06-30T09:00',
		endDate: '2024-06-30T18:00',
		type: 'Административное', 
		status: 'Предстоящее',
		creator: 'Студенческий союз',
		groups: ['ГУП-43', 'ИТК-21', 'БТМ-41', 'СИС-31'],
		isImportant: true,
	  },
	  {
		id: 21,
		name: 'Встреча выпускников',
		startDate: '2024-06-14T18:00',
		endDate: '2024-06-14T21:00',
		type: 'Социальное',
		status: 'Завершено',
		creator: 'Ассоциация выпускников',
		groups: ['ГУП-41', 'ИП-21'],
		isImportant: false,
	  },
	  {
		id: 22,
		name: 'Научная конференция студентов',
		startDate: '2024-06-14T09:00',
		endDate: '2024-06-14T17:00',
		type: 'Академическое', 
		status: 'Предстоящее',
		creator: 'Проф. Андрей Смирнов',
		groups: ['ЭМ-31', 'СИС-32', 'БТМ-42'],
		isImportant: true,
	  },
	  {
		id: 23, 
		name: 'Открытая лекция по искусству',
		startDate: '2024-06-14T14:00',
		endDate: '2024-06-14T16:00',
		type: 'Культурное',
		status: 'В процессе', 
		creator: 'Музей современного искусства',
		groups: ['ЛП-31', 'ЛП-33', 'ГУП-42'],
		isImportant: false,
	  },


	  {
		id: 24,
		name: 'Лекция по квантовой физике',
		startDate: '2024-06-16T10:00',
		endDate: '2024-06-16T12:00',
		type: 'Академическое',
		status: 'Предстоящее',
		creator: 'Проф. Иван Иванов',
		groups: ['ФИЗ-21', 'ФИЗ-22'],
		isImportant: false,
	  },
	  {
		id: 25,
		name: 'Выставка фотографий природы',
		startDate: '2024-06-16T14:00',
		endDate: '2024-06-16T18:00',
		type: 'Культурное',
		status: 'В процессе',
		creator: 'Фотоклуб университета',
		groups: ['ГУП-43', 'БТМ-41'],
		isImportant: false,
	  },
	  {
		id: 26,
		name: 'Турнир по баскетболу',
		startDate: '2024-06-16T09:00',
		endDate: '2024-06-16T15:00',
		type: 'Спортивное',
		status: 'Завершено',
		creator: 'Спортивный клуб',
		groups: ['ИТК-21', 'СИС-31'],
		isImportant: true,
	  },
	  {
		id: 27,
		name: 'Ярмарка вакансий',
		startDate: '2024-06-16T11:00',
		endDate: '2024-06-16T17:00',
		type: 'Социальное',
		status: 'В процессе',
		creator: 'Карьерный центр',
		groups: ['ИП-22', 'ГУП-42', 'БТМ-42'],
		isImportant: true,
	  },
	  {
		id: 28,
		name: 'Собрание студенческого совета',
		startDate: '2024-06-16T15:00',
		endDate: '2024-06-16T17:00',
		type: 'Административное',
		status: 'Предстоящее',
		creator: 'Студенческий союз',
		groups: ['ГУП-43', 'СИС-31'],
		isImportant: false,
	  },
	  {
		id: 29,
		name: 'Празднование Дня независимости (отмена занятий)',
		startDate: '2024-06-16T00:00',
		endDate: '2024-06-16T23:59',
		type: 'Административное',
		status: 'Отменено',
		creator: 'Администрация университета',
		groups: ['Все группы'],
		isImportant: true,
	  },
	  {
		id: 30,
		name: 'Музыкальный фестиваль (перенесено с 15 июня)',
		startDate: '2024-06-16T19:00',
		endDate: '2024-06-16T22:00',
		type: 'Культурное',
		status: 'Перенесено',
		creator: 'Музыкальный клуб',
		groups: ['ЛП-31', 'ЛП-32', 'ЛП-33'],
		isImportant: false,
	  },
	]

export const eventsWithReports = [
    {
        "id": 1,
        "name": "Встреча факультета",
        "startDate": "2024-06-08T10:00",
        "endDate": "2024-06-10T12:00",
        "type": "Административное",
        "status": "Завершено",
        "creator": "Декан Иван Петров",
        "groups": [
            "ИП-21",
            "ИП-22"
        ],
        "isImportant": false
    },
    {
        "id": 2,
        "name": "Выставка студенческих работ",
        "startDate": "2024-06-01T14:00",
        "endDate": "2024-06-06T18:00",
        "type": "Культурное",
        "status": "Завершено",
        "creator": "Проф. Елена Андреева",
        "groups": [
            "ИП-22",
            "ЭМ-31",
            "ГУП-41",
            "ГУП-42",
            "БТМ-41"
        ],
        "isImportant": true
    },
    {
        "id": 3,
        "name": "Научный симпозиум",
        "startDate": "2024-06-03T09:00",
        "endDate": "2024-06-03T17:00",
        "type": "Академическое",
        "status": "Завершено",
        "creator": "Д-р Александр Петров",
        "groups": [
            "ЭМ-31",
            "ГУП-43"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЭМ-31",
                    "id": 264
                },
                "report": {
                    "numParticipants": 16,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 4,
        "name": "Сетевое событие для выпускников",
        "startDate": "2024-06-05T18:00",
        "endDate": "2024-06-05T21:00",
        "type": "Социальное",
        "status": "Завершено",
        "creator": "Отдел по работе с выпускниками",
        "groups": [
            "ГУП-41",
            "ГУП-42",
            "БТМ-42"
        ],
        "isImportant": true
    },
    {
        "id": 5,
        "name": "Межвузовский футбольный турнир",
        "startDate": "2024-06-08T10:00",
        "endDate": "2024-06-12T18:00",
        "type": "Спортивное",
        "status": "Завершено",
        "creator": "Тренер Сергей Иванов",
        "groups": [
            "ИТК-21",
            "ИТК-22",
            "СИС-31"
        ],
        "isImportant": false
    },
    {
        "id": 6,
        "name": "Заседание Попечительского совета",
        "startDate": "2024-06-10T09:00",
        "endDate": "2024-06-10T15:00",
        "type": "Административное",
        "status": "Завершено",
        "creator": "Секретарь Анна Кузнецова",
        "groups": [
            "БТМ-41",
            "БТМ-42",
            "ЛП-33"
        ],
        "isImportant": true
    },
    {
        "id": 7,
        "name": "Концерт Музыкального отдела",
        "startDate": "2024-06-12T19:00",
        "endDate": "2024-06-12T22:00",
        "type": "Культурное",
        "status": "Завершено",
        "creator": "Д-р Михаил Борисов",
        "groups": [
            "ЛП-31",
            "ЛП-32",
            "СИС-32"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЛП-31",
                    "id": 495
                },
                "report": {
                    "numParticipants": 12,
                    "comment": "Report for group ЛП-31 in event Концерт Музыкального отдела"
                }
            },
            {
                "group": {
                    "name": "ЛП-32",
                    "id": 711
                },
                "report": {
                    "numParticipants": 96,
                    "comment": "Report for group ЛП-32 in event Концерт Музыкального отдела"
                }
            },
            {
                "group": {
                    "name": "СИС-32",
                    "id": 769
                },
                "report": {
                    "numParticipants": 63,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 8,
        "name": "Церемония вручения дипломов",
        "startDate": "2024-06-15T10:00",
        "endDate": "2024-06-15T13:00",
        "type": "Академическое",
        "status": "Предстоящее",
        "creator": "Академическое управление",
        "groups": [
            "ИП-21",
            "ИП-22",
            "ЭМ-31",
            "ГУП-41",
            "ГУП-42"
        ],
        "isImportant": true,
        "reports": [
            {
                "group": {
                    "name": "ИП-21",
                    "id": 684
                },
                "report": {
                    "numParticipants": 56,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ИП-22",
                    "id": 52
                },
                "report": {
                    "numParticipants": 31,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ГУП-41",
                    "id": 504
                },
                "report": {
                    "numParticipants": 58,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ГУП-42",
                    "id": 631
                },
                "report": {
                    "numParticipants": 43,
                    "comment": "Report for group ГУП-42 in event Церемония вручения дипломов"
                }
            }
        ]
    },
    {
        "id": 9,
        "name": "Мастерская факультета",
        "startDate": "2024-06-17T14:00",
        "endDate": "2024-06-17T16:00",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Проф. Виктория Романова",
        "groups": [
            "ГУП-41",
            "ГУП-42",
            "ГУП-43"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ГУП-41",
                    "id": 156
                },
                "report": {
                    "numParticipants": 66,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ГУП-42",
                    "id": 781
                },
                "report": {
                    "numParticipants": 39,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 635
                },
                "report": {
                    "numParticipants": 34,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 10,
        "name": "Выборы студенческого совета",
        "startDate": "2024-06-18T09:00",
        "endDate": "2024-06-18T17:00",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Ассоциация студенческого совета",
        "groups": [
            "ГУП-43",
            "ИТК-21",
            "ИТК-22"
        ],
        "isImportant": true,
        "reports": [
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 656
                },
                "report": {
                    "numParticipants": 62,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ИТК-22",
                    "id": 767
                },
                "report": {
                    "numParticipants": 84,
                    "comment": "Report for group ИТК-22 in event Выборы студенческого совета"
                }
            }
        ]
    },
    {
        "id": 11,
        "name": "Постановка Театрального отдела",
        "startDate": "2024-06-19T19:00",
        "endDate": "2024-06-21T22:00",
        "type": "Культурное",
        "status": "Предстоящее",
        "creator": "Проф. Ольга Соколова",
        "groups": [
            "ЛП-31",
            "ЛП-32",
            "ЛП-33",
            "СИС-31"
        ],
        "isImportant": false
    },
    {
        "id": 12,
        "name": "День общественных работ",
        "startDate": "2024-06-22T08:00",
        "endDate": "2024-06-22T17:00",
        "type": "Социальное",
        "status": "Предстоящее",
        "creator": "Отдел общественных связей",
        "groups": [
            "СИС-31",
            "СИС-32",
            "БТМ-41",
            "БТМ-42"
        ],
        "isImportant": true
    },
    {
        "id": 13,
        "name": "Срок подачи заявок на грант",
        "startDate": "2024-06-24T23:59",
        "endDate": "2024-06-24T23:59",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Администрация научных исследований",
        "groups": [
            "ИТК-21",
            "ИТК-22",
            "ЭМ-31"
        ],
        "isImportant": false
    },
    {
        "id": 14,
        "name": "Прием на выставке студенческих работ",
        "startDate": "2024-06-26T17:00",
        "endDate": "2024-06-26T19:00",
        "type": "Культурное",
        "status": "Предстоящее",
        "creator": "Проф. Елизавета Степанова",
        "groups": [
            "ИП-21",
            "ИП-22"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ИП-21",
                    "id": 882
                },
                "report": {
                    "numParticipants": 17,
                    "comment": "Report for group ИП-21 in event Прием на выставке студенческих работ"
                }
            },
            {
                "group": {
                    "name": "ИП-22",
                    "id": 421
                },
                "report": {
                    "numParticipants": 14,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 15,
        "name": "День памяти (нет занятий)",
        "startDate": "2024-06-29T00:00",
        "endDate": "2024-06-29T23:59",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Академическое управление",
        "groups": [
            "БТМ-41",
            "БТМ-42",
            "ГУП-41",
            "ГУП-42"
        ],
        "isImportant": false
    },
    {
        "id": 16,
        "name": "Студенческая конференция по программированию",
        "startDate": "2024-06-20T09:00",
        "endDate": "2024-06-21T17:00",
        "type": "Академическое",
        "status": "Предстоящее",
        "creator": "Проф. Иван Сидоров",
        "groups": [
            "ИТК-21",
            "ИТК-22",
            "СИС-31",
            "СИС-32"
        ],
        "isImportant": true,
        "reports": [
            {
                "group": {
                    "name": "ИТК-21",
                    "id": 159
                },
                "report": {
                    "numParticipants": 34,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ИТК-22",
                    "id": 329
                },
                "report": {
                    "numParticipants": 35,
                    "comment": "Report for group ИТК-22 in event Студенческая конференция по программированию"
                }
            }
        ]
    },
    {
        "id": 17,
        "name": "Региональный турнир по шахматам",
        "startDate": "2024-06-23T10:00",
        "endDate": "2024-06-24T18:00",
        "type": "Спортивное",
        "status": "Предстоящее",
        "creator": "Тренер Анна Кузнецова",
        "groups": [
            "ЛП-31",
            "ЛП-32",
            "ЛП-33"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЛП-32",
                    "id": 566
                },
                "report": {
                    "numParticipants": 88,
                    "comment": "Report for group ЛП-32 in event Региональный турнир по шахматам"
                }
            },
            {
                "group": {
                    "name": "ЛП-33",
                    "id": 943
                },
                "report": {
                    "numParticipants": 70,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 18,
        "name": "Мастер-класс по живописи",
        "startDate": "2024-06-25T14:00",
        "endDate": "2024-06-25T17:00",
        "type": "Культурное",
        "status": "Предстоящее",
        "creator": "Художник Петр Иванов",
        "groups": [
            "ЛП-31",
            "ЛП-33",
            "ГУП-43"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЛП-31",
                    "id": 270
                },
                "report": {
                    "numParticipants": 38,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 501
                },
                "report": {
                    "numParticipants": 67,
                    "comment": "Report for group ГУП-43 in event Мастер-класс по живописи"
                }
            }
        ]
    },
    {
        "id": 19,
        "name": "Семинар по карьерному развитию",
        "startDate": "2024-06-28T16:00",
        "endDate": "2024-06-28T19:00",
        "type": "Социальное",
        "status": "Предстоящее",
        "creator": "Карьерный центр",
        "groups": [
            "ИП-22",
            "ГУП-42",
            "БТМ-42"
        ],
        "isImportant": true
    },
    {
        "id": 20,
        "name": "Форум студенческих организаций",
        "startDate": "2024-06-30T09:00",
        "endDate": "2024-06-30T18:00",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Студенческий союз",
        "groups": [
            "ГУП-43",
            "ИТК-21",
            "БТМ-41",
            "СИС-31"
        ],
        "isImportant": true,
        "reports": [
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 799
                },
                "report": {
                    "numParticipants": 83,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "БТМ-41",
                    "id": 536
                },
                "report": {
                    "numParticipants": 28,
                    "comment": "Report for group БТМ-41 in event Форум студенческих организаций"
                }
            }
        ]
    },
    {
        "id": 21,
        "name": "Встреча выпускников",
        "startDate": "2024-06-14T18:00",
        "endDate": "2024-06-14T21:00",
        "type": "Социальное",
        "status": "Завершено",
        "creator": "Ассоциация выпускников",
        "groups": [
            "ГУП-41",
            "ИП-21"
        ],
        "isImportant": false
    },
    {
        "id": 22,
        "name": "Научная конференция студентов",
        "startDate": "2024-06-14T09:00",
        "endDate": "2024-06-14T17:00",
        "type": "Академическое",
        "status": "Предстоящее",
        "creator": "Проф. Андрей Смирнов",
        "groups": [
            "ЭМ-31",
            "СИС-32",
            "БТМ-42"
        ],
        "isImportant": true
    },
    {
        "id": 23,
        "name": "Открытая лекция по искусству",
        "startDate": "2024-06-14T14:00",
        "endDate": "2024-06-14T16:00",
        "type": "Культурное",
        "status": "В процессе",
        "creator": "Музей современного искусства",
        "groups": [
            "ЛП-31",
            "ЛП-33",
            "ГУП-42"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЛП-31",
                    "id": 669
                },
                "report": {
                    "numParticipants": 48,
                    "comment": "Report for group ЛП-31 in event Открытая лекция по искусству"
                }
            },
            {
                "group": {
                    "name": "ЛП-33",
                    "id": 236
                },
                "report": {
                    "numParticipants": 36,
                    "comment": "Report for group ЛП-33 in event Открытая лекция по искусству"
                }
            },
            {
                "group": {
                    "name": "ГУП-42",
                    "id": 168
                },
                "report": {
                    "numParticipants": 32,
                    "comment": "Report for group ГУП-42 in event Открытая лекция по искусству"
                }
            }
        ]
    },
    {
        "id": 24,
        "name": "Лекция по квантовой физике",
        "startDate": "2024-06-16T10:00",
        "endDate": "2024-06-16T12:00",
        "type": "Академическое",
        "status": "Предстоящее",
        "creator": "Проф. Иван Иванов",
        "groups": [
            "ФИЗ-21",
            "ФИЗ-22"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ФИЗ-21",
                    "id": 877
                },
                "report": {
                    "numParticipants": 32,
                    "comment": "Report for group ФИЗ-21 in event Лекция по квантовой физике"
                }
            },
            {
                "group": {
                    "name": "ФИЗ-22",
                    "id": 640
                },
                "report": {
                    "numParticipants": 47,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 25,
        "name": "Выставка фотографий природы",
        "startDate": "2024-06-16T14:00",
        "endDate": "2024-06-16T18:00",
        "type": "Культурное",
        "status": "В процессе",
        "creator": "Фотоклуб университета",
        "groups": [
            "ГУП-43",
            "БТМ-41"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 982
                },
                "report": {
                    "numParticipants": 22,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "БТМ-41",
                    "id": 203
                },
                "report": {
                    "numParticipants": 79,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 26,
        "name": "Турнир по баскетболу",
        "startDate": "2024-06-16T09:00",
        "endDate": "2024-06-16T15:00",
        "type": "Спортивное",
        "status": "Завершено",
        "creator": "Спортивный клуб",
        "groups": [
            "ИТК-21",
            "СИС-31"
        ],
        "isImportant": true
    },
    {
        "id": 27,
        "name": "Ярмарка вакансий",
        "startDate": "2024-06-16T11:00",
        "endDate": "2024-06-16T17:00",
        "type": "Социальное",
        "status": "В процессе",
        "creator": "Карьерный центр",
        "groups": [
            "ИП-22",
            "ГУП-42",
            "БТМ-42"
        ],
        "isImportant": true,
        "reports": [
            {
                "group": {
                    "name": "ГУП-42",
                    "id": 636
                },
                "report": {
                    "numParticipants": 61,
                    "comment": "Report for group ГУП-42 in event Ярмарка вакансий"
                }
            },
            {
                "group": {
                    "name": "БТМ-42",
                    "id": 837
                },
                "report": {
                    "numParticipants": 81,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 28,
        "name": "Собрание студенческого совета",
        "startDate": "2024-06-16T15:00",
        "endDate": "2024-06-16T17:00",
        "type": "Административное",
        "status": "Предстоящее",
        "creator": "Студенческий союз",
        "groups": [
            "ГУП-43",
            "СИС-31"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ГУП-43",
                    "id": 92
                },
                "report": {
                    "numParticipants": 95,
                    "comment": null
                }
            },
            {
                "group": {
                    "name": "СИС-31",
                    "id": 72
                },
                "report": {
                    "numParticipants": 77,
                    "comment": null
                }
            }
        ]
    },
    {
        "id": 29,
        "name": "Празднование Дня независимости (отмена занятий)",
        "startDate": "2024-06-16T00:00",
        "endDate": "2024-06-16T23:59",
        "type": "Административное",
        "status": "Отменено",
        "creator": "Администрация университета",
        "groups": [
            "Все группы"
        ],
        "isImportant": true
    },
    {
        "id": 30,
        "name": "Музыкальный фестиваль (перенесено с 15 июня)",
        "startDate": "2024-06-16T19:00",
        "endDate": "2024-06-16T22:00",
        "type": "Культурное",
        "status": "Перенесено",
        "creator": "Музыкальный клуб",
        "groups": [
            "ЛП-31",
            "ЛП-32",
            "ЛП-33"
        ],
        "isImportant": false,
        "reports": [
            {
                "group": {
                    "name": "ЛП-33",
                    "id": 308
                },
                "report": {
                    "numParticipants": 40,
                    "comment": "Report for group ЛП-33 in event Музыкальный фестиваль (перенесено с 15 июня)"
                }
            }
        ]
    }
]
const eventObj = {events}
export {eventObj}