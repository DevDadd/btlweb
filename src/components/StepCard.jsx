export default function HowToPerform({ guidelines }) {
  const normalizedGuidelines = (guidelines || '')
    .replace(/\\r\\n|\\n|\\r/g, '\n')
    .trim();
  const parsedSteps = normalizedGuidelines
    .split(/\r?\n+/)
    .map((step) => step.trim())
    .filter(Boolean)
    .map((step) => step.replace(/^\d+\.\s*/, ''));
  const steps = parsedSteps;

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
      <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4"
            />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
          How to Perform
        </h2>
      </div>

      {steps.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-base text-gray-400">
          No guidelines available.
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/10 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-base font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                {index + 1}
              </div>
              <p className="text-base font-medium leading-relaxed text-gray-300 group-hover:text-white transition-colors pt-2">
                {step}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}