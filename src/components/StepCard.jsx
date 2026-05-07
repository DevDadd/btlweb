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
    <section className="mt-6 min-h-[200px] rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-white shadow-2xl backdrop-blur-2xl">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
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

        <h2 className="text-3xl font-bold tracking-tight text-white">
          How to Perform
        </h2>
      </div>

      {steps.length === 0 ? (
        <div className="rounded-xl border border-white/20 p-4 text-white/70">
          No guidelines available.
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-white/20 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 text-lg font-bold text-white shadow-lg">
                {index + 1}
              </div>
              <p className="text-base font-medium leading-relaxed text-white/90">
                {step}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}