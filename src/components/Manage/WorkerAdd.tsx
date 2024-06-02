import type React from 'react';
import { useState } from 'react';
import { Group, ActionIcon, Select, Button, Tooltip } from '@mantine/core';
import { IconCheck, IconX, IconPlus } from '@tabler/icons-react';
import type { workerFullInfo } from '@/pages/Admin.page';
import type { IfreeWorker } from '@/pages/Manage.page';

interface AddWorkerProps {
  cafedraId: number;
  freeWorkers: IfreeWorker[];
  onAddWorker: (cafedraId: number, newWorker: workerFullInfo) => Promise<void>;
  stopAdding: () => void;
}

const WorkerAdd: React.FC<AddWorkerProps> = ({ cafedraId, freeWorkers, onAddWorker,stopAdding }) => {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddWorker = () => {
    if (selectedWorker) {
      setLoading(true);
      const workerToAdd = freeWorkers.find(worker => worker.id === Number(selectedWorker));
      if (workerToAdd) {
        // onAddWorker(cafedraId, { ...workerToAdd, id: -Date.now() }).finally(() => {
        onAddWorker(cafedraId, workerToAdd).finally(() => {
          setLoading(false);
          setSelectedWorker(null);
        });
      }
    }
  };

  const handleStopWorker = () => {
	setSelectedWorker(null)
	stopAdding()
  }

  return (
    <Group gap='0.25rem' mb='0.2rem'>
      <Select
        placeholder="Выберите работника"
        data={freeWorkers.map(worker => ({
          value: worker.id.toString(),
          label: `${worker.firstName} ${worker.lastName}`
        }))}
        value={selectedWorker}
        onChange={setSelectedWorker}
		searchable
      />
      <Tooltip label="Выберите работника" disabled={!!selectedWorker}>
      <ActionIcon size="sm" disabled={!selectedWorker} loading={loading} onClick={handleAddWorker}>
        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
      <ActionIcon  size='sm' color="red" variant="light" loading={loading} onClick={handleStopWorker}>
        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};

export default WorkerAdd;
