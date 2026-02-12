import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, var(--dark-bg) 0%, #020617 100%)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        padding: '40px',
      }}>
        <h1 style={{
          margin: '0 0 32px 0',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--dark-text)',
          textAlign: 'center',
        }}>
          Library Tapes
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
