'use client';
import Link from 'next/link';
import { ArrowRight, CheckSquare } from 'lucide-react';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Animated Mesh Gradient Background */}
      <div className={styles.meshBg} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <CheckSquare className={styles.logoIcon} size={28} />
          TaskMaster
        </Link>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.loginBtn}>Sign In</Link>
          <Link href="/register" className={styles.registerBtn}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.tagline}>The Ultimate Task Manager</div>
        
        <h1 className={styles.title}>
          Organize your work,<br />
          <span className={styles.titleHighlight}>beautifully.</span>
        </h1>
        
        <p className={styles.subtitle}>
          A premium, high-performance task management experience built for modern teams.
          Track progress, set priorities, and get things done.
        </p>
        
        <div className={styles.ctaGroup}>
          <Link href="/register" className={styles.primaryCta}>
            Start for free <ArrowRight size={18} />
          </Link>
          <Link href="/login" className={styles.secondaryCta}>
            View Dashboard
          </Link>
        </div>

        {/* 3D Glassmorphism Mockup */}
        <div className={styles.mockupContainer}>
          <div className={styles.mockupWindow}>
            <div className={styles.mockupHeader}>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            
            <div className={styles.mockupBody}>
              {/* Mock Task 1 */}
              <div className={styles.mockTask}>
                <div className={styles.mockTaskLeft}>
                  <div className={styles.mockTaskTitle}>Design new landing page</div>
                  <div className={styles.mockTaskBadges}>
                    <span className={`${styles.mockBadge} ${styles.bBlue}`}>IN_PROGRESS</span>
                    <span className={`${styles.mockBadge} ${styles.bRose}`}>HIGH</span>
                  </div>
                </div>
              </div>

              {/* Mock Task 2 */}
              <div className={`${styles.mockTask} ${styles.mockTaskDimmed || ''}`}>
                <div className={styles.mockTaskLeft}>
                  <div className={styles.mockTaskTitle}>Review database migration</div>
                  <div className={styles.mockTaskBadges}>
                    <span className={`${styles.mockBadge} ${styles.bTeal}`}>COMPLETED</span>
                    <span className={`${styles.mockBadge} ${styles.bAmber}`}>MEDIUM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
