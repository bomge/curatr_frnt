import type React from 'react';
import { Table } from '@mantine/core';
import type { ISearchPersonWorker } from '@/pages/Search/Search.page';
import UserRow from './UserRow';
import type { workerFullInfo } from '@/pages/Admin.page';
import type { FacultyInfo, CafedraInfo } from '@/pages/Cafedra/Cafedras.page';

interface UserTableProps {
  workers: workerFullInfo[];
  faculties: FacultyInfo[];
	cafedras: CafedraInfo[];
  onSave: (id: number, newData: workerFullInfo) => void;
  onCancel: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ workers,cafedras,faculties, onSave,onCancel }) => {
  const rows = workers.map((worker) => (
    <UserRow key={worker.id} worker={worker} faculties={faculties} cafedras={cafedras} onSave={onSave} onCancel={onCancel}/>
  ));

  return (
	// <Table.ScrollContainer minWidth='70rem'>

    <Table stickyHeader  stickyHeaderOffset={-5} highlightOnHover withTableBorder layout='auto'>
      <Table.Thead>
        <Table.Tr>
          <Table.Th miw='5rem' w='10%'>Фамилия</Table.Th>
          <Table.Th miw='5rem' w='10%'>Имя</Table.Th>
          <Table.Th w='12%'>Отчество</Table.Th>
          <Table.Th miw='9rem'>Роль</Table.Th>
          <Table.Th miw='10rem'>науч. Степень</Table.Th>
          <Table.Th miw='8rem'>Факультет</Table.Th>
          <Table.Th w='520px'>Кафедра</Table.Th>
          <Table.Th  miw='9rem'>Группа</Table.Th>
          <Table.Th>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
	// </Table.ScrollContainer>
  );
};

export default UserTable;
