import EventDetails from '@/components/EventDetails/EventDetails';
import type React from 'react';

const eventData = {
	id: 1,
	name: 'Собрание кафедры',
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	type: 'Административное',
	status: 'Завершено',
	creator: {
	  name: 'Alex Durov',
	  id: 1,
	},
	groups: [{ id: 1, name: 'IT-21' }, { id: 2, name: 'IT-22' }],
	isImportant: false,
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl eu nisl.',
  };

  const allGroups = [
	{ id: 1, name: 'IT-21' },
	{ id: 2, name: 'IT-22' },
	{ id: 3, name: 'IT-31' },
	{ id: 4, name: 'IT-41' },
	{ id: 5, name: 'IT-51' },
	{ id: 6, name: 'IT-61' },
  ];

const EventPage: React.FC = () => {
//   return <div>Event Page</div>;
	return <EventDetails eventData={eventData} allGroups={allGroups}/>
};

export default EventPage;