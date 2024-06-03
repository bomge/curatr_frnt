import type React from 'react';
import { useMemo } from 'react';
import { BarChart, type BarChartEntry } from '@mantine/charts';
import type { IEvent, IEventType } from '@/pages/Main/types';

interface EventsByDateChartProps {
  events: IEvent[];
}

const transformEventsToDateData = (events: IEvent[]): BarChartEntry[] => {
  const dailyData: Record<string, Record<IEventType, number>> = {};

  events.forEach(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const eventType = event.type;

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.toLocaleDateString();

      if (!dailyData[day]) {
        dailyData[day] = {
          'Академическое': 0,
          'Культурное': 0,
          'Спортивное': 0,
          'Социальное': 0,
        };
      }

      dailyData[day][eventType]++;

      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  const chartData: BarChartEntry[] = [];

  for (const day in dailyData) {
    const dayData = dailyData[day];
    chartData.push({
      day,
      'Академическое': dayData['Академическое'],
      'Культурное': dayData['Культурное'],
      'Спортивное': dayData['Спортивное'],
      'Социальное': dayData['Социальное'],
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
      ]}
      tickLine="y"
	  type="stacked"
	  withLegend
    />
  );
};

export default EventsByDateChart;