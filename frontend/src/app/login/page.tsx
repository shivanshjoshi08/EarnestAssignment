'use client';
import { useState } from 'react';
import styles from '@/styles/auth.module.css';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/useToast';
import { CheckSquare, AlertCircle, LogIn } from 'lucide-react';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      showToast('Welcome back! 👋', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardInner}>

          <div className={styles.logo}>
            <div className={styles.logoMark}>
              <CheckSquare size={26} color="#fff" />
            </div>
            <span className={styles.appTitle}>TaskMaster</span>
          </div>

          <div className={styles.pageTitle}>Welcome back</div>
          <p className={styles.pageSub}>Sign in to your workspace</p>

          <div className={styles.divider} />

          {error && (
            <div className={styles.errorBanner}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : <LogIn size={17} />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className={styles.footerText}>
            Don't have an account?{' '}
            <Link href="/register" className={styles.link}>Create one →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
