import type React from 'react';
import { useMemo } from 'react';
import { BarChart, type BarChartType } from '@mantine/charts';
import type { IEvent } from '@/pages/Main/types';
interface GroupEventsByDateChartProps {
  events: IEvent[];
  selectedGroups: string[];
  groupColors: Record<string, string>;
}

const transformEventsToGroupDateData = (events: IEvent[], selectedGroups: string[]): BarChartType[] => {
	const dailyGroupData: Record<string, Record<string, number>> = {};
  
	// Find the minimum and maximum dates from the events
	const minDate = new Date(Math.min(...events.map(event => new Date(event.startDate).getTime())));
	const maxDate = new Date(Math.max(...events.map(event => new Date(event.endDate).getTime())));
  
	// Initialize dailyGroupData with all dates within the range and set count to 0 for each selected group
	let currentDate = new Date(minDate);
	while (currentDate <= maxDate) {
	  const day = currentDate.toLocaleDateString();
	  dailyGroupData[day] = {};
	  selectedGroups.forEach(groupName => {
		dailyGroupData[day][groupName] = 0;
	  });
	  currentDate.setDate(currentDate.getDate() + 1);
	}
  
	// Count the events for each date and selected group
	events.forEach(event => {
	  const startDate = new Date(event.startDate);
	  const endDate = new Date(event.endDate);
	  const currentDate = new Date(startDate);
  
	  while (currentDate <= endDate) {
		const day = currentDate.toLocaleDateString();
  
		event.groups.forEach(groupName => {
		  if (selectedGroups.includes(groupName)) {
			dailyGroupData[day][groupName]++;
		  }
		});
  
		currentDate.setDate(currentDate.getDate() + 1);
	  }
	});
  
	const chartData: BarChartType[] = [];
  
	for (const day in dailyGroupData) {
	  const dayData = dailyGroupData[day];
	  const dayRecord: Record<string, number> = { day };
	  for (const group in dayData) {
		dayRecord[group] = dayData[group];
	  }
	  chartData.push(dayRecord);
	}
  
	return chartData;
  };

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GroupEventsByDateChart: React.FC<GroupEventsByDateChartProps> = ({ events, selectedGroups,groupColors }) => {
  const data = useMemo(() => transformEventsToGroupDateData(events, selectedGroups), [events, selectedGroups]);

  const sortedData = [...data].sort((a, b) => {
    const [dayA, monthA, yearA] = a.day.split('.');
    const [dayB, monthB, yearB] = b.day.split('.');
    const dateA = new Date(+yearA, +monthA - 1, +dayA);
    const dateB = new Date(+yearB, +monthB - 1, +dayB);
    return dateA.getTime() - dateB.getTime();
  });

  const series = selectedGroups.map(groupName => ({
    name: groupName,
    color: groupColors[groupName]
  }));

  return (
    <BarChart
      h={300}
      data={sortedData}
      dataKey="day"
      series={series}
      tickLine="y"
      type="stacked"
      withLegend
    />
  );
};

export default GroupEventsByDateChart;
