export type LoanStatus = 'Approved' | 'Declined' | 'Undecided';

export interface AccountData {
  taxId: string;
  businessName: string;
  requestedAmount: number;
  decision: LoanStatus;
}

export interface LoanResponse {
  details: { loanDecision: LoanStatus }[];
  message: string;
  statusCode: number;
}

export  interface Application {
  taxId: string;
  businessName: string;
  requestedAmount: number;
  status: LoanStatus;
}

export  interface User {
  email: string;
  password: string;
}

export interface LoanAppState {
  user: User | null;
  application: Application | null;
  loan: LoanStatus | null;
  setUser: (user: User) => void;
  setApplication: (app: Application) => void;
  setLoan: (loan: LoanStatus) => void;
}