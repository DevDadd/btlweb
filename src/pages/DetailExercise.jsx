import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';
import ExerciseDetailCardInfo from '../components/ExerciseDetailCardInfo.jsx';
import getExercisesDetail from '../hooks/exercises_detail.js';

export default function DetailExercise() {
    const location = useLocation();
    const { exerciseId } = useParams();
    const exerciseFromState = location.state?.exercise;
    const [exercise, setExercise] = useState(exerciseFromState || null);
    const [status, setStatus] = useState('loading');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        let cancelled = false;

        async function loadExerciseDetail() {
            if (!exerciseId) return;
            try {
                const detail = await getExercisesDetail(exerciseId);
                if (cancelled) return;
                setExercise((prev) => ({ ...(prev || {}), ...(detail || {}) }));
                setStatus('ready');
            } catch (error) {
                if (cancelled) return;
                // Keep state data visible if we already have something from navigation state.
                if (exerciseFromState) {
                    setStatus('ready');
                    return;
                }
                setErrorMessage(error.message || 'Lấy chi tiết bài tập thất bại');
                setStatus('error');
            }
        }

        loadExerciseDetail();
        return () => {
            cancelled = true;
        };
    }, [exerciseFromState, exerciseId]);

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
                {status === 'loading' ? (
                    <div className="min-h-[220px] rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-white shadow-2xl backdrop-blur-2xl flex items-center justify-center">
                        Loading exercise detail...
                    </div>
                ) : status === 'error' ? (
                    <div className="min-h-[220px] rounded-2xl border border-red-300/30 bg-red-500/10 p-6 text-red-200 shadow-2xl backdrop-blur-2xl flex items-center justify-center">
                        Failed to load: {errorMessage}
                    </div>
                ) : (
                    <ExerciseDetailCardInfo
                        exerciseName={exercise?.name}
                        exerciseDescription={exercise?.description || 'No description available.'}
                        exerciseMuscleGroup={exercise?.muscle_group}
                        exerciseEquipment={exercise?.equipment?.name}
                        exerciseCaloriesPerMinute={exercise?.calories_per_minute}
                    />
                )}
            </main>
        </div>
    );
}