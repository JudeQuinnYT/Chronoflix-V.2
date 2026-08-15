import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Patch ResizeObserver to defer notifications to requestAnimationFrame, avoiding loop limit/undelivered notifications errors
if (typeof window !== 'undefined' && window.ResizeObserver) {
  const NativeResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends NativeResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => {
          try {
            callback(entries, observer);
          } catch {
            // ignore
          }
        });
      });
    }
  };
}

// Suppress benign ResizeObserver loop notifications in browser environment
const suppressResizeObserverErrors = () => {
  const isResizeObserverError = (msg?: string | null) =>
    Boolean(
      msg &&
        (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
          msg.includes('ResizeObserver loop limit exceeded')),
    );

  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (typeof message === 'string' && isResizeObserverError(message)) {
      return true;
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  window.addEventListener(
    'error',
    (e) => {
      if (isResizeObserverError(e.message)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true,
  );

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      const reason = e.reason;
      const msg = typeof reason === 'string' ? reason : reason?.message || String(reason);
      if (isResizeObserverError(msg)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true,
  );

  const origConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && isResizeObserverError(args[0])) {
      return;
    }
    origConsoleError.apply(console, args);
  };
};

suppressResizeObserverErrors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


