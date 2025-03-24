import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from './initializeApp.ts';

async function init() {
  await initializeApp();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

init().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error('Erreur au démarrage de l’app :', err);
});
