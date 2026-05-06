import CoursesCard from "./CoursesCard.jsx";

export default function CoursesGrid({
  status,
  courses,
  errorMessage,
  onCourseSelect,
  emptyText = "No courses found.",
  loadingText = "Loading courses...",
}) {
  return (
    <div className="exercises-grid">
      {status === "loading" && <div className="exercise-loading">{loadingText}</div>}
      {status === "error" && (
        <div className="exercise-empty">Failed to load: {errorMessage}</div>
      )}
      {status === "ready" && courses.length === 0 && (
        <div className="exercise-empty">{emptyText}</div>
      )}
      {status === "ready" &&
        courses.map((course) => (
          <CoursesCard
            key={course.id ?? course.name ?? course.title}
            course={course}
            onSelect={onCourseSelect}
          />
        ))}
    </div>
  );
}
