import { useState, useEffect } from 'react';

const initialState = {
  client_name: '',
  project_name: '',
  booking_date: '',
  time_slot: '',
  notes: '',
};

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (project) {
      setFormData({
        client_name: project.client_name || '',
        project_name: project.project_name || '',
        booking_date: project.booking_date || '',
        time_slot: project.time_slot || '',
        notes: project.notes || '',
      });
    } else {
      setFormData(initialState);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[ProjectForm] Form submitted', formData);
    onSubmit(formData);
    if (!project) setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="client_name" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Client Name
        </label>
        <input
          id="client_name"
          name="client_name"
          type="text"
          value={formData.client_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="project_name" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Project Name
        </label>
        <input
          id="project_name"
          name="project_name"
          type="text"
          value={formData.project_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="booking_date" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Booking Date
        </label>
        <input
          id="booking_date"
          name="booking_date"
          type="date"
          value={formData.booking_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="time_slot" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Time Slot
        </label>
        <input
          id="time_slot"
          name="time_slot"
          type="text"
          value={formData.time_slot}
          onChange={handleChange}
          required
          placeholder="e.g. 9:00 AM - 12:00 PM"
        />
      </div>
      <div>
        <label htmlFor="notes" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--dark-text)',
        }}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          style={{ resize: 'vertical' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="submit" className="btn-primary">
          {project ? 'Update Project' : 'Add Project'}
        </button>
        {project && onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
