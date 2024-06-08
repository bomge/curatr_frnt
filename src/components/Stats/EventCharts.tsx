import type React from 'react';
import EventTypeChart from './EventTypeChart';
import EventsByDateChart from './EventsByDateChart';
import GroupEventsByDateChart from './GroupEventsByDateChart';
import GroupEventTypeChart from './GroupEventTypeChart';
import type { IEvent } from '@/pages/Main/types';
import { Stack } from '@mantine/core';
import { generateGroupColors } from '@/util/randColor';
import { useMemo } from 'react';
import EventsCountByDateChart from './EventsCountByDateChart';

interface EventChartsProps {
  events: IEvent[];
  selectedGroups: string[];
}

const EventCharts: React.FC<EventChartsProps> = ({ events, selectedGroups }) => {
  const groupColors = useMemo(() => generateGroupColors(selectedGroups), [selectedGroups]);
    console.log(groupColors)
  return (
    <Stack maw='100dvw'>
      <h2>Тип мероприятия</h2>
      <EventTypeChart events={events} />
      <h2>По дате</h2>
      <EventsByDateChart events={events} />
      <h2>Количество мероприятий по дате</h2>
      <EventsCountByDateChart events={events} />
      {selectedGroups.length > 0 && (
        <>
          <h2>Группы по дате мероприятий</h2>
          <GroupEventsByDateChart events={events} selectedGroups={selectedGroups}  groupColors={groupColors} />
          <h2>Группы по количеству мероприятий</h2>
          <GroupEventTypeChart events={events} selectedGroups={selectedGroups} groupColors={groupColors} />
        </>
      )}
    </Stack>
  );
};

export default EventCharts;
