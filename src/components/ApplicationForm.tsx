'use client';

import { useState, useEffect } from 'react';
import { submitLoanApplication } from '@/services/api';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';

interface AccountData {
  taxId: string;
  businessName: string;
  requestedAmount: number;
  decision: string;
}

const defaultForm = {
  taxId: '',
  businessName: '',
  requestedAmount: '',
};

export default function LoanApplicationForm() {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookie = getCookie('lendingfront-account');
    if (cookie) {
      try {
        setAccount(JSON.parse(cookie));
      } catch {
        deleteCookie('lendingfront-account');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { taxId, businessName, requestedAmount } = formData;
    const amount = Number(requestedAmount);

    if (!taxId || !businessName || isNaN(amount) || amount <= 0) {
      setError('Please complete all required fields correctly.');
      return;
    }

    setLoading(true);

    try {
      const result = await submitLoanApplication({
        taxId: taxId.trim(),
        businessName: businessName.trim(),
        requestedAmount: amount,
      });

      const accountInfo: AccountData = {
        taxId: taxId.trim(),
        businessName: businessName.trim(),
        requestedAmount: amount,
        decision: result.decision,
      };

      setCookie('lendingfront-account', JSON.stringify(accountInfo), { days: 7 });
      setAccount(accountInfo);
    } catch {
      setError('Error submitting application.');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    deleteCookie('lendingfront-account');
    setAccount(null);
    setFormData(defaultForm);
  };

  if (account) {
    return (
      <div className="p-6 border rounded shadow bg-white max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Application Info</h2>
        <p><strong>Tax ID:</strong> {account.taxId}</p>
        <p><strong>Business Name:</strong> {account.businessName}</p>
        <p><strong>Requested Amount:</strong> ${account.requestedAmount.toLocaleString()}</p>
        <p>
          <strong>Loan Decision:</strong>{' '}
          <span className={`font-bold ${
            account.decision === 'Approved'
              ? 'text-green-600'
              : account.decision === 'Declined'
              ? 'text-red-600'
              : 'text-yellow-600'
          }`}>
            {account.decision}
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border rounded-xl bg-white shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold">Apply for a Loan</h2>

      <div>
        <label className="block text-sm font-medium">Tax ID</label>
        <input
          type="text"
          value={formData.taxId}
          required
          onChange={(e) => setFormData((prev) => ({ ...prev, taxId: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Business Name</label>
        <input
          type="text"
          value={formData.businessName}
          required
          onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Requested Amount</label>
        <input
          type="number"
          value={formData.requestedAmount}
          required
          onChange={(e) => setFormData((prev) => ({ ...prev, requestedAmount: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
