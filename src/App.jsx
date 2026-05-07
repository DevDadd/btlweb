import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Exercises from './pages/Exercises.jsx';
import DetailExercise from './pages/DetailExercise.jsx';
import DetailCourses from './pages/DetailCourses.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Courses from './pages/Courses.jsx';
import UploadVideo from './pages/UploadVideo.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:exerciseId" element={<DetailExercise />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<DetailCourses />} />
      <Route path="/upload-video" element={<UploadVideo />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
