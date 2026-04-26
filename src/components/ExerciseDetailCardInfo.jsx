export default function ExerciseDetailCardInfo({
    exerciseName,
    exerciseDescription,
    exerciseMuscleGroup,
    exerciseEquipment,
}) {
    return (
        <div className="exercise-detail-card-info text-start min-h-[200px]">
            <h1 className="text-2xl font-bold text-start">{exerciseName}</h1>
            <p className="exercise-detail-card-info-description">{exerciseDescription}</p>
            <p className="exercise-detail-card-info-muscle-group">{exerciseMuscleGroup}</p>
            <p className="exercise-detail-card-info-equipment">{exerciseEquipment}</p>
        </div>
    );
}