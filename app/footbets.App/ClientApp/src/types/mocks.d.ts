declare module '@mocks/server' {
  export const worker: {
    start: () => Promise<ServiceWorkerRegistration | void>;
  };
}
