import type { workerFullInfo } from "@/pages/Admin.page";
import type { ExtentedGroup } from "@/pages/Group/Groups.page";
import { Table, Group, ActionIcon } from "@mantine/core";
import { IconCheck, IconX, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import EditableField from "../Admin/EditableField";
import EditableSelectField from "../Admin/EditableSelectField";
import ConfirmCancelBtns from "../TableComponents/ConfirmCancelBtns";
import RoleBasedGroupSelect from "./RoleBasedGroupSelect";

const roles = [
	{ label: 'Декан', value: 'Декан' },
	{ label: 'Проректор', value: 'Проректор' },
	{ label: 'зав.Кафедры', value: 'зав.Кафедры' },
	{ label: 'Куратор', value: 'Куратор' },
	{ label: 'Работник', value: 'Работник' },
  ];
  
  const scienceDegrees = [
	{ label: 'Профессор', value: 'Профессор' },
	{ label: 'Доктор наук', value: 'Доктор наук' },
	{ label: 'Доцент', value: 'Доцент' },
	{ label: 'Ассистент', value: 'Ассистент' },
	{ label: 'Кандидат наук', value: 'Кандидат наук' },
	{ label: 'Лаборант', value: 'Лаборант' },
	{ label: 'Старший преподаватель', value: 'Старший преподаватель' },
	{ label: 'Академик', value: 'Академик' },
	{ label: 'Преподаватель', value: 'Преподаватель' },
	{ label: 'Преподаватель-стажер', value: 'Преподаватель-стажер' },
  ];

interface UserRowProps {
	worker: workerFullInfo;
	groups: ExtentedGroup[];
	onSave: (id: number, newData: workerFullInfo) => Promise<void>;
	onCancel: (id: number) => void;
	onRemove: (id: number) => Promise<void>; // Add this prop
  }

const WorkerRow: React.FC<UserRowProps> = ({groups,onCancel,onSave,worker, onRemove}) =>{
	const [isEditing, setIsEditing] = useState(worker.id < 0);
	const [lastName, setLastName] = useState(worker.lastName);
	const [firstName, setFirstName] = useState(worker.firstName);
	const [surName, setSurName] = useState(worker.surName);
	const [role, setRole] = useState(worker.role || '');
	const [scienceDegree, setScienceDegree] = useState(worker.scienceDegree) || '';
	const [selectedGroup, setSelectedGroup] = useState(worker.group?.id.toString() || null);

	const [loading, setLoading] = useState(false);

	const handleEdit = () => setIsEditing(true);
	console.log(worker)
	const handleSave = () => {
		setLoading(true);
	
		const isNewWorker = worker.id < 0;
		const hasNonEmptyFields = lastName || firstName || surName || role || scienceDegree || selectedGroup;
		const updatedWorker = isNewWorker && hasNonEmptyFields
		  ? { ...worker, id: Math.abs(worker.id) }
		  : worker;
	
		const newWorkerData = {
		  ...updatedWorker,
		  lastName,
		  firstName,
		  surName,
		  role,
		  scienceDegree,
		  group: role === 'Куратор' ? groups.find(g => g.id === Number(selectedGroup)) || null : null,
		};
	
		onSave(worker.id, newWorkerData)
		  .then(() => setIsEditing(false))
		  .finally(() => setLoading(false));
	  };

	const handleCancel = () => {
		if (worker.id < 0) {
		  onCancel(worker.id);
		}
		setIsEditing(false);
	};

	const handleRemove = () => {
		setLoading(true);
		onRemove(worker.id).finally(() => {
			setLoading(false)
			console.log('set false')
		})
	  };

	const groupOptions = groups.filter(g=>!g.curator || g.curator?.id==worker.id).map((group) => ({
		value: group.id.toString(),
		label: `${group.shortName}`,
	  }));


	  return (
		<Table.Tr>
		  <Table.Td>
			<EditableField isEditing={isEditing} value={lastName} onChange={setLastName} compProps={{description:'Фамилия'}}/>
		  </Table.Td>
		  <Table.Td>
			<EditableField isEditing={isEditing} value={firstName} onChange={setFirstName} compProps={{description:'Имя'}}/>
		  </Table.Td>
		  <Table.Td>
			<EditableField isEditing={isEditing} value={surName} onChange={setSurName} compProps={{description:'Отчество'}}/>
		  </Table.Td>
		  <Table.Td>
			<EditableSelectField isEditing={isEditing} value={role} onChange={setRole} options={roles} text={worker.role} compoProps={{description:'Роль'}}/>
		  </Table.Td>
		  <Table.Td>
			<EditableSelectField isEditing={isEditing} value={scienceDegree} onChange={setScienceDegree} text={worker.scienceDegree} options={scienceDegrees} compoProps={{description:'Науч. степень'}} />
		  </Table.Td>
		  <Table.Td>
		  <RoleBasedGroupSelect isEditing={isEditing} role={role} selectedGroup={selectedGroup} onChange={setSelectedGroup} groups={groups} workerId={worker.id} worker={worker}/>
		  </Table.Td>
		  <Table.Td>
			{isEditing ? (
				<>
			  <ConfirmCancelBtns
			  onSave={handleSave}
			  onCancel={handleCancel}
			  loading={loading}
		  />
		              
				</>
			) : (
				<Group gap='xs'>
				
			  <ActionIcon onClick={handleEdit} color="blue.5" disabled={loading}>
				<IconPencil size={16} />
			  </ActionIcon>
			  <ActionIcon loading={loading} onClick={handleRemove} variant="subtle" color="red">
              <IconTrash size={16} />
            </ActionIcon>
				</Group>
			)}
		  </Table.Td>
		</Table.Tr>
	  );
}

export default WorkerRow