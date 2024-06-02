import { workers, cafedras } from "@/pages/Cafedra/testDataCafedra";
import type { FacultyFull, IfreeWorker } from "@/pages/Manage.page";
import { Stack, LoadingOverlay, Group, ActionIcon, Paper, ScrollArea, Text, Accordion, useComputedColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import UserTable from "../Admin/UserTable";
import classes from './style.module.css'
import GroupTable from "./GroupTable";
import WorkerTable from "./WorkerTable";
import type { ExtentedGroup } from "@/pages/Group/Groups.page";
import type { workerFullInfo } from "@/pages/Admin.page";
import { useState } from "react";
import WorkerAdd from "./WorkerAdd";

interface DeanManageProps {
	faculty: FacultyFull | null;
	freeWorkers: IfreeWorker[]
	loading: boolean
	onSaveGroup: (id: number, newData: ExtentedGroup) => Promise<void>;
	onAddGroup: (id: number, newData: ExtentedGroup) => Promise<void>
	onCancelGroup: (cafedraId: number, groupId: number) => Promise<void>
	onSaveWorker: (id: number, newData: workerFullInfo) => Promise<void>;
	onAddWorker: (cafedraId: number, newWorker: workerFullInfo) => Promise<void>;
	onRemoveWorker: (cafedraId: number,workerId: number) => Promise<void>;
}

const DeanManage: React.FC<DeanManageProps> = ({ faculty, loading, onSaveGroup, onAddGroup, onCancelGroup, onSaveWorker, freeWorkers, onAddWorker,onRemoveWorker }) => {
	const isMobile = useMediaQuery('(max-width: 600px)');
	const [addingWorker, setAddingWorker] = useState<number | null>(null);

	const handleAddWorkerClick = (cafedraId: number) => {
		setAddingWorker(cafedraId);
	};

	const handleCancelWorkerAdd = () => {
		setAddingWorker(null);
	};

	const handleWorkerRemove = (cafedraId: number) => {
		return async (workerId:number) => {
			return onRemoveWorker(cafedraId,workerId)
		}
	}

	const handleAddGroupClick = (cafedraId: number) => {
		const newWorker: ExtentedGroup = {
			id: -Date.now(), // Temporary ID for the new worker
			fullName: '',
			shortName: '',
			students: [],
		};
		onAddGroup(cafedraId, newWorker)
	};

	const handleCancelGroupAdd = (cafedraId: number) => {
		return (groupId: number) => {
			onCancelGroup(cafedraId, groupId);
		}
	};

	const colorScheme = useComputedColorScheme();
	const isDark = colorScheme == 'dark'

	return <Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} maw="150rem">
		{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{
			radius: "sm",
			blur: 2
		}} />}
		<Text fw={600} size="md" ta='center'>
			Управление
		</Text>
		<Text fw={700} size="md" ta='center' mb='1rem'>
			{faculty?.shortName}
		</Text>
		<Paper shadow="xs" p="0"
			// bg='gray.1'
			className={classes.paperSearch}
		>

			<Accordion multiple
				styles={{ control: { boxShadow: '0 0 0 0.2px #0000001f' } }}
			>
				{faculty?.cafedras.map((cafedra) => (
					<Accordion.Item key={cafedra.id} value={cafedra.shortName}>
						<Accordion.Control>Кафедра {cafedra.fullName}</Accordion.Control>
						<Accordion.Panel bg={isDark ? 'dark.8' : "gray.0"}>
							<Group gap='0.2rem' mb='0.2rem'>
								<Text fw={600} size="sm">Группы ({cafedra.groups.length})</Text>
								<ActionIcon size='sm' variant="light" onClick={() => handleAddGroupClick(cafedra.id)}>
									<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
								</ActionIcon >
							</Group>
							<GroupTable groups={cafedra.groups} cafedraWorkers={cafedra.workers} onSave={onSaveGroup}
								onCancel={handleCancelGroupAdd(cafedra.id)} />
							<Group gap='0.2rem' mb='0.2rem' mt='1rem'>

								<Text fw={600} size="sm" >Работники ({cafedra.workers.length})</Text>
								{/* {addingWorker == cafedra.id ?
									<ActionIcon size='sm'  color="red" variant="light" onClick={handleCancelWorkerAdd}>
										<IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
									</ActionIcon>
									: */}
									<ActionIcon size='sm' variant="light" disabled={addingWorker == cafedra.id} onClick={() => handleAddWorkerClick(cafedra.id)}>
										<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
									</ActionIcon >

								{/* } */}
								{addingWorker === cafedra.id && (
									<WorkerAdd cafedraId={cafedra.id} freeWorkers={freeWorkers} onAddWorker={onAddWorker} stopAdding={handleCancelWorkerAdd} />
								)}
							</Group>
							<WorkerTable workers={cafedra.workers} groups={cafedra.groups} onSave={onSaveWorker} onRemove={handleWorkerRemove(cafedra.id)} onCancel={() => { }}  />
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Paper>
	</Stack>
}

export default DeanManage