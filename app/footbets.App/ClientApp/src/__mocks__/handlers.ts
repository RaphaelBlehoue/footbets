import { HttpHandler } from 'msw';
import { consultationHandler } from '@apimock/mock_test';

const ConsultationHandlerArray: HttpHandler[] = [consultationHandler()];

export const handlers: readonly HttpHandler[] = [...ConsultationHandlerArray];
