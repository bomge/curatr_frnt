import type React from 'react';
import {events as testEvents} from './Main/testData'
import { useState } from 'react';
import Report from '@/components/Reports/Report';

const ReportPage: React.FC = () => {
  console.log('123')
  const [events,setEvents] = useState(testEvents)
  return <Report events={events} />
  // return <div>123</div>
};

export default ReportPage;