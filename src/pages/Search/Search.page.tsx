import { useSearchParams } from "react-router-dom";
import type { Person } from "../Cafedra/Cafedras.page";
import type { NameId } from "../Profile.page";
import { useCallback, useEffect, useState } from "react";
import {students,workers} from './testDataSearch'
import PersonSearch from "@/components/Search/Search";

/* interface Person {
	id: number;
	firstName: string;
	lastName: string;
	surName: string;
	role?:string
  } */

export interface IInfo {
	id: number;
	shortName: string;
	fullName: string;
  }

export interface ISearchPersonWorker extends Person {
	avatar?: string;
	scienceDegree: string
	faculty: IInfo //full short name
	//cafedra: NameId //full short name
}

export interface ISearchPersonStudent extends Person {
	avatar?: string;
	isStudent: boolean
	faculty: IInfo //full short name
	group:IInfo & {leader?: {id: number}} //check if student is groupLeader
}

export interface SearchPersonResult {
	result: (ISearchPersonWorker | ISearchPersonStudent)[]
	// workers: ISearchPersonWorker[]
	// students: ISearchPersonStudent[]
}


const SearchPage: React.FC = () => {

	const [searchParams, setSearchParams] = useSearchParams();

	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState<SearchPersonResult>({result:[]});

	useEffect(() => {
		const fetchData = setTimeout(() => {
			setResult({result:[]});
			setLoading(false);
		}, 500);

		return () => clearTimeout(fetchData);
	}, []);

	const handleSearchParamChange = useCallback((param: string, value: string | null) => {
		if (value) {
			searchParams.set(param, value);
		} else {
			searchParams.delete(param);
		}
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);


	const handleInputUpdate = () => {
		//...	
	
		// setResult([]);
	  };
	console.log('page')
	return (<>
		<PersonSearch
			result={result}
			onGroupChange={(str)=>handleSearchParamChange('search',str)}
			loading={loading}
			onGroupDataUpdated={handleInputUpdate}
		/>
	</>
	)
};

export default SearchPage;

