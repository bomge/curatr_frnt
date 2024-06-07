import CafedraSearch from "@/components/Cafedra/CafedraSearch";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { persons } from "../Cafedra/testDataCafedra";
import { faculties as testFaculties } from '../Cafedra/testDataCafedra';
import GroupSearch from "@/components/Group/GroupSearch";
import { cafedras_w_extendGr, students2 } from "./testDataGroup";
import type { ExtendedCafedra } from "@/@types/cafedra";
import type { ExtentedGroup } from "@/@types/group";
import type { FacultyInfo } from "@/@types/faculty";




//temp fix






const GroupPage: React.FC = () => {

	const [searchParams, setSearchParams] = useSearchParams();
	

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
			onFacultyChange={(id)=>handleSearchParamChange('faculty',id)}
			onCafedraChange={(id)=>handleSearchParamChange('cafedra',id)}
			onGroupChange={(id)=>handleSearchParamChange('group',id)}
			loading={loading}
			onGroupDataUpdated={handleGroupDataUpdated}
		/>
	</>
	)
};

export default GroupPage;