import type React from 'react';
import {events as testEvents} from './Main/testData'
import { useState } from 'react';
import Report from '@/components/Reports/Report';

const ReportPage: React.FC = () => {
  console.log('123')
  const [events,setEvents] = useState(testEvents)
  const allGroups = Array.from(new Set(events.flatMap(event => event.groups)))
    .map((group, index) => ({ id: index, name: group })).sort((a, b) =>a.name-b.name);
  console.log(allGroups)
  return <Report events={events} allGroups={allGroups}/>
  // return <div>123</div>
};

export default ReportPage;