import type React from 'react';
import { PieChart, type PieChartCell } from '@mantine/charts';
import type { IEvent } from '@/pages/Main/types';
import { Container } from '@mantine/core';

interface EventTypeChartProps {
  events: IEvent[];
}

const EventTypeChart: React.FC<EventTypeChartProps> = ({ events }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','gray.6'];

  const data: PieChartCell[] = events.reduce((acc, event) => {
    const found = acc.find(item => item.name === event.type);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: event.type, value: 1, 
		color: colors[acc.length % colors.length] 
	});
    }
    return acc;
  }, [] as PieChartCell[]);

  console.log(data)

  return (
	<Container >

		<PieChart 
		  data={data}
		  withTooltip tooltipDataSource="segment"
		  w='100%'
		  />
		  </Container>
  );
};

export default EventTypeChart;
