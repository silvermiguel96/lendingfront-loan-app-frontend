'use client';

import { useState } from 'react';

const colors = {
  primary: '#2B3A67',
  accent: '#F7921E',
  background: '#F5F7FA',
  textDark: '#1F2937',
};

export default function HomePage() {
  const [step, setStep] = useState<'auth' | 'loan' | 'result'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [businessName, setBusinessName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [requestedAmount, setRequestedAmount] = useState('');

  const [decision, setDecision] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitLoanApplication() {
    setLoading(true);
    setError(null);

    try {
      const amount = Number(requestedAmount);

      let result = '';
      if (amount > 50000) result = 'Declined';
      else if (amount === 50000) result = 'Undecided';
      else result = 'Approved';

      await new Promise((r) => setTimeout(r, 700));
      setDecision(result);
      setStep('result');
    } catch (err) {
      setError('Error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          LendingFront Loan Application
        </h1>

        {step === 'auth' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email || !password) {
                setError('Email and password are required');
                return;
              }
              setError(null);
              setStep('loan');
            }}
            className="space-y-5"
          >
            <div>
              <label className="block mb-1 font-medium" style={{ color: colors.textDark }}>
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" style={{ color: colors.textDark }}>
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
            >
              Continue
            </button>
          </form>
        )}

        {step === 'loan' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!taxId || !businessName || !requestedAmount) {
                setError('All fields are required');
                return;
              }
              setError(null);
              submitLoanApplication();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block mb-1 font-medium" style={{ color: colors.textDark }}>
                Tax ID
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" style={{ color: colors.textDark }}>
                Business Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" style={{ color: colors.textDark }}>
                Requested Amount
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(e.target.value)}
                required
                min={1}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-2">
                {error}
              </p>
            )}

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

        {step === 'result' && (
          <div className="text-center">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              Loan Decision
            </h2>
            <p
              className={`text-lg font-bold ${
                decision === 'Approved'
                  ? 'text-green-600'
                  : decision === 'Declined'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}
            >
              {decision}
            </p>

            <button
              className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={() => {
                setStep('auth');
                setEmail('');
                setPassword('');
                setBusinessName('');
                setTaxId('');
                setRequestedAmount('');
                setDecision(null);
                setError(null);
              }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
