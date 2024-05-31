import type React from 'react';
import { useState } from 'react';
import { ActionIcon, Group, Table } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import type { ISearchPersonWorker } from '@/pages/Search/Search.page';
import EditableField from './EditableField';

interface UserRowProps {
  worker: ISearchPersonWorker;
  onSave: (id: number, newData: ISearchPersonWorker) => void;
}

const UserRow: React.FC<UserRowProps> = ({ worker, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lastName, setLastName] = useState(worker.lastName);
  const [firstName, setFirstName] = useState(worker.firstName);
  const [surName, setSurName] = useState(worker.surName);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    onSave(worker.id, { ...worker, lastName, firstName, surName });
    setIsEditing(false);
  };

  return (
    <Table.Tr>
      <Table.Td>
        <EditableField isEditing={isEditing} value={lastName} onChange={setLastName} />
      </Table.Td>
      <Table.Td>
        <EditableField isEditing={isEditing} value={firstName} onChange={setFirstName} />
      </Table.Td>
      <Table.Td>
        <EditableField isEditing={isEditing} value={surName} onChange={setSurName} />
      </Table.Td>
      <Table.Td>{worker.role}</Table.Td>
      <Table.Td>{worker.scienceDegree}</Table.Td>
      <Table.Td>{worker.faculty.shortName}</Table.Td>
      <Table.Td>{worker.cafedra?.shortName || '-'}</Table.Td>
      <Table.Td>{worker.group?.shortName || '-'}</Table.Td>
      <Table.Td>
        {isEditing ? (
          <Group gap="xs">
            <ActionIcon color="green" onClick={handleSave}>
              <IconCheck size={16} />
            </ActionIcon>
            <ActionIcon color="red" onClick={handleCancel}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <ActionIcon onClick={handleEdit}>
            <IconPencil size={16} />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export default UserRow;
