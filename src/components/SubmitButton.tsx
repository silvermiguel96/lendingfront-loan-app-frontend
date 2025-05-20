export function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
    >
      {text}
    </button>
  );
}
