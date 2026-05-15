export default function CoursesCard({ course, onSelect }) {
    const { name, title, category, level, description } = course;
    const displayName = name || title || "Untitled course";
    const displayMeta = category || level || "General";
    const displayDescription = description || "No description available.";
    const handleSelect = () => {
        if (onSelect) {
            onSelect(course);
        }
    };

    return (
        <div
            className="exercise-card"
            role="button"
            tabIndex={0}
            onClick={handleSelect}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect();
                }
            }}
        >
            <div className="exercise-card-text">{displayName}</div>
            <div className="exercise-muscle">{displayMeta}</div>
            <div className="category-description">{displayDescription}</div>
        </div>
    );
}
