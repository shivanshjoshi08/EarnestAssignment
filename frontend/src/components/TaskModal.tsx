'use client';
import { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';
import { api } from '@/lib/api';
import { X, CheckSquare, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

const STATUS_OPTIONS = [
  { value: 'PENDING',     label: 'Pending',     activeCls: styles.pillAmber },
  { value: 'IN_PROGRESS', label: 'In Progress', activeCls: styles.pillActive },
  { value: 'COMPLETED',   label: 'Completed',   activeCls: styles.pillGreen },
];

const PRIORITY_OPTIONS = [
  { value: 'LOW',    label: 'Low',    activeCls: styles.pillTeal },
  { value: 'MEDIUM', label: 'Medium', activeCls: styles.pillAmber },
  { value: 'HIGH',   label: 'High',   activeCls: styles.pillRose },
];

export default function TaskModal({ task, onClose, onSuccess }: any) {
  const isEdit = !!task;
  const { showToast } = useToast();

  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [status,      setStatus]      = useState('PENDING');
  const [priority,    setPriority]    = useState('MEDIUM');
  const [dueDate,     setDueDate]     = useState('');
  const [loading,     setLoading]     = useState(false);

  useEffect(() => {
    if (isEdit) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      if (task.dueDate) setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
    }
  }, [task, isEdit]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { showToast('Title is required', 'error'); return; }
    setLoading(true);

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      status,
      priority,
      ...(dueDate && { dueDate: new Date(dueDate).toISOString() }),
      ...(!dueDate && isEdit && { dueDate: null }),
    };

    try {
      if (isEdit) {
        await api.patch(`/tasks/${task.id}`, payload);
        showToast('Task updated successfully', 'success');
      } else {
        await api.post('/tasks', payload);
        showToast('Task created!', 'success');
      }
      onSuccess();
    } catch {
      showToast('Failed to save task', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true">

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              {isEdit ? <Edit3 size={18} /> : <CheckSquare size={18} />}
            </div>
            <div>
              <div className={styles.headerTitle}>{isEdit ? 'Edit Task' : 'New Task'}</div>
              <div className={styles.headerSub}>
                {isEdit ? 'Update the details below' : 'Fill in the details to create a task'}
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.body}>

            {/* Title */}
            <div className={styles.field}>
              <label className={styles.label}>
                Title <span className={styles.required}>*</span>
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Design the onboarding flow"
                autoFocus
              />
            </div>

            {/* Description */}
            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea
                id="task-description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add more context or steps…"
                rows={3}
                style={{ resize: 'vertical', minHeight: '80px' }}
              />
            </div>

            {/* Status Pill Selector */}
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <div className={styles.optionGroup}>
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.optionPill} ${status === opt.value ? opt.activeCls : ''}`}
                    onClick={() => setStatus(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Pill Selector */}
            <div className={styles.field}>
              <label className={styles.label}>Priority</label>
              <div className={styles.optionGroup}>
                {PRIORITY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.optionPill} ${priority === opt.value ? opt.activeCls : ''}`}
                    onClick={() => setPriority(opt.value)}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className={styles.field}>
              <label className={styles.label}>Due Date <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>

          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
