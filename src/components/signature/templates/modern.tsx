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
    address,
    logoData,
    primaryColor = '#000000',
    secondaryColor = '#666666',
  } = props;

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';

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
                  width={80}
                  height={50}
                  style={{ maxWidth: '80px', maxHeight: '50px', display: 'block' }}
                />
              </td>
            )}
            <td style={{ verticalAlign: 'middle' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '2px' }}>
                {displayName}
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
              <span>📧 {displayEmail}</span>
              {phone && (
                <span>
                  {' | '}📞 {phone}
                </span>
              )}
              {website && (
                <span>
                  {' | '}🌐 {website}
                </span>
              )}
            </td>
          </tr>
          {address && (
            <tr>
              <td
                colSpan={logoData ? 2 : 1}
                style={{ paddingTop: '6px', fontSize: '12px', color: secondaryColor }}
              >
                {address}
              </td>
            </tr>
          )}
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
