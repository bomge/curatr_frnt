import type { ISearchPersonWorker, SearchPersonResult } from "@/pages/Search/Search.page";
import { Stack, LoadingOverlay, Box, Paper, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import SearchCard from "./searchcard";
import SearchInput from "./SearchInput";
import classes from './style.module.css'
interface SearchGroupProps {
	loading: boolean;
	onSearchChange: (str: string) => void;
	result: SearchPersonResult;
	initialSearch: string
}

const PersonSearch: React.FC<SearchGroupProps> = ({ result, loading, onSearchChange, initialSearch }) => {
	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} maw="150rem">
			<Text fw={600} size="md"  ta='center'>
				Поиск людей
			</Text>
			<Stack gap="0" maw="150rem" align="center">
				<SearchInput onSearchChange={onSearchChange} initialSearch={initialSearch} />
				<Box pos='relative' mt='0.5rem'>
					<LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
					<Paper shadow="xs" p="0.3rem" miw={isMobile ? '23rem' : '30rem'} maw={isMobile ? '99dvw' : '35rem'}
						mih={isMobile?'69dvh': '78dvh'}
						// bg='gray.1'
						className={classes.paperSearch}
						>
						{result.result.length === 0 ? (
							<Text ta='center'>
								Ничего не найдено 😕
							</Text>
						) : (
							result.result.map((person) => (
								<SearchCard key={person.id} person={person} isMobile={isMobile} />
							))
						)}
					</Paper>
				</Box>
			</Stack>
		</Stack>
	);
};

export default PersonSearch;
