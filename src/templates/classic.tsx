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
    address,
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
        className="text-sm"
        style={{
          color: primaryColor,
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          padding: '8px',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.4',
        }}
      >
        <div style={{ marginBottom: '3px' }}>
          <strong style={{ fontSize: '15px', color: primaryColor }}>{displayName}</strong>
          {title && <span style={{ color: secondaryColor, fontSize: '13px' }}> | {title}</span>}
        </div>
        {company && (
          <div style={{ marginBottom: '3px' }}>
            <strong style={{ fontSize: '13px' }}>{company}</strong>
          </div>
        )}
        <div style={{ color: secondaryColor, fontSize: '12px', marginBottom: '3px' }}>
          📧{' '}
          <a
            href={`mailto:${displayEmail}`}
            style={{ color: primaryColor, textDecoration: 'none' }}
          >
            {displayEmail}
          </a>
          {phone && (
            <>
              {' | '}📞{' '}
              <a href={`tel:${phone}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                {phone}
              </a>
            </>
          )}
        </div>
        {website && (
          <div style={{ color: secondaryColor, fontSize: '12px', marginBottom: '3px' }}>
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
        {address && (
          <div style={{ color: secondaryColor, fontSize: '12px', marginBottom: '3px' }}>
            📍 <span style={{ color: primaryColor }}>{address}</span>
          </div>
        )}
        {logoData && (
          <div style={{ marginTop: '6px' }}>
            <img
              src={logoData}
              alt="Logo"
              style={{ maxWidth: '80px', height: 'auto', display: 'block' }}
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
