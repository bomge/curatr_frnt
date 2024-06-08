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
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import { eventObj } from './testData';
import 'dayjs/locale/ru';
import { formatDistance, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { MobileStackPcGroup } from '@/components/Fields/EditableField';
import FormattedDateTime from '@/components/EventCard/FormattedDateTime';
import HighlightedDay from '@/components/Main/HighlightedDay';
import { node } from 'prop-types';
import { useAuthStore } from '@/store/useAuthStore';

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

export const eventIndicatorColor = {
    Завершено: '#595959',
    important: 'red',
    active: '#4cf700',
    // active: 'yellow',
};



const MainPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [expandedEvents, setExpandedEvents] = useState<number[]>([]);
    const { colorScheme } = useMantineColorScheme();
    const isMobile = !!useMediaQuery('(max-width: 600px)');
    const currentDate = new Date();

    let events = eventObj.events 

    const { userRole } = useAuthStore();
    console.log(userRole)
    
    if(userRole == 'curator'){
         events = events.filter(event=>event.groups.some(g=>g == 'ИП-21'))
    }

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
        const ЗавершеноEvents = eventsOnDate.every(
            (event) =>
                event.status === 'Завершено' || event.status === 'Отменено',
        );
        const hasImportantActiveEvent = eventsOnDate.some(
            (event) =>
                event.isImportant &&
                event.status !== 'Завершено' &&
                event.status !== 'Отменено',
        );
        const hasActiveEvent = eventsOnDate.some(
            (event) =>
                event.status !== 'Завершено' && event.status !== 'Отменено',
        );

        if (hasImportantActiveEvent) {
            return eventIndicatorColor['important'];
        }
        if (hasActiveEvent) {
            return eventIndicatorColor['active'];
        }
        return eventIndicatorColor['Завершено'];
    };

    const getYearControlProps: DatePickerProps['getYearControlProps'] = (date) => {
        if (date.getFullYear() === new Date().getFullYear()) {
            return {
                style: {
                    color: 'var(--mantine-color-blue-filled)',
                    fontWeight: 700,
                },
            };
        }


        return {};
    };

    const getMonthControlProps: DatePickerProps['getMonthControlProps'] = (date) => {
        if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            return {
                style: {
                    color: 'var(--mantine-color-blue-filled)',
                    fontWeight: 700,
                },
            };
        }


        return {};
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
                                <HighlightedDay
                                    date={date}
                                    currentDate={currentDate}
                                    dateEvents={dateEvents}
                                    indicatorColor={indicatorColor}
                                    selectedDate={selectedDate}
                                />
                            );
                        }}
                        getYearControlProps={getYearControlProps}
                        getMonthControlProps={getMonthControlProps}
                    />
                </Paper>

                <Link to='/event/new' style={{textDecoration:'none', color:'inherit',alignSelf: isMobile ? '' : 'flex-start'}}>
                    <Button style={{ alignSelf: isMobile ? '' : 'flex-start' }}>

                        Создать мероприятие
                    </Button>
                </Link>
            </MobileStackPcGroup>
            <Stack>
                {userRole == 'curator' && <Text ta='center'>
                        ИП-21
                </Text>}
                {filteredEvents.length > 0 ? (
                    filteredEvents
                        .sort((a, b) => {
                            const aIsЗавершено = a.status === "Отменено" || a.status === "Завершено";
                            const bIsЗавершено = b.status === "Отменено" || b.status === "Завершено";

                            // If both events have the same completion status
                            if (aIsЗавершено === bIsЗавершено) {
                                // Sort by startDate
                                return +new Date(a.startDate) - +new Date(b.startDate);
                            }

                            // Sort by completion status (active events first)
                            return aIsЗавершено ? 1 : -1;
                        })
                        .map((event) => (
                            <Link to='/event/1' style={{ textDecoration: "none" }}>
                                <Card
                                    shadow="sm"
                                    key={event.id}
                                    data-id={`event-${event.id}`}
                                    className={`${styles.card} ${event.status === 'Завершено' ||
                                            event.status === 'Отменено'
                                            ? styles.cardЗавершено
                                            : ''
                                        }`}
                                >


                                    <Group>
                                        <Text size="xs">
                                            <FormattedDateTime date={event.startDate} />
                                            {' - '}
                                            <FormattedDateTime date={event.endDate} size='xs' />{' '}
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
                                                    eventStatusColor[event.status] || 'teal'
                                                }
                                            >
                                                {event.status}
                                            </Badge>
                                            {event.isImportant ? (
                                                <Badge color="red">
                                                    Важное❗️
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
                    <Text size="lg" ta='center'>
                        На выбранную дату мероприятий не найдено 😕
                    </Text>
                )}
            </Stack>
        </Stack>
    );
};

export default MainPage;
