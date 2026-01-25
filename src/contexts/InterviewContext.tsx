import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Asset } from 'react-native-image-picker';

export interface InterviewForm {
  title: string;
  resumeId: number | null;
  interviewId: number | null;
  inputMethod: 'text' | 'image' | null;
  inputData: {
    text: string;
    image: Asset | null;
  };
  answerData: {
    qaId: number;
    answer: string;
  }[];
  lastBtnCk: number | null;
}

interface InterviewContextType {
  interviewForm: InterviewForm;
  updateInterviewForm: (
    field: keyof InterviewForm,
    value: string | number | object,
  ) => void;
  resetInterviewForm: () => void;
  updateInterviewFormObj: (form: Partial<InterviewForm>) => void;
}

const initialInterviewForm: InterviewForm = {
  title: '',
  resumeId: null,
  interviewId: null,
  inputMethod: null,
  inputData: {
    text: '',
    image: null,
  },
  answerData: [],
  lastBtnCk: null,
};

const InterviewContext = createContext<InterviewContextType | undefined>(
  undefined,
);

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider');
  }
  return context;
};

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [interviewForm, setInterviewForm] =
    useState<InterviewForm>(initialInterviewForm);

  const updateInterviewForm = (field: keyof InterviewForm, value: any) => {
    setInterviewForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateInterviewFormObj = (form: Partial<InterviewForm>) => {
    setInterviewForm(prev => ({
      ...prev,
      ...form,
    }));
  };

  const resetInterviewForm = () => {
    setInterviewForm(initialInterviewForm);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewForm,
        updateInterviewForm,
        resetInterviewForm,
        updateInterviewFormObj,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
