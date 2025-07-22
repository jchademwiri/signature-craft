'use client';

import { useState, useRef } from 'react';
import { SignatureData } from './SignatureBuilder';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { TEMPLATES, TemplateProps } from '@/templates';

interface SignaturePreviewProps {
  data: SignatureData;
  onSave?: () => void;
  isSaving?: boolean;
}

export function SignaturePreview({ data, onSave, isSaving }: SignaturePreviewProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const outlookRef = useRef<HTMLDivElement>(null!);
  const gmailRef = useRef<HTMLDivElement>(null!);
  const appleMailRef = useRef<HTMLDivElement>(null!);

  const generateSignatureHTML = (isMobile: boolean = false) => {
    const { templateId } = data;

    // Get the selected template component from the registry
    const SelectedTemplate = TEMPLATES[templateId];

    if (!SelectedTemplate) {
      return <div>Template not found. Please select a valid template.</div>;
    }

    // Create template props from signature data
    const templateProps: TemplateProps = {
      ...data,
      showMobile: isMobile,
    };

    // Render the selected template with the data
    return <SelectedTemplate {...templateProps} />;
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

  // Helper function to convert React component to HTML string
  // For now, we'll keep using the original HTML generation approach
  // In a production app, you would use ReactDOMServer.renderToStaticMarkup on the server side
  const generateHTMLString = (templateId: string): string => {
    const {
      name,
      title,
      company,
      email,
      phone,
      website,
      logoData,
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
      background: #ffffff;
      width: 600px;
      max-width: 100%;
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
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top: 8px; border-top: 1px solid #e0e0e0;">
                  <div>📧 <a href="mailto:${email || 'email@company.com'}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${email || 'email@company.com'}</a>${phone ? ` <span style="color: #ccc;">|</span> 📞 <a href="tel:${phone}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${phone}</a>` : ''}${website ? ` <span style="color: #ccc;">|</span> 🌐 <a href="${website}" style="color: ${primaryColor || '#0066cc'}; text-decoration: none;">${website}</a>` : ''}</div>
                </td>
              </tr>
              ${
                address
                  ? `<tr>
                <td colspan="2" style="padding-top: 6px; color: ${secondaryColor || '#004499'};">${address}</td>
              </tr>`
                  : ''
              }
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

      case 'corporate':
        return `<div style="${baseStyles}">
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <tbody>
              <tr>
                <td style="width: 120px; padding: 20px; vertical-align: top; background-color: #f8fafc; border-right: 3px solid ${primaryColor || '#2563eb'};">
                  <div style="width: 80px; height: 80px; border-radius: 50%; background-color: ${primaryColor || '#2563eb'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; margin: 0 auto; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    ${
                      logoData
                        ? `<img src="${logoData}" alt="Profile" style="width: 74px; height: 74px; border-radius: 50%; object-fit: cover;" />`
                        : `<span>${(name || 'Your Name')
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .substring(0, 2)}</span>`
                    }
                  </div>
                </td>
                <td style="padding: 20px; vertical-align: top;">
                  <div style="margin-bottom: 12px;">
                    <div style="font-size: 20px; font-weight: bold; color: ${primaryColor || '#2563eb'}; margin-bottom: 4px; line-height: 1.2;">${name || 'Your Name'}</div>
                    <div style="font-size: 14px; color: ${secondaryColor || '#64748b'}; font-weight: 500; margin-bottom: 2px;">${title || 'Your Title'}</div>
                    <div style="font-size: 14px; color: ${primaryColor || '#2563eb'}; font-weight: 600;">${company || 'Your Company'}</div>
                  </div>
                  <div style="font-size: 13px; line-height: 1.4;">
                    <div style="margin-bottom: 6px; display: flex; align-items: center;">
                      <span style="color: ${primaryColor || '#2563eb'}; margin-right: 8px; font-size: 14px;">📧</span>
                      <a href="mailto:${email || 'email@company.com'}" style="color: ${secondaryColor || '#64748b'}; text-decoration: none; font-size: 13px;">${email || 'email@company.com'}</a>
                    </div>
                    ${
                      phone
                        ? `<div style="margin-bottom: 6px; display: flex; align-items: center;">
                      <span style="color: ${primaryColor || '#2563eb'}; margin-right: 8px; font-size: 14px;">📞</span>
                      <a href="tel:${phone}" style="color: ${secondaryColor || '#64748b'}; text-decoration: none; font-size: 13px;">${phone}</a>
                    </div>`
                        : ''
                    }
                    ${
                      website
                        ? `<div style="margin-bottom: 6px; display: flex; align-items: center;">
                      <span style="color: ${primaryColor || '#2563eb'}; margin-right: 8px; font-size: 14px;">🌐</span>
                      <a href="${website.startsWith('http') ? website : `https://${website}`}" target="_blank" rel="noopener noreferrer" style="color: ${secondaryColor || '#64748b'}; text-decoration: none; font-size: 13px;">${website}</a>
                    </div>`
                        : ''
                    }
                    ${
                      address
                        ? `<div style="margin-bottom: 6px; display: flex; align-items: flex-start;">
                      <span style="color: ${primaryColor || '#2563eb'}; margin-right: 8px; font-size: 14px;">📍</span>
                      <span style="color: ${secondaryColor || '#64748b'}; font-size: 13px; line-height: 1.3;">${address}</span>
                    </div>`
                        : ''
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="height: 4px; background-color: ${primaryColor || '#2563eb'}; padding: 0;"></td>
              </tr>
            </tbody>
          </table>
        </div>`;

      default:
        return '<div>Template not found</div>';
    }
  };

  const generateHTMLForExport = () => {
    const { templateId } = data;
    return generateHTMLString(templateId);
  };

  const copyRichHTML = (ref: React.RefObject<HTMLDivElement>, label: string) => {
    if (!ref.current) return;
    const range = document.createRange();
    range.selectNodeContents(ref.current);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    try {
      document.execCommand('copy');
      setCopyFeedback(`${label} signature copied to clipboard!`);
    } catch (error) {
      setCopyFeedback(`Failed to copy ${label} signature. Please try again.`);
    }
    selection?.removeAllRanges();
    setTimeout(() => setCopyFeedback(null), 3000);
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
      {/* Hidden contenteditable divs for rich copy */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div
          ref={outlookRef}
          contentEditable
          suppressContentEditableWarning
          style={{ background: 'white' }}
        >
          {generateSignatureHTML(false)}
        </div>
        <div
          ref={gmailRef}
          contentEditable
          suppressContentEditableWarning
          style={{ background: 'white' }}
        >
          {generateSignatureHTML(false)}
        </div>
        <div
          ref={appleMailRef}
          contentEditable
          suppressContentEditableWarning
          style={{ background: 'white' }}
        >
          {generateSignatureHTML(false)}
        </div>
      </div>
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
            <div className="min-h-[200px] bg-white">{generateSignatureHTML(false)}</div>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="mt-4">
          <Card className="p-4 bg-white border-2 border-dashed border-gray-200 max-w-sm mx-auto">
            <div className="min-h-[200px] bg-white">{generateSignatureHTML(true)}</div>
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
            onClick={() => copyRichHTML(outlookRef, 'Outlook')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature for Microsoft Outlook"
          >
            📧 Copy for Outlook
          </Button>
          <Button
            onClick={() => copyRichHTML(gmailRef, 'Gmail')}
            variant="outline"
            className="w-full h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature for Gmail"
          >
            📧 Copy for Gmail
          </Button>
          <Button
            onClick={() => copyRichHTML(appleMailRef, 'Apple Mail')}
            variant="outline"
            className="w-full h-12 lg:h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Copy signature for Apple Mail"
          >
            🍏 Copy for Apple Mail
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
        {/* <Card className="bg-primary/10 border-primary/20">
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
                <strong>• Apple Mail:</strong> Copy for Apple Mail → Paste in Preferences →
                Signatures
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        This preview shows how your signature will appear in email clients
      </p>

      {/* Copy Feedback Notification */}
      {copyFeedback && (
        <div
          role="alert"
          className="fixed top-4 right-4 bg-primary text-foreground px-4 py-2 rounded-md shadow-lg z-50 animate-in slide-in-from-top-2 max-w-sm"
        >
          {copyFeedback}
        </div>
      )}
    </div>
  );
}
