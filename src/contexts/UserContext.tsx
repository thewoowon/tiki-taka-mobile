import React, {createContext, useContext, useState, ReactNode} from 'react';

type User = {
  email: string;
  nickname: string;
  profileImageUrl: string;
  role: 'CUSTOMER' | 'OWNER' | 'ADMIN';
};

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  setUser: (user: User) => void;
  resetUser: () => void;
  setIsGuest: (isGuest: boolean) => void; // Optional setter for guest status
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const setUser = (userData: User) => {
    setUserState(userData);
  };

  const resetUser = () => {
    setUserState(null);
  };

  const isLoggedIn = !!user?.email;

  return (
    <UserContext.Provider
      value={{user, isLoggedIn, isGuest, setUser, resetUser, setIsGuest}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
