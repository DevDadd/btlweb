import { NavLink, Link } from 'react-router-dom';

export default function AppBar() {
  return (
    <header className="app-bar">
      <Link to="/" className="logo">
        GYM<span className="logo-highlight">PT</span>
      </Link>
      <nav className="menu">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}
