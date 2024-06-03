import { useState } from 'react';
import { Modal, Button, TextInput, Tooltip } from '@mantine/core';
import type { CafedraInfo } from '@/pages/Cafedra/Cafedras.page';
import type { CafedraFullWorker } from '@/pages/Manage.page';

interface AddCafedraProps {
  onAddCafedra: (newCafedra: CafedraFullWorker) => Promise<void>;
}

const AddCafedra: React.FC<AddCafedraProps> = ({ onAddCafedra }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [newCafedraShortName, setNewCafedraShortName] = useState('');
  const [newCafedraFullName, setNewCafedraFullName] = useState('');

  const handleAddCafedra = async () => {
    const newCafedra: CafedraFullWorker = {
      id: Date.now(),
      shortName: newCafedraShortName,
      fullName: newCafedraFullName,
      dean: null,
      headCafedra: null,
      workers: [],
      groups: [],
    };
    await onAddCafedra(newCafedra);
    setNewCafedraShortName('');
    setNewCafedraFullName('');
    setModalOpened(false);
  };
  const isDisabled = !newCafedraShortName.trim()?.length || !newCafedraFullName.trim()?.length
  
  return (
    <>
      <Button variant="light" w='fit-content' onClick={() => setModalOpened(true)} fullWidth mt="md">
        Добавить новую кафедру
      </Button>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Добавить новую кафедру"
      >
        <TextInput
          label="Краткое название"
          placeholder="Введите краткое название"
          value={newCafedraShortName}
          onChange={(event) => setNewCafedraShortName(event.currentTarget.value)}
        />
        <TextInput
          label="Полное название"
          placeholder="Введите полное название"
          value={newCafedraFullName}
          onChange={(event) => setNewCafedraFullName(event.currentTarget.value)}
        />
      <Tooltip label="Заполните все поля" disabled={!isDisabled}>

        <Button disabled={isDisabled} color='green.8' variant='light' onClick={handleAddCafedra} fullWidth mt="md">
          Добавить
        </Button>
	  </Tooltip>
      </Modal>
    </>
  );
};

export default AddCafedra;
