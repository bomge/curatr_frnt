import { lazy } from 'react';
import type { Routes } from '@/@types/routes';

const authRoute: Routes = [
  {
    key: 'login',
    path: '/login',
    component: lazy(() => import('@/pages/Login.page')),
  },
];

export default authRoute;