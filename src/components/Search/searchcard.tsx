import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import type { ISearchPersonWorker, ISearchPersonStudent } from '@/pages/Search/Search.page';
import { Link } from 'react-router-dom';
import classes from './style.module.css'
interface SearchCardProps {
	person: ISearchPersonWorker | ISearchPersonStudent;
	isMobile?: boolean;
}

const rareRoles = [
	'Зав. кафедры',
	'Декан'
]

const SearchCard: React.FC<SearchCardProps> = ({ person, isMobile }) => {
	const isWorker = 'scienceDegree' in person;
	const fullName = `${person.lastName} ${person.firstName} ${person.surName || ''}`;
	console.log(person)
	const additionalInfo = isWorker
		? `${person.scienceDegree} - ${person.faculty.shortName} ${rareRoles.includes(person.role) ? person.role : ''}`
		: `Студент ${person.faculty.shortName} - ${person.group.shortName}`;

	const type = isWorker?'/profile' : '/student'
	return (
		<Paper shadow="xs" radius="md" withBorder 
		// bg='#ffffffbf'
		className={classes.paperCard}
		 mb='0.35rem'>
			<Link to={`${type}/${person.id}`}  style={{ textDecoration: "none", color: 'inherit' }}>
			<Group
				//   mb='0.2rem'
				p='xs' style={{ flexWrap: 'nowrap' }} gap='0'>
				<Avatar src={person.avatar} size="lg" radius="xl" mr="md" />
				<Stack gap='0'>
					<Text ta='left' style={{ fontSize: '18px', fontWeight: isMobile ? "500" : '400', wordBreak: 'normal' }}>{fullName}</Text>
					<Text size="sm" color="dimmed">
						{additionalInfo}
					</Text>
				</Stack>
			</Group>
			</Link>
		</Paper>
	);
};

export default SearchCard;
