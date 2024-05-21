import type { CafedraInfo, FacultyInfo } from "@/pages/Cafedra/Cafedras.page";
import { Group, LoadingOverlay, Select, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { EditableField } from "../Fields/EditableField";
import Links from "../Fields/Links";
import { EditableTextField } from "../Fields/OtherFields";


const isCafedraInFaculty = (
	faculties: FacultyInfo[],
	facultyId: string | null,
	cafedraId: string | null
  ) => {
	if (!facultyId || !cafedraId) return false;
  
	const faculty = faculties.find((f) => String(f.id) === facultyId);
	if (!faculty) return false;
	
	console.log(faculty)

	return faculty.cafedras.some((c) => String(c.id) === cafedraId);
  };

interface SearchCafedraProps {
	faculties: FacultyInfo[];
	cafedras: CafedraInfo[];
	selectedFaculty: string | null;
	selectedCafedra: string | null;
	onFacultyChange: (facultyId: string | null) => void;
	onCafedraChange: (cafedraId: string | null) => void;
	loading: boolean
}

const CafedraSearch: React.FC<SearchCafedraProps> = ({
	faculties,
	cafedras,
	selectedFaculty,
	selectedCafedra,
	onFacultyChange,
	onCafedraChange,
	loading
}) => {
	const isMobile = !!useMediaQuery('(max-width: 600px)');

	const handleFacultyChange = (facultyId: string | null) => {
		onFacultyChange(facultyId);
		if(selectedCafedra && 
			!isCafedraInFaculty(faculties, facultyId, selectedCafedra)
			)
			onCafedraChange('');
	};

	const handleCafedraChange = (cafedraId: string | null) => {
		onCafedraChange(cafedraId);
	};

	const facultyOptions = faculties.map((faculty) => ({
		value: faculty.id.toString(),
		label: faculty.fullName,
	}));

	const cafedraOptions = selectedFaculty
		? faculties
			?.find((f) => f.id === Number(selectedFaculty))
			?.cafedras.map((cafedraId) => {
				const cafedra = cafedras?.find((c) => c.id === cafedraId.id);
				return cafedra
					? {
						value: cafedra.id.toString(),
						label: cafedra.fullName,
					}
					: null;
			})
			.filter(Boolean)
		: faculties.flatMap((faculty) => [
			{
				group: faculty.fullName,
				items: faculty.cafedras
					.map((cafedraId) => {
						const cafedra = cafedras.find((c) => c.id === cafedraId.id);
						return cafedra
							? {
								value: cafedra.id.toString(),
								label: cafedra.fullName,
							}
							: null;
					})
					.filter(Boolean),
			},
		]);

	const selectedCafedraData = cafedras?.find((c) => c.id === Number(selectedCafedra));

	const pl = isMobile ? '0rem' : '2rem';
	const pr = isMobile ? '1.5rem' : '2rem';
	return (
		<Stack gap="0" pl={'0' || pl} mr={pr} maw="150rem">
			{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", 
			blur: 2
			 }} />}
			<Text fw={600} size="md" mb="1.5rem">
				Информация о кафедре
			</Text>
			<Stack gap="0" maw="150rem" align="center">

				<Group justify="center">
					<Select
						placeholder="Выберите факультет"
						description="Факультет"
						data={facultyOptions}
						value={selectedFaculty || null}
						onChange={handleFacultyChange}
						w="22rem"
						searchable
						clearable
						nothingFoundMessage="Nothing found..."
						styles={{
							input: {
								fontSize: '0.8rem',
							},
						}}
					/>
					<Select
						placeholder="Выберите кафедру"
						//@ts-ignore
						data={cafedraOptions}
						value={selectedCafedra || null}
						onChange={handleCafedraChange}
						w="22rem"
						searchable
						required
						nothingFoundMessage="Nothing found..."
						withAsterisk
						clearable
						description={
							<span>
								Кафедра<span style={{ color: 'red' }}>&nbsp;*</span>
							</span>
						}
						styles={{
							input: {
								fontSize: '0.8rem',
							},
						}}
					/>
				</Group>
				{selectedCafedraData || (loading&& selectedCafedra) ? (
					<>
						<Text mt='1rem' style={{ wordBreak: 'break-word', fontWeight: '655', textAlign: 'center' }}>
							Кафедра {selectedCafedraData?.fullName}
						</Text>
						<Text mb='1rem' style={{ wordBreak: 'break-word' }}>
							{selectedCafedraData?.shortName}
						</Text>
						<Group w={isMobile ? '22rem' : "25rem"}>
							<table>
								<tbody>

									{/* <EditableField
										label="Название"
										value={selectedCafedra.fullName}
										setValue={() => { }}
										isEditing={false}
										isMobile={false}
										component={EditableTextField}
									/> */}
									<EditableField
										label="Декан"
										value={selectedCafedraData?.dean && `${selectedCafedraData?.dean.firstName} ${selectedCafedraData?.dean.lastName}`}
										setValue={() => { }}
										isEditing={false}
										multiline
										isMobile={isMobile}
										component={Links}
										compProps={{
											links: selectedCafedraData?.dean && {
												url: `/profile/${selectedCafedraData?.dean.id}`,
												text: `${selectedCafedraData?.dean.firstName} ${selectedCafedraData?.dean.lastName}`,
												tooltip: selectedCafedraData?.dean.role,
											},
											loading
										}}
										fallback={{
											label:"Декан",
											value:'Не выбран 😕',
											isEditing: false,
											component: EditableTextField
										}}
									/>
									<EditableField
										multiline
										label="Заведующий кафедрой"
										value={selectedCafedraData?.headCafedra && `${selectedCafedraData?.headCafedra.firstName || ''} ${selectedCafedraData?.headCafedra.lastName || ''}`}
										setValue={() => { }}
										isEditing={false}
										isMobile={isMobile}
										component={Links}
										compProps={{
											links:selectedCafedraData?.headCafedra &&{
												url: `/profile/${selectedCafedraData?.headCafedra.id}`,
												text: `${selectedCafedraData?.headCafedra.firstName} ${selectedCafedraData?.headCafedra.lastName}`,
												tooltip: selectedCafedraData?.headCafedra.role,
											},
											loading
										}}
										fallback={{
											label:"Заведующий кафедрой",
											value:'Не выбран 😕',
											isEditing: false,
											component: EditableTextField
										}}
									/>
									<EditableField
										label="Сотрудники"
										value={selectedCafedraData?.workers.length}
										setValue={() => { }}
										isEditing={false}
										isMobile={isMobile}
										component={Links}
										multiline
										compProps={{
											links: selectedCafedraData?.workers.length &&selectedCafedraData?.workers.map(worker => {
												return {
													url: `/profile/${worker.id}`,
													text: `${worker.firstName} ${worker.lastName}`,
													tooltip: worker.role,
													// openDelay:30
												}
											}),
											loading
										}}
										fallback={{
											label:"Сотрудники",
											value:'Пока никто здесь не работает 😕',
											isEditing: false,
											component: EditableTextField
										}}
									/>
									<EditableField
										label="Группы"
										multiline
										value={selectedCafedraData?.groups.length}
										setValue={() => { }}
										isEditing={false}
										isMobile={isMobile}
										component={Links}
										compProps={{
											links: selectedCafedraData?.groups.length && selectedCafedraData?.groups.map(group => {
												return {
													url: `/groups?group=${group.id}`,
													text: group.shortName,
													tooltip: group.fullName,
													openDelay: 30
												}
											}),
											loading
										}}
										fallback={{
											label:"Сотрудники",
											value:'Пока никаких групп здесь нет 😕',
											isEditing: false,
											component: EditableTextField
										}}
									/>

								</tbody>
							</table>
						</Group>
					</>
				) : (
					
					<Text mt='1rem'>
						{(selectedCafedra && !loading) ? 
						'Похоже вы ввели что-то не так 🤒':
						"Выберите кафедру, чтобы увидеть информацию"
						}
					</Text>
				)}
			</Stack>

		</Stack>
	)
}

export default CafedraSearch