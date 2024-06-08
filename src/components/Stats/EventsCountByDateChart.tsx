import type React from 'react';
import { useMemo } from 'react';
import { LineChart} from '@mantine/charts';
import type { IEvent } from '../../pages/Main/types';
interface EventsCountByDateChartProps {
  events: IEvent[];
}

const transformEventsToCountData = (events: IEvent[]) => {
	const dailyData: Record<string, number> = {};
  
	// Find the minimum and maximum dates from the events
	const minDate = new Date(Math.min(...events.map(event => new Date(event.startDate).getTime())));
	const maxDate = new Date(Math.max(...events.map(event => new Date(event.endDate).getTime())));
  
	// Initialize dailyData with all dates within the range and set count to 0
	let currentDate = new Date(minDate);
	while (currentDate <= maxDate) {
	  const day = currentDate.toLocaleDateString();
	  dailyData[day] = 0;
	  currentDate.setDate(currentDate.getDate() + 1);
	}
  
	// Count the events for each date
	events.forEach(event => {
	  const startDate = new Date(event.startDate);
	  const endDate = new Date(event.endDate);
	  const currentDate = new Date(startDate);
  
	  while (currentDate <= endDate) {
		const day = currentDate.toLocaleDateString();
		dailyData[day]++;
		currentDate.setDate(currentDate.getDate() + 1);
	  }
	});
  
	const chartData = Object.entries(dailyData).map(([date, count]) => ({
	  date,
	  count,
	}));
  
	return chartData;
  };

const EventsCountByDateChart: React.FC<EventsCountByDateChartProps> = ({ events }) => {
  const data = useMemo(() => transformEventsToCountData(events), [events]);
  const sortedData = [...data].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('.');
    const [dayB, monthB, yearB] = b.date.split('.');
    const dateA = new Date(+yearA, +monthA - 1, +dayA);
    const dateB = new Date(+yearB, +monthB - 1, +dayB);
    return dateA.getTime() - dateB.getTime();
  });
  console.log(data)
  return (
		<LineChart
      h={300}
      data={sortedData}
      dataKey="date"
      color="blue.6"
      tickLine="y"
	  series={[{ name: 'count',label:"Мероприятий", color: 'indigo.6' }]}
      withLegend
	  
    />
    
  );
};

export default EventsCountByDateChart;