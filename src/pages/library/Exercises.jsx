import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../../components/AppBar.jsx';
import Background from '../../components/Background.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import CategoryFilter from '../../components/CategoryFilter.jsx';
import ExercisesGrid from '../../components/ExercisesGrid.jsx';
import useExercises from '../../hooks/useExercises.js';
import { addExerciseHistory } from '../../hooks/view_history.js';
import '../../styles/exerciselib.css';

const CATEGORIES = [
  'All',
  'Arms',
  'Legs',
  'Back',
  'Core',
  'Cardio',
  'Flexibility',
  'Balance',
];

export default function Exercises() {
  const navigate = useNavigate();
  const { exercises, status, errorMessage } = useExercises();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Exercises Library';
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return exercises.filter((ex) => {
      const matchCategory =
        activeCategory === 'All' ||
        ex.muscle_group?.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = !term || ex.name?.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });
  }, [exercises, activeCategory, searchTerm]);

  return (
    <div className="page-fade">
      <Background gradientOnly />
      <AppBar />
      <main
        style={{
          maxWidth: 1400,
          margin: '120px auto 40px',
          padding: '0 20px 48px',
        }}
      >
        <div className="flex flex-col items-center">
          <div className="Sizedbox30" aria-hidden="true" />
          <div className="top-text top-text-mixed">
            Exercises <span className="logo-highlight">Library</span>
          </div>
          <div className="Sizedbox" aria-hidden="true" />
          <div className="subtitle">
            Find the right exercise for every muscle group
          </div>
          <div className="Sizedbox" aria-hidden="true" />
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search exercises by name..."
          />
          <div className="Sizedbox" aria-hidden="true" />
          <CategoryFilter
            categories={CATEGORIES}
            active={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
        <ExercisesGrid
          status={status}
          exercises={filtered}
          errorMessage={errorMessage}
          onExerciseSelect={(exercise) =>
            (() => {
              addExerciseHistory(exercise);
              navigate(`/exercises/${exercise.id}`, {
                state: { exercise },
              });
            })()
          }
        />
      </main>
    </div>
  );
}
