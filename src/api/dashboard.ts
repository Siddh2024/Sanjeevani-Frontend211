import { apiClient } from './client';
import type { DashboardSummary, DisclosureWindow, PaginatedResponse } from '@/types/models';

export const dashboardApi = {
  summary: () =>
    apiClient.get<DashboardSummary>('/dashboard/summary').then((r) => r.data),

  disclosureWindows: (status?: string) =>
    apiClient
      .get<PaginatedResponse<DisclosureWindow>>('/disclosure-windows', {
        params: status ? { status } : {},
      })
      .then((r) => r.data),
};
