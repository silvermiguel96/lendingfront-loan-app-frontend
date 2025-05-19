'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ApplicationStatus = 'Pending' | 'Approved' | 'Denied' | 'Undecided' | null;
type LoanStatus = 'Active' | 'Closed';

export interface Payment {
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
}

interface Loan {
  status: LoanStatus;
  remainingBalance: number;
  payments: Payment[];
}

interface Application {
  taxId: string;
  businessName: string;
  requestedAmount: number;
  status: ApplicationStatus;
}

interface User {
  email: string;
  password: string;
}

interface LoanAppState {
  user: User | null;
  application: Application | null;
  loan: Loan | null;
  setUser: (user: User) => void;
  setApplication: (app: Application) => void;
  setLoan: (loan: Loan) => void;
}

const LoanAppContext = createContext<LoanAppState | undefined>(undefined);

export const LoanAppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [application, setApplicationState] = useState<Application | null>(null);
  const [loan, setLoanState] = useState<Loan | null>(null);

  const setUser = (user: User) => setUserState(user);
  const setApplication = (app: Application) => setApplicationState(app);
  const setLoan = (loan: Loan) => setLoanState(loan);

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
