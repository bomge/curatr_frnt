import CafedraSearch from '@/components/Cafedra/CafedraSearch';
import type React from 'react';
import { faculties as testFaculties, cafedras  as testCafedras} from './testDataCafedra';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, LoadingOverlay } from '@mantine/core';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  surName: string;
  role?:string
}

export interface Group {
  id: number;
  shortName: string;
  fullName: string;
}

export interface CafedraInfo {
  id: number;
  shortName: string;
  fullName: string;
  dean: Person;
  headCafedra: Person;
  workers: Person[];
  groups: Group[];
}

export interface FacultyInfo {
  id: number;
  shortName: string;
  fullName: string;
  cafedras: { id: number }[]
}






const CafedraPage: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [faculties, setFaculties] = useState<FacultyInfo[]>([]);
  const [cafedras, setCafedras] = useState<CafedraInfo[]>([]);

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setFaculties(testFaculties);
      setCafedras(testCafedras);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, []);

  const handleFacultyChange = (facultyId: string | null) => {
    if (facultyId) {
      searchParams.set('faculty', facultyId);
    } else {
      searchParams.delete('faculty');
    }
    setSearchParams(searchParams);
  };
  
  const handleCafedraChange = (cafedraId: string | null) => {
    if (cafedraId) {
      searchParams.set('cafedra', cafedraId);
    } else {
      searchParams.delete('cafedra');
    }
    setSearchParams(searchParams);
  };

  return (<>
     <CafedraSearch
        faculties={faculties}
        cafedras={cafedras}
        selectedFaculty={searchParams.get('faculty') || null}
        selectedCafedra={searchParams.get('cafedra') || null}
        onFacultyChange={handleFacultyChange}
        onCafedraChange={handleCafedraChange}
        loading={loading}
        />
  </>
  )
};

export default CafedraPage;