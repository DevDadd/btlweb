import { useEffect } from 'react';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';
import '../styles/profile.css';

const SUMMARY_CARDS = [
  { icon: 'fas fa-dumbbell', value: '127', label: 'Completed' },
  { icon: 'fas fa-clock', value: '10 Minutes', label: 'Total Time' },
  { icon: 'fas fa-stopwatch', value: '20 Minutes', label: 'Average Duration' },
  { icon: 'fas fa-fire', value: '1000', label: 'Total Calories Burned' },
];

export default function Profile() {
  useEffect(() => {
    document.title = 'Profile';
  }, []);

  return (
    <>
      <Background gradientOnly />
      <AppBar />
      <div className="profile-row-wrapper">
        <div className="profile-stack">
          <div className="profile-container">
            <div className="profile-avatar">
              <img src="/assets/avatar.jpg" alt="Profile Avatar" />
            </div>
          </div>
          <button className="camera-btn" type="button" aria-label="Change avatar">
            📷
          </button>
        </div>
        <div className="column">
          <div className="profile-info">
            <div className="profile-name">John Doe</div>
            <div className="profile-row">
              <i className="fas fa-envelope" />
              <div className="email-info">user@example.com</div>
              <div className="sizedbox10" />
              <i className="fas fa-phone" />
              <div className="phone-info">+1234567890</div>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-row">
        {SUMMARY_CARDS.map((card) => (
          <div className="summary-card" key={card.label}>
            <div className="column">
              <div className="summary-card-icon">
                <i className={card.icon} />
              </div>
              <div className="summary-card-value">{card.value}</div>
              <div className="summary-card-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
