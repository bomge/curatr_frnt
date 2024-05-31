import AdminManage from '@/components/Admin/AdminManage';
import type React from 'react';
import type { ISearchPersonWorker } from './Search/Search.page';
import type { CafedraInfo, FacultyInfo } from './Cafedra/Cafedras.page';
import { workers as testWorkers } from './Search/testDataSearch'
import { faculties as testFaculties, cafedras as testCafedras } from './Cafedra/testDataCafedra';
import { useEffect, useState } from 'react';



export interface AdminPageProps {
  workers: ISearchPersonWorker[]
  faculties: FacultyInfo[]
  cafedras: CafedraInfo[]
  // groups are taken from cafedras
}

const AdminPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [faculties, setFaculties] = useState<FacultyInfo[]>([]);
  const [cafedras, setCafedras] = useState<CafedraInfo[]>([]);
  const [workers, setWorkers] = useState<ISearchPersonWorker[]>([]);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setFaculties(testFaculties);
      setCafedras(testCafedras);
      setWorkers(testWorkers);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, []);

  const handleSave = (id: number, newData: ISearchPersonWorker) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker.id === id ? { ...worker, ...newData } : worker
      )
    );
  };

  return <AdminManage
    faculties={faculties}
    cafedras={cafedras}
    workers={workers}
    loading={loading}
    onSave={handleSave}
  />;
};

export default AdminPage;