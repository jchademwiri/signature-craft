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

  // We'll handle the contact line differently to include proper links

  return (
    <section id="minimal">
      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4' }}>
        {/* Logo - only if provided */}
        {logoData && (
          <div style={{ marginBottom: '6px' }}>
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
        {/* Name - always displayed and required */}
        <div style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '2px' }}>
          {displayName}
        </div>

        {/* Title and Company line - only if at least one exists */}
        {titleCompanyLine && (
          <div style={{ color: secondaryColor, marginBottom: '2px' }}>{titleCompanyLine}</div>
        )}

        {/* Contact information line - email and phone */}
        <div style={{ color: secondaryColor, fontSize: '13px' }}>
          <a
            href={`mailto:${displayEmail}`}
            style={{ color: primaryColor, textDecoration: 'none' }}
          >
            {displayEmail}
          </a>
          {phone && (
            <>
              {' | '}
              <a href={`tel:${phone}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                {phone}
              </a>
            </>
          )}
        </div>

        {/* Website link if provided */}
        {props.website && (
          <div style={{ color: secondaryColor, fontSize: '13px', marginTop: '2px' }}>
            <a
              href={props.website.startsWith('http') ? props.website : `https://${props.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: primaryColor, textDecoration: 'none' }}
            >
              {props.website}
            </a>
          </div>
        )}
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
