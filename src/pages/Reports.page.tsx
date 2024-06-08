import { eventsWithReports as testEvents } from './Main/testData';
import Reports from "@/components/Reports/Reports"
import { useState, useEffect } from "react";
import type { IEvent, IEventWithReport } from "./Main/types";
import type { NameId } from './Profile.page';

export interface ValueLabel {
	value: string; label: string
}

const ReportPage = () => {
	const [loading, setLoading] = useState(true);
	const [events, setEvents] = useState<IEventWithReport[]>([]);
	const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
	const [groups, setGroups] = useState<ValueLabel[]>([]);

	useEffect(() => {
		const fetchData = setTimeout(() => {
			// @ts-ignore
			setEvents(testEvents);
			// @ts-ignore
			setFilteredEvents(testEvents);


			const uniqueGroups: ValueLabel[] = [];
			testEvents.forEach((event) => {
				event.groups.forEach((groupName) => {
					const groupData = { value: groupName, label: groupName };
					if (!uniqueGroups.some((group) => group.value === groupData.value)) {
						uniqueGroups.push(groupData);
					}
				});
			});
			setGroups(uniqueGroups);

			setLoading(false);
		}, 500);

		return () => clearTimeout(fetchData);
	}, []);

	const handleFilterEvents = (selectedGroups: string[]) => {
		const filtered = selectedGroups.length ? events.filter((event) =>
			event.groups.some((group) => selectedGroups.includes(group))
		) : events;
		setFilteredEvents(filtered);
	};

	return (
		<Reports
			events={filteredEvents}
			loading={loading}
			groups={groups}
			onFilterEvents={handleFilterEvents}
		/>
	)
}

export default ReportPage