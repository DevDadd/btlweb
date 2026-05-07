import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import Background from '../components/Background.jsx';

export default function Home() {
  useEffect(() => {
    document.title = 'GYMPT';
  }, []);

  return (
    <div className="page-fade">
      <Background />
      <AppBar />
      <main />
      <div className="top-text-column">
        <div className="top-text">TRAIN SMARTER MOVE BETTER</div>
        <div className="Sizedbox" aria-hidden="true" />
        <div className="subtitle">
          Browse exercises, upload your videos, and get AI-powered form feedback
          to prevent injuries and maximize gains.
        </div>
        <div className="Sizedbox30" aria-hidden="true" />
        <div className="row">
          <Link to="/exercises">
            <button className="Homebutton">Browse Exercises</button>
          </Link>
          <div className="width-sizedbox30" />
          <Link to="/upload-video">
            <button className="Homebutton2">Check My Form</button>
          </Link>
        </div>
        <div className="Sizedbox30" aria-hidden="true" />

      </div>
    </div>
  );
}
