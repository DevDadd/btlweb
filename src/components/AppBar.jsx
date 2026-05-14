import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function AppBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('auth_token');
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  function handleLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setIsAuthenticated(false);
    navigate('/login');
  }

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
<<<<<<< HEAD
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Logout</NavLink>
=======
        {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="logout-btn"
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
>>>>>>> ff79464dfa2b6a5b4d651cb3301b18ddf5bd43fa
      </nav>
    </header>
  );
}
