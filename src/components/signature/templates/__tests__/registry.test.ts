import { TEMPLATES, TemplateId } from '../index';
import { Classic } from '../classic';
import { Modern } from '../modern';
import { Minimal } from '../minimal';

describe('Template Registry', () => {
  test('contains all templates', () => {
    expect(TEMPLATES).toBeDefined();
    expect(TEMPLATES.classic).toBe(Classic);
    expect(TEMPLATES.modern).toBe(Modern);
    expect(TEMPLATES.minimal).toBe(Minimal);
  });

  test('template IDs match metadata IDs', () => {
    Object.entries(TEMPLATES).forEach(([id, template]) => {
      expect(template.metadata.id).toBe(id);
    });
  });

  test('Classic template is properly registered', () => {
    const classicId: TemplateId = 'classic';
    const template = TEMPLATES[classicId];
    
    expect(template).toBe(Classic);
    expect(template.metadata.id).toBe('classic');
    expect(template.metadata.name).toBe('Classic');
    expect(template.metadata.description).toBeTruthy();
    expect(template.metadata.category).toBe('professional');
  });
});