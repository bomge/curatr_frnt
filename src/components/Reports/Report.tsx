import { useState } from 'react';
import DateFilter from './DateFilter';
import type { IEvent } from '@/pages/Main/types';
import EventCharts from './EventCharts';
import { Stack } from '@mantine/core';

interface ReportPageProps {
  events: IEvent[];
}

const Report: React.FC<ReportPageProps> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  const handleFilter = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filtered = events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return eventStart >= start && eventEnd <= end;
    });

    setFilteredEvents(filtered);
  };
  return (
    <Stack>
      <DateFilter onFilter={handleFilter} />
      <EventCharts events={filteredEvents} />
    </Stack>
  );
};

export default Report;
