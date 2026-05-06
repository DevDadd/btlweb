export default function ExerciseDetailCardInfo({
    exerciseName,
    exerciseDescription,
    exerciseMuscleGroup,
    exerciseEquipment,
    exerciseCaloriesPerMinute,
}) {
    return (
        <div className="exercise-detail-card-info min-h-[200px] rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-start text-white shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-600 text-3xl">
                    💪
                </div>

                <div>
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                        Exercise
                    </span>
                    <h1 className="mt-2 text-3xl font-bold">{exerciseName}</h1>
                    <p className="mt-2 text-gray-400">{exerciseDescription}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="min-w-0 rounded-xl border border-white/20 p-4">
                    <p className="mb-1 text-xs text-white">🏋️ MUSCLE GROUP</p>
                    <p className="text-lg font-semibold">{exerciseMuscleGroup}</p>
                </div>

                <div className="min-w-0 rounded-xl border border-white/20 p-4">
                    <p className="mb-1 text-xs text-white">⚙️ EQUIPMENT</p>
                    <p className="text-lg font-semibold">{exerciseEquipment}</p>
                </div>
                <div className="min-w-0 rounded-xl border border-white/20 p-4">
                    <p className="mb-1 text-xs text-white">🔥 CALORIES PER MINUTE</p>
                    <p className="text-lg font-semibold">{exerciseCaloriesPerMinute}</p>
                </div>
            </div>
        </div>
    );
}       