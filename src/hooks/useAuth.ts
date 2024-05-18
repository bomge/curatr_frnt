import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { fakeAuthAPI } from '@/api';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuthStore();

  const signIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fakeAuthAPI(username, password);

      if (response.success) {
        setIsAuthenticated(true, response.token);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
};