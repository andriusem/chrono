// ============================================
// DOMAIN STORE
// ============================================
// Immutable domain/activity template catalog.

import { create } from 'zustand';
import type { ActivityTemplate, DomainTemplate } from '@/types';
import { mockActivityTemplates, mockDomainTemplates } from '@/data/mockData';

interface DomainState {
  domainTemplates: DomainTemplate[];
  activityTemplates: ActivityTemplate[];
  getDomainTemplateById: (domainTemplateId: string) => DomainTemplate | undefined;
  getActivityTemplateById: (activityTemplateId: string) => ActivityTemplate | undefined;
  getActivityTemplatesForDomain: (domainTemplateId: string) => ActivityTemplate[];
}

export const useDomainStore = create<DomainState>()((_, get) => ({
  domainTemplates: mockDomainTemplates,
  activityTemplates: mockActivityTemplates,

  getDomainTemplateById: (domainTemplateId) =>
    get().domainTemplates.find((domainTemplate) => domainTemplate.id === domainTemplateId),

  getActivityTemplateById: (activityTemplateId) =>
    get().activityTemplates.find(
      (activityTemplate) => activityTemplate.id === activityTemplateId
    ),

  getActivityTemplatesForDomain: (domainTemplateId) =>
    get()
      .activityTemplates.filter(
        (activityTemplate) => activityTemplate.domainTemplateId === domainTemplateId
      )
      .sort((a, b) => a.displayOrder - b.displayOrder),
}));
