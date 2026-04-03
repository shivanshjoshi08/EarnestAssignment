'use client';
import { createRoot } from 'react-dom/client';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const toastStyles = {
  toast: {
    display:        'flex',
    alignItems:     'center',
    gap:            '0.75rem',
    padding:        '0.875rem 1rem 0.875rem 1.125rem',
    borderRadius:   '10px',
    fontSize:       '0.9rem',
    fontWeight:     '500',
    fontFamily:     "'Inter', system-ui, sans-serif",
    maxWidth:       '360px',
    minWidth:       '260px',
    boxShadow:      '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
    animation:      'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    border:         '1px solid',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    cursor:         'default',
    position:       'relative' as const,
    overflow:       'hidden' as const,
  } as React.CSSProperties,
  success: {
    background:    'rgba(16, 185, 129, 0.12)',
    borderColor:   'rgba(16, 185, 129, 0.3)',
    color:         '#ecfdf5',
  } as React.CSSProperties,
  error: {
    background:    'rgba(244, 63, 94, 0.12)',
    borderColor:   'rgba(244, 63, 94, 0.3)',
    color:         '#fff1f2',
  } as React.CSSProperties,
  icon: (type: 'success' | 'error'): React.CSSProperties => ({
    color: type === 'success' ? '#10b981' : '#f43f5e',
    flexShrink: 0,
  }),
  message: {
    flex: 1,
    lineHeight: '1.4',
  } as React.CSSProperties,
  closeBtn: {
    background:    'transparent',
    border:        'none',
    cursor:        'pointer',
    padding:       '2px',
    display:       'flex',
    alignItems:    'center',
    justifyContent:'center',
    opacity:       0.6,
    transition:    'opacity 0.15s',
    color:         'inherit',
    flexShrink:    0,
  } as React.CSSProperties,
  progressBar: {
    position:  'absolute' as const,
    bottom:    0,
    left:      0,
    height:    '2px',
    animation: 'shrink 3s linear forwards',
  } as React.CSSProperties,
};

const globalStyles = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%) scale(0.95); }
    to   { opacity: 1; transform: translateX(0)   scale(1); }
  }
  @keyframes shrink {
    from { width: 100%; }
    to   { width: 0%; }
  }
`;

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ ...toastStyles.toast, ...toastStyles[type] }}>
        <span style={toastStyles.icon(type)}>
          {type === 'success'
            ? <CheckCircle2 size={20} />
            : <XCircle size={20} />}
        </span>
        <span style={toastStyles.message}>{message}</span>
        <button
          style={toastStyles.closeBtn}
          onClick={onClose}
          onMouseOver={e => (e.currentTarget.style.opacity = '1')}
          onMouseOut={e  => (e.currentTarget.style.opacity = '0.6')}
        >
          <X size={15} />
        </button>
        <div style={{
          ...toastStyles.progressBar,
          background: type === 'success' ? '#10b981' : '#f43f5e',
        }} />
      </div>
    </>
  );
}

let toastContainer: HTMLElement | null = null;

function getContainer(): HTMLElement {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export const showToastUtil = (message: string, type: 'success' | 'error' = 'success') => {
  if (typeof window === 'undefined') return;

  const container = getContainer();
  const el = document.createElement('div');
  el.style.pointerEvents = 'auto';
  container.appendChild(el);

  const root = createRoot(el);

  const remove = () => {
    // Fade out before removing
    el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateX(24px)';
    setTimeout(() => {
      root.unmount();
      if (container.contains(el)) container.removeChild(el);
    }, 250);
  };

  root.render(<Toast message={message} type={type} onClose={remove} />);
  setTimeout(remove, 3500);
};
