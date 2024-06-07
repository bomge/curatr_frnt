import type React from 'react';
import { facultiesFull as testFaculties, freeWorkers as testFreeWorkers } from './Cafedra/testDataCafedra';
import { useState, useEffect } from 'react';
import DeanManage from '@/components/Manage/Manage';
import { useAuthStore } from '@/store/useAuthStore';
import type { CafedraFullWorker } from '@/@types/cafedra';
import type { FacultyFull } from '@/@types/faculty';
import type { ExtentedGroup } from '@/@types/group';
import type { IfreeWorker, workerFullInfo } from '@/@types/persons';


const ManagePage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState<FacultyFull | null>(null);
  const [faculties, setFaculties] = useState<FacultyFull[]>([]);

  const [freeWorkers, setFreeWorkers] = useState<IfreeWorker[]>([]);
  const { userRole } = useAuthStore();
  useEffect(() => {
    const fetchData = setTimeout(() => {
      setFaculty(testFaculties[1]);
      setFreeWorkers(testFreeWorkers);
      if (userRole === 'admin') {
        setFaculties(testFaculties);
      }
      // setFaculties(testFaculties);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, [userRole]);

  const handleSelectFaculty = async (facultyId: number) => {
    setLoading(true);
    const facultyDetails = testFaculties.find(f=>f.id==facultyId) || null;
    setFaculty(facultyDetails);
    setLoading(false);
  };
  const handleSaveGroup = (id: number, newData: ExtentedGroup): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (faculty) {
          const updatedCafedras = faculty.cafedras.map((cafedra) => {
            const updatedGroups = cafedra.groups.map((group) => {
              if (group.id === id) {
                // Check if the curator has changed
                if (group.curator?.id !== newData.curator?.id) {
                  // Update the previous curator's group info
                  const previousCurator = cafedra.workers.find(
                    (worker) => worker.id === group.curator?.id
                  );
                  if (previousCurator) {
                    previousCurator.group = undefined;
                    previousCurator.role = 'Работник';
                  }

                  // Update the new curator's group info
                  const newCurator = cafedra.workers.find(
                    (worker) => worker.id === newData.curator?.id
                  );
                  if (newCurator) {
                    newCurator.group = {
                      id: newData.id,
                      shortName: newData.shortName,
                      fullName: newData.fullName,
                    };
                  }
                }
                return { ...group, ...newData };
              }
              return group;
            });

            return {
              ...cafedra,
              groups: updatedGroups,
              workers: cafedra.workers.map((worker) => {
                // If the worker is the new curator, update their group info
                if (worker.id === newData.curator?.id) {
                  return {
                    ...worker,
                    group: {
                      id: newData.id,
                      shortName: newData.shortName,
                      fullName: newData.fullName,
                    },
                    role: 'Куратор'
                  };
                }
                return worker;
              }),
            };
          });

          setFaculty((prevFaculty) =>
            prevFaculty ? { ...prevFaculty, cafedras: updatedCafedras } : null
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

  const handleSaveWorker = (id: number, newData: workerFullInfo): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (faculty) {
          let updatedCafedras = faculty.cafedras.map((cafedra) => {
            // Find the worker in the cafedra
            const updatedWorkers = cafedra.workers.map((worker) =>
              worker.id === id ? { ...worker, ...newData } : worker
            );

            // Handle role change
            const isCurator = newData.group;
            const previousGroup = cafedra.groups.find(group => group.curator?.id === id);
            const newGroup = cafedra.groups.find(group => group.id === newData.group?.id);

            if (isCurator && newGroup && (!previousGroup || previousGroup.id !== newGroup.id)) {
              // If the worker is now a curator and has changed groups
              if (previousGroup) {
                previousGroup.curator = null; // Remove from old group
              }
              newGroup.curator = newData; // Add to new group
            } else if (!isCurator && previousGroup) {
              // If the worker is no longer a curator
              previousGroup.curator = null;
            }

            return {
              ...cafedra,
              workers: updatedWorkers,
              groups: cafedra.groups.map((group) =>
                group.curator?.id === id ? { ...group, curator: isCurator ? newData : null } : group
              ),
            };
          });

          setFaculty((prevFaculty) =>
            prevFaculty ? { ...prevFaculty, cafedras: updatedCafedras } : null
          );
        }

        setFreeWorkers((prevWorkers) =>
          prevWorkers.map((worker) => (worker.id === id ? { ...worker, ...newData } : worker))
        );
        resolve();
      }, 500);
    });
  };

  const handleAddWorker = (cafedraId: number, newWorker: workerFullInfo): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {

        if (faculty) {
          const updatedCafedras = faculty.cafedras.map((cafedra) => {
            if (cafedra.id === cafedraId) {
              return {
                ...cafedra,
                workers: [...cafedra.workers, newWorker],
              };
            }
            return cafedra;
          });

          setFaculty((prevFaculty) =>
            prevFaculty
              ? { ...prevFaculty, cafedras: updatedCafedras }
              : null
          );

          setFreeWorkers((prevFreeWorkers) =>
            prevFreeWorkers.filter((worker) => worker.id !== newWorker.id)
          );
        }
        resolve();
      }, 500);
    });
  };

  const handleRemoveWorker = (cafedraId: number, workerId: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (faculty) {
          const updatedCafedras = faculty.cafedras.map((cafedra) => {
            if (cafedra.id === cafedraId) {
              const workerToRemove = cafedra.workers.find((worker) => worker.id === workerId);
              const updatedWorkers = cafedra.workers.filter((worker) => worker.id !== workerId);
              const updatedGroups = cafedra.groups.map((group) => {
                if (group.curator?.id === workerId) {
                  return { ...group, curator: null };
                }
                return group;
              });
  
              if (workerToRemove) {
                workerToRemove.role = 'Работник';
                workerToRemove.group = null;
                setFreeWorkers((prevFreeWorkers) => [...prevFreeWorkers, workerToRemove]);
              }
  
              return {
                ...cafedra,
                workers: updatedWorkers,
                groups: updatedGroups,
              };
            }
            return cafedra;
          });
  
          setFaculty((prevFaculty) =>
            prevFaculty ? { ...prevFaculty, cafedras: updatedCafedras } : null
          );
        }
        console.log('resolve')
        resolve();
      }, 500);
    });
  };
  
  // const handleAddCafedra = async (newCafedra: CafedraInfo) => {
  //   setLoading(true);
  //   await addCafedra(faculty!.id, newCafedra);
  //   handleSelectFaculty(faculty!.id); // Refresh the current faculty data
  // };

  const handleAddCafedra = async (newCafedra: CafedraFullWorker) => {
    setLoading(true);
    setFaculty((prevFaculty) => {
      if (!prevFaculty) return prevFaculty;
      const updatedFaculty = {
        ...prevFaculty,
        cafedras: [...prevFaculty.cafedras, newCafedra],
      };

      setFaculties((prevFaculties) =>
        prevFaculties.map((fac) =>
          fac.id === prevFaculty.id ? updatedFaculty : fac
        )
      );

      // Update the testFaculties array
      const updatedTestFaculties = testFaculties.map((fac) =>
        fac.id === prevFaculty.id ? updatedFaculty : fac
      );
      testFaculties.splice(0, testFaculties.length, ...updatedTestFaculties);

      return updatedFaculty;
    });
    setLoading(false);
  };

  return (
    <DeanManage
      faculty={faculty}
      freeWorkers={freeWorkers}
      loading={loading}
      onSaveGroup={handleSaveGroup}
      onAddGroup={handleAddGroup}
      onCancelGroup={handleCancelGroup}
      onSaveWorker={handleSaveWorker}
      onAddWorker={handleAddWorker}
      onRemoveWorker={handleRemoveWorker}
      onSelectFaculty={handleSelectFaculty}
      faculties={faculties}
      canSelectFaculty={userRole === 'admin' || userRole === 'prorector'}
      onAddCafedra={handleAddCafedra}
    />
  )
};

export default ManagePage;