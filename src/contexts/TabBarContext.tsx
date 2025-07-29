import React, {createContext, useContext, useState} from 'react';

type TabBarContextType = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const TabBarContext = createContext<TabBarContextType>({
  isVisible: true,
  setIsVisible: () => {},
});

export const TabBarProvider = ({children}: {children: React.ReactNode}) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <TabBarContext.Provider value={{isVisible, setIsVisible}}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => useContext(TabBarContext);
