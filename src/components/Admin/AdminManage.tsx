import type { FacultyInfo, CafedraInfo } from "@/pages/Cafedra/Cafedras.page";
import type { ISearchPersonWorker } from "@/pages/Search/Search.page";
import { ActionIcon, Button, Group, LoadingOverlay, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import UserTable from "./UserTable";
import classes from './style.module.css'
import type { workerFullInfo } from "@/pages/Admin.page";
import { useState } from "react";
interface AdminManageProps {
	faculties: FacultyInfo[];
	cafedras: CafedraInfo[];
	workers: workerFullInfo[]
	loading: boolean
	onSave: (id: number, newName: workerFullInfo) => Promise<void>;
  onAdd: (newWorker: workerFullInfo) => Promise<void>;
	onCancel: (id: number) => void;
}

const AdminManage: React.FC<AdminManageProps> = ({ cafedras, faculties, loading, workers, onSave, onAdd, onCancel}) => {
	const isMobile = useMediaQuery('(max-width: 600px)');
	const [isAdding, setIsAdding] = useState(false);
	
	const handleAddClick = () => {
		setIsAdding(true);
		const newWorker = {
		  id: -Date.now(), // Temporary ID for the new worker
		  lastName: '',
		  firstName: '',
		  surName: '',
		  role: '',
		  scienceDegree: '',
		  faculty: undefined,
		  cafedra: undefined,
		  group: undefined,
		};
		onAdd(newWorker).finally(() => setIsAdding(false));
	  };
	
	  const handleCancelAdd = (id: number) => {
		onCancel(id);
		setIsAdding(false);
	  };
	
	  const handleSaveAdd = async (id: number, newData: workerFullInfo) => {
		await onSave(id, newData)
		setIsAdding(false);
	  };
	

	return <Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} maw="150rem">
		{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{
			radius: "sm",
			blur: 2
		}} />}
		<Text fw={600} size="md" ta='center'>
			Админ панель
		</Text>
		<Group gap='0.2rem' mb='0.2rem'>
			<Text size="md">
				Пользователи
			</Text>
			<ActionIcon size='sm' variant="light" disabled={isAdding} onClick={handleAddClick}>
				<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon >
		</Group>
		<Paper shadow="xs" p="0"
			// bg='gray.1'
			className={classes.paperSearch}
		>
			{/* <div style={{ maxHeight: '75dvh', overflowY: 'auto' }}> */}
			<ScrollArea h='75dvh'>

				<UserTable workers={workers} faculties={faculties} cafedras={cafedras} onSave={handleSaveAdd}
            onCancel={handleCancelAdd} />
			</ScrollArea>
			{/* </div> */}
		</Paper>
	</Stack>
}

export default AdminManage;