import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'radial-gradient(circle at top, rgba(37,99,235,0.35), transparent 60%), ' +
        'linear-gradient(180deg, var(--dark-bg) 0%, #020617 100%)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(15, 23, 42, 0.96)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.98)',
        padding: '40px',
        border: '1px solid rgba(148, 163, 184, 0.5)',
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
