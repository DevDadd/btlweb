export default function MuscleAffected({ muscleGroup }) {
    return (
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-orange-500/20 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.15)] text-xl">
                    💪
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                    Muscle Affected
                </h2>
            </div>

            <div className="flex flex-wrap gap-3">
                <p className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-base font-bold tracking-wide text-orange-100 shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-colors hover:bg-orange-500/20 hover:border-orange-500/50 cursor-default">
                    {muscleGroup}
                </p>
            </div>
        </section>
    );
}