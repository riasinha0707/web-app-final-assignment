import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background:
        'radial-gradient(circle at top left, rgba(30,64,175,0.4), transparent 55%), ' +
        'radial-gradient(circle at bottom right, rgba(15,23,42,0.95), #020617)',
    }}>
      <Navbar />
      <main style={{
        flex: 1,
        padding: '24px',
        overflow: 'auto',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
