import { events as testEvents } from './Main/testData';
import Events from '../components/Events/Events';
import { useEffect, useState } from 'react';
import type { IEvent, IEventStatus, IReport } from './Main/types';

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchData = setTimeout(() => {
		// @ts-ignore
      setEvents(testEvents);
		// @ts-ignore
		setFilteredEvents(testEvents.filter((event) =>['Предстоящее', 'Перенесено'].includes(event.status)));
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchData);
  }, []);

  const handleFilterEvents = (status: IEventStatus) => {
    if (status === 'Предстоящее') {
      setFilteredEvents(events.filter((event) => ['Предстоящее', 'Перенесено'].includes(event.status)))
    } else if (status === 'В процессе') {
      setFilteredEvents(events.filter((event) => event.status === 'В процессе'));
    } else {
      setFilteredEvents(events.filter((event) => ['Завершено', 'Отменено'].includes(event.status)));
    }
  };

  const handleSaveReport = (eventId: number, report: IReport) => {
	console.log(eventId, report);
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, report } : event
      )
    );
    setFilteredEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, report } : event
      )
    );
  };

  return (
    <Events
      events={filteredEvents}
      loading={loading}
      handleFilterEvents={handleFilterEvents}
	  onSaveReport={handleSaveReport}
    />
  );
};

export default EventsPage;