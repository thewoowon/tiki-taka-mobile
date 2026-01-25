import React, { createContext, useContext, useState } from 'react';

type GlobalMenuContextType = {
  isVisible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const GlobalMenuContext = createContext<GlobalMenuContextType | undefined>(
  undefined,
);

export const GlobalMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => {
    setIsVisible(true);
  };

  const closeMenu = () => {
    setIsVisible(false);
  };

  return (
    <GlobalMenuContext.Provider value={{ isVisible, openMenu, closeMenu }}>
      {children}
    </GlobalMenuContext.Provider>
  );
};

export const useGlobalMenu = () => {
  const context = useContext(GlobalMenuContext);
  if (!context) {
    throw new Error('useGlobalMenu must be used within GlobalMenuProvider');
  }
  return context;
};
