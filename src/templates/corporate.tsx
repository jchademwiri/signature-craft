// src/components/signature/templates/corporate.tsx
import Image from 'next/image';
import { TemplateProps, TemplateComponent, TemplateMetadata } from './types';
import { ReactElement } from 'react';

/**
 * Corporate email signature template
 * A professional layout with circular profile image, modern typography, and corporate branding
 */
export const Corporate: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    phone,
    website,
    address,
    logoData,
    primaryColor = '#2563eb',
    secondaryColor = '#64748b',
    socialLinks,
  } = props;

  // Use default values for required fields if not provided
  const displayName = name || 'Your Name';
  const displayEmail = email || 'email@company.com';
  const displayTitle = title || 'Your Title';
  const displayCompany = company || 'Your Company';

  // Social media icons (using Unicode symbols as fallback)
  const socialIcons = {
    linkedin: '💼',
    twitter: '🐦',
    facebook: '📘',
    instagram: '📷',
    youtube: '📺',
  };

  return (
    <section id="corporate">
      <div
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          width: '600px',
          maxWidth: '100%',
          background: 'white',
          padding: '0',
          margin: '0',
        }}
      >
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            backgroundColor: '#ffffff',
            border: `1px solid #e2e8f0`,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <tbody>
            {/* Main content row */}
            <tr>
              {/* Left section with profile image */}
              <td
                style={{
                  width: '120px',
                  padding: '20px',
                  verticalAlign: 'top',
                  backgroundColor: '#f8fafc',
                  borderRight: `3px solid ${primaryColor}`,
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: primaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    margin: '0 auto',
                    border: '3px solid white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* If logoData is provided, use it as profile image, otherwise show initials */}
                  {logoData ? (
                    <Image
                      src={logoData}
                      alt="Profile"
                      width={74}
                      height={74}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                      unoptimized
                    />
                  ) : (
                    <span>
                      {displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .substring(0, 2)}
                    </span>
                  )}
                </div>
              </td>

              {/* Right section with contact info */}
              <td style={{ padding: '20px', verticalAlign: 'top' }}>
                {/* Name and title */}
                <div style={{ marginBottom: '12px' }}>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: primaryColor,
                      marginBottom: '4px',
                      lineHeight: '1.2',
                    }}
                  >
                    {displayName}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: secondaryColor,
                      fontWeight: '500',
                      marginBottom: '2px',
                    }}
                  >
                    {displayTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: primaryColor,
                      fontWeight: '600',
                    }}
                  >
                    {displayCompany}
                  </div>
                </div>

                {/* Contact information */}
                <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                  {/* Email */}
                  <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: primaryColor, marginRight: '8px', fontSize: '14px' }}>
                      📧
                    </span>
                    <a
                      href={`mailto:${displayEmail}`}
                      style={{
                        color: secondaryColor,
                        textDecoration: 'none',
                        fontSize: '13px',
                      }}
                    >
                      {displayEmail}
                    </a>
                  </div>

                  {/* Phone */}
                  {phone && (
                    <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: primaryColor, marginRight: '8px', fontSize: '14px' }}>
                        📞
                      </span>
                      <a
                        href={`tel:${phone}`}
                        style={{
                          color: secondaryColor,
                          textDecoration: 'none',
                          fontSize: '13px',
                        }}
                      >
                        {phone}
                      </a>
                    </div>
                  )}

                  {/* Website */}
                  {website && (
                    <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: primaryColor, marginRight: '8px', fontSize: '14px' }}>
                        🌐
                      </span>
                      <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: secondaryColor,
                          textDecoration: 'none',
                          fontSize: '13px',
                        }}
                      >
                        {website}
                      </a>
                    </div>
                  )}

                  {/* Address */}
                  {address && (
                    <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: primaryColor, marginRight: '8px', fontSize: '14px' }}>
                        📍
                      </span>
                      <span style={{ color: secondaryColor, fontSize: '13px', lineHeight: '1.3' }}>
                        {address}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social media links */}
                {socialLinks && Object.keys(socialLinks).some((key) => socialLinks[key]) && (
                  <div
                    style={{
                      marginTop: '15px',
                      paddingTop: '12px',
                      borderTop: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: secondaryColor, marginRight: '4px' }}>
                        Connect:
                      </span>
                      {Object.entries(socialLinks).map(([platform, url]) => {
                        if (!url) return null;
                        return (
                          <a
                            key={platform}
                            href={url.startsWith('http') ? url : `https://${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              width: '24px',
                              height: '24px',
                              backgroundColor: primaryColor,
                              borderRadius: '4px',
                              textAlign: 'center',
                              lineHeight: '24px',
                              textDecoration: 'none',
                              fontSize: '12px',
                              color: 'white',
                            }}
                          >
                            {socialIcons[platform as keyof typeof socialIcons] || '🔗'}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </td>
            </tr>

            {/* Bottom accent bar */}
            <tr>
              <td
                colSpan={2}
                style={{
                  height: '4px',
                  backgroundColor: primaryColor,
                  padding: '0',
                }}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

// Define comprehensive metadata for the template
const corporateMetadata: TemplateMetadata = {
  id: 'corporate',
  name: 'Corporate',
  description:
    'A professional corporate layout with circular profile image, modern typography, and company branding',
  category: 'professional',
  tags: ['corporate', 'professional', 'modern', 'branded', 'circular-image'],
  version: '1.0.0',
  author: {
    name: 'SignatureCraft Team',
  },
};

// Attach metadata to the component
Corporate.metadata = corporateMetadata;
