import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign ResizeObserver loop notifications in browser environment
const suppressResizeObserverErrors = () => {
  const isResizeObserverError = (msg?: string | null) =>
    msg && (
      msg.includes('ResizeObserver loop completed with undelivered notifications') ||
      msg.includes('ResizeObserver loop limit exceeded')
    );

  window.addEventListener('error', (e) => {
    if (isResizeObserverError(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason && isResizeObserverError(e.reason.message || String(e.reason))) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
};

suppressResizeObserverErrors();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

