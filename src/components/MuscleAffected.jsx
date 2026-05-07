export default function MuscleAffected({ muscleGroup }) {
    return (
        <section className="mt-6 min-h-[200px] rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-white shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10">
                    <span className="text-2xl leading-none" aria-hidden="true">
                        💪
                    </span>

                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white">
                    Muscle Affected
                </h2>
            </div>

            <p className="inline-block rounded-xl border border-white/25 bg-gradient-to-r from-zinc-500/30 via-white/20 to-zinc-400/20 px-4 py-2 text-base font-medium leading-relaxed text-white">
                {muscleGroup}
            </p>
        </section>
    );
}