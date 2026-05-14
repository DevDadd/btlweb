import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Exercises from './pages/Exercises.jsx';
import DetailExercise from './pages/DetailExercise.jsx';
import DetailCourses from './pages/DetailCourses.jsx';
import Profile from './pages/Profile.jsx';
import BodyStats from './pages/BodyStats.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Courses from './pages/Courses.jsx';
import UploadVideo from './pages/upload/UploadVideo.jsx';
import BMICalculator from './pages/BMICalculator.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:exerciseId" element={<DetailExercise />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<DetailCourses />} />
      <Route path="/upload-video" element={<UploadVideo />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/body-stats" element={<BodyStats />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bmi" element={<BMICalculator />} />
      <Route path="/calculator" element={<BMICalculator />} />
    </Routes>
  );
}
