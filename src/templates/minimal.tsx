import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';
import Image from 'next/image';

/**
 * Minimal email signature template
 * A clean, simple layout focusing on essential information only
 */
export const Minimal: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    phone,
    primaryColor = '#000000',
    secondaryColor = '#666666',
    logoData,
  } = props;

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';

  // Build title and company line
  const titleCompanyLine = (() => {
    if (title && company) return `${title}, ${company}`;
    if (title) return title;
    if (company) return company;
    return '';
  })();

  return (
    <section id="minimal">
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          width: '100%',
          maxWidth: '500px',
          background: 'white',
          padding: '16px',
        }}
      >
        {/* Logo - only if provided */}
        {logoData && (
          <div style={{ marginBottom: '12px' }}>
            <img
              src={logoData}
              alt="Logo"
              style={{ maxWidth: '120px', width: 'auto', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        {/* Name - always displayed and required */}
        <div
          style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '6px', fontSize: '18px' }}
        >
          {displayName}
        </div>

        {/* Title and Company line - only if at least one exists */}
        {titleCompanyLine && (
          <div style={{ color: secondaryColor, marginBottom: '8px', fontSize: '14px' }}>
            {titleCompanyLine}
          </div>
        )}

        {/* Contact information */}
        <div style={{ marginBottom: '6px' }}>
          <div style={{ marginBottom: '4px' }}>
            📧{' '}
            <a
              href={`mailto:${displayEmail}`}
              style={{ color: primaryColor, textDecoration: 'none', fontSize: '14px' }}
            >
              {displayEmail}
            </a>
          </div>
          {phone && (
            <div style={{ marginBottom: '4px' }}>
              📞{' '}
              <a
                href={`tel:${phone}`}
                style={{ color: primaryColor, textDecoration: 'none', fontSize: '14px' }}
              >
                {phone}
              </a>
            </div>
          )}
          {props.website && (
            <div style={{ marginBottom: '4px' }}>
              🌐{' '}
              <a
                href={props.website.startsWith('http') ? props.website : `https://${props.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: primaryColor, textDecoration: 'none', fontSize: '14px' }}
              >
                {props.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Define comprehensive metadata for the template
const minimalMetadata: TemplateMetadata = {
  id: 'minimal',
  name: 'Minimal',
  description: 'A clean, simple layout focusing on essential information only',
  category: 'minimal',
  tags: ['clean', 'simple', 'essential', 'compact'],
  version: '1.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Minimal.metadata = minimalMetadata;
