import { lazy } from 'react';
import type { Routes } from '@/@types/routes';

const protectedRoutes_: Routes = [
	{
	  key: 'dashboard',
	  path: '/main',
	  component: lazy(() => import('@/pages/Main/Main.page')),
	  role: ['admin', 'manager', 'user'],
	},
	{
	  key: 'admin',
	  path: '/admin',
	  component: lazy(() => import('@/pages/Admin.page')),
	  role: ['admin'],
	},
	{
	  key: 'manage',
	  path: '/manage',
	  component: lazy(() => import('@/pages/Manage.page')),
	  role: ['admin', 'manager'],
	},
	{
		key: 'event-detail',
		path: '/event/:id',
		component: lazy(() => import('@/pages/Event.page')),
		role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
	{
		key: 'profile-detail',
		path: '/profile/:id',
		component: lazy(() => import('@/pages/Profile.page')),
		role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
	{
		key: 'student-detail',
		path: '/student/:id',
		component: lazy(() => import('@/pages/Student.page')),
		// role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
	{
		key: 'cafedras-all',
		path: '/cafedras',
		component: lazy(() => import('@/pages/Cafedra/Cafedras.page')),
		// role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
	{
		key: 'groups-search',
		path: '/groups',
		component: lazy(() => import('@/pages/Group/Groups.page')),
		// role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
	{
		key: 'person-search',
		path: '/search',
		component: lazy(() => import('@/pages/Search/Search.page')),
		// role: ['admin', 'manager', 'user'], // Adjust roles as needed
	  },
  ];

export default protectedRoutes_;