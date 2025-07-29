// contexts/ModalContext.tsx
import React, {createContext, useContext, useState} from 'react';

type ModalContextType = {
  isVisible: boolean;
  message: string;
  onConfirm?: () => void;
  showModal: (message: string, onConfirm?: () => void) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>();

  const showModal = (msg: string, confirmCallback?: () => void) => {
    setMessage(msg);
    setOnConfirm(() => confirmCallback);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage('');
    setOnConfirm(undefined);
  };

  return (
    <ModalContext.Provider
      value={{isVisible, message, onConfirm, showModal, hideModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
