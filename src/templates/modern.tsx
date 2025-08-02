import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Modern email signature template
 * Professional layout with left-aligned info and right-aligned contact details
 */
export const Modern: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    mobilePhone,
    officePhone,
    website,
    address,
    logoData,
    primaryColor = '#ff6b35',
    secondaryColor = '#999999',
  } = props;

  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';
  const displayPhone = mobilePhone || officePhone || '+27 00 000 0000';
  const displayWebsite = website || 'yourwebsite.com';

  return (
    <section id="modern">
      <div
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          width: '100%',
          maxWidth: '600px',
          background: 'white',
        }}
      >
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            background: 'white',
          }}
        >
          <tbody>
            <tr>
              {/* Left side - Name, Title, Company */}
              <td
                style={{
                  verticalAlign: 'top',
                  width: '50%',
                  paddingRight: '20px',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    marginBottom: '8px',
                    color: '#333333',
                    lineHeight: '1.2',
                  }}
                >
                  {displayName}
                </div>
                {title && (
                  <div
                    style={{
                      color: secondaryColor,
                      fontSize: '16px',
                      marginBottom: '4px',
                      lineHeight: '1.3',
                    }}
                  >
                    {title}
                  </div>
                )}
                {company && (
                  <div
                    style={{
                      color: secondaryColor,
                      fontSize: '16px',
                      marginBottom: '4px',
                      lineHeight: '1.3',
                    }}
                  >
                    {company}
                  </div>
                )}
              </td>

              {/* Vertical separator */}
              <td
                style={{
                  width: '4px',
                  background: primaryColor,
                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '120px',
                    background: primaryColor,
                  }}
                />
              </td>

              {/* Right side - Contact details */}
              <td
                style={{
                  verticalAlign: 'top',
                  width: '50%',
                  paddingLeft: '20px',
                }}
              >
                {/* Email */}
                <div
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      color: primaryColor,
                      fontSize: '16px',
                      marginRight: '8px',
                      width: '20px',
                    }}
                  >
                    ✉
                  </span>
                  <a
                    href={`mailto:${displayEmail}`}
                    style={{
                      color: primaryColor,
                      textDecoration: 'underline',
                      fontSize: '14px',
                    }}
                  >
                    {displayEmail}
                  </a>
                </div>

                {/* Phone */}
                <div
                  style={{
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      color: primaryColor,
                      fontSize: '16px',
                      marginRight: '8px',
                      width: '20px',
                    }}
                  >
                    📱
                  </span>
                  <a
                    href={`tel:${displayPhone}`}
                    style={{
                      color: secondaryColor,
                      textDecoration: 'none',
                      fontSize: '14px',
                    }}
                  >
                    {displayPhone}
                  </a>
                </div>

                {/* Address */}
                {address && (
                  <div
                    style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        color: primaryColor,
                        fontSize: '16px',
                        marginRight: '8px',
                        width: '20px',
                        marginTop: '2px',
                      }}
                    >
                      📍
                    </span>
                    <div
                      style={{
                        color: secondaryColor,
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
                      {address}
                    </div>
                  </div>
                )}
              </td>
            </tr>

            {/* Website row - spans full width */}
            <tr>
              <td
                colSpan={3}
                style={{
                  paddingTop: '20px',
                  borderTop: `2px solid ${primaryColor}`,
                  textAlign: 'center',
                }}
              >
                {website && (
                  <a
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: primaryColor,
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    {displayWebsite}
                  </a>
                )}
              </td>
            </tr>
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
  description: 'Professional layout with vertical separator and organized contact details',
  category: 'professional',
  tags: ['professional', 'organized', 'clean', 'corporate'],
  version: '2.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Modern.metadata = modernMetadata;
