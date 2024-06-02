import AdminManage from '@/components/Admin/AdminManage';
import type React from 'react';
import type { IInfo, ISearchPersonWorker } from './Search/Search.page';
import type { CafedraInfo, FacultyInfo, Group, Person } from './Cafedra/Cafedras.page';
// import { workers as testWorkers } from './Search/testDataSearch'
import { faculties as testFaculties, cafedras as testCafedras, workers as testWorkers } from './Cafedra/testDataCafedra';
import { useEffect, useState } from 'react';

export interface workerFullInfo extends Person {
  avatar?: string;
  scienceDegree: string;
  faculty?: IInfo;
  cafedra?: IInfo //s.name f.name id
  group?: IInfo | null
}

export interface AdminPageProps {
  workers: workerFullInfo[]
  faculties: FacultyInfo[]
  cafedras: CafedraInfo[]
  // groups are taken from cafedras
}

const AdminPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [faculties, setFaculties] = useState<FacultyInfo[]>([]);
  const [cafedras, setCafedras] = useState<CafedraInfo[]>([]);
  const [workers, setWorkers] = useState<workerFullInfo[]>([]);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setFaculties(testFaculties);
      setCafedras(testCafedras);
      setWorkers(testWorkers);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, []);

  const handleSave = (id: number, newData: workerFullInfo): Promise<void> => {
    return new Promise((resolve) => {
      const isWorkerEmpty = Object.values(newData).every(value => !value || value < 0); //change to check negative id
      if (isWorkerEmpty) {
        return resolve()
      }

      setTimeout(async () => {
        const workerIndex = testWorkers.findIndex((worker) => worker.id === id);
        if(workerIndex ==-1){
          const maxId = Math.max(...testWorkers.map((worker) => worker.id), 0);
          newData.id = maxId + 1;
        }
        setWorkers((prevWorkers) =>
          prevWorkers.map((worker) =>
            worker.id === id ? { ...worker, ...newData } : worker
          )
        );

        if (workerIndex !== -1) {
          testWorkers[workerIndex] = { ...testWorkers[workerIndex], ...newData };
        } else {
          if (!isWorkerEmpty) {
            testWorkers.unshift(newData);
          }
          // New worker, add to the main array
          // handleAdd(newData).finally(()=> resolve())
        }
        resolve()
      }, 500);
    });
  };

  const handleAdd = (newWorker: workerFullInfo): Promise<void> => {
    console.log('handleAdd', newWorker);
    setWorkers((prevWorkers) => [newWorker, ...prevWorkers]);
    return Promise.resolve();
  };

  const handleCancel = (id: number) => {
    setWorkers((prevWorkers) => prevWorkers.filter((worker) => worker.id !== id));
  };

  return <AdminManage
    faculties={faculties}
    cafedras={cafedras}
    workers={workers}
    loading={loading}
    onSave={handleSave}
    onAdd={handleAdd}
    onCancel={handleCancel}
  />;
};

export default AdminPage;