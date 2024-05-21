import CafedraSearch from "@/components/Cafedra/CafedraSearch";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { CafedraInfo, FacultyInfo, Group, Person } from "../Cafedra/Cafedras.page";
import { persons } from "../Cafedra/testDataCafedra";
import { faculties as testFaculties } from '../Cafedra/testDataCafedra';
import GroupSearch from "@/components/Group/GroupSearch";
import { cafedras_w_extendGr, students2 } from "./testDataGroup";

export interface ExtentedGroup extends Group {
	students: Student[]
	curator?: Person | null
	leader?: Person | null
}

export interface Student extends Person {
	isLeader?: boolean
}

export interface ExtendedCafedra extends CafedraInfo {
	groups: ExtentedGroup[];
}


//temp fix






const GroupPage: React.FC = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [faculties, setFaculties] = useState<FacultyInfo[]>([]);
	const [cafedras, setCafedras] = useState<ExtendedCafedra[]>([]);

	useEffect(() => {
		const fetchData = setTimeout(() => {
			setFaculties(testFaculties);
			setCafedras(cafedras_w_extendGr);
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
	const handleGroupChange = (groupId: string | null) => {
		if (groupId) {
			searchParams.set('group', groupId);
		} else {
			searchParams.delete('group');
		}
		setSearchParams(searchParams);
	};


	const handleGroupDataUpdated = (updatedGroupData: ExtentedGroup) => {
		const updatedCafedras = cafedras.map((cafedra) => {
		  const updatedGroups = cafedra.groups.map((group) =>
			group.id === updatedGroupData.id ? { ...group, ...updatedGroupData } : group
		  );
	  
		//   if (updatedGroups !== cafedra.groups) {
			return { ...cafedra, groups: updatedGroups };
		//   }
	  
		//   return cafedra;
		});
	  
		setCafedras(updatedCafedras);
	  };
	console.log('page')
	return (<>
		<GroupSearch
			faculties={faculties}
			cafedras={cafedras}
			selectedFaculty={searchParams.get('faculty') || null}
			selectedCafedra={searchParams.get('cafedra') || null}
			selectedGroup={searchParams.get("group") || null}
			onFacultyChange={handleFacultyChange}
			onCafedraChange={handleCafedraChange}
			onGroupChange={handleGroupChange}
			loading={loading}
			onGroupDataUpdated={handleGroupDataUpdated}
		/>
	</>
	)
};

export default GroupPage;