import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar.jsx";
import Background from "../../components/Background.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import CategoryFilter from "../../components/CategoryFilter.jsx";
import CoursesGrid from "../../components/CoursesGrid.jsx";
import getCourses from "../../../models/courses_service.js";
import { addCourseHistory } from "../../../models/view_history.js";
import "../../../styles/exerciselib.css";

const CATEGORIES = [
    "All",
    "Strength",
    "Legs",
    "Flexibility",
    "Yoga",
    "Pilates",
    "Other",
];

export default function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        document.title = "Courses";
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadCourses() {
            try {
                const json = await getCourses();
                const items = Array.isArray(json?.data) ? json.data : json ?? [];
                if (cancelled) return;
                setCourses(items);
                setStatus("ready");
            } catch (error) {
                if (cancelled) return;
                setErrorMessage(error.message || "Failed to fetch courses");
                setStatus("error");
            }
        }

        loadCourses();
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return courses.filter((item) => {
            const category =
                item.muscle_group || item.category || item.level || item.type || "";
            const name = item.name || item.title || "";
            const matchCategory =
                activeCategory === "All" ||
                category.toLowerCase() === activeCategory.toLowerCase();
            const matchSearch = !term || name.toLowerCase().includes(term);
            return matchCategory && matchSearch;
        });
    }, [courses, activeCategory, searchTerm]);

    const handleCourseSelect = (course) => {
        const courseId = course?.id ?? course?._id;
        if (!courseId) return;
        addCourseHistory(course);
        navigate(`/courses/${courseId}`, { state: { course } });
    };

    return (
        <div className="page-fade">
            <Background gradientOnly />
            <AppBar />
            <main
                style={{
                    maxWidth: 1400,
                    margin: "120px auto 40px",
                    padding: "0 20px 48px",
                }}
            >
                <div className="flex flex-col items-center">
                    <div className="Sizedbox30" aria-hidden="true" />
                    <div className="top-text top-text-mixed">
                        Courses <span className="logo-highlight">Library</span>
                    </div>
                    <div className="Sizedbox" aria-hidden="true" />
                    <div className="subtitle">Find the right course for you.</div>
                    <div className="Sizedbox" aria-hidden="true" />
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search courses by name..."
                    />
                    <div className="Sizedbox" aria-hidden="true" />
                    <CategoryFilter
                        categories={CATEGORIES}
                        active={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>
                <CoursesGrid
                    status={status}
                    courses={filtered}
                    errorMessage={errorMessage}
                    onCourseSelect={handleCourseSelect}
                    emptyText="No courses found."
                    loadingText="Loading courses..."
                />
            </main>
        </div>
    );
}
