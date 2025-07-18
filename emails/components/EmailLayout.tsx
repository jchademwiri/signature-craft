import React from 'react';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Img,
} from '@react-email/components';

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
  logoUrl?: string;
}

export const EmailLayout = ({ preview, children, logoUrl }: EmailLayoutProps) => {
  // Use the provided logoUrl or fallback to default
  logoUrl = 'https://signature-craft-seven.vercel.app/logo.svg'
  const finalLogoUrl = logoUrl || 'https://placehold.co/200x50/3B82F6/FFFFFF?text=SignatureCraft&font=poppins';
  
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Section className="mt-4">
              <Img
                src={finalLogoUrl}
                width="200"
                height="50"
                alt="SignatureCraft"
                className="mx-auto"
              />
            </Section>
            
            {children}
            
            <Section className="mt-8 text-center text-[#666666] text-xs">
              <Text>© {new Date().getFullYear()} SignatureCraft. All rights reserved.</Text>
              <Text>
                <a href="https://signaturecraft.example.com" className="text-blue-600 underline">
                  signaturecraft.example.com
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;