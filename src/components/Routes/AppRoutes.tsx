import type React from 'react';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/store/useAuthStore';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />;
};

export default AppRoutes;