import { apiClient } from './client';
import type { Molecule, DisclosureWindow } from '@/types/models';

export const moleculesApi = {
  getById: (id: string) =>
    apiClient.get<any>(`/molecules/${id}`).then((r) => {
      const m = r.data;
      let status = 'UNCERTAIN';
      if (m.latestScan) {
        status = m.latestScan.isNovel ? 'NOVEL' : 'KNOWN';
      }
      return {
        id: String(m.id),
        smiles: m.smiles,
        iupacName: m.iupacName || m.extractedNameRaw,
        confidenceScore: m.extractionConfidence != null ? Number(m.extractionConfidence) : 0,
        status: status,
        noveltyScore: m.latestScan ? Number(m.latestScan.noveltyScore) : 0,
        tanimotoSimilarity: m.latestScan ? Number(m.latestScan.tanimotoSimilarity) : 0,
        closestKnownMatch: m.latestScan ? m.latestScan.closestMatchId : undefined,
        paperId: String(m.paperId),
      } as Molecule;
    }),

  startDisclosureWindow: (id: string, req?: { disclosureDate: string; gracePeriodDays?: number }) =>
    apiClient
      .post<any>(
        `/molecules/${id}/disclosure-window`,
        req || { disclosureDate: new Date().toISOString().split('T')[0], gracePeriodDays: 365 }
      )
      .then((r) => r.data),

  filePatent: (id: string, req: { patentOffice: string; filingDate?: string; applicationNumber?: string }) =>
    apiClient
      .post<any>(`/molecules/${id}/patent-filing`, req)
      .then((r) => r.data),
};
