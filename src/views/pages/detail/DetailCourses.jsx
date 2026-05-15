import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Background from "../../components/Background";
import CoursesInfoCard from "../../components/CoursesInfoCard";
import ExerciseListCard from "../../components/ExerciseListCard";
import getCoursesDetail from "../../../models/courses_detail_services";
import { addExerciseHistory } from "../../../models/view_history";

export default function DetailCourses() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const courseFromState = location.state?.course;
  const [course, setCourse] = useState(courseFromState || null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [detailWarning, setDetailWarning] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCourseDetail() {
      if (!courseId) return;
      try {
        const detail = await getCoursesDetail(courseId);
        if (cancelled) return;
        setCourse((prev) => ({ ...(prev || {}), ...(detail || {}) }));
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        if (courseFromState) {
          setDetailWarning(
            "Unable to fetch the latest course details, using cached data.",
          );
          setStatus("ready");
          return;
        }
        setErrorMessage(error.message || "Failed to fetch course details");
        setStatus("error");
      }
    }

    loadCourseDetail();
    return () => {
      cancelled = true;
    };
  }, [courseFromState, courseId]);

  useEffect(() => {
    document.title = course?.name
      ? `${course.name} | GYMPT`
      : "Course Detail | GYMPT";
  }, [course]);

  const exerciseList = Array.isArray(course?.exercises)
    ? course.exercises
    : Array.isArray(course?.data?.exercises)
      ? course.data.exercises
      : Array.isArray(course?.results?.exercises)
        ? course.results.exercises
        : Array.isArray(course?.exercise_list)
          ? course.exercise_list
          : Array.isArray(course?.workouts)
            ? course.workouts
            : [];

  return (
    <>
      <Background gradientOnly />
      <AppBar />
      <main
        style={{
          maxWidth: 1400,
          margin: "120px auto 40px",
          padding: "0 20px 48px",
        }}
      >
        {status === "loading" ? (
          <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-white shadow-2xl backdrop-blur-2xl flex items-center justify-center">
            Loading course detail...
          </div>
        ) : status === "error" ? (
          <div className="min-h-[220px] rounded-2xl border border-red-300/30 bg-red-500/10 p-6 text-red-200 shadow-2xl backdrop-blur-2xl flex items-center justify-center">
            Failed to load: {errorMessage}
          </div>
        ) : (
          <>
            <CoursesInfoCard
              courseName={course?.name || course?.title || "Untitled course"}
              courseDescription={course?.description || "No description available."}
              courseLevel={course?.level || "Unknown"}
              courseCategory={course?.category || "General"}
              courseDuration={course?.duration || "N/A"}
            />
            {detailWarning ? (
              <div className="mt-4 rounded-xl border border-yellow-300/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
                {detailWarning}
              </div>
            ) : null}
            <div className="mt-6 text-base font-semibold text-white/90">
              Exercises Include In This Course
            </div>
            <div className="mt-6 w-full space-y-4">
              {exerciseList.length === 0 ? (
                <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-sm text-white/70">
                  No exercises in this course yet.
                </div>
              ) : (
                exerciseList.map((item, index) => {
                  const exercise = item?.exercise || item;
                  const exerciseId = exercise?.id || item?.exercise_id;
                  const sets = item?.sets ?? exercise?.sets ?? item?.set_count;
                  const reps = item?.reps ?? exercise?.reps ?? item?.rep_count;
                  const restSeconds = item?.rest_seconds;
                  const volume =
                    sets && reps
                      ? `${sets} × ${reps}`
                      : item?.volume || exercise?.volume || "N/A";

                  const description =
                    exercise?.description ||
                    item?.note ||
                    "No description available.";
                  const restText =
                    typeof restSeconds === "number"
                      ? ` • Rest: ${restSeconds}s`
                      : "";

                  return (
                    <ExerciseListCard
                      key={item?.id || exercise?.id || exercise?.exercise_id || index}
                      title={
                        exercise?.name ||
                        exercise?.title ||
                        `Exercise ${index + 1}`
                      }
                      category={
                        exercise?.muscle_group ||
                        exercise?.equipment?.name ||
                        exercise?.category ||
                        exercise?.type ||
                        "General"
                      }
                      description={`${description}${restText}`}
                      volume={volume}
                      onClick={() => {
                        if (!exerciseId) return;
                        addExerciseHistory(exercise);
                        navigate(`/exercises/${exerciseId}`, {
                          state: { exercise },
                        });
                      }}
                    />
                  );
                })
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
