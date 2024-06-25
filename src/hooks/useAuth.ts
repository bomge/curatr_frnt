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
        return true
      } else {
        console.error('Authentication failed');
        return false
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
      return false
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
};