import StudentDetails from "@/components/Student/StudentDetails";
import { allGroups, facultyData, kafedraData, type IGroup, type IKafedra, type IProfile, type NameId, rolesData } from "./Profile.page"
import { useAuthStore } from "@/store/useAuthStore";



export interface IContactPerson {
    firstName: string;
    lastName: string;
    surName: string;
    phone: string;
    phoneWork: string;
    work: string;
    jobPosition: string;
}

export interface IStudent extends IProfile {
	isLeader: boolean
    phoneHome?: string;
    socialAccs?: string;
    address?: string;
    mother?: IContactPerson;
    father?: IContactPerson;
}

const studentData: IStudent = {
	firstName: "Иван",
	lastName: "Петров",
	surName: "Иванович",
	role: "Студент",
	isLeader: true,
	group: allGroups.find(g => g.name === "ПИ-1"),
	faculty: facultyData.find(f => f.id === 5)!, // АИС
	department: kafedraData.find(k => k.id === 14), // Программная инженерия
	birthdayDate: "1999-05-12",
	phone: "+37561234567",
	img: null,
	phoneHome: "+3758121234567",
	socialAccs: "vk.com/ivanov, twitter.com/ipetrov",
	address: "г. Гомель, ул. Ленина, д. 10, кв. 25",
	mother: {
	  firstName: "Мария",
	  lastName: "Петрова",
	  surName: "Ивановна",
	  phone: "+79161112233",
	  phoneWork: "+74951234567",
	  work: "ООО 'Ромашка'",
	  jobPosition: "Бухгалтер"
	},
	father: {
	  firstName: "Петр",
	  lastName: "Петров", 
	  surName: "Иванович",
	  phone: "+79167654321",
	  phoneWork: "+74959876543",
	  work: "ПАО 'Газпром'",
	  jobPosition: "Инженер"
	}
  }

const StudentPage: React.FC = () => {
	const { userRole } = useAuthStore();
	return <StudentDetails studentData={studentData} allGroups={allGroups} userRole={userRole} allFaculty={facultyData} allDepartments={kafedraData} allRoles={rolesData}/>
}

export default StudentPage