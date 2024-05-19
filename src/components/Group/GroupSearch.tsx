import type { CafedraInfo, FacultyInfo } from "@/pages/Cafedra/Cafedras.page";
import { Group, LoadingOverlay, Select, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { EditableField } from "../Fields/EditableField";
import Links from "../Fields/Links";
import { EditableTextField } from "../Fields/OtherFields";
import type { ExtendedCafedra } from "@/pages/Group/Groups.page";

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

const isGroupInCafedra = (
	cafedras: ExtendedCafedra[],
	cafedraId: string | null,
	groupId: string | null
) => {
	if (!cafedraId || !groupId) return false;

	const cafedra = cafedras.find((c) => String(c.id) === cafedraId);
	if (!cafedra) return false;

	return cafedra.groups.some((g) => String(g.id) === groupId);
};

interface SearchGroupProps {
	faculties: FacultyInfo[];
	cafedras: ExtendedCafedra[];
	selectedFaculty: string | null;
	selectedCafedra: string | null;
	selectedGroup: string | null;
	onFacultyChange: (facultyId: string | null) => void;
	onCafedraChange: (cafedraId: string | null) => void;
	onGroupChange: (cafedraId: string | null) => void;
	loading: boolean
}

const GroupSearch: React.FC<SearchGroupProps> = ({
	faculties,
	cafedras,
	selectedFaculty,
	selectedCafedra,
	selectedGroup,
	onFacultyChange,
	onCafedraChange,
	onGroupChange,
	loading
}) => {
	const isMobile = !!useMediaQuery('(max-width: 600px)');

	const handleFacultyChange = (facultyId: string | null) => {
		onFacultyChange(facultyId);
		if (!facultyId || (facultyId &&
			!isCafedraInFaculty(faculties, facultyId, selectedCafedra))
		){

			console.log('clear cafedra')
			handleCafedraChange('');
		}
	};

	const handleCafedraChange = (cafedraId: string | null) => {
		onCafedraChange(cafedraId);
		console.log(cafedraId,selectedCafedra)
		if (!cafedraId || (cafedraId && !isGroupInCafedra(cafedras, cafedraId, selectedGroup)))
		 {
			console.log('clear group')
			onGroupChange('');
		}
	};
	const handleGroupChange = (groupId: string | null) => {
		onGroupChange(groupId);
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

	const groupOptions = selectedCafedra
		? cafedras
			.find((c) => c.id === Number(selectedCafedra))
			?.groups.map((group) => ({
				value: group.id.toString(),
				label: group.shortName,
			})) || []
		: selectedFaculty
			? cafedras
				.filter((c) =>
					faculties.find((f) => f.id === Number(selectedFaculty))?.cafedras.some(
						(cafedraId) => cafedraId.id === c.id
					)
				)
				.flatMap((c) => [
					{
						group: c.fullName,
						items: c.groups.map((group) => ({
							value: group.id.toString(),
							label: group.shortName,
						})),
					},
				])
			: cafedras.flatMap((c) => [
				{
					group: c.fullName,
					items: c.groups.map((group) => ({
						value: group.id.toString(),
						label: group.shortName,
					})),
				},
			]);

	const selectedGroupData = selectedGroup
		? cafedras.flatMap((c) => c.groups).find((g) => g.id === Number(selectedGroup))
		: null;

	// const selectedGroupData = groups?.find((g) => g.id === Number(selectedGroup));

	const selectedCafedraData = cafedras?.find((c) => c.id === Number(selectedCafedra));

	console.log(selectedCafedraData)

	const pl = isMobile ? '0rem' : '2rem';
	const pr = isMobile ? '0.15rem' : '2rem';
	return (
		<Stack gap="0" pl={'0' || pl} mr={pr} maw="150rem">
			{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{
				radius: "sm",
				blur: 2
			}} />}
			<Text fw={600} size="md" mb="1.5rem">
				Информация о группе
			</Text>
			<Stack gap="0" maw="150rem" align="center">

				<Group justify="center" gap={isMobile ? '0.4rem' : '1rem'} mb={isMobile ? '0.4rem' : '0.5rem'}>
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
						description='Кафедра'
						styles={{
							input: {
								fontSize: '0.8rem',
							},
						}}
					/>
				</Group>
				<Select
					placeholder="Выберите группу"
					//@ts-ignore
					data={groupOptions}
					value={selectedGroup || null}
					onChange={handleGroupChange}
					w="22rem"
					searchable
					required
					nothingFoundMessage="Nothing found..."
					withAsterisk
					clearable
					description={
						<span>
							Группа<span style={{ color: "red" }}>&nbsp;*</span>
						</span>
					}
					styles={{
						input: {
							fontSize: "0.8rem",
						},
					}}
				/>
				{selectedCafedraData || (loading && selectedCafedra) ? (
					<>
						<Text mt='1rem' style={{ wordBreak: 'break-word', fontWeight: '655', textAlign: 'center' }}>
							{selectedCafedraData?.fullName}
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
											label: "Декан",
											value: 'Не выбран 😕',
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
											links: selectedCafedraData?.headCafedra && {
												url: `/profile/${selectedCafedraData?.headCafedra.id}`,
												text: `${selectedCafedraData?.headCafedra.firstName} ${selectedCafedraData?.headCafedra.lastName}`,
												tooltip: selectedCafedraData?.headCafedra.role,
											},
											loading
										}}
										fallback={{
											label: "Заведующий кафедрой",
											value: 'Не выбран 😕',
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
											links: selectedCafedraData?.workers.length && selectedCafedraData?.workers.map(worker => {
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
											label: "Сотрудники",
											value: 'Пока никто здесь не работает 😕',
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
													url: `/group/${group.id}`,
													text: group.shortName,
													tooltip: group.fullName,
													openDelay: 30
												}
											}),
											loading
										}}
										fallback={{
											label: "Сотрудники",
											value: 'Пока никаких групп здесь нет 😕',
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
							'Похоже вы ввели что-то не так 🤒' :
							"Выберите кафедру, чтобы увидеть информацию"
						}
					</Text>
				)}
			</Stack>

		</Stack>
	)
}

export default GroupSearch