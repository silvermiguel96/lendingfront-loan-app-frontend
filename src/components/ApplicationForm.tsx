'use client';

import { useState, useEffect } from 'react';

type LoanStatus = 'Pending' | 'Approved' | 'Declined' | 'Undecided';

interface AccountData {
  email?: string;
  taxId: string;
  businessName: string;
  requestedAmount: number;
  decision: LoanStatus;
}

export default function ApplicationForm() {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    taxId: '',
    businessName: '',
    requestedAmount: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lendingfront-account');
    if (stored) {
      setAccount(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.taxId || !formData.businessName || !formData.requestedAmount) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }

    const requestedAmountNum = Number(formData.requestedAmount);
    if (isNaN(requestedAmountNum) || requestedAmountNum <= 0) {
      setError('Requested amount must be a positive number.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim() || undefined,
          password: formData.password || undefined,
          taxId: formData.taxId.trim(),
          businessName: formData.businessName.trim(),
          requestedAmount: requestedAmountNum,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to apply');
      }

      const data = await res.json();

      const accountData: AccountData = {
        email: formData.email.trim() || undefined,
        taxId: formData.taxId.trim(),
        businessName: formData.businessName.trim(),
        requestedAmount: requestedAmountNum,
        decision: data.decision,
      };

      localStorage.setItem('lendingfront-account', JSON.stringify(accountData));
      setAccount(accountData);
    } catch (e) {
      setError('Error submitting application.');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('lendingfront-account');
    setAccount(null);
    setFormData({
      email: '',
      password: '',
      taxId: '',
      businessName: '',
      requestedAmount: '',
    });
  };

  if (account) {
    return (
      <div className="p-6 border rounded shadow bg-white max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Account Info</h2>
        {account.email && <p><strong>Email:</strong> {account.email}</p>}
        <p><strong>Tax ID:</strong> {account.taxId}</p>
        <p><strong>Business Name:</strong> {account.businessName}</p>
        <p><strong>Requested Amount:</strong> ${account.requestedAmount.toLocaleString()}</p>
        <p>
          <strong>Loan Decision:</strong>{' '}
          <span
            className={`font-bold ${
              account.decision === 'Approved'
                ? 'text-green-600'
                : account.decision === 'Declined'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {account.decision}
          </span>
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border rounded-xl bg-white shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold">Loan Application</h2>

      <div>
        <label className="block text-sm font-medium">Email (optional)</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password (optional)</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Tax ID</label>
        <input
          type="text"
          required
          value={formData.taxId}
          onChange={(e) => setFormData((f) => ({ ...f, taxId: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Business Name</label>
        <input
          type="text"
          required
          value={formData.businessName}
          onChange={(e) => setFormData((f) => ({ ...f, businessName: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Requested Amount</label>
        <input
          type="number"
          required
          min="1"
          value={formData.requestedAmount}
          onChange={(e) => setFormData((f) => ({ ...f, requestedAmount: e.target.value }))}
          className="border p-2 w-full rounded"
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Applying...' : 'Apply'}
      </button>
    </form>
  );
}
