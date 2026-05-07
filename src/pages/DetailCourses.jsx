import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import Background from "../components/Background";
import CoursesInfoCard from "../components/CoursesInfoCard";
import ExerciseListCard from "../components/ExerciseListCard";
import getCoursesDetail from "../hooks/courses_detail_services";

export default function DetailCourses() {
  const location = useLocation();
  const { courseId } = useParams();
  const courseFromState = location.state?.course;
  const [course, setCourse] = useState(courseFromState || null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

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
          setStatus("ready");
          return;
        }
        setErrorMessage(error.message || "Lấy chi tiết course thất bại");
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
            <div className="mt-6 text-base font-semibold text-white/90">
              Exercises Include In This Course
            </div>
            <div className="mt-6 w-full">
              <ExerciseListCard />
            </div>
          </>
        )}
      </main>
    </>
  );
}