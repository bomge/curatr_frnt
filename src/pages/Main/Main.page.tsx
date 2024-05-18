import {
    Stack,
    Card,
    Group,
    Text,
    Badge,
    Button,
    Paper,
    Indicator,
    useMantineColorScheme,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { events } from './testData';
import 'dayjs/locale/ru';
import { formatDistance, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { MobileStackPcGroup } from '@/components/Fields/EditableField';

export const eventTypeColor = {
    'Academic Event': 'indigo',
    'Cultural Event': 'plum',
    'Sports Event': 'teal',
    'Social Event': 'coral',
    'Administrative Event': 'slategray',
};

export const eventStatusColor = {
    // Upcoming: 'yellow',
    // Upcoming: '#4cf700',
    Upcoming: '#61d62d',
    'In Progress': 'lightgreen',
    Completed: 'lightgray',
    Canceled: 'red',
    Rescheduled: 'lightblue',
};

export const eventIndicatorColor = {
    completed: '#595959',
    important: 'red',
    active: '#4cf700',
    // active: 'yellow',
};



const MainPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [expandedEvents, setExpandedEvents] = useState<number[]>([]);
    const { colorScheme } = useMantineColorScheme();
    const isMobile = !!useMediaQuery('(max-width: 600px)');

    const filteredEvents = events.filter((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        return (
            (startDate >= startOfDay && startDate <= endOfDay) ||
            (endDate >= startOfDay && endDate <= endOfDay) ||
            (startDate <= startOfDay && endDate >= endOfDay)
        );
    });

    const toggleEventExpansion = (eventId: number) => {
        if (expandedEvents.includes(eventId)) {
            setExpandedEvents(expandedEvents.filter((id) => id !== eventId));
        } else {
            setExpandedEvents([...expandedEvents, eventId]);
        }
    };

    const getIndicatorColor = (eventsOnDate: typeof events) => {
        const completedEvents = eventsOnDate.every(
            (event) =>
                event.status === 'Completed' || event.status === 'Canceled',
        );
        const hasImportantActiveEvent = eventsOnDate.some(
            (event) =>
                event.isImportant &&
                event.status !== 'Completed' &&
                event.status !== 'Canceled',
        );
        const hasActiveEvent = eventsOnDate.some(
            (event) =>
                event.status !== 'Completed' && event.status !== 'Canceled',
        );

        if (hasImportantActiveEvent) {
            return eventIndicatorColor['important'];
        }
        if (hasActiveEvent) {
            return eventIndicatorColor['active'];
        }
        return eventIndicatorColor['completed'];
    };

    return (
        <Stack align="center" mt='md'>
            <MobileStackPcGroup isMobile={isMobile}>
                <Paper>
                    <DatePicker
                        value={selectedDate}
                        style={{
                            backgroundColor:
                                colorScheme == 'light'
                                    ? 'var(--mantine-color-gray-1)'
                                    : 'var(--mantine-color-dark-7)',
                        }}
                        //@ts-ignore
                        onChange={setSelectedDate}
                        locale="ru"
                        renderDay={(date) => {
                            const dateEvents = events.filter((event) => {
                                const startDate = new Date(event.startDate);
                                const endDate = new Date(event.endDate);
                                return (
                                    +startDate <=
                                        date.setHours(23, 59, 59, 999) &&
                                    +endDate >= date.setHours(0, 0, 0, 0)
                                );
                            });
                            const indicatorColor =
                                getIndicatorColor(dateEvents);
                            return (
                                <div style={{ position: 'relative' }}>
                                    {dateEvents.length > 0 && (
                                        <Indicator
                                            size={6}
                                            color={indicatorColor}
                                            offset={-1}
                                        >
                                            {/* <div>{date.getDate()}</div> */}
                                        </Indicator>
                                    )}
                                    <div>{date.getDate()}</div>
                                </div>
                            );
                        }}
                    />
                </Paper>

                <Button style={{ alignSelf:  isMobile?'' :'flex-start' }}>
                    Create Event
                </Button>
            </MobileStackPcGroup>
            <Stack>
                {filteredEvents.length > 0 ? (
                    filteredEvents
                    .sort((a, b) => {
                        const aIsCompleted = a.status === "Canceled" || a.status === "Completed";
                        const bIsCompleted = b.status === "Canceled" || b.status === "Completed";
                      
                        // If both events have the same completion status
                        if (aIsCompleted === bIsCompleted) {
                          // Sort by startDate
                          return +new Date(a.startDate) - +new Date(b.startDate);
                        }
                      
                        // Sort by completion status (active events first)
                        return aIsCompleted ? 1 : -1;
                      })
                        .map((event) => (
                            <Link to='/event/1'  style={{ textDecoration: "none" }}>
                            <Card
                                shadow="sm"
                                key={event.id}
                                data-id={`event-${event.id}`}
                                className={`${styles.card} ${
                                    event.status === 'Completed' ||
                                    event.status === 'canceled'
                                        ? styles.cardCompleted
                                        : ''
                                }`}
                            >
                                

                                <Group>
                                    <Text size="xs">
                                        {format(
                                            new Date(event.startDate),
                                            'dd.MM.yy HH:mm',
                                            { locale: ru },
                                        )}
                                        {' - '}
                                        {format(
                                            new Date(event.endDate),
                                            'dd.MM.yy HH:mm',
                                            { locale: ru },
                                        )}{' '}
                                        <Text size="xs" color="cyan">
                                            {+new Date(event.endDate) <
                                            Date.now()
                                                ? `(${formatDistance(
                                                      new Date(event.endDate),
                                                      Date.now(),
                                                      {
                                                          addSuffix: true,
                                                          locale: ru,
                                                      },
                                                  )})`
                                                : +new Date(event.startDate) >
                                                      Date.now()
                                                  ? `(через ${formatDistance(
                                                          new Date(
                                                              event.startDate,
                                                          ),
                                                          Date.now(),
                                                          {
                                                              locale: ru,
                                                          },
                                                      )})`
                                                  : '(активно)'}
                                        </Text>
                                    </Text>
                                    <Group mb="0.5rem" gap='xs'>
                                        <Badge
                                            variant="light"
                                            //@ts-ignore
                                            color={eventTypeColor[event.type] || 'teal'}
                                        >
                                            {event.type}
                                        </Badge>
                                        <Badge
                                            color={
                                            //@ts-ignore
                                            eventStatusColor[event.status]  || 'teal'
                                            }
                                        >
                                            {event.status}
                                        </Badge>
                                        {event.isImportant ? (
                                            <Badge color="red">
                                                Important!
                                            </Badge>
                                        ) : (
                                            ''
                                        )}
                                    </Group>
                                </Group>
                                <Group align="center">
                                    <Text size="lg" mb="0">
                                        {event.name}
                                    </Text>
                                    <Text color="dimmed" size="sm">
                                        {event.creator}
                                    </Text>
                                </Group>
                                <Text color="dimmed">
                                    {expandedEvents.includes(event.id) ? (
                                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                                        <span
                                            onClick={() =>
                                                toggleEventExpansion(event.id)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {event.groups.join(', ')}
                                        </span>
                                    ) : (
                                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                                        <span
                                            onClick={() =>
                                                toggleEventExpansion(event.id)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {event.groups
                                                .slice(0, 3)
                                                .join(', ')}
                                            {event.groups.length > 3 && '...'}
                                        </span>
                                    )}
                                </Text>
                            </Card>
                            </Link>

                        ))
                ) : (
                    <Text size="lg">
                        На выбранную дату мероприятий не найдено 😕
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};

export default MainPage;
