import type React from 'react';
import { useMemo } from 'react';
import { BarChart, type BarChartType } from '@mantine/charts';
import type { IEvent, IEventType } from '@/pages/Main/types';

interface EventsByDateChartProps {
  events: IEvent[];
}

const transformEventsToDateData = (events: IEvent[]): BarChartType[] => {
  const dailyData: Record<string, Record<IEventType, number>> = {};

  // Find the minimum and maximum dates from the events
  const minDate = new Date(Math.min(...events.map(event => new Date(event.startDate).getTime())));
  const maxDate = new Date(Math.max(...events.map(event => new Date(event.endDate).getTime())));

  // Initialize dailyData with all dates within the range and set count to 0 for each event type
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    const day = currentDate.toLocaleDateString();
    dailyData[day] = {
      'Академическое': 0,
      'Культурное': 0,
      'Спортивное': 0,
      'Социальное': 0,
      'Административное': 0,
    };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Count the events for each date and event type
  events.forEach(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const eventType = event.type;

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.toLocaleDateString();
      dailyData[day][eventType]++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  const chartData: BarChartType[] = [];

  for (const day in dailyData) {
    const dayData = dailyData[day];
    chartData.push({
      day,
      'Академическое': dayData['Академическое'],
      'Культурное': dayData['Культурное'],
      'Спортивное': dayData['Спортивное'],
      'Социальное': dayData['Социальное'],
      'Административное': dayData['Административное'],
    });
  }

  return chartData;
};

const EventsByDateChart: React.FC<EventsByDateChartProps> = ({ events }) => {
  const data = useMemo(() => transformEventsToDateData(events), [events]);
  const sortedData = [...data].sort((a, b) => {
    const [dayA, monthA, yearA] = a.day.split('.');
    const [dayB, monthB, yearB] = b.day.split('.');
    const dateA = new Date(+yearA, +monthA - 1, +dayA);
    const dateB = new Date(+yearB, +monthB - 1, +dayB);
    return dateA.getTime() - dateB.getTime();
  });
	  console.log(sortedData)
  return (
    <BarChart
      h={300}
      data={sortedData}
      dataKey="day"
      series={[
        { name: 'Академическое', color: 'violet.6' },
        { name: 'Культурное', color: 'blue.6' },
        { name: 'Спортивное', color: 'teal.6' },
        { name: 'Социальное', color: 'orange.6' },
        { name: 'Административное', color: 'grape.6' },
      ]}
      tickLine="y"
	  type="stacked"
	  withLegend
    />
  );
};

export default EventsByDateChart;