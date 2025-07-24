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
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          maxWidth: '440px',
          background: 'white',
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
                    verticalAlign: 'middle',
                    paddingRight: '18px',
                    width: 'auto',
                    paddingTop: '0px',
                  }}
                >
                  <img
                    src={logoData}
                    alt="Logo"
                    style={{
                      maxWidth: '48px',
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: '6px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    }}
                  />
                </td>
              )}
              <td style={{ verticalAlign: 'middle', paddingBottom: '6px' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '19px',
                    marginBottom: '4px',
                    color: primaryColor,
                    letterSpacing: '0.02em',
                  }}
                >
                  {displayName}
                </div>
                {titleCompanyText && (
                  <div
                    style={{
                      color: secondaryColor,
                      fontSize: '15px',
                      marginBottom: '4px',
                      fontWeight: 500,
                    }}
                  >
                    {titleCompanyText}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td
                colSpan={logoData ? 2 : 1}
                style={{ paddingTop: '10px', fontSize: '14px', color: secondaryColor }}
              >
                <div
                  style={{
                    marginBottom: '6px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  {/* Email */}
                  <span>
                    📧{' '}
                    <a
                      href={`mailto:${displayEmail}`}
                      style={{
                        color: primaryColor,
                        textDecoration: 'none',
                        fontSize: '15px',
                        fontWeight: 500,
                      }}
                    >
                      {displayEmail}
                    </a>
                  </span>
                  {/* Phone */}
                  {phone && (
                    <span>
                      📞{' '}
                      <a
                        href={`tel:${phone}`}
                        style={{
                          color: primaryColor,
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: 500,
                        }}
                      >
                        {phone}
                      </a>
                    </span>
                  )}
                  {/* Website */}
                  {website && (
                    <span>
                      🌐{' '}
                      <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: primaryColor,
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: 500,
                        }}
                      >
                        {website}
                      </a>
                    </span>
                  )}
                </div>
              </td>
            </tr>
            {address && (
              <tr>
                <td
                  colSpan={logoData ? 2 : 1}
                  style={{ paddingTop: '14px', fontSize: '15px', color: secondaryColor }}
                >
                  📍 <span style={{ color: primaryColor, fontWeight: 500 }}>{address}</span>
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
