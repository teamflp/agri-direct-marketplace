
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster'
import { initializeSentry } from './services/sentry-service.ts';

// Initialize Sentry before rendering the app
initializeSentry();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
