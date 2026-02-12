import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{
        margin: '0 0 24px 0',
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--dark-text)',
      }}>
        Client Contact Details
      </h1>
      <div className="card" style={{ marginBottom: '24px', overflow: 'hidden' }}>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf_V6FIwNGPqcecC1bsEYBvFA8B2zqaZZrprp_ea55bD-UtPA/viewform?embedded=true"
          width="100%"
          height="1000"
          style={{ border: 'none' }}
          title="Contact Form"
        />
      </div>
      <button
        className="btn-primary"
        onClick={() => navigate('/projects')}
      >
        Continue to Project Details
      </button>
    </div>
  );
}
