import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';
import { getCourseHistory, getExerciseHistory } from '../../models/view_history.js';

const SUMMARY_CARDS = [
  { icon: 'fas fa-dumbbell', value: '127', label: 'Completed' },
  { icon: 'fas fa-clock', value: '10 Min', label: 'Total Time' },
  { icon: 'fas fa-stopwatch', value: '20 Min', label: 'Avg Duration' },
  { icon: 'fas fa-fire', value: '1000', label: 'Calories Burned' },
];

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [courseHistory, setCourseHistory] = useState([]);
  const [exerciseHistory, setExerciseHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    function readUser() {
      try {
        setUser(JSON.parse(localStorage.getItem('auth_user') || '{}'));
      } catch {
        setUser({});
      }
      setCourseHistory(getCourseHistory());
      setExerciseHistory(getExerciseHistory());
    }

    readUser();
    window.addEventListener('focus', readUser);
    return () => {
      window.removeEventListener('focus', readUser);
    };
  }, []);

  const profileName = user.profile_name || user.full_name || user.username || 'Guest User';
  const username = user.username || 'guest';
  const email = user.email || 'No email provided';

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  return (
    <div className="min-h-screen relative text-white">
      <Background gradientOnly />
      <AppBar />
      
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* Banner & Profile Info */}
        <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Decorative glowing orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-red-600 to-orange-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <img src="/assets/avatar.jpg" alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-gray-900" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mt-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-sm">
                  {profileName}
                </h1>
                <button
                  onClick={() => navigate('/body-stats')}
                  className="px-6 py-3 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-heartbeat text-red-400"></i> Body Stats
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-4 text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-red-400"></i>
                  <span>@{username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-envelope text-red-400"></i>
                  <span>{email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {SUMMARY_CARDS.map((card, idx) => (
            <div key={idx} className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md hover:-translate-y-2 hover:bg-white/[0.08] hover:border-red-500/50 transition-all duration-300 shadow-lg flex flex-col justify-between">
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center text-lg md:text-xl mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <i className={card.icon}></i>
              </div>
              <div className="text-lg md:text-xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider">{card.label}</div>
            </div>
          ))}
        </div>

        {/* History Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Courses */}
          <div className="bg-black/40 border border-white/5 rounded-3xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <i className="fas fa-book-open text-orange-400 text-sm"></i>
              </div>
              Recent Courses
            </h2>
            <div className="space-y-3">
              {courseHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No courses viewed yet.</p>
              ) : (
                courseHistory.slice(0, 5).map(course => (
                  <button 
                    key={course.id} 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.06] p-4 rounded-2xl border border-white/5 transition-all text-left group hover:border-white/10"
                  >
                    <div>
                      <div className="font-bold text-gray-200 group-hover:text-white transition-colors">{course.name}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{course.category}</div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-600 group-hover:text-red-400 transition-colors transform group-hover:translate-x-1"></i>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-black/40 border border-white/5 rounded-3xl p-6 backdrop-blur-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <i className="fas fa-dumbbell text-red-400 text-sm"></i>
              </div>
              Recent Exercises
            </h2>
            <div className="space-y-3">
              {exerciseHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No exercises viewed yet.</p>
              ) : (
                exerciseHistory.slice(0, 5).map(exercise => (
                  <button 
                    key={exercise.id} 
                    onClick={() => navigate(`/exercises/${exercise.id}`)}
                    className="w-full flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.06] p-4 rounded-2xl border border-white/5 transition-all text-left group hover:border-white/10"
                  >
                    <div>
                      <div className="font-bold text-gray-200 group-hover:text-white transition-colors">{exercise.name}</div>
                      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{exercise.category}</div>
                    </div>
                    <i className="fas fa-chevron-right text-gray-600 group-hover:text-red-400 transition-colors transform group-hover:translate-x-1"></i>
                  </button>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

