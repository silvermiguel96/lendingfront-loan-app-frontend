interface ResultPageProps {
  searchParams: {
    decision: string;
  };
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const decision = searchParams.decision;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center p-8">
      <div className="p-6 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Loan Decision</h2>
        <p className="text-lg">
          Result:{" "}
          <span
            className={`font-bold ${
              decision === 'Approved'
                ? 'text-green-600'
                : decision === 'Declined'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {decision}
          </span>
        </p>
      </div>
    </div>
  );
}
