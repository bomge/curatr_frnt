import type React from 'react';
import { useEffect, useState } from 'react';
import { ActionIcon, Group, Table } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import type { ISearchPersonWorker } from '@/pages/Search/Search.page';
import EditableField from './EditableField';
import type { workerFullInfo } from '@/pages/Admin.page';
import EditableSelectField from './EditableSelectField';
import type { CafedraInfo, FacultyInfo } from '@/pages/Cafedra/Cafedras.page';
import ConfirmCancelBtns from '../TableComponents/ConfirmCancelBtns';

const roles = [
  { label: 'Декан', value: 'Декан' },
  { label: 'Проректор', value: 'Проректор' },
  { label: 'зав.Кафедры', value: 'зав.Кафедры' },
  { label: 'Куратор', value: 'Куратор' },
  { label: 'Работник', value: 'Работник' },
];

const scienceDegrees = [
  { label: 'Профессор', value: 'Профессор' },
  { label: 'Доктор наук', value: 'Доктор наук' },
  { label: 'Доцент', value: 'Доцент' },
  { label: 'Ассистент', value: 'Ассистент' },
  { label: 'Кандидат наук', value: 'Кандидат наук' },
  { label: 'Лаборант', value: 'Лаборант' },
  { label: 'Старший преподаватель', value: 'Старший преподаватель' },
  { label: 'Академик', value: 'Академик' },
  { label: 'Преподаватель', value: 'Преподаватель' },
  { label: 'Преподаватель-стажер', value: 'Преподаватель-стажер' },
];

const isCafedraInFaculty = (
  faculties: FacultyInfo[],
  facultyId: string | null,
  cafedraId: string | null
) => {
  if (!facultyId || !cafedraId) return false;

  const faculty = faculties.find((f) => String(f.id) === facultyId);
  if (!faculty) return false;

  return faculty.cafedras.some((c) => String(c.id) === cafedraId);
};

const isGroupInCafedra = (
  cafedras: CafedraInfo[],
  cafedraId: string | null,
  groupId: string | null
) => {
  if (!cafedraId || !groupId) return false;

  const cafedra = cafedras.find((c) => String(c.id) === cafedraId);
  if (!cafedra) return false;

  return cafedra.groups.some((g) => String(g.id) === groupId);
};

interface UserRowProps {
  worker: workerFullInfo;
  faculties: FacultyInfo[];
  cafedras: CafedraInfo[];
  onSave: (id: number, newData: workerFullInfo) => Promise<void>;
  onCancel: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ worker, cafedras, faculties, onSave,onCancel }) => {
  const [isEditing, setIsEditing] = useState(worker.id < 0);
  const [lastName, setLastName] = useState(worker.lastName);
  const [firstName, setFirstName] = useState(worker.firstName);
  const [surName, setSurName] = useState(worker.surName);
  const [role, setRole] = useState(worker.role || '');
  const [scienceDegree, setScienceDegree] = useState(worker.scienceDegree) || '';
  const [selectedFaculty, setSelectedFaculty] = useState(worker.faculty?.id.toString() || null);
  const [selectedCafedra, setSelectedCafedra] = useState(worker.cafedra?.id.toString() || null);
  const [selectedGroup, setSelectedGroup] = useState(worker.group?.id.toString() || null);

  const [loading, setLoading] = useState(false);

  const handleEdit = () => setIsEditing(true);
  // const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setLoading(true);
    onSave(worker.id, {
      ...worker, lastName, firstName, surName, role, scienceDegree,
      faculty: faculties.find(f => f.id === Number(selectedFaculty)),
      cafedra: cafedras.find(c => c.id === Number(selectedCafedra)),
      group: cafedras.flatMap(c => c.groups).find(g => g.id === Number(selectedGroup))
    }).finally(() => {
      setLoading(false);
      setIsEditing(false);
    });
  };
  const handleCancel = () => {
    if (worker.id < 0) {
      onCancel(worker.id);
    }
    setIsEditing(false);
  };
  const handleFacultyChange = (facultyId: string | null) => {
    setSelectedFaculty(facultyId || '');
    if (!facultyId || (facultyId && !isCafedraInFaculty(faculties, facultyId, selectedCafedra))) {
      handleCafedraChange(null);
    }
  };

  const handleCafedraChange = (cafedraId: string | null) => {
    setSelectedCafedra(cafedraId);
    if (!cafedraId || (cafedraId && !isGroupInCafedra(cafedras, cafedraId, selectedGroup))) {
      setSelectedGroup(null);
    }
  };

  const handleGroupChange = (groupId: string | null) => {
    setSelectedGroup(groupId || '');
  };

  const facultyOptions = faculties.map((faculty) => ({
    value: faculty.id.toString(),
    label: `${faculty.shortName}`,
  }));

  const cafedraOptions = selectedFaculty
    ? faculties
      .find((f) => f.id === Number(selectedFaculty))
      ?.cafedras.map((cafedraId) => {
        const cafedra = cafedras.find((c) => c.id === cafedraId.id);
        return cafedra
          ? {
            value: cafedra.id.toString(),
            label: `${cafedra.fullName}`,
          }
          : null;
      })
      .filter(Boolean)
    : faculties.flatMap((faculty) => [
      {
        group: faculty.fullName,
        items: faculty.cafedras
          .map((cafedraId) => {
            const cafedra = cafedras.find((c) => c.id === cafedraId.id);
            return cafedra
              ? {
                value: cafedra.id.toString(),
                label: cafedra.fullName,
              }
              : null;
          })
          .filter(Boolean),
      },
    ]);

  const groupOptions = selectedCafedra
    ? cafedras
      .find((c) => c.id === Number(selectedCafedra))
      ?.groups.map((group) => ({
        value: group.id.toString(),
        label: group.shortName,
      })) || []
    : selectedFaculty
      ? cafedras
        .filter((c) =>
          faculties
            .find((f) => f.id === Number(selectedFaculty))
            ?.cafedras.some((cafedraId) => cafedraId.id === c.id)
        )
        .flatMap((c) => [
          {
            group: c.fullName,
            items: c.groups.map((group) => ({
              value: group.id.toString(),
              label: group.shortName,
            })),
          },
        ])
      : cafedras.flatMap((c) => [
        {
          group: c.fullName,
          items: c.groups.map((group) => ({
            value: group.id.toString(),
            label: group.shortName,
          })),
        },
      ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedCafedra && !selectedFaculty) {
      const cafedra = cafedras.find((c) => c.id === Number(selectedCafedra));
      if (cafedra) {
        const faculty = faculties.find((f) => f.cafedras.some((caf) => caf.id === cafedra.id));
        if (faculty) setSelectedFaculty(faculty.id.toString());
      }
    }
  }, [selectedCafedra, cafedras, faculties]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (selectedGroup && !selectedCafedra) {
      const cafedra = cafedras.find((c) => c.groups.some((g) => g.id === Number(selectedGroup)));
      if (cafedra) setSelectedCafedra(cafedra.id.toString());
    }
  }, [selectedGroup, cafedras]);

  return (
    <Table.Tr>
      <Table.Td>
        <EditableField isEditing={isEditing} value={lastName} onChange={setLastName} compProps={{description:'Фамилия'}}/>
      </Table.Td>
      <Table.Td>
        <EditableField isEditing={isEditing} value={firstName} onChange={setFirstName} compProps={{description:'Имя'}}/>
      </Table.Td>
      <Table.Td>
        <EditableField isEditing={isEditing} value={surName} onChange={setSurName} compProps={{description:'Отчество'}}/>
      </Table.Td>
      <Table.Td>
        <EditableSelectField isEditing={isEditing} value={role} onChange={setRole} options={roles} text={worker.role} compoProps={{description:'Роль'}}/>
      </Table.Td>
      <Table.Td>
        <EditableSelectField isEditing={isEditing} value={scienceDegree} onChange={setScienceDegree} text={worker.scienceDegree} options={scienceDegrees} compoProps={{description:'Науч. степень'}} />
      </Table.Td>
      <Table.Td>
        <EditableSelectField isEditing={isEditing} value={selectedFaculty} onChange={handleFacultyChange} options={facultyOptions} text={worker.faculty?.shortName || '-'} compoProps={{ allowDeselect: true, clearable: true,description:'Факультет' }} />
      </Table.Td>
      <Table.Td>
        {/* //@ts-ignore */}
        <EditableSelectField isEditing={isEditing} value={selectedCafedra} onChange={handleCafedraChange} options={cafedraOptions} text={worker.cafedra?.fullName || '-'} compoProps={{ allowDeselect: true, clearable: true,description:'Кафедра' }} />
      </Table.Td>
      <Table.Td>
        <EditableSelectField isEditing={isEditing} value={selectedGroup} onChange={setSelectedGroup} options={groupOptions} text={worker.group?.shortName || '-'} compoProps={{ allowDeselect: true, clearable: true, searchable: true,description:'Группа' }} />
      </Table.Td>
      <Table.Td>
        {isEditing ? (
          <ConfirmCancelBtns
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
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
