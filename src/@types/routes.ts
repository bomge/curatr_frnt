import { ReactNode, type LazyExoticComponent } from 'react';

export type Role = 'admin' | 'manager' | 'user';

export type Route = {
  key: string;
  path: string;
  component: LazyExoticComponent<React.FC>;
  role?: Role[];
};

export type Routes = Route[];