export async function submitApplication(data: ApplicationFormData) {
  const response = await fetch('/api/loan-decision', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
}
