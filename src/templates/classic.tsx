import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Classic email signature template - modernized with better spacing and typography
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
    primaryColor = '#1a202c',
    secondaryColor = '#4a5568',
  } = props;

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '15px',
        lineHeight: '1.6',
        color: primaryColor,
        maxWidth: '450px',
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <tbody>
        {/* Name and title section */}
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: primaryColor,
                marginBottom: '4px',
                letterSpacing: '-0.3px',
              }}
            >
              {displayName}
              {title && (
                <span
                  style={{
                    color: secondaryColor,
                    fontSize: '16px',
                    fontWeight: '500',
                    marginLeft: '8px',
                  }}
                >
                  | {title}
                </span>
              )}
            </div>
            {company && (
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: primaryColor,
                  marginBottom: '2px',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${primaryColor}20`,
                }}
              >
                {company}
              </div>
            )}
          </td>
        </tr>

        {/* Contact information section */}
        <tr>
          <td style={{ paddingBottom: '12px' }}>
            <div style={{ fontSize: '15px', lineHeight: '1.8' }}>
              {/* Email and Website on same row */}
              <div style={{ marginBottom: '6px' }}>
                <span style={{ color: secondaryColor, marginRight: '8px' }}>📧</span>
                <a
                  href={`mailto:${displayEmail}`}
                  style={{
                    color: primaryColor,
                    textDecoration: 'none',
                    fontWeight: '500',
                    borderBottom: `1px solid transparent`,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderBottom = `1px solid ${primaryColor}`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid transparent';
                  }}
                >
                  {displayEmail}
                </a>
                {website && (
                  <>
                    <span style={{ color: secondaryColor, margin: '0 8px' }}> | </span>
                    <span style={{ color: secondaryColor, marginRight: '8px' }}>🌐</span>
                    <a
                      href={website.startsWith('http') ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: primaryColor,
                        textDecoration: 'none',
                        fontWeight: '500',
                        borderBottom: `1px solid transparent`,
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderBottom = `1px solid ${primaryColor}`;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid transparent';
                      }}
                    >
                      {website.replace(/^https?:\/\//, '')}
                    </a>
                  </>
                )}
              </div>

              {/* Phone */}
              {phone && (
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ color: secondaryColor, marginRight: '8px' }}>📞</span>
                  <a
                    href={`tel:${phone}`}
                    style={{
                      color: primaryColor,
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                  >
                    {phone}
                  </a>
                </div>
              )}

              {/* Address */}
              {address && (
                <div style={{ marginBottom: '6px' }}>
                  <span style={{ color: secondaryColor, marginRight: '8px' }}>📍</span>
                  <span style={{ color: secondaryColor, fontSize: '14px' }}>{address}</span>
                </div>
              )}
            </div>
          </td>
        </tr>

        {/* Logo section */}
        {logoData && (
          <tr>
            <td style={{ paddingTop: '8px' }}>
              <img
                src={logoData}
                alt="Company Logo"
                style={{
                  maxWidth: '90px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px',
                }}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// Define comprehensive metadata for the template
const classicMetadata: TemplateMetadata = {
  id: 'classic',
  name: 'Classic Professional',
  description: 'A modernized traditional layout with clean typography and generous spacing',
  category: 'professional',
  tags: ['traditional', 'vertical', 'clean', 'modern', 'professional'],
  version: '2.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Classic.metadata = classicMetadata;
