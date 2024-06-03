import type React from 'react';
import { useState } from 'react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { Button, Stack } from '@mantine/core';
import 'dayjs/locale/ru';
interface DateFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleFilter = () => {
	console.log('handleFilter (clicked)',!!(range[0] && range[1]))
    if (range[0] && range[1]) {
      onFilter(range[0].toISOString(), range[1].toISOString());
    }
  };

  return (
    <Stack align='center'>
      <DatePickerInput 
        type="range" 
        value={range} 
        onChange={setRange} 
        label="Диапазон дат" 
		locale="ru"
        placeholder="Выберите диапазон дат" 
      />
      <Button onClick={handleFilter} disabled={!range[0] || !range[1]}>
        Начать
      </Button>
    </Stack>
  );
};

export default DateFilter;
