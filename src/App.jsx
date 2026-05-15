import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/pages/Home.jsx';
import Exercises from './views/pages/Exercises.jsx';
import DetailExercise from './views/pages/DetailExercise.jsx';
import DetailCourses from './views/pages/DetailCourses.jsx';
import Profile from './views/pages/Profile.jsx';
import BodyStats from './views/pages/BodyStats.jsx';
import Login from './views/pages/Login.jsx';
import Signup from './views/pages/Signup.jsx';
import Courses from './views/pages/Courses.jsx';
import UploadVideo from './views/pages/upload/UploadVideo.jsx';
import BMICalculator from './views/pages/BMICalculator.jsx';

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
