import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';
import '../../styles/bodystats.css';

const BODY_STATS_FIELDS = [
  { key: 'height', label: 'Height (cm)', type: 'number', placeholder: '170' },
  { key: 'weight', label: 'Weight (kg)', type: 'number', placeholder: '70' },
  { key: 'bloodType', label: 'Blood Type', type: 'select', options: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] },
  { key: 'age', label: 'Age', type: 'number', placeholder: '25' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { key: 'bmi', label: 'BMI (calculated)', type: 'text', readOnly: true },
  { key: 'fitnessLevel', label: 'Fitness Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
  { key: 'medicalConditions', label: 'Medical Conditions', type: 'textarea', placeholder: 'Any relevant medical conditions...' },
];

export default function BodyStats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempStats, setTempStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const savedStats = localStorage.getItem('body_stats');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setStats(parsed);
        setTempStats(parsed);
      } catch {
        setStats({});
        setTempStats({});
      }
    }
    document.title = 'Body Stats';
  }, []);

  function calculateBMI(height, weight) {
    if (!height || !weight) return '';
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    return bmi;
  }

  function handleEditChange(key, value) {
    setTempStats((prev) => {
      const updated = { ...prev, [key]: value };
      if ((key === 'height' || key === 'weight') && updated.height && updated.weight) {
        updated.bmi = calculateBMI(updated.height, updated.weight);
      }
      return updated;
    });
  }

  function handleSave() {
    localStorage.setItem('body_stats', JSON.stringify(tempStats));
    setStats(tempStats);
    setIsEditing(false);
  }

  function handleCancel() {
    setTempStats(stats);
    setIsEditing(false);
  }

  return (
    <div className="bodystats-page">
      <Background gradientOnly />
      <AppBar />
      <main className="bodystats-content">
        <div className="bodystats-container">
          <div className="bodystats-header">
            <h1 className="bodystats-title">Body Statistics</h1>
            <p className="bodystats-subtitle">Manage your health and fitness information</p>
          </div>

          <div className="bodystats-card">
            <div className="bodystats-controls">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Stats
                </button>
              ) : (
                <div className="button-group">
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="bodystats-form">
              {BODY_STATS_FIELDS.map((field) => (
                <div key={field.key} className="form-group">
                  <label htmlFor={field.key} className="form-label">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.key}
                      className="form-input"
                      placeholder={field.placeholder}
                      value={tempStats[field.key] || ''}
                      onChange={(e) => handleEditChange(field.key, e.target.value)}
                      disabled={!isEditing || field.readOnly}
                      rows="4"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.key}
                      className="form-input"
                      value={tempStats[field.key] || ''}
                      onChange={(e) => handleEditChange(field.key, e.target.value)}
                      disabled={!isEditing || field.readOnly}
                    >
                      <option value="">Select {field.label}...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      className="form-input"
                      placeholder={field.placeholder}
                      value={tempStats[field.key] || ''}
                      onChange={(e) => handleEditChange(field.key, e.target.value)}
                      disabled={!isEditing || field.readOnly}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className="back-btn" onClick={() => navigate('/profile')}>
            Back to Profile
          </button>
        </div>
      </main>
    </div>
  );
}
