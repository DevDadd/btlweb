import { useEffect, useState } from 'react';

const DEFAULT_API_URL = 'https://django2-yak8.onrender.com/api/exercises';
export default function useExercises(apiUrl = DEFAULT_API_URL) {
  const [exercises, setExercises] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        if (!json.success) throw new Error('API returned success=false');
        if (cancelled) return;
        setExercises(json.data ?? []);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message);
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return { exercises, status, errorMessage };
}
