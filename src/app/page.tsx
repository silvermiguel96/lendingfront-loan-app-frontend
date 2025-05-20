'use client';
import { useLoanApp } from '@/hooks/useLoanApp';
import { LoanCard } from '@/components/LoanCard';
import { InputField } from '@/components/InputField';
import { SubmitButton } from '@/components/SubmitButton';
import { ErrorText } from '@/components/ErrorText';

export default function HomePage() {
  const {
    step, setStep,
    email, setEmail,
    password, setPassword,
    businessName, setBusinessName,
    taxId, setTaxId,
    requestedAmount, setRequestedAmount,
    decision,
    loading,
    error, setError,
    submitLoanApplication,
    resetForm
  } = useLoanApp();

  return (
    <LoanCard>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#2B3A67]">
        LendingFront Loan Application M
      </h1>

      {step === 'auth' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) return setError('Email and password are required');
            setError(null);
            setStep('loan');
          }}
          className="space-y-5"
        >
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />
          {error && <ErrorText message={error} />}
          <SubmitButton text="Continue" />
        </form>
      )}

      {step === 'loan' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!taxId || !businessName || !requestedAmount)
              return setError('All fields are required');
            setError(null);
            submitLoanApplication();
          }}
          className="space-y-5"
        >
          <InputField label="Tax ID" value={taxId} onChange={setTaxId} />
          <InputField label="Business Name" value={businessName} onChange={setBusinessName} />
          <InputField
            label="Requested Amount"
            type="number"
            value={requestedAmount}
            onChange={setRequestedAmount}
          />
          {error && <ErrorText message={error} />}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setStep('auth');
                setError(null);
              }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}

      {step === 'result' && (() => {
        let decisionClass = 'text-yellow-600';
        if (decision === 'Approved') {
          decisionClass = 'text-green-600';
        } else if (decision === 'Declined') {
          decisionClass = 'text-red-600';
        }
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#2B3A67]">Loan Decision</h2>
            <p className={`text-lg font-bold ${decisionClass}`}>
              {decision}
            </p>
            <button
              className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={resetForm}
            >
              Start Over
            </button>
          </div>
        );
      })()}
    </LoanCard>
  );
}
