'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SignatureData } from './SignatureBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone } from 'lucide-react';

interface SignaturePreviewProps {
  data: SignatureData;
  onSave?: () => void;
  isSaving?: boolean;
}

export function SignaturePreview({ data, onSave, isSaving }: SignaturePreviewProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const generateSignatureHTML = (isMobile: boolean = false) => {
    const {
      name,
      title,
      company,
      email,
      phone,
      website,
      logoData,
      templateId,
      primaryColor,
      secondaryColor,
      address,
    } = data;

    // Base styles for email compatibility
    const baseStyles = {
      fontFamily: 'Arial, sans-serif',
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.4',
      color: '#333333',
    };

    const linkStyles = {
      color: primaryColor || '#0066cc',
      textDecoration: 'none',
    };

    const secondaryTextStyles = {
      color: secondaryColor || '#004499',
    };

    switch (templateId) {
      case 'classic':
        return (
          <div style={baseStyles}>
            <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ paddingBottom: '8px' }}>
                    <strong style={{ fontSize: isMobile ? '16px' : '18px' }}>
                      {name || 'Your Name'}
                    </strong>
                    {title && <span> | {title}</span>}
                  </td>
                </tr>
                {company && (
                  <tr>
                    <td style={{ paddingBottom: '4px' }}>
                      <strong>{company}</strong>
                    </td>
                  </tr>
                )}
                {address && (
                  <tr>
                    <td style={{ paddingBottom: '4px', ...secondaryTextStyles }}>{address}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ paddingBottom: '4px' }}>
                    📧{' '}
                    <a href={`mailto:${email || 'email@company.com'}`} style={linkStyles}>
                      {email || 'email@company.com'}
                    </a>
                    {phone && (
                      <>
                        {' | '}📞{' '}
                        <a href={`tel:${phone}`} style={linkStyles}>
                          {phone}
                        </a>
                      </>
                    )}
                  </td>
                </tr>
                {website && (
                  <tr>
                    <td style={{ paddingBottom: '8px' }}>
                      🌐{' '}
                      <a href={website} style={linkStyles}>
                        {website}
                      </a>
                    </td>
                  </tr>
                )}
                {logoData && (
                  <tr>
                    <td style={{ paddingTop: '8px' }}>
                      <Image
                        src={logoData}
                        alt="Company Logo"
                        width={isMobile ? 120 : 150}
                        height={isMobile ? 60 : 75}
                        style={{
                          maxWidth: isMobile ? '120px' : '150px',
                          height: 'auto',
                          display: 'block',
                        }}
                        unoptimized
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case 'modern':
        return (
          <div style={baseStyles}>
            <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: 'top', paddingRight: logoData ? '16px' : '0' }}>
                    {logoData && (
                      <Image
                        src={logoData}
                        alt="Company Logo"
                        width={isMobile ? 60 : 80}
                        height={isMobile ? 30 : 40}
                        style={{
                          maxWidth: isMobile ? '60px' : '80px',
                          height: 'auto',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                        unoptimized
                      />
                    )}
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <strong style={{ fontSize: isMobile ? '16px' : '18px' }}>
                        {name || 'Your Name'}
                      </strong>
                    </div>
                    {(title || company) && (
                      <div style={{ marginBottom: '8px', ...secondaryTextStyles }}>
                        {title && <span>{title}</span>}
                        {title && company && <span> at </span>}
                        {company && <strong>{company}</strong>}
                      </div>
                    )}
                    {address && (
                      <div style={{ marginBottom: '8px', ...secondaryTextStyles }}>{address}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ paddingTop: '8px', borderTop: '1px solid #e0e0e0' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      📧{' '}
                      <a href={`mailto:${email || 'email@company.com'}`} style={linkStyles}>
                        {email || 'email@company.com'}
                      </a>
                      {phone && (
                        <>
                          <span style={{ color: '#ccc' }}>|</span>
                          📞{' '}
                          <a href={`tel:${phone}`} style={linkStyles}>
                            {phone}
                          </a>
                        </>
                      )}
                      {website && (
                        <>
                          <span style={{ color: '#ccc' }}>|</span>
                          🌐{' '}
                          <a href={website} style={linkStyles}>
                            {website}
                          </a>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case 'minimal':
        return (
          <div style={baseStyles}>
            <div style={{ marginBottom: '4px' }}>
              <strong style={{ fontSize: isMobile ? '16px' : '18px' }}>
                {name || 'Your Name'}
              </strong>
            </div>
            {(title || company) && (
              <div style={{ marginBottom: '4px', ...secondaryTextStyles }}>
                {title && <span>{title}</span>}
                {title && company && <span>, </span>}
                {company && <span>{company}</span>}
              </div>
            )}
            {address && (
              <div style={{ marginBottom: '4px', ...secondaryTextStyles }}>{address}</div>
            )}
            <div style={{ marginBottom: '4px' }}>
              <a href={`mailto:${email || 'email@company.com'}`} style={linkStyles}>
                {email || 'email@company.com'}
              </a>
              {phone && (
                <>
                  {' | '}
                  <a href={`tel:${phone}`} style={linkStyles}>
                    {phone}
                  </a>
                </>
              )}
            </div>
            {website && (
              <div style={{ marginBottom: '4px' }}>
                <a href={website} style={linkStyles}>
                  {website}
                </a>
              </div>
            )}
            {logoData && (
              <div style={{ marginTop: '8px' }}>
                <Image
                  src={logoData}
                  alt="Company Logo"
                  width={isMobile ? 100 : 120}
                  height={isMobile ? 50 : 60}
                  style={{
                    maxWidth: isMobile ? '100px' : '120px',
                    height: 'auto',
                    display: 'block',
                  }}
                  unoptimized
                />
              </div>
            )}
          </div>
        );

      default:
        return <div>Select a template to preview your signature</div>;
    }
  };

  const copyToClipboard = async (content: string, format: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyFeedback(`${format} signature copied to clipboard!`);
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyFeedback(`Failed to copy ${format} signature. Please try again.`);
      setTimeout(() => setCopyFeedback(null), 3000);
    }
  };

  const generateHTMLForExport = () => {
    const {
      name,
      title,
      company,
      email,
      phone,
      website,
      logoData,
      templateId,
      primaryColor,
      secondaryColor,
      address,
    } = data;

    // Generate clean HTML for email clients
    const baseStyles = `
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      color: #333333;
    `;

    switch (templateId) {
      case 'classic':
        return `<div style="${baseStyles}">
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tbody>
              <tr><td style="padding-bottom: 8px;"><strong style="font-size: 18px;">${name || 'Your Name'}</strong>${title ? ` | ${title}` : ''}</td></tr>
              ${company ? `<tr><td style="padding-bottom: 4px;"><strong>${company}</strong></td></tr>` : ''}
              ${address ? `<tr><td style="padding-bottom: 4px; color: ${secondaryColor || '#004499'};">${address}</td></tr>` : ''}
              <tr><td style="padding-bottom: 4px;">📧 <a href="mailto:${email || 'email@company.com'}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${email || 'email@company.com'}</a>${phone ? ` | 📞 <a href="tel:${phone}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${phone}</a>` : ''}</td></tr>
              ${website ? `<tr><td style="padding-bottom: 8px;">🌐 <a href="${website}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${website}</a></td></tr>` : ''}
              ${logoData ? `<tr><td style="padding-top: 8px;"><img src="${logoData}" alt="Company Logo" style="max-width: 150px; height: auto; display: block;" /></td></tr>` : ''}
            </tbody>
          </table>
        </div>`;

      case 'modern':
        return `<div style="${baseStyles}">
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="vertical-align: top; padding-right: ${logoData ? '16px' : '0'};">
                  ${logoData ? `<img src="${logoData}" alt="Company Logo" style="max-width: 80px; height: auto; display: block; margin-bottom: 8px;" />` : ''}
                </td>
                <td style="vertical-align: top;">
                  <div style="margin-bottom: 4px;"><strong style="font-size: 18px;">${name || 'Your Name'}</strong></div>
                  ${title || company ? `<div style="margin-bottom: 8px; color: ${secondaryColor || '#004499'};">${title ? title : ''}${title && company ? ' at ' : ''}${company ? `<strong>${company}</strong>` : ''}</div>` : ''}
                  ${address ? `<div style="margin-bottom: 8px; color: ${secondaryColor || '#004499'};">${address}</div>` : ''}
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top: 8px; border-top: 1px solid #e0e0e0;">
                  <div>📧 <a href="mailto:${email || 'email@company.com'}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${email || 'email@company.com'}</a>${phone ? ` <span style="color: #ccc;">|</span> 📞 <a href="tel:${phone}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${phone}</a>` : ''}${website ? ` <span style="color: #ccc;">|</span> 🌐 <a href="${website}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${website}</a>` : ''}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>`;

      case 'minimal':
        return `<div style="${baseStyles}">
          <div style="margin-bottom: 4px;"><strong style="font-size: 18px;">${name || 'Your Name'}</strong></div>
          ${title || company ? `<div style="margin-bottom: 4px; color: ${secondaryColor || '#004499'};">${title ? title : ''}${title && company ? ', ' : ''}${company ? company : ''}</div>` : ''}
          ${address ? `<div style="margin-bottom: 4px; color: ${secondaryColor || '#004499'};">${address}</div>` : ''}
          <div style="margin-bottom: 4px;"><a href="mailto:${email || 'email@company.com'}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${email || 'email@company.com'}</a>${phone ? ` | <a href="tel:${phone}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${phone}</a>` : ''}</div>
          ${website ? `<div style="margin-bottom: 4px;"><a href="${website}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${website}</a></div>` : ''}
          ${logoData ? `<div style="margin-top: 8px;"><img src="${logoData}" alt="Company Logo" style="max-width: 120px; height: auto; display: block;" /></div>` : ''}
        </div>`;

      default:
        return '';
    }
  };

  const handleCopyForOutlook = () => {
    const htmlContent = generateHTMLForExport();
    copyToClipboard(htmlContent, 'Outlook');
  };

  const handleCopyForGmail = () => {
    const htmlContent = generateHTMLForExport();
    copyToClipboard(htmlContent, 'Gmail');
  };

  const handleCopyHTML = () => {
    const htmlContent = generateHTMLForExport();
    copyToClipboard(htmlContent, 'HTML');
  };

  const handleDownloadPNG = () => {
    // TODO: Implement PNG download functionality
    console.log('Download PNG functionality to be implemented');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="desktop" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 lg:h-10">
          <TabsTrigger
            value="desktop"
            className="flex items-center gap-2 text-xs lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            className="flex items-center gap-2 text-xs lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="desktop" className="mt-4">
          <Card className="p-4 bg-white border-2 border-dashed border-gray-200">
            <div className="min-h-[200px]">{generateSignatureHTML(false)}</div>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="mt-4">
          <Card className="p-4 bg-white border-2 border-dashed border-gray-200 max-w-sm mx-auto">
            <div className="min-h-[200px]">{generateSignatureHTML(true)}</div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Section */}
      {onSave && (
        <div className="space-y-4">
          <Button
            onClick={onSave}
            disabled={isSaving || !data.name || !data.email}
            className="w-full h-12 lg:h-11 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-white"
            size="lg"
            aria-label="Save your email signature"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>💾 Save Signature</>
            )}
          </Button>
          {(!data.name || !data.email) && (
            <p className="text-xs text-muted-foreground text-center">
              Please fill in your name and email to save
            </p>
          )}
        </div>
      )}

      {/* Export Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Export Your Signature</h3>

        {/* Export Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopyForOutlook}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature for Microsoft Outlook"
          >
            📧 Copy for Outlook
          </Button>
          <Button
            onClick={handleCopyForGmail}
            variant="outline"
            className="w-full h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature for Gmail"
          >
            📧 Copy for Gmail
          </Button>
          <Button
            onClick={handleCopyHTML}
            variant="outline"
            className="w-full h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature as HTML code"
          >
            📋 Copy HTML
          </Button>
          <Button
            onClick={handleDownloadPNG}
            variant="outline"
            className="w-full h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Download signature as PNG image"
          >
            📥 Download PNG
          </Button>
        </div>

        {/* Quick Setup Instructions */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-medium text-primary mb-3">Quick Setup:</h4>
            <div className="space-y-2 text-sm text-primary/80">
              <div>
                <strong>• Outlook:</strong> Copy for Outlook → Paste in Settings → Mail → Signatures
              </div>
              <div>
                <strong>• Gmail:</strong> Copy for Gmail → Paste in Settings → General → Signature
              </div>
              <div>
                <strong>• Apple Mail:</strong> Use Copy for Gmail → Paste in Preferences →
                Signatures
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        This preview shows how your signature will appear in email clients
      </p>

      {/* Copy Feedback Notification */}
      {copyFeedback && (
        <div
          role="alert"
          className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 max-w-sm"
        >
          {copyFeedback}
        </div>
      )}
    </div>
  );
}
