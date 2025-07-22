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
      <div
        style={{
          padding: '16px',
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <table
          style={{
            color: primaryColor,
            borderCollapse: 'collapse',
            width: '100%',
            background: 'white',
          }}
        >
          <tbody>
            <tr>
              {logoData && (
                <td
                  style={{
                    verticalAlign: 'top',
                    paddingRight: '20px',
                    width: 'auto',
                    paddingTop: '0px',
                  }}
                >
                  <img
                    src={logoData}
                    alt="Logo"
                    style={{ maxWidth: '100px', width: 'auto', height: 'auto', display: 'block' }}
                  />
                </td>
              )}
              <td style={{ verticalAlign: 'middle' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginBottom: '6px',
                    color: primaryColor,
                  }}
                >
                  {displayName}
                </div>
                {titleCompanyText && (
                  <div style={{ color: secondaryColor, fontSize: '14px', marginBottom: '4px' }}>
                    {titleCompanyText}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={logoData ? 2 : 1}
                style={{ paddingTop: '12px', fontSize: '14px', color: secondaryColor }}
              >
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
                    <a
                      href={`tel:${phone}`}
                      style={{ color: primaryColor, textDecoration: 'none' }}
                    >
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
              </td>
            </tr>
            {address && (
              <tr>
                <td
                  colSpan={logoData ? 2 : 1}
                  style={{ paddingTop: '8px', fontSize: '14px', color: secondaryColor }}
                >
                  📍 {address}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
