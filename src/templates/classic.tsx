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
        className="text-sm space-y-3"
        style={{
          color: primaryColor,
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          padding: '16px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {logoData && (
          <div style={{ marginBottom: '12px' }}>
            <img
              src={logoData}
              alt="Logo"
              style={{ maxWidth: '120px', height: 'auto', display: 'block' }}
            />
          </div>
        )}
        <div style={{ marginBottom: '8px' }}>
          <strong style={{ fontSize: '16px', color: primaryColor }}>{displayName}</strong>
          {title && (
            <div style={{ color: secondaryColor, fontSize: '14px', marginTop: '2px' }}>{title}</div>
          )}
        </div>
        {company && (
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ fontSize: '14px' }}>{company}</strong>
          </div>
        )}
        <div style={{ color: secondaryColor, marginBottom: '6px' }}>
          <div style={{ marginBottom: '4px' }}>
            📧{' '}
            <a
              href={`mailto:${displayEmail}`}
              style={{ color: primaryColor, textDecoration: 'none' }}
            >
              {displayEmail}
            </a>
          </div>
          {phone && (
            <div style={{ marginBottom: '4px' }}>
              📞{' '}
              <a href={`tel:${phone}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                {phone}
              </a>
            </div>
          )}
          {website && (
            <div style={{ marginBottom: '4px' }}>
              🌐{' '}
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
        </div>
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
