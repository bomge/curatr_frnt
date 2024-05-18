import type { Routes } from '@/@types/routes';
import authRoute from './authRoute';
import protectedRoutes_ from './protectedRoutes';

export const publicRoutes: Routes = [...authRoute];
export const protectedRoutes: Routes = [...protectedRoutes_];
