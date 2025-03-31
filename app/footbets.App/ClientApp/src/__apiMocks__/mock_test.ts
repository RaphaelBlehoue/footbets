import { http, HttpHandler, HttpResponse } from 'msw';

export const consultationHandler = (): HttpHandler =>
  http.get('http://localhost:3000/api/post', () => {
    return HttpResponse.json({ tests: 'ok' });
  });
