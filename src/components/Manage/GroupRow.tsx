import type React from 'react';
import { useState } from 'react';
import { Table, ActionIcon, Group, TextInput, Select } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import type { workerFullInfo } from '@/pages/Admin.page';
import type { ExtentedGroup } from '@/pages/Group/Groups.page';

interface GroupRowProps {
	group: ExtentedGroup;
	workers: workerFullInfo[];
	onSave: (id: number, newData: ExtentedGroup) => Promise<void>;
	onCancel: (id: number) => void;
}

const GroupRow: React.FC<GroupRowProps> = ({ group, workers, onSave, onCancel }) => {
	const [isEditing, setIsEditing] = useState(group.id < 0);
	const [shortName, setShortName] = useState(group.shortName);
	const [fullName, setFullName] = useState(group.fullName);
	const [curatorId, setCuratorId] = useState<string | null>(group.curator?.id.toString() || null);
	const [loading, setLoading] = useState(false);

	const handleEdit = () => setIsEditing(true);
	const handleSave = () => {
		setLoading(true);

		const isNewGroup = group.id < 0;
		// Check if any required field is non-empty
		const hasNonEmptyFields = shortName || fullName || curatorId
		const updatedGroup = isNewGroup && hasNonEmptyFields
		? { ...group, id: Math.abs(group.id) }
		: group;
		
		console.log(group,isNewGroup && hasNonEmptyFields)
		onSave(group.id, {
			...updatedGroup,
			shortName,
			fullName,
			curator: workers.find(w => w.id === Number(curatorId)) || null
		})
			.then(() => setIsEditing(false)).finally(() => setLoading(false));
	};
	const handleCancel = () => {
		if (group.id < 0) {
			onCancel(group.id);
		}
		setIsEditing(false);
	};

	const curatorOptions = workers
		.filter(w => w.role !== 'curator')
		.map(w => ({ value: w.id.toString(), label: `${w.lastName} ${w.firstName[0]}.${w.surName ? w.surName[0] : ''}.` }));

	return (
		<Table.Tr>
			<Table.Td>
				{isEditing ? <TextInput value={shortName} onChange={e => setShortName(e.currentTarget.value)} /> : group.shortName}
			</Table.Td>
			<Table.Td>
				{isEditing ? <TextInput value={fullName} onChange={e => setFullName(e.currentTarget.value)} /> : group.fullName}
			</Table.Td>
			<Table.Td>
				{isEditing ? (
					<Select
						data={curatorOptions}
						value={curatorId}
						onChange={setCuratorId}
						clearable
					/>
				) : (
					group.curator ? `${group.curator.lastName} ${group.curator.firstName[0]}.${group.curator.surName ? group.curator.surName[0] : ''}.` : '-'
				)}
			</Table.Td>
			<Table.Td>
				{isEditing ? (
					<Group>
						<ActionIcon color="green" onClick={handleSave} loading={loading}>
							<IconCheck size={16} />
						</ActionIcon>
						<ActionIcon color="red" onClick={handleCancel} loading={loading}>
							<IconX size={16} />
						</ActionIcon>
					</Group>
				) : (
					<ActionIcon onClick={handleEdit}>
						<IconPencil size={16} />
					</ActionIcon>
				)}
			</Table.Td>
		</Table.Tr>
	);
};

export default GroupRow;
