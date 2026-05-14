import { NavLink, Link } from 'react-router-dom';

export default function AppBar() {
  return (
    <header className="app-bar">
      <Link to="/home" className="logo">
        GYM<span className="logo-highlight">PT</span>
      </Link>
      <nav className="menu">
        <NavLink to="/home">
          Home
        </NavLink>
        <NavLink to="/exercises">Exercises</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </nav>
    </header>
  );
}
