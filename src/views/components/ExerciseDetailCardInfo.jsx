export default function ExerciseDetailCardInfo({
    exerciseName,
    exerciseDescription,
    exerciseMuscleGroup,
    exerciseEquipment,
    exerciseCaloriesPerMinute,
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-start text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-slide-up" style={{ animationFillMode: 'both' }}>
            {/* Decorative glowing orb */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/15 rounded-full blur-[60px] -z-10 pointer-events-none animate-pulse-glow"></div>

            <div className="mb-6 flex items-start md:items-center gap-4 relative z-10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-red-500 to-orange-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-3xl">
                    💪
                </div>

                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm tracking-tight leading-none m-0">
                            {exerciseName}
                        </h1>
                        <span className="rounded-full bg-red-500/20 border border-red-500/30 px-3 py-1.5 text-xs font-bold text-red-400 uppercase tracking-widest leading-none">
                            Exercise
                        </span>
                    </div>
                    <p className="mt-2 text-base text-gray-400 max-w-3xl leading-relaxed">
                        {exerciseDescription}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-red-500/40 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">
                            🏋️
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Muscle Group</p>
                    </div>
                    <p className="text-xl font-bold text-white ml-10">{exerciseMuscleGroup}</p>
                </div>

                <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-red-500/40 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">
                            ⚙️
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Equipment</p>
                    </div>
                    <p className="text-xl font-bold text-white ml-10">{exerciseEquipment}</p>
                </div>

                <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-red-500/40 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-xs">
                            🔥
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Calories / Min</p>
                    </div>
                    <p className="text-xl font-bold text-white ml-10">{exerciseCaloriesPerMinute}</p>
                </div>
            </div>
        </div>
    );
}       