import type React from 'react';
import {events as testEvents} from './Main/testData'
import { useState } from 'react';
import Report from '@/components/Reports/Report';
import { useAuthStore } from '@/store/useAuthStore';

const ReportPage: React.FC = () => {
  console.log('123')
  const [events,setEvents] = useState(testEvents)
  const allGroups = Array.from(new Set(events.flatMap(event => event.groups)))
    .map((group, index) => ({ id: index, name: group })).sort((a, b) =>a.name-b.name);
  console.log(allGroups)

  const { userRole } = useAuthStore();
  console.log(userRole)
  
  let events_b
  if(userRole == 'curator'){
    events_b = events.filter(event=>event.groups.some(g=>g == 'ИП-21'))
  }

  return <Report events={events_b || events} allGroups={allGroups}/>
  // return <div>123</div>
};

export default ReportPage;