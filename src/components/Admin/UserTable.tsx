import type React from 'react';
import { Table } from '@mantine/core';
import type { ISearchPersonWorker } from '@/pages/Search/Search.page';
import UserRow from './UserRow';

interface UserTableProps {
  workers: ISearchPersonWorker[];
  onSave: (id: number, newData: ISearchPersonWorker) => void;
}

const UserTable: React.FC<UserTableProps> = ({ workers, onSave }) => {
  const rows = workers.map((worker) => (
    <UserRow key={worker.id} worker={worker} onSave={onSave} />
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={-5} highlightOnHover withTableBorder >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Фамилия</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Отчество</Table.Th>
          <Table.Th>Роль</Table.Th>
          <Table.Th>науч. Степень</Table.Th>
          <Table.Th>Факультет</Table.Th>
          <Table.Th>Кафедра</Table.Th>
          <Table.Th>Группа</Table.Th>
          <Table.Th>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default UserTable;
