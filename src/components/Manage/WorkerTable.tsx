import React from 'react';
import { Table } from '@mantine/core';
import { workerFullInfo } from '@/pages/Admin.page';
import { FacultyInfo, CafedraInfo } from '@/pages/Cafedra/Cafedras.page';
import UserRow from '../Admin/UserRow';

interface WorkerTableProps {
  workers: workerFullInfo[];
  faculties: FacultyInfo[];
  cafedras: CafedraInfo[];
  onSave: (id: number, newData: workerFullInfo) => Promise<void>;
  onCancel: (id: number) => void;
}

const WorkerTable: React.FC<WorkerTableProps> = ({ workers, faculties, cafedras, onSave, onCancel }) => {
  const rows = workers.map((worker) => (
    <UserRow key={worker.id} worker={worker} faculties={faculties} cafedras={cafedras} onSave={onSave} onCancel={onCancel} />
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Фамилия</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Отчество</Table.Th>
          <Table.Th>Роль</Table.Th>
          <Table.Th>Науч. Степень</Table.Th>
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

export default WorkerTable;
