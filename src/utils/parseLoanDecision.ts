import { LoanResponse } from "@/types";

export function parseLoanDecision(response: LoanResponse): string {
  if (
    response?.details &&
    Array.isArray(response.details) &&
    response.details.length > 0 &&
    typeof response.details[0].loanDecision === 'string'
  ) {
    return response.details[0].loanDecision;
  }
  throw new Error('Respuesta no válida del servidor');
}
