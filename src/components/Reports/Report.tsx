import type React from 'react';
import { useState } from 'react';
import DateFilter from './DateFilter';
import type { IEvent } from '@/pages/Main/types';
import EventCharts from './EventCharts';
import { Stack } from '@mantine/core';

interface ReportPageProps {
  events: IEvent[];
  allGroups: { id: number; name: string }[];
}

const Report: React.FC<ReportPageProps> = ({ events, allGroups }) => {
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleFilter = (startDate: string, endDate: string, groups: string[]) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log(groups)
    const filtered = events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const isWithinDateRange = eventStart >= start && eventEnd <= end;
      const isInSelectedGroups = groups.length === 0 || event.groups.some(group => groups.includes(group));
      return isWithinDateRange && isInSelectedGroups;
    });
    console.log(filtered)
    setFilteredEvents(filtered);
    setSelectedGroups(groups);
  };

  return (
    <Stack>
      <DateFilter onFilter={handleFilter} allGroups={allGroups} />
      <EventCharts events={filteredEvents} selectedGroups={selectedGroups} />
    </Stack>
  );
};

export default Report;
