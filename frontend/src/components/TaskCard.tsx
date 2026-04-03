'use client';
import styles from './TaskCard.module.css';
import { Calendar, Edit2, Trash2, Circle } from 'lucide-react';

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  PENDING:     { label: 'Pending',     cls: styles.sPending },
  IN_PROGRESS: { label: 'In Progress', cls: styles.sProgress },
  COMPLETED:   { label: 'Completed',   cls: styles.sCompleted },
};

const PRIORITY_MAP: Record<string, { cls: string; barCls: string }> = {
  LOW:    { cls: styles.pLow,    barCls: styles.barLow },
  MEDIUM: { cls: styles.pMedium, barCls: styles.barMedium },
  HIGH:   { cls: styles.pHigh,   barCls: styles.barHigh },
};

export default function TaskCard({ task, index, onToggle, onEdit, onDelete }: any) {
  const status   = STATUS_MAP[task.status]   ?? STATUS_MAP['PENDING'];
  const priority = PRIORITY_MAP[task.priority] ?? PRIORITY_MAP['MEDIUM'];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';
  const isCompleted = task.status === 'COMPLETED';

  const dueDateStr = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <div
      className={`${styles.card} ${isCompleted ? styles.cardCompleted : ''}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Priority top bar */}
      <div className={`${styles.priorityBar} ${priority.barCls}`} />

      {/* Meta Row */}
      <div className={styles.metaRow}>
        <button
          className={`${styles.statusBadge} ${status.cls}`}
          onClick={onToggle}
          title="Click to toggle status"
        >
          <Circle size={6} fill="currentColor" />
          {status.label}
        </button>

        <span className={`${styles.priorityChip} ${priority.cls}`}>
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <h3 className={`${styles.title} ${isCompleted ? styles.titleDone : ''}`}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <div className={`${styles.dueDateTag} ${isOverdue ? styles.overdue : ''}`}>
          {dueDateStr && (
            <>
              <Calendar size={13} />
              {isOverdue ? `Overdue · ${dueDateStr}` : dueDateStr}
            </>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={onEdit} title="Edit task">
            <Edit2 size={14} />
          </button>
          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete} title="Delete task">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
