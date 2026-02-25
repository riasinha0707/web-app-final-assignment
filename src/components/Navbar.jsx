import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--white)' : 'rgba(248, 250, 252, 0.78)',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius)',
    fontWeight: 500,
    transition: 'all 0.25s ease',
    backgroundColor: isActive ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.6)',
    boxShadow: isActive ? '0 0 0 1px rgba(148, 163, 184, 0.5)' : 'none',
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
      background: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.85))',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: '0 16px 45px rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(148, 163, 184, 0.45)',
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
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            color: 'rgba(248, 250, 252, 0.85)',
            border: '1px solid rgba(148, 163, 184, 0.6)',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.25s ease',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.9)',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(37, 99, 235, 0.25)';
            e.target.style.color = 'var(--white)';
            e.target.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
            e.target.style.color = 'rgba(248, 250, 252, 0.85)';
            e.target.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.9)';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
