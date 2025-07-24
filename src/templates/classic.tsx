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
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        lineHeight: '1.4',
        color: primaryColor,
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        padding: '8px',
      }}
    >
      <tbody>
        {/* Name, title, company */}
        <tr>
          <td style={{ paddingBottom: '3px' }}>
            <strong style={{ fontSize: '15px', color: primaryColor }}>{displayName}</strong>
            {title && <span style={{ color: secondaryColor, fontSize: '13px' }}> | {title}</span>}
          </td>
        </tr>
        {company && (
          <tr>
            <td style={{ paddingBottom: '3px' }}>
              <strong style={{ fontSize: '13px' }}>{company}</strong>
            </td>
          </tr>
        )}
        {/* Contact info */}
        <tr>
          <td style={{ color: secondaryColor, fontSize: '12px', paddingBottom: '3px' }}>
            📧{' '}
            <a
              href={`mailto:${displayEmail}`}
              style={{ color: primaryColor, textDecoration: 'none' }}
            >
              {displayEmail}
            </a>
            {phone && (
              <>
                {' | '}📞{' '}
                <a href={`tel:${phone}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                  {phone}
                </a>
              </>
            )}
          </td>
        </tr>
        {website && (
          <tr>
            <td style={{ color: secondaryColor, fontSize: '12px', paddingBottom: '3px' }}>
              🌐{' '}
              <a
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: primaryColor, textDecoration: 'none' }}
              >
                {website}
              </a>
            </td>
          </tr>
        )}
        {address && (
          <tr>
            <td style={{ color: secondaryColor, fontSize: '12px', paddingBottom: '3px' }}>
              📍 <span style={{ color: primaryColor }}>{address}</span>
            </td>
          </tr>
        )}
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
