import type React from 'react';
import { facultiesFull as testFaculties, workers as testWorkers } from './Cafedra/testDataCafedra';
import { useState, useEffect } from 'react';
import type { workerFullInfo } from './Admin.page';
import type { CafedraInfo, FacultyInfo } from './Cafedra/Cafedras.page';
import DeanManage from '@/components/Manage/Manage';
import type { ExtentedGroup } from './Group/Groups.page';

export interface CafedraFullWorker extends CafedraInfo {
  workers: workerFullInfo[]
  groups: ExtentedGroup[]
}

export interface FacultyFull extends FacultyInfo {
  cafedras: CafedraFullWorker[]
}

const ManagePage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState<FacultyFull | null>(null);

  const [workers, setWorkers] = useState<workerFullInfo[]>([]);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setFaculty(testFaculties[1]);
      setWorkers(testWorkers);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, []);


  const handleSaveGroup = (id: number, newData: ExtentedGroup): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (faculty) {
          const updatedCafedras = faculty.cafedras.map((cafedra) => {
            return {
              ...cafedra, groups: cafedra.groups.map((group) =>
                group.id === id ? { ...group, ...newData } : group
              )
            }
          }
          );

          setFaculty((prevFaculty) =>
            prevFaculty
              ? { ...prevFaculty, cafedras: updatedCafedras }
              : null
          );
        }
        resolve();
      }, 500);
    });
  };

  const handleAddGroup = (cafedraId: number, newGroup: ExtentedGroup): Promise<void> => {
    return new Promise((resolve) => {
        if (faculty) {
          const updatedCafedras = faculty.cafedras.map((cafedra) => {
            if (cafedra.id === cafedraId) {
              return {
                ...cafedra,
                groups: [newGroup, ...cafedra.groups]
              };
            }
            return cafedra;
          });
  
          setFaculty((prevFaculty) =>
            prevFaculty
              ? { ...prevFaculty, cafedras: updatedCafedras }
              : null
          );
        }
        resolve();
    });
  };

  const handleCancelGroup = (cafedraId: number, groupId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (faculty) {
        const updatedCafedras = faculty.cafedras.map((cafedra) => {
          if (cafedra.id === cafedraId) {
            const updatedGroups = cafedra.groups.filter((group) => group.id !== groupId);
            return {
              ...cafedra,
              groups: updatedGroups,
            };
          }
          return cafedra;
        });
  
        setFaculty((prevFaculty) =>
          prevFaculty
            ? { ...prevFaculty, cafedras: updatedCafedras }
            : null
        );
        resolve();
      } else {
        reject('Faculty not found');
      }
    });
  };
  return (
    <DeanManage
      faculty={faculty}
      loading={loading}
      onSaveGroup={handleSaveGroup}
      onAddGroup={handleAddGroup}
      onCancelGroup={handleCancelGroup}
    />
  )
};

export default ManagePage;