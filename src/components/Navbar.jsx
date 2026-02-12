import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--white)' : 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius)',
    fontWeight: 500,
    transition: 'all 0.2s',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
  });

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      minHeight: '64px',
      gap: '0.5rem',
      backgroundColor: 'var(--dark-bg)',
      boxShadow: 'var(--shadow)',
    }}>
      <span style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
        fontWeight: 600,
        color: 'var(--white)',
      }}>
        Creative Studio
      </span>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}>
        <NavLink to="/contact" style={navLinkStyle}>
          Contact
        </NavLink>
        <NavLink to="/projects" style={navLinkStyle}>
          Projects
        </NavLink>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = 'var(--white)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'rgba(255, 255, 255, 0.8)';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
