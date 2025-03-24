declare module '@footbets/__mocks__/server' {
  export const worker: {
    start: () => Promise<ServiceWorkerRegistration | void>;
  };
}
