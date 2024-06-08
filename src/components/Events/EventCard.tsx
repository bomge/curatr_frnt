import { Card, Group, Text, Badge, useMantineTheme, Modal, NumberInput, Textarea, rem, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import FormattedDateTime from '@/components/EventCard/FormattedDateTime';
import type { IEvent, IReport } from '@/pages/Main/types';
import styles from './style.module.css';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { IconMessage, IconUser } from '@tabler/icons-react';

interface EventCardProps {
	event: IEvent;
	onSaveReport: (eventId: number, report: IReport) => void
}

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

const EventCard: React.FC<EventCardProps> = ({
	event,
	onSaveReport
}) => {
	const theme = useMantineTheme();
	const [expanded, setExpanded] = useState(false);
	const toggleExpansion = () => setExpanded((prev) => !prev);

	const [modalOpened, setModalOpened] = useState(false);
	const [numParticipants, setNumParticipants] = useState<string | number>(event.report?.numParticipants || 0);
	const [comment, setComment] = useState(event.report?.comment || '');

	const openModal = () => setModalOpened(true);
	const closeModal = () => setModalOpened(false);

	const handleSaveReport = () => {
		const report: IReport = {
			numParticipants: +numParticipants,
			comment,
		};
		onSaveReport(event.id, report);
		closeModal();
	};

	const isOngoingOrCanceled = event.status === 'В процессе' || event.status === 'Отменено' || event.status == 'Завершено';


	return (
		<Card
			shadow="sm"
			key={event.id}
			data-id={`event-${event.id}`}
			className={`${styles.card} ${event.status === 'Завершено' || event.status === 'Отменено'
				? styles.cardЗавершено
				: ''
				}`}
			ml='0.3rem'
			mr='0.3rem'
			mb='0.3rem'
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
					<Badge
						variant="light"
						color={eventTypeColor[event.type] || theme.colors.teal[6]}
					>
						{event.type}
					</Badge>
					<Badge
						color={eventStatusColor[event.status] || theme.colors.teal[6]}
					>
						{event.status}
					</Badge>
					{event.isImportant ? <Badge color="red">Важное❗️</Badge> : ''}
				</Group>
			</Group>
			<Group align="center" >
				<Link to='/event/1' style={{ textDecoration: 'none', color: 'inherit' }}>
					<Text size="lg" m="0" className='eventCardName'>
						{event.name}
					</Text>
				</Link>
				<Text color="dimmed" size="sm" m='0'>
					{event.creator}
				</Text>
			</Group>
			<Group>

				<Text color="dimmed">
					{expanded ? (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<span
							onClick={toggleExpansion}
							style={{ cursor: event.groups.length > 3 ? 'pointer' : '' }}
						>
							{event.groups.join(', ')}
						</span>
					) : (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<span
							onClick={toggleExpansion}
							style={{ cursor: 'pointer' }}
						>
							{event.groups.slice(0, 3).join(', ')}
							{event.groups.length > 3 && '...'}
						</span>
					)}
				</Text>
				{isOngoingOrCanceled && (
					<Group align="right">
						<Button onClick={openModal} size='compact-xs' color={event.report ? 'gray.7' : "yellow.9"} variant="light" radius='sm' style={{ cursor: 'pointer' }}>
							{event.report ? 'Редактировать отчет' : 'Отправить отчет'}
						</Button>
					</Group>
				)}
			</Group>
			<Modal opened={modalOpened} onClose={closeModal} title={<span>Отчет на <Text component='span' fw='600'>{event.name}</Text></span>}
			>
				<NumberInput
					label="Количество участников"
					value={numParticipants}
					onChange={setNumParticipants}
					min={0}
					allowDecimal={false}
					leftSection={<IconUser style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
				/>
				<Textarea
					label="Комментарий"
					value={comment}
					onChange={(event) => setComment(event.currentTarget.value)}
					mt="md"
					leftSection={<IconMessage style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
				/>
				<Group align="right" mt="md">
					<Badge onClick={handleSaveReport} color="green" variant="light" style={{ cursor: 'pointer' }}>
						Сохранить
					</Badge>
				</Group>
			</Modal>
		</Card>
	);
};

export default EventCard;