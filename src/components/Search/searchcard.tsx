import React from 'react';
import { Avatar, Box, Group, Paper, Stack, Text } from '@mantine/core';
import { MobileStackPcGroup } from '../Fields/EditableField';
import { ISearchPersonWorker, ISearchPersonStudent } from '@/pages/Search/Search.page';

interface SearchCardProps {
  person: ISearchPersonWorker | ISearchPersonStudent;
  isMobile?: boolean;
}

const SearchCard: React.FC<SearchCardProps> = ({ person, isMobile }) => {
  const isWorker = 'scienceDegree' in person;
  const fullName = `${person.lastName} ${person.firstName} ${person.surName || ''}`;
  const additionalInfo = isWorker
    ? `${person.scienceDegree} - ${person.faculty.fullName}`
    : `${person.faculty.fullName} - ${person.group.shortName}`;

  return (
	<Paper shadow="xs" radius="md" withBorder bg='#ffffffbf' mb='0.35rem'>

    <Group
	//   maw='90dvw'
	mb='0.6rem'
	p='xs'
	style={{
		// border: '1px solid',
		flexWrap:'nowrap'
	}}
	gap='0'
    >
      <Avatar src={person.avatar} size="lg" radius="xl" mr="md" />
      <Stack gap='0'>
        <Text  maw='10rem' fs='20px' ta='left' style={{fontSize:'20px'}}>{fullName}</Text>
        <Text  size="sm" color="dimmed">
          {additionalInfo}
        </Text>
      </Stack>
    </Group>
	</Paper>
  );
};

export default SearchCard;