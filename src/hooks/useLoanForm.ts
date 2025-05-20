import { useState } from 'react';
import { submitLoanApplication as applyLoan } from '@/services/api';
import { parseLoanDecision } from '@/utils/parseLoanDecision';

export function useLoanForm() {
  const [step, setStep] = useState<'auth' | 'loan' | 'result'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('30000');
  const [decision, setDecision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitLoanApplication() {
    setLoading(true);
    setError(null);
    try {
      const amount = Number(requestedAmount);
      const response = await applyLoan({
        tax_id: taxId,
        business_name: businessName,
        requested_amount: amount,
      });

    const decision = parseLoanDecision(response);
    setDecision(decision);
    setStep('result');
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error processing your request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setStep('loan');
    setEmail('');
    setPassword('');
    setBusinessName('');
    setTaxId('');
    setRequestedAmount('');
    setDecision(null);
    setError(null);
  }

  return {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    businessName,
    setBusinessName,
    taxId,
    setTaxId,
    requestedAmount,
    setRequestedAmount,
    decision,
    loading,
    error,
    setError,
    submitLoanApplication,
    resetForm,
  };
}
