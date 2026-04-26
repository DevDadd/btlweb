import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Exercises from './pages/Exercises.jsx';
import DetailExercise from './pages/DetailExercise.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:exerciseId" element={<DetailExercise />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
