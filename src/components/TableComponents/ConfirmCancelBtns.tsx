import { ActionIcon, Group } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

interface ActionIconsProps {
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const ConfirmCancelBtns: React.FC<ActionIconsProps> = ({ onSave, onCancel, loading }) => {
  return (
    <Group gap='xs'>
      <ActionIcon className='confirmBtn' color='#00ff83a6' onClick={onSave} loading={loading}>
        <IconCheck size={16} />
      </ActionIcon>
      {/* <ActionIcon variant='light' color='red'  onClick={onCancel} loading={loading}> */}
      <ActionIcon className='cancelBtn'  onClick={onCancel} loading={loading}>
        <IconX size={16} />
      </ActionIcon>
    </Group>
  );
};

export default ConfirmCancelBtns;