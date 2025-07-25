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
  Link,
} from '@react-email/components';
import { logoUrl, baseUrl } from '@/constant';

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
  }

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  // Use the provided logoUrl or fallback to default

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
                <Link href={baseUrl} className="text-blue-600 underline">
                  {baseUrl.replace(/^https?:\/\//, '')}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;