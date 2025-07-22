import { Classic } from './classic';
import { Modern } from './modern';
import { Minimal } from './minimal';
import { Corporate } from './corporate';
import { TemplateComponent } from './types';

export { Classic, Modern, Minimal };
export type { TemplateProps, TemplateMetadata, TemplateComponent } from './types';

// Create a templates registry using the metadata from each component
export const TEMPLATES: Record<string, TemplateComponent> = {
  [Classic.metadata.id]: Classic,
  [Modern.metadata.id]: Modern,
  [Minimal.metadata.id]: Minimal,
  [Corporate.metadata.id]: Corporate,
};

export type TemplateId = keyof typeof TEMPLATES;
