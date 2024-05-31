import type { FacultyInfo, CafedraInfo } from "@/pages/Cafedra/Cafedras.page";
import type { ISearchPersonWorker } from "@/pages/Search/Search.page";
import { ActionIcon, Button, Group, LoadingOverlay, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import UserTable from "./UserTable";
import classes from './style.module.css'
interface AdminManageProps {
	faculties: FacultyInfo[];
	cafedras: CafedraInfo[];
	workers: ISearchPersonWorker[]
	loading: boolean
	onSave: (id: number, newName: ISearchPersonWorker) => void;
}

const AdminManage: React.FC<AdminManageProps> = ({ cafedras, faculties, loading, workers, onSave }) => {
	const isMobile = useMediaQuery('(max-width: 600px)');

	return <Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} maw="150rem">
		{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{
			radius: "sm",
			blur: 2
		}} />}
		<Text fw={600} size="md" ta='center'>
			Админ панель
		</Text>
		<Group gap='0.2rem'>
			<Text size="md">
				Пользователи
			</Text>
			<ActionIcon size='sm' variant="light">
				<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon >
		</Group>
		<Paper shadow="xs" p="0"
			// bg='gray.1'
			className={classes.paperSearch}
		>
			{/* <div style={{ maxHeight: '75dvh', overflowY: 'auto' }}> */}
			<ScrollArea h='75dvh'>

				<UserTable workers={workers} onSave={onSave} />
			</ScrollArea>
			{/* </div> */}
		</Paper>
	</Stack>
}

export default AdminManage;