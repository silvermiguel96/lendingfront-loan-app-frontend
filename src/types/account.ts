export type LoanStatus = 'Pending' | 'Approved' | 'Declined' | 'Undecided';

export interface AccountData {
  email?: string;
  taxId: string;
  businessName: string;
  requestedAmount: number;
  decision: LoanStatus;
}

export interface LoanResponse {
  details: { loanDecision: string }[];
  message: string;
  statusCode: number;
}