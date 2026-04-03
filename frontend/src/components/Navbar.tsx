'use client';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/useToast';
import { LogOut, CheckSquare } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
      showToast('Signed out successfully', 'success');
      router.push('/login');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <CheckSquare size={18} color="#fff" />
          </div>
          <span className={styles.brand}>TaskMaster</span>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.userPill}>
            <span className={styles.userDot} />
            Active
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
