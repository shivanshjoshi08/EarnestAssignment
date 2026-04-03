'use client';
import { useState } from 'react';
import styles from '@/styles/auth.module.css';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/useToast';
import { CheckSquare, AlertCircle, UserPlus } from 'lucide-react';

export default function Register() {
  const [name,     setName]     = useState('');
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
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      showToast('Account created! Welcome 🎉', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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

          <div className={styles.pageTitle}>Create your account</div>
          <p className={styles.pageSub}>Start managing your tasks today</p>

          <div className={styles.divider} />

          {error && (
            <div className={styles.errorBanner}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />
            </div>

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
              <label className={styles.label} htmlFor="password">Password <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(min. 6 chars)</span></label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> : <UserPlus size={17} />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className={styles.footerText}>
            Already have an account?{' '}
            <Link href="/login" className={styles.link}>Sign in →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
