'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoanStatus, LoanAppState, User, Application } from '@/types';

const LoanAppContext = createContext<LoanAppState | undefined>(undefined);

export const LoanAppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [application, setApplicationState] = useState<Application | null>(null);
  const [loan, setLoanState] = useState<LoanStatus | null>(null);

  const setUser = (user: User) => setUserState(user);
  const setApplication = (app: Application) => setApplicationState(app);
  const setLoan = (loan: LoanStatus) => setLoanState(loan);

  return (
    <LoanAppContext.Provider value={{ user, application, loan, setUser, setApplication, setLoan }}>
      {children}
    </LoanAppContext.Provider>
  );
};

export const useLoanAppContext = () => {
  const context = useContext(LoanAppContext);
  if (!context) {
    throw new Error('useLoanAppContext must be used within a LoanAppProvider');
  }
  return context;
};
