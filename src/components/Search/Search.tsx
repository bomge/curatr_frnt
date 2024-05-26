import type { ISearchPersonWorker, SearchPersonResult } from "@/pages/Search/Search.page";
import { Stack, LoadingOverlay, Box, CloseButton, Input, Text, Paper } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { pl } from "date-fns/locale"
import { useState } from "react";
import SearchCard from "./searchcard";

interface SearchGroupProps {
	loading: boolean
	onGroupDataUpdated: () => void;
	onGroupChange: (str: string) => void;
	result: SearchPersonResult
}

const PersonSearch: React.FC<SearchGroupProps> = ({
	result,
	loading,
	onGroupDataUpdated,
	onGroupChange,
}) => {
	const isMobile = !!useMediaQuery('(max-width: 600px)');
	const [value, setValue] = useState('Clear me');

	const pl = isMobile ? '0rem' : '2rem';
	const pr = isMobile ? '0.15rem' : '2rem';

	const person: ISearchPersonWorker = {
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		surName: '',
		avatar: 'https://example.com/avatar.jpg',
		scienceDegree: 'Ph.D.',
		faculty: {
			id: 1,
			shortName: 'FCS',
			fullName: 'Faculty of Computer ScienceFaculty of Computer ScienceFaculty of Computer ScienceFaculty of Computer Science',
		},
	};

	return (
		<Stack gap="0" pl={'0' || pl} mr={pr} maw="150rem">

			<Text fw={600} size="md" mb="1.5rem">
				Поиск людей
			</Text>

			<Stack gap="0" maw="150rem" align="center">
				<Input
					placeholder="Clearable input"
					value={value}
					onChange={(event) => setValue(event.currentTarget.value)}
					rightSectionPointerEvents="all"
					mt="md"
					rightSection={
						<CloseButton
							aria-label="Clear input"
							onClick={() => setValue('')}
							style={{ display: value ? undefined : 'none' }}
						/>
					}
				/>

				<Box pos='relative' mt='0.5rem'>
					{loading && <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{
						radius: "sm",
						blur: 2
					}} />}
					<Paper shadow="xs" p="0.3rem"  w='30rem' maw='100%' mih='39rem'  bg='gray.1'>
						<Text ta='center'>
							{value ? 'Ничего не найдено :('
								: 'Здесь будут результаты поиска :)'}
						</Text>

						<SearchCard person={person} isMobile={false} /> {/* Render for desktop */}
						<SearchCard person={person} isMobile={false} /> {/* Render for desktop */}
						{/* <SearchCard person={person} isMobile /> Render for mobile */}
					</Paper>
				</Box>
			</Stack>
		</Stack>
	)
}

export default PersonSearch