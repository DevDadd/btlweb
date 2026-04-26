import ExerciseCard from './ExerciseCard.jsx';

export default function ExercisesGrid({
  status,
  exercises,
  errorMessage,
  onExerciseSelect,
  emptyText = 'No exercises found.',
  loadingText = 'Loading exercises...',
}) {
  return (
    <div className="exercises-grid">
      {status === 'loading' && (
        <div className="exercise-loading">{loadingText}</div>
      )}
      {status === 'error' && (
        <div className="exercise-empty">Failed to load: {errorMessage}</div>
      )}
      {status === 'ready' && exercises.length === 0 && (
        <div className="exercise-empty">{emptyText}</div>
      )}
      {status === 'ready' &&
        exercises.map((ex) => (
          <ExerciseCard
            key={ex.id ?? ex.name}
            exercise={ex}
            onSelect={onExerciseSelect}
          />
        ))}
    </div>
  );
}
