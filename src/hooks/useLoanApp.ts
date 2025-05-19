import { useLoanAppContext } from '@/context/LoanAppProvider';

export const useLoanApp = () => {
  return useLoanAppContext();
};
