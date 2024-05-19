import CafedraSearch from "@/components/Cafedra/CafedraSearch";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { CafedraInfo, FacultyInfo, Group, Person } from "../Cafedra/Cafedras.page";
import { persons } from "../Cafedra/testDataCafedra";
import { faculties as testFaculties} from '../Cafedra/testDataCafedra';
import GroupSearch from "@/components/Group/GroupSearch";

export interface ExtentedGroup extends Group{
	students: Student[]
}

export interface Student extends Person{
	isLeader?: boolean
}

export interface ExtendedCafedra extends CafedraInfo{
	groups: ExtentedGroup[];
}

const students: Student[] = [
	{ id: 36, firstName: 'Александр', lastName: 'Петров', surName: 'Иванович', role: 'Студент',isLeader:true },
	{ id: 37, firstName: 'Елизавета', lastName: 'Степанова', surName: 'Михайловна', role: 'Студент',isLeader:true },
	{ id: 38, firstName: 'Артем', lastName: 'Семенов', surName: 'Дмитриевич', role: 'Студент',isLeader:true },
	{ id: 39, firstName: 'Виктория', lastName: 'Романова', surName: 'Алексеевна', role: 'Студент',isLeader:true },
	{ id: 40, firstName: 'Антон', lastName: 'Никитин', surName: 'Андреевич', role: 'Студент',isLeader:true },
	{ id: 41, firstName: 'Дарья', lastName: 'Захарова', surName: 'Кирилловна', role: 'Студент' },
	{ id: 42, firstName: 'Михаил', lastName: 'Борисов', surName: 'Игоревич', role: 'Студент' },
	{ id: 43, firstName: 'Полина', lastName: 'Федорова', surName: 'Ильинична', role: 'Студент' },
	{ id: 44, firstName: 'Денис', lastName: 'Тимофеев', surName: 'Максимович', role: 'Студент' },
	{ id: 45, firstName: 'Ксения', lastName: 'Кузнецова', surName: 'Павловна', role: 'Студент' },
	{ id: 46, firstName: 'Владислав', lastName: 'Соколов', surName: 'Александрович', role: 'Студент' },
	{ id: 47, firstName: 'Анастасия', lastName: 'Лебедева', surName: 'Викторовна', role: 'Студент' },
	{ id: 48, firstName: 'Иван', lastName: 'Козлов', surName: 'Олегович', role: 'Студент' },
	{ id: 49, firstName: 'Екатерина', lastName: 'Новикова', surName: 'Ярославовна', role: 'Студент' },
	{ id: 50, firstName: 'Максим', lastName: 'Попов', surName: 'Данилович', role: 'Студент' },
	{ id: 51, firstName: 'Наталья', lastName: 'Виноградова', surName: 'Романовна', role: 'Студент' },
	{ id: 52, firstName: 'Владимир', lastName: 'Орлов', surName: 'Степанович', role: 'Студент' },
	{ id: 53, firstName: 'Татьяна', lastName: 'Филиппова', surName: 'Львовна', role: 'Студент' },
	{ id: 54, firstName: 'Григорий', lastName: 'Сергеев', surName: 'Максимович', role: 'Студент' },
	{ id: 55, firstName: 'Елена', lastName: 'Андреева', surName: 'Богдановна', role: 'Студент' }
   ];
   

const extendsGroups: ExtentedGroup[] = [
	{
	  id: 1,
	  shortName: 'ИП-21',
	  fullName: 'Информатика и программирование',
	  students: [
		students[35], // Александр Петров (isLeader: true)
		students[40], // Антон Никитин
		students[41], // Дарья Захарова
		students[42], // Михаил Борисов
		students[43], // Полина Федорова
		students[44], // Денис Тимофеев
		students[45], // Ксения Кузнецова
	  ]
	},
	{
	  id: 2,
	  shortName: 'ИП-22',
	  fullName: 'Информатика и программирование',
	  students: [
		students[36], // Елизавета Степанова (isLeader: true)
		students[46], // Владислав Соколов
		students[47], // Анастасия Лебедева
		students[48], // Иван Козлов
		students[49], // Екатерина Новикова
		students[50], // Максим Попов
		students[51], // Наталья Виноградова
	  ]
	},
	{
	  id: 3,
	  shortName: 'ЭМ-31',
	  fullName: 'Экономика и менеджмент',
	  students: [
		students[37], // Артем Семенов (isLeader: true)
		students[52], // Владимир Орлов
		students[53], // Татьяна Филиппова
		students[54], // Григорий Сергеев
	  ]
	},
	{
	  id: 4,
	  shortName: 'ГУП-41',
	  fullName: 'Государственное управление и политология',
	  students: [
		students[38], // Виктория Романова (isLeader: true)
	  ]
	},
	{
	  id: 5,
	  shortName: 'ГУП-42',
	  fullName: 'Государственное управление и политология',
	  students: [
		students[39], // Антон Никитин (isLeader: true)
	  ]
	},
	{
		id: 6,
		shortName: 'ГУП-43',
		fullName: 'Государственное управление и политология',
		students: [
			students[55], // Елена Андреева (isLeader: true)
		]
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
const  cafedras_w_extendGr: ExtendedCafedra[] = [
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
	  groups: [extendsGroups[2]]
	},
	{
	  id: 3,
	  shortName: 'ГУиП',
	  fullName: 'Кафедра Государственного Управления и Политологии',
	  dean: persons[8],
	  headCafedra: persons[9],
	  workers: [persons[10], persons[11]],
	  groups: [extendsGroups[3], extendsGroups[4], extendsGroups[5]]
	},
	{
	  id: 4,
	  shortName: 'ПМиВТ',
	  fullName: 'Кафедра Прикладной Математики и Вычислительной Техники',
	  dean: persons[12],
	  headCafedra: persons[13],
	  workers: [persons[14], persons[15]],
	  groups: [extendsGroups[6]]
	},
	{
	  id: 5,
	  shortName: 'ЛиП',
	  fullName: 'Кафедра Лингвистики и Перевода',
	  dean: persons[16],
	  headCafedra: persons[17],
	  workers: [persons[18], persons[19]],
	  groups: [extendsGroups[7], extendsGroups[8], extendsGroups[9]]
	},
	{
	  id: 6,
	  shortName: 'ИТиКБ',
	  fullName: 'Кафедра Информационных Технологий и Кибербезопасности',
	  dean: persons[20],
	  headCafedra: persons[21],
	  workers: [persons[22], persons[23]],
	  groups: [extendsGroups[10], extendsGroups[11]]
	},
	{
	  id: 7,
	  shortName: 'БиТиМ',
	  fullName: 'Кафедра Бизнеса и Технологического Менеджмента',
	  dean: persons[24],
	  headCafedra: persons[25],
	  workers: [persons[26], persons[27]],
	  groups: [extendsGroups[12], extendsGroups[13], extendsGroups[14]]
	},
	{
	  id: 8,
	  shortName: 'СиС',
	  fullName: 'Кафедра Социальных Исследований и Статистики',
	  dean: persons[28], // Using Мария Смирнова again as dean
	  headCafedra: persons[29], // Using Сергей Кузнецов again as headCafedra
	  workers: [persons[30], persons[31], persons[32], persons[33], persons[34]],
	  groups: [extendsGroups[15], extendsGroups[16]]
	}
  ];


  
  const GroupPage: React.FC = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
  
	const [loading, setLoading] = useState(true);
	const [faculties, setFaculties] = useState<FacultyInfo[]>([]);
	const [cafedras, setCafedras] = useState<ExtendedCafedra[]>([]);
  
	useEffect(() => {
	  const fetchData = setTimeout(() => {
		setFaculties(testFaculties);
		setCafedras(cafedras_w_extendGr);
		setLoading(false);
	  }, 500);
  
	  return () => clearTimeout(fetchData);
	}, []);
  
	const handleSearchParamChange = useCallback((param: string, value: string | null) => {
		if (value) {
		  searchParams.set(param, value);
		} else {
		  searchParams.delete(param);
		}
		setSearchParams(searchParams);
	  }, [searchParams, setSearchParams]);

	const handleFacultyChange = (facultyId: string | null) => {
	  if (facultyId) {
		searchParams.set('faculty', facultyId);
	  } else {
		searchParams.delete('faculty');
	  }
	  setSearchParams(searchParams);
	};
	
	const handleCafedraChange = (cafedraId: string | null) => {
	  if (cafedraId) {
		searchParams.set('cafedra', cafedraId);
	  } else {
		searchParams.delete('cafedra');
	  }
	  setSearchParams(searchParams);
	};
	const handleGroupChange = (groupId: string | null) => {
	  if (groupId) {
		searchParams.set('group', groupId);
	  } else {
		searchParams.delete('group');
	  }
	  setSearchParams(searchParams);
	};
  
	return (<>
	   <GroupSearch
		  faculties={faculties}
		  cafedras={cafedras}
		  selectedFaculty={searchParams.get('faculty') || null}
		  selectedCafedra={searchParams.get('cafedra') || null}
		  selectedGroup={searchParams.get("group") || null}
		  onFacultyChange={handleFacultyChange}
		  onCafedraChange={handleCafedraChange}
		  onGroupChange={handleGroupChange}
		  loading={loading}
		  />
	</>
	)
  };
  
  export default GroupPage;