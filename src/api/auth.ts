import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<any>('/auth/login', data).then((r) => {
      const resp = r.data;
      const roleMapped = resp.role === 'TTO_OFFICER' ? 'TTO_STAFF' : resp.role;
      return {
        accessToken: resp.accessToken,
        refreshToken: resp.accessToken,
        user: {
          id: resp.email,
          email: resp.email,
          name: resp.email.split('@')[0],
          role: roleMapped,
          institution: {
            id: resp.institutionId,
            name: resp.institutionId === 1 ? 'IIT Bombay' : `Institution ${resp.institutionId}`,
            type: 'UNIVERSITY',
          },
        },
      } as AuthResponse;
    }),

  register: (data: RegisterRequest) =>
    apiClient.post<any>('/auth/register', data).then((r) => {
      const resp = r.data;
      const roleMapped = resp.role === 'TTO_OFFICER' ? 'TTO_STAFF' : resp.role;
      return {
        accessToken: resp.accessToken,
        refreshToken: resp.accessToken,
        user: {
          id: resp.email,
          email: resp.email,
          name: resp.email.split('@')[0],
          role: roleMapped,
          institution: {
            id: resp.institutionId,
            name: resp.institutionId === 1 ? 'IIT Bombay' : `Institution ${resp.institutionId}`,
            type: 'UNIVERSITY',
          },
        },
      } as AuthResponse;
    }),

  refresh: (refreshToken: string) =>
    apiClient
      .post<{ accessToken: string }>('/auth/refresh', { refreshToken })
      .then((r) => r.data),

  me: () => apiClient.get('/auth/me').then((r) => r.data),
};
