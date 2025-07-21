import Image from 'next/image';
import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Classic email signature template
 * A traditional signature layout with contact details stacked vertically
 */
export const Classic: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    phone,
    website,
    logoData,
    primaryColor = '#000000',
    secondaryColor = '#666666',
  } = props;

  // Error handling for required fields
  if (!name || !email) {
    console.error('Classic template: Name and email are required fields');
  }

  return (
    <section id="classic">
      <div className="text-xs space-y-1" style={{ color: primaryColor }}>
        <div>
          <strong>{name}</strong>
          {title && <span style={{ color: secondaryColor }}> | {title}</span>}
        </div>
        {company && (
          <div>
            <strong>{company}</strong>
          </div>
        )}
        <div style={{ color: secondaryColor }}>
          {email && <span>Email: {email}</span>}
          {phone && (
            <span>
              {email ? ' | ' : ''}Phone: {phone}
            </span>
          )}
        </div>
        {website && <div style={{ color: secondaryColor }}>Web: {website}</div>}
        {logoData && (
          <div>
            <Image
              src={logoData}
              alt="Logo"
              width={100}
              height={50}
              style={{ maxWidth: '100px', maxHeight: '50px' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

// Define comprehensive metadata for the template
const classicMetadata: TemplateMetadata = {
  id: 'classic',
  name: 'Classic',
  description: 'A traditional signature layout with contact details stacked vertically',
  category: 'professional',
  tags: ['traditional', 'vertical', 'simple'],
  version: '1.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Classic.metadata = classicMetadata;
