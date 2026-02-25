export default function ProjectCard({ project, onEdit, onDelete }) {
  const notesPreview = project.notes
    ? project.notes.length > 80
      ? project.notes.slice(0, 80) + '...'
      : project.notes
    : '—';

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        borderLeft: '2px solid rgba(59, 130, 246, 0.7)',
      }}
    >
      <h3 style={{
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--dark-text)',
      }}>
        {project.client_name}
      </h3>
      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--dark-text)' }}>
        <strong>Project:</strong> {project.project_name}
      </p>
      <p style={{
        margin: 0,
        fontSize: '0.8rem',
        color: 'var(--dark-text)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.75rem',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,64,175,0.85))',
        boxShadow: '0 0 0 1px rgba(148,163,184,0.45)',
      }}>
        <span><strong>Date:</strong> {formatDate(project.booking_date)}</span>
        <span style={{ opacity: 0.7 }}>•</span>
        <span><strong>Time:</strong> {project.time_slot}</span>
      </p>
      <p style={{
        margin: 0,
        fontSize: '0.875rem',
        color: '#64748B',
        lineHeight: 1.5,
        flex: 1,
      }}>
        <strong>Notes:</strong> {notesPreview}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          className="btn-secondary"
          onClick={() => onEdit(project)}
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            backgroundColor: 'transparent',
            color: '#DC2626',
            border: '1px solid #DC2626',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#DC2626';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#DC2626';
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
