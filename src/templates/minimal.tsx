import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Minimal email signature template - refined and elegant with perfect spacing
 */
export const Minimal: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    mobilePhone,
    officePhone,
    address,
    primaryColor = '#2d3748',
    secondaryColor = '#718096',
    logoData,
    website,
  } = props;

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';

  // Build title and company line with elegant separator
  const titleCompanyLine = (() => {
    if (title && company) return `${title} • ${company}`;
    if (title) return title;
    if (company) return company;
    return '';
  })();

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#2d3748',
        maxWidth: '600px',
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <tbody>
        {/* Logo and Name section */}
        <tr>
          <td style={{ paddingBottom: '16px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%' }}>
              <tbody>
                <tr>
                  {logoData && (
                    <td
                      style={{
                        verticalAlign: 'middle',
                        paddingRight: '12px',
                        width: 'auto',
                      }}
                    >
                      <img
                        src={logoData}
                        alt="Logo"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          display: 'block',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                  )}
                  <td style={{ verticalAlign: 'middle' }}>
                    <div
                      style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: primaryColor,
                        margin: '0',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {displayName}
                    </div>
                    {titleCompanyLine && (
                      <div
                        style={{
                          fontSize: '15px',
                          color: secondaryColor,
                          fontWeight: '400',
                          margin: '2px 0 0 0',
                          lineHeight: '1.4',
                        }}
                      >
                        {titleCompanyLine}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {/* Contact information */}
        <tr>
          <td style={{ paddingBottom: address ? '12px' : '8px' }}>
            <div
              style={{
                fontSize: '15px',
                color: secondaryColor,
                lineHeight: '1.5',
              }}
            >
              <a
                href={`mailto:${displayEmail}`}
                style={{
                  color: primaryColor,
                  textDecoration: 'none',
                  fontWeight: '500',
                }}
              >
                {displayEmail}
              </a>
              {mobilePhone && (
                <>
                  <span
                    style={{
                      color: '#cbd5e0',
                      fontSize: '14px',
                    }}
                  >
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                  </span>
                  <a
                    href={`tel:${mobilePhone}`}
                    style={{
                      color: secondaryColor,
                      textDecoration: 'none',
                      fontWeight: '400',
                    }}
                  >
                    {mobilePhone}
                  </a>
                </>
              )}
              {officePhone && (
                <>
                  <span
                    style={{
                      color: '#cbd5e0',
                      fontSize: '14px',
                    }}
                  >
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                  </span>
                  <a
                    href={`tel:${officePhone}`}
                    style={{
                      color: primaryColor,
                      textDecoration: 'none',
                      fontWeight: '400',
                    }}
                  >
                    {officePhone}
                  </a>
                </>
              )}
              {website && (
                <>
                  <span
                    style={{
                      color: '#cbd5e0',
                      fontSize: '14px',
                    }}
                  >
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                  </span>
                  <a
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: primaryColor,
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                  >
                    {website.replace(/^https?:\/\//, '')}
                  </a>
                </>
              )}
            </div>
          </td>
        </tr>

        {/* Address - if provided */}
        {address && (
          <tr>
            <td>
              <div
                style={{
                  fontSize: '14px',
                  color: secondaryColor,
                  fontWeight: '400',
                  lineHeight: '1.4',
                }}
              >
                {address}
              </div>
            </td>
          </tr>
        )}

        {/* Subtle accent line */}
        <tr>
          <td style={{ paddingTop: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '2px',
                backgroundColor: primaryColor,
                opacity: '0.3',
                borderRadius: '1px',
              }}
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Define comprehensive metadata for the template
const minimalMetadata: TemplateMetadata = {
  id: 'minimal',
  name: 'Minimal Refined',
  description: 'An elegant minimal design with perfect typography and subtle accent details',
  category: 'minimal',
  tags: ['clean', 'elegant', 'refined', 'typography', 'subtle', 'modern'],
  version: '2.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Minimal.metadata = minimalMetadata;
