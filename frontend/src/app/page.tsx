'use client';
import Link from 'next/link';
import {
  CheckSquare, ArrowRight, Shield, Zap, BarChart3,
  Bell, Filter, Smartphone, Check
} from 'lucide-react';
import styles from './landing.module.css';

const FEATURES = [
  {
    icon: <Shield size={22} />,
    iconCls: 'iconIndigo',
    title: 'Bank-grade Security',
    desc: 'JWT access tokens, HttpOnly refresh cookies, and bcrypt hashing keep your data 100% secure.',
  },
  {
    icon: <Zap size={22} />,
    iconCls: 'iconTeal',
    title: 'Lightning Fast',
    desc: 'Optimistic updates, skeleton loaders, and debounced search make every interaction feel instant.',
  },
  {
    icon: <BarChart3 size={22} />,
    iconCls: 'iconRose',
    title: 'Powerful Filtering',
    desc: 'Filter by status, search by keyword, sort by priority or date — find any task in seconds.',
  },
  {
    icon: <Bell size={22} />,
    iconCls: 'iconAmber',
    title: 'Smart Notifications',
    desc: 'Real-time toast feedback for every action so you always know exactly what happened.',
  },
  {
    icon: <Filter size={22} />,
    iconCls: 'iconGreen',
    title: 'Priority Management',
    desc: 'Set Low, Medium, or High priority on every task with color-coded visual indicators.',
  },
  {
    icon: <Smartphone size={22} />,
    iconCls: 'iconPurple',
    title: 'Fully Responsive',
    desc: 'Works flawlessly on any device — desktop, tablet, or phone — with a polished UI.',
  },
];

const STEPS = [
  {
    step: '1',
    title: 'Create your account',
    desc: 'Sign up in seconds with your email. No credit card required. Your workspace is ready instantly.',
  },
  {
    step: '2',
    title: 'Add your tasks',
    desc: 'Create tasks with a title, description, priority level, and due date in one smooth modal.',
  },
  {
    step: '3',
    title: 'Stay on top',
    desc: 'Track progress, update statuses, filter your board, and ship your work faster than ever.',
  },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Ambient Orbs */}
      <div className={styles.orbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>
            <CheckSquare size={20} color="#fff" />
          </div>
          TaskMaster
        </div>
        <div className={styles.navLinks}>
          <Link href="#features" className={styles.navLinkText}>Features</Link>
          <Link href="#how-it-works" className={styles.navLinkText}>How it works</Link>
          <Link href="/login" className={styles.navLinkText}>Sign In</Link>
          <Link href="/register" className={styles.navCta}>Get Started →</Link>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Full-stack Task Management App
        </div>

        <h1 className={styles.heroHeading}>
          Manage tasks with<br />
          <span className={styles.heroGradient}>clarity & speed.</span>
        </h1>

        <p className={styles.heroSub}>
          A premium, production-ready task manager built for developers and teams who value
          clean design, fast performance, and real security.
        </p>

        <div className={styles.heroCtas}>
          <Link href="/register" className={styles.ctaPrimary}>
            Start for free <ArrowRight size={17} />
          </Link>
          <Link href="/login" className={styles.ctaSecondary}>
            Sign In
          </Link>
        </div>

        <p className={styles.heroNote}>No credit card required · Free forever</p>

        {/* ── APP MOCKUP ─────────────────────────────────── */}
        <div className={styles.mockupWrap}>
          <div className={styles.mockupGlow} />
          <div className={styles.mockupFrame}>
            {/* Chrome bar */}
            <div className={styles.mockupChrome}>
              <div className={styles.chromeBtn} />
              <div className={styles.chromeBtn} />
              <div className={styles.chromeBtn} />
              <div className={styles.chromeBar} />
            </div>

            {/* Dashboard Content */}
            <div className={styles.mockupContent}>
              {/* Sidebar */}
              <div className={styles.mockupSidebar}>
                {[
                  { label: 'Dashboard', active: true, color: '#818cf8' },
                  { label: 'All Tasks',  active: false, color: '#475569' },
                  { label: 'Pending',    active: false, color: '#f59e0b' },
                  { label: 'Completed',  active: false, color: '#10b981' },
                ].map(item => (
                  <div key={item.label}
                    className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ''}`}
                  >
                    <span className={styles.sidebarDot} style={{ background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className={styles.mockupMain}>
                <div className={styles.mockupTopBar}>
                  <div className={styles.mockupTitle}>My Workspace</div>
                  <div className={styles.mockupAddBtn}>+ New Task</div>
                </div>

                {/* Stats */}
                <div className={styles.mockupStats}>
                  {[
                    { label: 'Total', value: '24' },
                    { label: 'Pending', value: '8' },
                    { label: 'Done', value: '14' },
                  ].map(s => (
                    <div key={s.label} className={styles.mockupStat}>
                      <div className={styles.mockupStatLabel}>{s.label}</div>
                      <div className={styles.mockupStatValue}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tasks */}
                <div className={styles.mockupTasks}>
                  {[
                    { title: 'Design new onboarding flow', status: 'IN_PROGRESS', priority: 'HIGH', bar: 'taskBarIndigo' },
                    { title: 'Write API documentation', status: 'PENDING', priority: 'MEDIUM', bar: 'taskBarAmber' },
                    { title: 'Set up CI/CD pipeline', status: 'COMPLETED', priority: 'HIGH', bar: 'taskBarTeal' },
                  ].map(task => (
                    <div key={task.title} className={styles.mockupTask}>
                      <div className={`${styles.mockupTaskBar} ${styles[task.bar]}`} />
                      <div>
                        <div className={styles.mockupTaskTitle}>{task.title}</div>
                        <div className={styles.mockupTaskBadges}>
                          <span className={`${styles.mockupBadge} ${
                            task.status === 'IN_PROGRESS' ? styles.bIndigo :
                            task.status === 'COMPLETED'   ? styles.bGreen  : styles.bAmber
                          }`}>{task.status}</span>
                          <span className={`${styles.mockupBadge} ${
                            task.priority === 'HIGH' ? styles.bRose : styles.bAmber
                          }`}>{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ─────────────────────────────────────── */}
      <div className={styles.statsBand}>
        <div className={styles.statsBandInner}>
          {[
            { number: '100%', label: 'TypeScript coverage' },
            { number: 'JWT',  label: 'Secure authentication' },
            { number: 'REST', label: 'Clean API design' },
            { number: '< 1s', label: 'Load time' },
          ].map(s => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNumber}>{s.number}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section id="features" className={styles.section}>
        <p className={styles.sectionLabel}>Features</p>
        <h2 className={styles.sectionTitle}>Everything you need to ship faster</h2>
        <p className={styles.sectionSub}>
          Built with the tools modern teams rely on — secure, scalable, and delightful to use.
        </p>

        <div className={styles.featuresGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles[f.iconCls]}`}>
                {f.icon}
              </div>
              <div className={styles.featureTitle}>{f.title}</div>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className={styles.section} style={{ paddingTop: '2rem' }}>
        <p className={styles.sectionLabel}>How it works</p>
        <h2 className={styles.sectionTitle}>Up and running in minutes</h2>
        <p className={styles.sectionSub}>
          Three simple steps separate you from a fully organised, high-performance workspace.
        </p>

        <div className={styles.stepsGrid}>
          {STEPS.map(s => (
            <div key={s.step} className={styles.stepCard}>
              <div className={styles.stepNumber}>{s.step}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaBoxGlow} />
          <h2 className={styles.ctaTitle}>
            Ready to get<br />organised?
          </h2>
          <p className={styles.ctaSub}>
            Join TaskMaster today and take control of your tasks with a beautifully designed, 
            production-ready workspace.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.ctaPrimary}>
              Create free account <ArrowRight size={17} />
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              Sign in
            </Link>
          </div>
          <p className={styles.ctaNote}>
            <Check size={13} style={{ display: 'inline', marginRight: 4 }} />
            Free account · No credit card · Instant setup
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <CheckSquare size={18} color="var(--primary-light)" />
          TaskMaster
        </div>
        <div className={styles.footerLinks}>
          <Link href="#features" className={styles.footerLink}>Features</Link>
          <Link href="#how-it-works" className={styles.footerLink}>How it works</Link>
          <Link href="/login" className={styles.footerLink}>Sign In</Link>
          <Link href="/register" className={styles.footerLink}>Register</Link>
        </div>
        <p className={styles.footerCopy}>© 2025 TaskMaster. Built for the assessment.</p>
      </footer>
    </div>
  );
}
