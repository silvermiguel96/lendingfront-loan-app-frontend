interface ResultPageProps {
  readonly searchParams: {
    readonly decision: string;
  };
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const decision = searchParams.decision;
  let decisionColorClass = '';
  if (decision === 'Approved') {
    decisionColorClass = 'text-green-600';
  } else if (decision === 'Declined') {
    decisionColorClass = 'text-red-600';
  } else {
    decisionColorClass = 'text-yellow-600';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-8">
      <div className="p-6 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Loan Decision</h2>
        <p className="text-lg">
          Result:{" "}
          <span
            className={`font-bold ${decisionColorClass}`}
          >
            {decision}
          </span>
        </p>
      </div>
    </div>
  );
}
