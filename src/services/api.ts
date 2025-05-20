export interface ApplyPayload {
  tax_id: string;
  business_name: string;
  requested_amount: number;
}

export async function submitLoanApplication(payload: ApplyPayload) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/loan/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data?.details) {
    const errorMessage = data?.message || 'Error desconocido del servidor';
    throw new Error(errorMessage);
  }

  return data;
}
