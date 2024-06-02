import type React from 'react';
import { Group, Table, useComputedColorScheme } from '@mantine/core';
import type { ExtentedGroup } from '@/pages/Group/Groups.page';
// import { workers } from '@/pages/Search/testDataSearch';
import GroupRow from './GroupRow';
import type { workerFullInfo } from '@/pages/Admin.page';

interface GroupTableProps {
	groups: ExtentedGroup[];
	cafedraWorkers: workerFullInfo[]
	onSave: (id: number, newData: ExtentedGroup) => Promise<void>;
	onCancel: (id: number) => void;
}

const GroupTable: React.FC<GroupTableProps> = ({ groups, cafedraWorkers,onCancel,onSave }) => {
	const colorScheme = useComputedColorScheme();
	const isDark = colorScheme == 'dark'
	const rows = groups.map((group) => (
		<GroupRow
		  key={group.id}
		  group={group}
		  workers={cafedraWorkers}
		  onSave={onSave}
		  onCancel={onCancel}
		/>
	  ));
	return (
		<Table withTableBorder stickyHeaderOffset={-5} highlightOnHover highlightOnHoverColor={isDark ? 'dark.6' : 'gray.2'}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Имя(кратк)</Table.Th>
					<Table.Th>Имя(полн)</Table.Th>
					<Table.Th>Куратор</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

export default GroupTable;
