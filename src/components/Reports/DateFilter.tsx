import type React from 'react';
import { useState } from 'react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { Button, MultiSelect, Stack, Tooltip } from '@mantine/core';
import 'dayjs/locale/ru';
interface DateFilterProps {
  onFilter: (startDate: string, endDate: string, selectedGroups: string[]) => void;
  allGroups: { id: number; name: string }[];
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter, allGroups }) => {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);


  const handleFilter = () => {
    console.log('handleFilter (clicked)', !!(range[0] && range[1]))
    if (range[0] && range[1]) {
      onFilter(range[0].toISOString(), range[1].toISOString(), selectedGroups);
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
        withAsterisk
      />
      <MultiSelect
        data={allGroups.map(group => ({ value: group.name, label: group.name }))}
        value={selectedGroups}
        onChange={setSelectedGroups}
        placeholder="Выберите группы"
        label="Группы"
        description='Опционально'
        maw='20rem'
      />
      <Tooltip label="Выберите промежуток дат" disabled={!(!range[0] || !range[1])}>
        <Button onClick={handleFilter} disabled={!range[0] || !range[1]}>
          Начать
        </Button>
      </Tooltip>

    </Stack>
  );
};

export default DateFilter;
