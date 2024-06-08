import type { IEvent, IEventStatus, IReport } from '@/pages/Main/types';
import { Stack, LoadingOverlay, Text, Tabs, Container, Paper, Checkbox, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import EventCard from './EventCard';
import classes from './style.module.css'
import { useState } from 'react';

const eventStatuses: IEventStatus[] = [
	'Предстоящее',
	'В процессе',
	'Завершено',
];
interface EventsProps {
	loading: boolean;
	events: IEvent[];
	handleFilterEvents: (status: IEventStatus) => void;
	onSaveReport: (eventId: number, report: IReport) => void
}

const Events: React.FC<EventsProps> = ({
	events,
	loading,
	handleFilterEvents,
	onSaveReport
}) => {
	const isMobile = useMediaQuery('(max-width: 600px)');
	const [showOnlyEventsWithoutReport, setShowOnlyEventsWithoutReport] = useState(false);

	const sortedEvents = [...events].sort((a, b) => {
		// Sort by importance first
		if (a.isImportant && !b.isImportant) return -1;
		if (!a.isImportant && b.isImportant) return 1;

		// Then sort by start date
		return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
	});

	const filteredEvents = showOnlyEventsWithoutReport
		? sortedEvents.filter((event) =>  !event.report)
		: sortedEvents;

	const eventsCards = filteredEvents.map((event) => (
		<EventCard key={event.id} event={event} onSaveReport={onSaveReport} />
	))


	return (
		<Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} maw="150rem">
			{loading && (
				<LoadingOverlay
					visible={loading}
					zIndex={1000}
					overlayProps={{
						radius: 'sm',
						blur: 2,
					}}
				/>
			)}
			<Text fw={600} size="md" ta="center">
				Мероприятия
			</Text>
			<Container>


				<Tabs
					defaultValue="Предстоящее"
					onChange={(status) => handleFilterEvents(status as IEventStatus)}
					styles={{
						//  list:{maxWidth:'30rem'}
						panel: { maxWidth: '38rem' },
					}}
				>
					<Tabs.List justify='center'>
						{eventStatuses.map((status) => (
							<Tabs.Tab key={status} value={status}>
								{status}
							</Tabs.Tab>
						))}
					</Tabs.List>
					<Paper shadow="xs" p="0"
						// bg='gray.1'
						className={classes.paperSearch}
					>
						<Tabs.Panel value={eventStatuses[0]}>
							{eventsCards}

						</Tabs.Panel>
						<Tabs.Panel value={eventStatuses[1]}>
							{eventsCards}
						</Tabs.Panel>
						<Tabs.Panel value={eventStatuses[2]}
						// w='fit-content' 
						>
							<Group mb="sm">
								<Checkbox
									checked={showOnlyEventsWithoutReport}
									onChange={(event) => setShowOnlyEventsWithoutReport(event.currentTarget.checked)}
									label="Только без отчёта"
								/>
							</Group>
							{eventsCards}
						</Tabs.Panel>
					</Paper>
				</Tabs>

			</Container>
		</Stack>
	);
};

export default Events;