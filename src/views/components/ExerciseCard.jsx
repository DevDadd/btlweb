export default function ExerciseCard({ exercise, onSelect }) {
  const { name, muscle_group: muscleGroup, equipment } = exercise;
  const handleSelect = () => {
    if (onSelect) {
      onSelect(exercise);
    }
  };

  return (
    <div
      className="exercise-card"
      role="button"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
    >
      <div className="exercise-card-text">{name}</div>
      <div className="exercise-muscle">{muscleGroup}</div>
      <div className="exercise-equipment">
        <span className="equipment-label">Equipment:</span>
        <span className="equipment-name">{equipment?.name ?? 'N/A'}</span>
      </div>
    </div>
  );
}
