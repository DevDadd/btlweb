import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Exercises from './pages/library/Exercises.jsx';
import DetailExercise from './pages/detail/DetailExercise.jsx';
import DetailCourses from './pages/detail/DetailCourses.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Courses from './pages/library/Courses.jsx';
import UploadVideo from './pages/upload/UploadVideo.jsx';

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
