import Image from 'next/image';
import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Modern email signature template
 * A contemporary layout with logo and name side by side
 */
export const Modern: TemplateComponent = (props: TemplateProps): ReactElement => {
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
    console.error('Modern template: Name and email are required fields');
  }

  // Handle different combinations of title and company
  const titleCompanyText = (() => {
    if (title && company) return `${title} at ${company}`;
    if (title) return title;
    if (company) return company;
    return '';
  })();

  return (
    <section id="modern">
      <table
        style={{
          fontFamily: 'Arial, sans-serif',
          color: primaryColor,
          borderCollapse: 'collapse',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <tbody>
          <tr>
            {logoData && (
              <td style={{ verticalAlign: 'top', paddingRight: '12px', width: '1%' }}>
                <Image
                  src={logoData}
                  alt="Logo"
                  style={{ maxWidth: '80px', maxHeight: '50px', display: 'block' }}
                />
              </td>
            )}
            <td style={{ verticalAlign: 'middle' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '2px' }}>
                {name}
              </div>
              {titleCompanyText && (
                <div style={{ color: secondaryColor, fontSize: '14px' }}>{titleCompanyText}</div>
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={logoData ? 2 : 1}
              style={{ paddingTop: '8px', fontSize: '12px', color: secondaryColor }}
            >
              {email && <span>Email: {email}</span>}
              {phone && (
                <span>
                  {email ? ' | ' : ''}Phone: {phone}
                </span>
              )}
              {website && (
                <span>
                  {email || phone ? ' | ' : ''}Web: {website}
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

// Define comprehensive metadata for the template
const modernMetadata: TemplateMetadata = {
  id: 'modern',
  name: 'Modern',
  description: 'A contemporary layout with logo and name side by side',
  category: 'professional',
  tags: ['contemporary', 'side-by-side', 'clean'],
  version: '1.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Modern.metadata = modernMetadata;
