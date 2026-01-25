import React, {createContext, useState, useEffect} from 'react';
import {validateAccessToken, refreshAccessToken, logout} from '@services/auth'; // 경로는 필요에 따라 수정

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  initializeAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeAuth = async () => {
    try {
      const isValid = await validateAccessToken();

      if (isValid) {
        setIsAuthenticated(true);
        return;
      }
    } catch (e) {
      console.error('Auth init error:', e);
      await logout();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        initializeAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
