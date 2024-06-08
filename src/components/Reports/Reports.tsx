import type { IEvent, IEventWithReport } from "@/pages/Main/types";
import type { NameId } from "@/pages/Profile.page";
import type { ValueLabel } from "@/pages/Reports.page";
import { Stack, LoadingOverlay, Text, Container, MultiSelect, Group, Paper, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import EventCard from "../Events/EventCard";
import ReportEventCard from "./ReportEventCard";
import EventReports from "./EventReports";
import { DatePicker } from "@mantine/dates";
import 'dayjs/locale/ru';
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface EventsProps {
	loading: boolean;
	events: IEventWithReport[];
	// handleFilterEvents: (status: IEventStatus) => void;
	groups: ValueLabel[];
	onFilterEvents: (selectedGroups: string[]) => void;
}

const Reports: React.FC<EventsProps> = ({
	events,
	loading,
	groups,
	onFilterEvents
}) => {
	const isMobile = useMediaQuery('(max-width: 600px)');
	const isLowScreen = useMediaQuery('(max-width: 10000px)');

	const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<IEventWithReport | null>(null);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
	const handleGroupSelect = (selectedGroups: string[]) => {
		setSelectedGroups(selectedGroups);
		onFilterEvents(selectedGroups);
	};

	const handleEventSelect = (event: IEventWithReport) => {
		setSelectedEvent(event);
	};

	let filteredEvents = events;

	if (dateRange[0] && dateRange[1]) {
		filteredEvents = events.filter((event) => {
			const startDate = new Date(event.startDate);
			const endDate = new Date(event.endDate);
			const startOfDay = new Date(dateRange[0]);
			startOfDay.setHours(0, 0, 0, 0);
			const endOfDay = new Date(dateRange[1]);
			endOfDay.setHours(23, 59, 59, 999);



			return (
				(startDate >= startOfDay && startDate <= endOfDay) ||
				(endDate >= startOfDay && endDate <= endOfDay) ||
				(startDate <= startOfDay && endDate >= endOfDay)
			);
		});
	}

	const sorted = [...filteredEvents].sort((a, b) => {
		const aCompleted = a.reports && a.reports.length === a.groups.length;
		const bCompleted = b.reports && b.reports.length === b.groups.length;

		if (a.isImportant && !b.isImportant) return -1;
		if (!a.isImportant && b.isImportant) return 1;

		if (!aCompleted && bCompleted) return -1;
		if (aCompleted && !bCompleted) return 1;

		return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
	});
	const today = new Date().toDateString();

	const getNoEventsMessage = () => {
		console.log(dateRange)
		if (dateRange[0] && dateRange[1] && dateRange[0]?.getDate() != dateRange[1]?.getDate()) {
		  return `в период с ${format(dateRange[0], 'dd MMM yyyy', { locale: ru })} по ${format(dateRange[1], 'dd MMM yyyy', { locale: ru })} мероприятий не найдено`;
		} else if (dateRange[0]) {
		  return `на ${format(dateRange[0], 'dd MMM yyyy', { locale: ru })} мероприятий не найдено`;
		} else if (dateRange[1]) {
		  return `на ${format(dateRange[1], 'dd MMM yyyy', { locale: ru })} мероприятий не найдено`;
		} else {
		  return 'Мероприятий не найдено';
		}
	  };

	return (

		<Stack gap="0" pl={isMobile ? '0rem' : '2rem'} mr={isMobile ? '0.15rem' : '2rem'} >
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
				Отчеты
			</Text>
			<MultiSelect
				data={groups}
				label="Группы"
				description='(опционально)'
				value={selectedGroups}
				onChange={handleGroupSelect}
				searchable
				clearable
				maw='100%'
				w='16rem'
				style={{ alignSelf: 'center' }}
			/>

			<Paper w='fit-content' mt='xs' style={{ alignSelf: 'center' }}>
				<DatePicker
					value={dateRange}
					type='range'
					onChange={setDateRange}
					allowSingleDateInRange
					locale="ru"
					renderDay={(date) => {
						const isToday = date.toDateString() === today;
						const isSelected = date.toDateString() == dateRange[1]?.toDateString() || date.toDateString() == dateRange[0]?.toDateString();
						return (
							<div
								style={{
									minWidth: '0.5rem',
									borderRadius: '0.25rem', padding: '0.1rem', paddingRight: '0.23rem', paddingLeft: '0.23rem'
								}}
								className={isToday && !isSelected ? 'currentDay' : ''}>
								{date.getDate()}
							</div>
						);
					}}
				/>
			</Paper>
			{/* <Container> */}

			{/* </Container> */}
			<Group mt='1rem' mb='1.5rem' pl={isLowScreen ? isMobile ? '0' : "2rem" : '5rem'}>

				<ScrollArea h='30rem' maw={isMobile ? '' : '40rem'} miw={isMobile ? '100%' : '40rem'}>

					<Paper shadow="xs" withBorder pt='0.5rem' h='30rem'
						// bg='gray.1'
						className='paperSearch'
					>
						{sorted.length ? sorted.map((event) => (
							<ReportEventCard
								key={event.id}
								event={event}
								onSelect={handleEventSelect}
							/>
						))
							: (
								<Text ta="center">{getNoEventsMessage()} 😕</Text>
							  )
						}
					</Paper>
				</ScrollArea>
				<Paper shadow="xs" p="0"
					// bg='gray.1'
					className='paperSearch'
					maw={isMobile ? '' : '50%'}
					w={isMobile ? '100%' : ''}
				>
					<EventReports event={selectedEvent} />
				</Paper>
			</Group>
		</Stack>
	)
}

export default Reports