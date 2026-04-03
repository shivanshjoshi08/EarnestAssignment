'use client';
import { useEffect, useState, useCallback } from 'react';
import styles from './page.module.css';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { Search, Plus, ClipboardList } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalCount: number;
}

const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, totalPages: 1, totalCount: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [stats, setStats] = useState({ pending: 0, inProgress: 0, completed: 0, total: 0 });

  const router = useRouter();
  const { showToast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: page.toString(), limit: '12' });
      if (search)       params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const res = await api.get(`/tasks?${params.toString()}`);
      setTasks(res.data.tasks);
      setPagination(res.data.pagination);
    } catch (error: any) {
      if (error.status === 401) router.push('/login');
      else showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const [all, pending, inProgress, completed] = await Promise.all([
        api.get('/tasks?limit=1'),
        api.get('/tasks?limit=1&status=PENDING'),
        api.get('/tasks?limit=1&status=IN_PROGRESS'),
        api.get('/tasks?limit=1&status=COMPLETED'),
      ]);
      setStats({
        total: all.data.pagination.totalCount,
        pending: pending.data.pagination.totalCount,
        inProgress: inProgress.data.pagination.totalCount,
        completed: completed.data.pagination.totalCount,
      });
    } catch (_) {}
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const refreshAll = () => { fetchTasks(); fetchStats(); };

  const handleToggle = async (id: string) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      showToast('Task status updated', 'success');
      refreshAll();
    } catch { showToast('Action failed', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task? This action cannot be undone.')) return;
    try {
      await api.delete(`/tasks/${id}`);
      showToast('Task deleted', 'success');
      refreshAll();
    } catch { showToast('Deletion failed', 'error'); }
  };

  const openEdit   = (task: Task) => { setEditingTask(task); setIsModalOpen(true); };
  const openCreate = ()           => { setEditingTask(null); setIsModalOpen(true); };

  const totalPages = pagination.totalPages;

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.main}>
        {/* ── Hero ──────────────────────────────────────── */}
        <div className={`${styles.hero} anim-fade-up`}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <h1>My Workspace</h1>
              <p>Manage your tasks and stay on top of your goals.</p>
            </div>
            <button className={styles.newTaskBtn} onClick={openCreate}>
              <Plus size={18} />
              New Task
            </button>
          </div>

          {/* Stats Strip */}
          <div className={styles.statsStrip}>
            {[
              { label: 'Total',       value: stats.total,      dotClass: styles.dotTotal },
              { label: 'Pending',     value: stats.pending,    dotClass: styles.dotPending },
              { label: 'In Progress', value: stats.inProgress, dotClass: styles.dotProgress },
              { label: 'Completed',   value: stats.completed,  dotClass: styles.dotCompleted },
            ].map(s => (
              <div key={s.label} className={styles.statChip}>
                <span className={`${styles.statDot} ${s.dotClass}`} />
                <strong style={{ color: 'var(--text-primary)' }}>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Controls ──────────────────────────────────── */}
        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search tasks…"
              className={styles.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── Filter Tabs ───────────────────────────────── */}
        <div className={styles.filterTabs}>
          {STATUS_TABS.map(tab => (
            <button
              key={tab.value}
              className={`${styles.filterTab} ${statusFilter === tab.value ? styles.filterTabActive : ''}`}
              onClick={() => { setStatusFilter(tab.value); setPage(1); }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Task Grid ─────────────────────────────────── */}
        {loading ? (
          <div className={styles.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`${styles.skeletonCard} skeleton`}
                style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <ClipboardList size={32} />
            </div>
            <h3>{search || statusFilter ? 'No matching tasks' : 'No tasks yet'}</h3>
            <p>
              {search || statusFilter
                ? 'Try adjusting your search or filters.'
                : 'Create your first task to get started!'}
            </p>
            {!search && !statusFilter && (
              <button className="btn btn-primary" onClick={openCreate} style={{ marginTop: '0.5rem' }}>
                <Plus size={16} /> Create Task
              </button>
            )}
          </div>
        ) : (
          <div className={styles.tasksGrid}>
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                index={i}
                onToggle={() => handleToggle(task.id)}
                onEdit={()   => openEdit(task)}
                onDelete={()  => handleDelete(task.id)}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────── */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled={page === 1}
              onClick={() => setPage(p => p - 1)}>‹</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
              .reduce<(number | '...')[]>((acc, n, idx, arr) => {
                if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push('...');
                acc.push(n);
                return acc;
              }, [])
              .map((n, i) =>
                n === '...'
                  ? <span key={`e${i}`} className={styles.pageInfo}>…</span>
                  : <button key={n} className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
                      onClick={() => setPage(n as number)}>{n}</button>
              )}

            <button className={styles.pageBtn} disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        )}
      </main>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => { setIsModalOpen(false); refreshAll(); }}
        />
      )}
    </div>
  );
}
