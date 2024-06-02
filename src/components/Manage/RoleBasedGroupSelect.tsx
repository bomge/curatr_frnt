import type React from 'react';
import EditableSelectField from '../Admin/EditableSelectField';
import type { ExtentedGroup } from '@/pages/Group/Groups.page';
import type { workerFullInfo } from '@/pages/Admin.page';

interface RoleBasedGroupSelectProps {
  isEditing: boolean;
  role: string;
  selectedGroup: string | null;
  onChange: (value: string | null) => void;
  groups: ExtentedGroup[];
  workerId: number;
  worker: workerFullInfo;
}

const RoleBasedGroupSelect: React.FC<RoleBasedGroupSelectProps> = ({ isEditing, role, selectedGroup, onChange, groups, workerId,worker }) => {
  const groupOptions = groups.filter(g => !g.curator || g.curator?.id === workerId).map(group => ({
    value: group.id.toString(),
    label: `${group.shortName}`,
  }));

  return role === 'Куратор' ? (
    <EditableSelectField
      isEditing={isEditing}
      value={selectedGroup}
      onChange={onChange}
      options={groupOptions}
      text={groups.find(g => g.id.toString() === selectedGroup)?.shortName || '-'}
      compoProps={{ allowDeselect: true, clearable: true, searchable: true, description: 'Группа' }}
    />
  ) : (
    <span>{worker?.group?.shortName || '-'}</span>
  );
};

export default RoleBasedGroupSelect;
