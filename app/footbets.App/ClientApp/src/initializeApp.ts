/* eslint-disable no-console */
async function deferRender(): Promise<ServiceWorkerRegistration | void | boolean> {
  console.log('import.meta.env.MOCK_API : ', import.meta.env.VITE_API_MOCK);

  if (import.meta.env.VITE_API_MOCK === 'true') {
    const { worker } = await import('@mocks/server');
    return worker.start();
  }
  return false;
}

export async function initializeApp() {
  const started = await deferRender();
  if (started) {
    console.log('✅ MSW mock API started');
  } else {
    console.log('ℹ️ Mock API disabled');
  }
}
