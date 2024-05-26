import { useSearchParams } from "react-router-dom";
import type { Person } from "../Cafedra/Cafedras.page";
import type { NameId } from "../Profile.page";
import { useCallback, useEffect, useState } from "react";
import { students, workers } from './testDataSearch';
import PersonSearch from "@/components/Search/Search";
import { useDebouncedValue } from '@mantine/hooks';

export interface IInfo {
  id: number;
  shortName: string;
  fullName: string;
}

export interface ISearchPersonWorker extends Person {
  avatar?: string;
  scienceDegree: string;
  faculty: IInfo;
}

export interface ISearchPersonStudent extends Person {
  avatar?: string;
  isStudent: boolean;
  faculty: IInfo;
  group: IInfo & { leader?: { id: number } };
}

export interface SearchPersonResult {
  result: (ISearchPersonWorker | ISearchPersonStudent)[];
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SearchPersonResult>({ result: [] });
  
  const initialSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  useEffect(() => {
    setLoading(true);
    const fetchData = setTimeout(() => {
      const filteredResults = [...workers , ...students].filter(person =>
        person.lastName.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setResult({ result: filteredResults }); // Show only 3 items
      // setResult({ result: filteredResults.slice(0, 3) }); // Show only 3 items
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, [debouncedSearch]);

  const handleSearchParamChange = useCallback((param: string, value: string | null) => {
    if (value) {
      searchParams.set(param, value);
    } else {
      searchParams.delete(param);
    }
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    handleSearchParamChange('search', search);
  }, [search, handleSearchParamChange]);

  return (
    <PersonSearch
      result={result}
      onSearchChange={setSearch}
      loading={loading}
      initialSearch={initialSearch}
    />
  );
};

export default SearchPage;
