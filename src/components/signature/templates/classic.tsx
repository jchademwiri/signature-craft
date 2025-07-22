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

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';

  return (
    <section id="classic">
      <div
        className="text-xs space-y-1"
        style={{ color: primaryColor, width: '600px', maxWidth: '100%', background: 'white' }}
      >
        <div>
          <strong>{displayName}</strong>
          {title && <span style={{ color: secondaryColor }}> | {title}</span>}
        </div>
        {company && (
          <div>
            <strong>{company}</strong>
          </div>
        )}
        <div style={{ color: secondaryColor }}>
          <span>
            Email:{' '}
            <a
              href={`mailto:${displayEmail}`}
              style={{ color: primaryColor, textDecoration: 'none' }}
            >
              {displayEmail}
            </a>
          </span>
          {phone && (
            <span>
              {' | '}Phone:{' '}
              <a href={`tel:${phone}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                {phone}
              </a>
            </span>
          )}
        </div>
        {website && (
          <div style={{ color: secondaryColor }}>
            Web:{' '}
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: primaryColor, textDecoration: 'none' }}
            >
              {website}
            </a>
          </div>
        )}
        {logoData && (
          <div>
            <Image
              src={logoData}
              alt="Logo"
              width={80}
              height={0}
              style={{ maxWidth: '80px', width: 'auto', height: 'auto' }}
              unoptimized
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
