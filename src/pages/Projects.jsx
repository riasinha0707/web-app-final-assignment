import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('[Projects] No user, skipping fetch');
      return;
    }

    console.log('[Projects] Fetching bookings for user', user.id);
    const { data, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('[Projects] Fetch error:', fetchError);
      setError(fetchError.message);
      return;
    }
    console.log('[Projects] Fetched', data?.length ?? 0, 'bookings');
    setProjects(data || []);
  };

  useEffect(() => {
    fetchProjects().finally(() => setLoading(false));
  }, []);

  const handleAddProject = async (formData) => {
    setError('');
    setSubmitSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const msg = 'Not logged in. Please sign in again.';
      console.error('[Projects]', msg);
      setError(msg);
      return;
    }

    const payload = {
      user_id: user.id,
      client_name: formData.client_name,
      project_name: formData.project_name,
      booking_date: formData.booking_date,
      time_slot: formData.time_slot,
      notes: formData.notes || '',
    };
    console.log('[Projects] Inserting into bookings:', payload);

    const { data: insertedData, error: insertError } = await supabase
      .from('bookings')
      .insert(payload)
      .select();

    if (insertError) {
      console.error('[Projects] Insert error:', insertError);
      setError(insertError.message);
      return;
    }
    console.log('[Projects] Insert success:', insertedData);
    setSubmitSuccess(true);
    fetchProjects();
  };

  const handleUpdateProject = async (formData) => {
    if (!editingProject) return;
    setError('');
    setSubmitSuccess(false);

    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        client_name: formData.client_name,
        project_name: formData.project_name,
        booking_date: formData.booking_date,
        time_slot: formData.time_slot,
        notes: formData.notes || '',
      })
      .eq('id', editingProject.id);

    if (updateError) {
      console.error('[Projects] Update error:', updateError);
      setError(updateError.message);
      return;
    }
    setEditingProject(null);
    setSubmitSuccess(true);
    fetchProjects();
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Delete project "${project.project_name}"?`)) return;

    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', project.id);

    if (deleteError) {
      console.error('[Projects] Delete error:', deleteError);
      setError(deleteError.message);
      return;
    }
    fetchProjects();
    if (editingProject?.id === project.id) setEditingProject(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editingProject) {
      await handleUpdateProject(formData);
    } else {
      await handleAddProject(formData);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        margin: '0 0 24px 0',
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'var(--dark-text)',
      }}>
        Project Details
      </h1>

      {error && (
        <div style={{
          marginBottom: '24px',
          padding: '12px 16px',
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
          borderRadius: 'var(--radius)',
          fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}
      {submitSuccess && (
        <div style={{
          marginBottom: '24px',
          padding: '12px 16px',
          backgroundColor: '#D1FAE5',
          color: '#065F46',
          borderRadius: 'var(--radius)',
          fontSize: '0.9rem',
        }}>
          Booking saved successfully.
        </div>
      )}
      <section style={{ marginBottom: '32px' }}>
        <div className="card">
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--dark-text)',
          }}>
            Add New Project
          </h2>
          <ProjectForm
            project={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={() => setEditingProject(null)}
          />
        </div>
      </section>

      <section>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: 'var(--dark-text)',
        }}>
          Project List
        </h2>
        {loading ? (
          <p style={{ color: 'var(--dark-text)' }}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: '#64748B' }}>
            No projects yet. Add your first project above.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
