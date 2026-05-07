export default function AnalyzeFormCard() {
  return (
    <div className="w-full rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-500 via-red-600 to-red-800 px-6 py-8 shadow-[0_0_40px_rgba(239,68,68,0.35)]">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Ready to check your form?
        </h2>

        <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-white/90">
          Upload a video and get AI-powered feedback on your technique.
        </p>

        <button className="mt-6 rounded-full bg-gray-500 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-gray-400">
          Analyze My Form
        </button>
      </div>
    </div>
  );
}