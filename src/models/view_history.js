const COURSE_HISTORY_KEY = "view_history_courses";
const EXERCISE_HISTORY_KEY = "view_history_exercises";
const HISTORY_LIMIT = 8;

function safeRead(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function upsertHistory(key, item) {
  const existing = safeRead(key);
  const normalizedId = String(item.id);
  const next = [
    item,
    ...existing.filter((entry) => String(entry.id) !== normalizedId),
  ].slice(0, HISTORY_LIMIT);
  localStorage.setItem(key, JSON.stringify(next));
}

export function addCourseHistory(course) {
  const id = course?.id ?? course?._id;
  if (!id) return;
  upsertHistory(COURSE_HISTORY_KEY, {
    id,
    name: course?.name || course?.title || `Course ${id}`,
    category: course?.category || course?.level || course?.type || "General",
    viewedAt: Date.now(),
  });
}

export function addExerciseHistory(exercise) {
  const id = exercise?.id ?? exercise?.exercise_id;
  if (!id) return;
  upsertHistory(EXERCISE_HISTORY_KEY, {
    id,
    name: exercise?.name || exercise?.title || `Exercise ${id}`,
    category: exercise?.muscle_group || exercise?.category || "General",
    viewedAt: Date.now(),
  });
}

export function getCourseHistory() {
  return safeRead(COURSE_HISTORY_KEY);
}

export function getExerciseHistory() {
  return safeRead(EXERCISE_HISTORY_KEY);
}
