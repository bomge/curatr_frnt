import { workers, cafedras } from "@/pages/Cafedra/testDataCafedra";
import type { FacultyFull } from "@/pages/Manage.page";
import { Stack, LoadingOverlay, Group, ActionIcon, Paper, ScrollArea, Text, Accordion, useComputedColorScheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import UserTable from "../Admin/UserTable";
import classes from './style.module.css'
import GroupTable from "./GroupTable";
import WorkerTable from "./WorkerTable";
import type { ExtentedGroup } from "@/pages/Group/Groups.page";

interface DeanManageProps {
	faculty: FacultyFull | null;
	loading: boolean
	onSaveGroup: (id: number, newData: ExtentedGroup) => Promise<void>;
	onAddGroup: (id: number, newData: ExtentedGroup) => Promise<void>
	onCancelGroup: (cafedraId: number, groupId: number) => Promise<void>
}

const DeanManage: React.FC<DeanManageProps> = ({faculty,loading,onSaveGroup, onAddGroup, onCancelGroup}) => {
	const isMobile = useMediaQuery('(max-width: 600px)');
	console.log(faculty)

	const handleAddGroupClick = (cafedraId:number) => {
		const newWorker:ExtentedGroup  = {
		  id: -Date.now(), // Temporary ID for the new worker
		  fullName:'',
		  shortName:'',
		  students: [],
		};
		onAddGroup(cafedraId,newWorker)
	  };
	
	  const handleCancelAdd = (cafedraId: number) => {
		return (groupId:number) => {
			onCancelGroup(cafedraId,groupId);
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
		<Text fw={700} size="md" ta='center'>
			{faculty?.shortName}
		</Text>
		<Paper shadow="xs" p="0"
			// bg='gray.1'
			className={classes.paperSearch}
		>

		<Accordion multiple 
		styles={{control:{boxShadow:'0 0 0 0.2px #0000001f'}}}
		>
        {faculty?.cafedras.map((cafedra) => (
          <Accordion.Item key={cafedra.id} value={cafedra.shortName}>
            <Accordion.Control>{cafedra.fullName}</Accordion.Control>
            <Accordion.Panel bg={isDark?'dark.8':"gray.0"}>
			<Group gap='0.2rem' mb='0.2rem'>
              <Text fw={600} size="sm">Группы ({cafedra.groups.length})</Text>
			  <ActionIcon size='sm' variant="light" onClick={()=>handleAddGroupClick(cafedra.id)}>
				<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
			</ActionIcon >
			</Group>
              <GroupTable groups={cafedra.groups} cafedraWorkers={cafedra.workers}  onSave={onSaveGroup}
      onCancel={handleCancelAdd(cafedra.id)}/>
              {/* <Text fw={600} size="sm">Workers</Text> */}
              {/* <WorkerTable workers={cafedra.workers} faculties={[faculty]} cafedras={[cafedra]} onSave={() => {}} onCancel={() => {}} /> */}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
	  </Paper>
	</Stack>
}

export default DeanManage