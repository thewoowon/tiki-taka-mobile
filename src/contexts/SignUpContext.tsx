import React, {createContext, useContext, useState, ReactNode} from 'react';

type UserRole = 'CUSTOMER' | 'OWNER' | 'ADMIN';

export interface SignUpForm {
  email?: string;
  password?: string;
  prociderType?: 'KAKAO' | 'NAVER' | 'GOOGLE' | 'APPLE';
  name?: string;
  authCode?: string;
  nickname?: string;
  phoneNumber?: string;
  userRole?: UserRole;
}

interface SignUpContextType {
  signUpForm: SignUpForm;
  updateSignUpForm: (field: keyof SignUpForm, value: string) => void;
  resetSignUpForm: () => void;
  updateSignUpFormObj: (form: Partial<SignUpForm>) => void;
}

const initialSignUpForm: SignUpForm = {
  userRole: undefined,
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};

export const SignUpProvider = ({children}: {children: ReactNode}) => {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>(initialSignUpForm);

  const updateSignUpForm = (field: keyof SignUpForm, value: any) => {
    setSignUpForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSignUpFormObj = (form: Partial<SignUpForm>) => {
    console.log('Updating signUpForm with:', form);
    setSignUpForm(prev => ({
      ...prev,
      ...form,
    }));
  };

  const resetSignUpForm = () => {
    setSignUpForm(initialSignUpForm);
  };

  return (
    <SignUpContext.Provider
      value={{
        signUpForm,
        updateSignUpForm,
        resetSignUpForm,
        updateSignUpFormObj,
      }}>
      {children}
    </SignUpContext.Provider>
  );
};
