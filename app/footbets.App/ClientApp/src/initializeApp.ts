async function deferRender(): Promise<ServiceWorkerRegistration | undefined | void> {
  console.log('import.meta.env.MOCK_API : ', import.meta.env.VITE_API_MOCK);
  if (import.meta.env.VITE_API_MOCK !== 'true') {
    return;
  }

  const { worker } = await import('@footbets/__mocks__/server');
  return worker.start();
}

export async function initializeApp() {
  await deferRender();
}
