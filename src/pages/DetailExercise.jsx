import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';
import ExerciseDetailCardInfo from '../components/ExerciseDetailCardInfo.jsx';
import useExercises from '../hooks/useExercises.js';

export default function DetailExercise() {
    const location = useLocation();
    const { exerciseId } = useParams();
    const exerciseFromState = location.state?.exercise;
    const { exercises, status, errorMessage } = useExercises();

    const exercise = useMemo(() => {
        if (exerciseFromState) return exerciseFromState;
        return exercises.find((item) => String(item.id) === String(exerciseId));
    }, [exerciseFromState, exercises, exerciseId]);

    useEffect(() => {
        document.title = exercise?.name
            ? `${exercise.name} | GYMPT`
            : 'Exercise Detail | GYMPT';
    }, [exercise]);

    return (
        <div className="page-fade">
            <Background gradientOnly />
            <AppBar />
            <main style={{ maxWidth: 1400, margin: '120px auto 40px', padding: '0 20px' }}>
                {!exerciseFromState && status === 'loading' && (
                    <p className="mt-4 text-white">Loading exercise detail...</p>
                )}
                {!exerciseFromState && status === 'error' && (
                    <p className="mt-4 text-red-300">Failed to load: {errorMessage}</p>
                )}
                <ExerciseDetailCardInfo
                    exerciseName={exercise?.name}
                    exerciseDescription={exercise?.description}
                    exerciseMuscleGroup={exercise?.muscle_group}
                    exerciseEquipment={exercise?.equipment?.name}
                />
            </main>
        </div>
    );
}