import { Card, Group, Text, Badge, useMantineTheme, Modal, NumberInput, Textarea, rem, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import FormattedDateTime from '@/components/EventCard/FormattedDateTime';
import type { IEvent, IEventWithReport, IReport } from '@/pages/Main/types';
import styles from './reports.module.css';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { IconMessage, IconUser } from '@tabler/icons-react';


export const eventTypeColor = {
	'Академическое': 'indigo',
	'Культурное': 'plum',
	'Спортивное': 'teal',
	'Социальное': 'coral',
	'Административное': 'slategray',
};

export const eventStatusColor = {
	// Предстоящее: 'yellow',
	// Предстоящее: '#4cf700',
	Предстоящее: '#61d62d',
	'В процессе': 'lightgreen',
	Завершено: 'lightgray',
	Отменено: 'red',
	Перенесено: 'lightblue',
};

interface ReportEventCardProps {
	event: IEventWithReport;
	onSelect: (event: IEventWithReport) => void;
}
const ReportEventCard: React.FC<ReportEventCardProps> = ({ event, onSelect }) => {
	const theme = useMantineTheme();
	const [expanded, setExpanded] = useState(false);
	const toggleExpansion = () => setExpanded((prev) => !prev);

	const getGroupStatusColor = (group: string) => {
		const groupReport = event.reports?.find(report => report.group.name === group);
		if (!groupReport) return 'red.9';
		return groupReport.report ? 'green.5' : 'yellow';
	};

	const getOverallReportStatus = () => {
		if (!event.reports || event.reports.length === 0) return 'red.4';
		const totalGroups = event.groups.length;
		const groupsWithReports = event.reports.filter(report => report.report).length;
		if (groupsWithReports === totalGroups) return 'gray.3';
		if (groupsWithReports > 0) return 'orange.2';
		return 'red';
	};

	const overallReportStatus = getOverallReportStatus();

	return (
		<Card
			shadow="sm"
			key={event.id}
			data-id={`event-${event.id}`}
			className={`${styles.card} ${event.status === 'Завершено' || event.status === 'Отменено' ? styles.cardЗавершено : ''}`}
			ml='0.3rem'
			mr='0.3rem'
			mb='0.3rem'
			onClick={() => onSelect(event)}
			withBorder
		>
			<Group>
				<Text size="xs">
					<FormattedDateTime date={event.startDate} />
					{' - '}
					<FormattedDateTime date={event.endDate} size="xs" />{' '}
					<Text size="xs" color="cyan">
						{+new Date(event.endDate) < Date.now()
							? `(${formatDistance(new Date(event.endDate), Date.now(), {
								addSuffix: true,
								locale: ru,
							})})`
							: +new Date(event.startDate) > Date.now()
								? `(через ${formatDistance(new Date(event.startDate), Date.now(), {
									locale: ru,
								})})`
								: '(активно)'}
					</Text>
				</Text>
				<Group mb="0.5rem" gap="xs">
					<Badge variant="light" color={eventTypeColor[event.type] || theme.colors.teal[6]}>
						{event.type}
					</Badge>
					<Badge color={eventStatusColor[event.status] || theme.colors.teal[6]}>
						{event.status}
					</Badge>
					{event.isImportant ? <Badge color="red">Важное❗️</Badge> : ''}
				</Group>
			</Group>
			<Group align="center">
				<Text size="lg" m="0">
					{event.name}
				</Text>
				<Text color="dimmed" size="sm" m='0'>
					{event.creator}
				</Text>
			</Group>
			<Group>
				<Text color="dimmed">
					{expanded ? (
						<Text onClick={toggleExpansion} style={{ cursor: event.groups.length > 3 ? 'pointer' : '' }}>
							{event.groups.map(group => (
								<Text key={group} component="span" color={getGroupStatusColor(group)}>
									{group}
								</Text>
							)).reduce((prev, curr) => [prev, ', ', curr] as any)}
						</Text>
					) : (
						<Text onClick={toggleExpansion} style={{ cursor: 'pointer' }}>
							<Group gap="0">
								{event.groups.slice(0, 3).map(group => (
									<Text key={group} component="span" color={getGroupStatusColor(group)}>
										{group}
									</Text>
								)).reduce((prev, curr) => [prev, ', ', curr] as any)}
								{event.groups.length > 3 && '...'}
							</Group>
						</Text>
					)}
				</Text>
				<Badge color={overallReportStatus} radius='sm'>
					{overallReportStatus === 'gray.3' ? 'Завершено' : 'В процессе'}
				</Badge>
			</Group>
		</Card>
	);
};


export default ReportEventCard;