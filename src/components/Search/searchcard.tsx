import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { ISearchPersonWorker, ISearchPersonStudent } from '@/pages/Search/Search.page';

interface SearchCardProps {
  person: ISearchPersonWorker | ISearchPersonStudent;
  isMobile?: boolean;
}

const SearchCard: React.FC<SearchCardProps> = ({ person, isMobile }) => {
  const isWorker = 'scienceDegree' in person;
  const fullName = `${person.lastName} ${person.firstName} ${person.surName || ''}`;
  console.log(person)
  const additionalInfo = isWorker
    ? `${person.scienceDegree} - ${person.faculty.shortName} ${person.role}`
    : `Студент ${person.faculty.shortName} - ${person.group.shortName}`;

  return (
    <Paper shadow="xs" radius="md" withBorder bg='#ffffffbf' mb='0.35rem'>
      <Group 
	//   mb='0.2rem'
	   p='xs' style={{ flexWrap: 'nowrap' }} gap='0'>
        <Avatar src={person.avatar} size="lg" radius="xl" mr="md" />
        <Stack gap='0'>
          <Text ta='left'  style={{ fontSize: '18px', fontWeight:isMobile?"500":'400', wordBreak:'normal' }}>{fullName}</Text>
          <Text size="sm" color="dimmed">
            {additionalInfo}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default SearchCard;
