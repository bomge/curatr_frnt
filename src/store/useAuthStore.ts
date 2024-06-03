import create from 'zustand';
import Cookies from 'js-cookie';

interface DecodedToken {
  role: 'admin' | 'manager' | 'user' | 'prorector' | 'dean';
  name: string;
}

function decodeJWT(token: string): DecodedToken | null {
  try {
    const [_, payloadBase64, __] = token.split('.');
    const payload = atob(payloadBase64);
    return JSON.parse(payload);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
}

export interface AuthState {
  isAuthenticated: boolean;
  userRole: 'admin' | 'manager' | 'user' | 'prorector' | 'dean' | null;
  userName: string | null;
  setIsAuthenticated: (isAuthenticated: boolean, token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!Cookies.get('token'),
  userRole: Cookies.get('token') ? decodeJWT(Cookies.get('token')!)?.role || null : null,
  userName: Cookies.get('token') ? decodeJWT(Cookies.get('token')!)?.name || null : null,
  setIsAuthenticated: (isAuthenticated: boolean, token: string | null) => {
    if (isAuthenticated) {
      Cookies.set('token', token!);
      const decodedToken = decodeJWT(token!);
      set({ isAuthenticated, userRole: decodedToken?.role || null });
    } else {
      Cookies.remove('token');
      set({ isAuthenticated, userRole: null });
    }
  },
  logout: () => {
    Cookies.remove('token');
    set({ isAuthenticated: false, userRole: null });
  },
}));