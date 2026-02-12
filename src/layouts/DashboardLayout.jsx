import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--light-gray)',
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
