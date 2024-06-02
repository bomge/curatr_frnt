import type React from 'react';
import { Table, useComputedColorScheme } from '@mantine/core';
import type { workerFullInfo } from '@/pages/Admin.page';
import type { FacultyInfo, CafedraInfo } from '@/pages/Cafedra/Cafedras.page';
import UserRow from '../Admin/UserRow';
import WorkerRow from './WorkerRow';
import type { ExtentedGroup } from '@/pages/Group/Groups.page';
import { groups } from '@/pages/Search/testDataSearch';

interface WorkerTableProps {
	workers: workerFullInfo[];
	groups: ExtentedGroup[];
	onSave: (id: number, newData: workerFullInfo) => Promise<void>;
	onCancel: (id: number) => void;
	onRemove: (id: number) => Promise<void>; // Add this prop
}

const WorkerTable: React.FC<WorkerTableProps> = ({ workers, groups, onSave, onCancel,onRemove }) => {
	//   const rows = workers.map((worker) => (
	//     <UserRow key={worker.id} worker={worker} faculties={faculties} cafedras={cafedras} onSave={onSave} onCancel={onCancel} />
	//   ));
	const rows = workers.map((worker) => (
		<WorkerRow groups={groups} onCancel={onCancel}  onSave={onSave} onRemove={onRemove} worker={worker} key={worker.id}/>
	))
	const colorScheme = useComputedColorScheme();
	const isDark = colorScheme == 'dark'
	return (
		<Table.ScrollContainer minWidth={600}>

		<Table withTableBorder highlightOnHover highlightOnHoverColor={isDark ? 'dark.6' : 'gray.2'} styles={{tbody:{background:'#f6f5f27d'}}}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Фамилия</Table.Th>
					<Table.Th>Имя</Table.Th>
					<Table.Th>Отчество</Table.Th>
					<Table.Th>Роль</Table.Th>
					<Table.Th>Науч. Степень</Table.Th>
					<Table.Th>Группа</Table.Th>
					<Table.Th>Действия</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
		</Table.ScrollContainer>
	);
};

export default WorkerTable;
