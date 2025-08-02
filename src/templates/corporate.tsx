import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Corporate email signature template - modern premium design with email compatibility
 */
export const Corporate: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    mobilePhone,
    officePhone,
    website,
    logoData,
    address,
    primaryColor = '#1a365d',
    secondaryColor = '#4a5568',
  } = props;

  // Premium color palette
  const accentColor = '#3182ce';
  const lightGray = '#f7fafc';
  const borderColor = '#e2e8f0';

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#2d3748',
        maxWidth: '520px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <tbody>
        {/* Header section with logo and name */}
        <tr>
          <td
            style={{
              padding: '24px 24px 16px 24px',
              backgroundColor: lightGray,
              borderBottom: `2px solid ${primaryColor}`,
            }}
          >
            <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%' }}>
              <tbody>
                <tr>
                  {logoData && (
                    <td
                      style={{
                        verticalAlign: 'middle',
                        paddingRight: '16px',
                        width: 'auto',
                      }}
                    >
                      <img
                        src={logoData}
                        alt="Company Logo"
                        style={{
                          width: '60px',
                          height: '60px',
                          display: 'block',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                  )}
                  <td style={{ verticalAlign: 'middle' }}>
                    <div
                      style={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: primaryColor,
                        marginBottom: '4px',
                      }}
                    >
                      {name}
                    </div>
                    {title && (
                      <div
                        style={{
                          fontSize: '16px',
                          color: secondaryColor,
                          fontWeight: '500',
                          marginBottom: '2px',
                        }}
                      >
                        {title}
                      </div>
                    )}
                    {company && (
                      <div
                        style={{
                          fontSize: '14px',
                          color: accentColor,
                          fontWeight: '500',
                        }}
                      >
                        {company}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {/* Contact Information Section */}
        <tr>
          <td style={{ padding: '0 24px 24px 24px' }}>
            {/* Email & Website row */}
            {(email || website) && (
              <table
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{ width: '100%', marginBottom: '12px' }}
              >
                <tbody>
                  <tr>
                    {/* Email */}
                    {email && (
                      <td
                        style={{
                          verticalAlign: 'top',
                          paddingRight: website ? '32px' : '0',
                        }}
                      >
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: '20px',
                                  verticalAlign: 'top',
                                  paddingTop: '2px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: accentColor,
                                    borderRadius: '3px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    lineHeight: '16px',
                                    fontSize: '10px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  @
                                </div>
                              </td>
                              <td
                                style={{
                                  paddingLeft: '12px',
                                  verticalAlign: 'top',
                                }}
                              >
                                <a
                                  href={`mailto:${email}`}
                                  style={{
                                    color: primaryColor,
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    borderBottom: `1px solid ${borderColor}`,
                                    paddingBottom: '1px',
                                  }}
                                >
                                  {email}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    )}
                    {/* Website */}
                    {website && (
                      <td style={{ verticalAlign: 'top' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: '20px',
                                  verticalAlign: 'top',
                                  paddingTop: '2px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: accentColor,
                                    borderRadius: '3px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    lineHeight: '16px',
                                    fontSize: '10px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  🌐
                                </div>
                              </td>
                              <td
                                style={{
                                  paddingLeft: '12px',
                                  verticalAlign: 'top',
                                }}
                              >
                                <a
                                  href={
                                    website
                                      ? website.startsWith('http')
                                        ? website
                                        : `https://${website}`
                                      : '#'
                                  }
                                  style={{
                                    color: accentColor,
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    borderBottom: `1px solid ${borderColor}`,
                                    paddingBottom: '1px',
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {(website ?? '').replace(/^https?:\/\//, '')}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}

            {/* Office Phone & Mobile Phone row */}
            {(officePhone || mobilePhone) && (
              <table
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{ width: '100%', marginBottom: '12px' }}
              >
                <tbody>
                  <tr>
                    {/* Office Phone */}
                    {officePhone && (
                      <td
                        style={{
                          verticalAlign: 'top',
                          paddingRight: mobilePhone ? '32px' : '0',
                        }}
                      >
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: '20px',
                                  verticalAlign: 'top',
                                  paddingTop: '2px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: secondaryColor,
                                    borderRadius: '3px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    lineHeight: '16px',
                                    fontSize: '10px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  ☎
                                </div>
                              </td>
                              <td
                                style={{
                                  paddingLeft: '12px',
                                  verticalAlign: 'top',
                                }}
                              >
                                <a
                                  href={`tel:${officePhone}`}
                                  style={{
                                    color: secondaryColor,
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                  }}
                                >
                                  {officePhone}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    )}
                    {/* Mobile Phone */}
                    {mobilePhone && (
                      <td style={{ verticalAlign: 'top' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: '20px',
                                  verticalAlign: 'top',
                                  paddingTop: '2px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: secondaryColor,
                                    borderRadius: '3px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    lineHeight: '16px',
                                    fontSize: '10px',
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  📱
                                </div>
                              </td>
                              <td
                                style={{
                                  paddingLeft: '12px',
                                  verticalAlign: 'top',
                                }}
                              >
                                <a
                                  href={`tel:${mobilePhone}`}
                                  style={{
                                    color: secondaryColor,
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                  }}
                                >
                                  {mobilePhone}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            )}

            {/* Address row */}
            {address && (
              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>
                      <table cellPadding="0" cellSpacing="0" border={0}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                width: '20px',
                                verticalAlign: 'top',
                                paddingTop: '2px',
                              }}
                            >
                              <div
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  backgroundColor: secondaryColor,
                                  borderRadius: '3px',
                                  display: 'inline-block',
                                  textAlign: 'center',
                                  lineHeight: '16px',
                                  fontSize: '10px',
                                  color: '#ffffff',
                                  fontWeight: 'bold',
                                }}
                              >
                                📍
                              </div>
                            </td>
                            <td
                              style={{
                                paddingLeft: '12px',
                                verticalAlign: 'top',
                              }}
                            >
                              <span
                                style={{
                                  color: secondaryColor,
                                  fontWeight: '400',
                                  fontSize: '13px',
                                }}
                              >
                                {address}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </td>
        </tr>

        {/* Footer accent */}
        <tr>
          <td
            style={{
              padding: '0',
              borderTop: `3px solid ${primaryColor}`,
              fontSize: '1px',
              lineHeight: '1px',
              height: '3px',
            }}
          >
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// Define comprehensive metadata for the template
const corporateMetadata: TemplateMetadata = {
  id: 'corporate',
  name: 'Corporate Premium',
  description:
    'A sophisticated premium corporate design with card-style layout, custom icons, and elegant typography',
  category: 'professional',
  tags: ['corporate', 'premium', 'modern', 'card-style', 'sophisticated', 'executive'],
  version: '2.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Corporate.metadata = corporateMetadata;
