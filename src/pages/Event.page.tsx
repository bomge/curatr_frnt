import EventDetails from '@/components/EventDetails/EventDetails';
import type React from 'react';

import allEvents from './Main/testData'
import { useLocation } from 'react-router-dom';

const nullEventData = {
	id: null,
	name: '',
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	type: 'Академическое',
	status: 'Предстоящее',
	creator: {
	  name: '',
	  id: null,
	},
	initiator: '',
	groups: [],
	isImportant: false,
	description: '',
  };

const initialEventData = {
	id: 1,
	name: 'Собрание кафедры',
	startDate: new Date().toISOString(),
	endDate: new Date().toISOString(),
	type: 'Административное',
	status: 'Завершено',
	creator: {
	  name: 'Alex Durov',
	  id: 1,
	},
	initiator:'Администрация',
	groups: [{ id: 1, name: 'IT-21' }, { id: 2, name: 'IT-22' }],
	isImportant: false,
	description: `
	<strong>Собрание кафедры</strong> - это регулярное мероприятие, проводимое в рамках деятельности университета. На нем присутствуют все преподаватели и сотрудники конкретной кафедры под руководством заведующего.Основные цели собрания кафедры:<ol><li><em>Обсуждение текущих вопросов</em>, связанных с учебным процессом, научной работой, публикационной активностью и другими направлениями деятельности кафедры.</li><li>Планирование и координация работы кафедры на предстоящий период, распределение обязанностей между сотрудниками.</li><li>Заслушивание отчетов преподавателей о проделанной работе, достижениях и возникших проблемах.</li><li>Рассмотрение кадровых вопросов: назначение новых сотрудников, продление трудовых договоров, утверждение тем диссертационных исследований и т.д.</li><li>Представление и обсуждение новых учебно-методических материалов, научных публикаций, грантов и проектов.</li><li>Обмен опытом и лучшими практиками между коллегами, обсуждение путей повышения эффективности работы кафедры.</li></ol>
	`
};

  const allGroups = [
	{ id: 1, name: 'IT-21' },
	{ id: 2, name: 'IT-22' },
	{ id: 3, name: 'IT-31' },
	{ id: 4, name: 'IT-41' },
	{ id: 5, name: 'IT-51' },
	{ id: 6, name: 'IT-61' },
  ];

const EventPage: React.FC = () => {
	const location = useLocation();
  const isCreating = location.pathname === '/event/new';
  const eventData = isCreating ? nullEventData : initialEventData

	return <EventDetails eventData={eventData} allGroups={allGroups} isCreating={isCreating}/>
};

export default EventPage;