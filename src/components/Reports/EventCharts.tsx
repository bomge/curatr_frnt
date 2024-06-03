import type React from 'react';
import EventTypeChart from './EventTypeChart';
import EventsByDateChart from './EventsByDateChart';
import type { IEvent } from '@/pages/Main/types';

interface EventChartsProps {
  events: IEvent[];
}

const EventCharts: React.FC<EventChartsProps> = ({ events }) => {
  return (
    <div>
      <h2>Тип мероприятия</h2>
      <EventTypeChart events={events} />
      <h2>По дате</h2>
      <EventsByDateChart events={events} />
    </div>
  );
};

export default EventCharts;
