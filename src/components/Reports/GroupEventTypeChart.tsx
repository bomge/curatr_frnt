import type React from 'react';
import { useMemo } from 'react';
import { PieChart, type PieChartCell } from '@mantine/charts';
import type { IEvent } from '@/pages/Main/types';
import { Container } from '@mantine/core';

interface GroupEventTypeChartProps {
  events: IEvent[];
  selectedGroups: string[];
  groupColors: Record<string, string>;
}

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GroupEventTypeChart: React.FC<GroupEventTypeChartProps> = ({ events, selectedGroups,groupColors }) => {
  const data = useMemo(() => {
    const groupCounts: Record<string, { value: number; color: string }> = {};

    events.forEach(event => {
      event.groups.forEach(groupName => {
        if (selectedGroups.includes(groupName)) {
          if (!groupCounts[groupName]) {
            groupCounts[groupName] = { value: 0, color: getRandomColor() };
          }
          groupCounts[groupName].value++;
        }
      });
    });

    return Object.keys(groupCounts).map(group => ({
      name: group,
      value: groupCounts[group].value,
      color: groupColors[group],
    })) as PieChartCell[];
  }, [events, selectedGroups]);

  return (
    <Container h='20rem'>
      <PieChart data={data} withTooltip tooltipDataSource="segment"/>
    </Container>
  );
};

export default GroupEventTypeChart;
