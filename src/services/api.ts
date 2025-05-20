export interface ApplyPayload {
  tax_id: string;
  business_name: string;
  requested_amount: number;
}

export async function submitLoanApplication(data: ApplyPayload) {
   console.log('Enviando solicitud con:', data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/loan/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to apply');
  }

  return res.json();
}
