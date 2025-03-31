declare module '@mocks/browser' {
  export const worker: {
    start: () => Promise<ServiceWorkerRegistration | void>;
  };
}
