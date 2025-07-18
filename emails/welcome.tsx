import React from 'react';
import { Button, Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface WelcomeEmailProps {
  name: string;
  verificationUrl: string;
}

export const WelcomeEmail = ({
  name = 'John Doe',
  verificationUrl = 'https://signaturecraft.example.com/verify?token=123',
}: WelcomeEmailProps) => {
  
  return (
    <EmailLayout 
      preview="Welcome to SignatureCraft!"
     
    >
      <Section>
        <Heading className="text-2xl font-bold text-center my-6">
          Welcome to SignatureCraft!
        </Heading>
        
        <Text className="text-base">
          Hi {name},
        </Text>
        
        <Text className="text-base">
          Thank you for signing up for SignatureCraft! We're excited to have you on board.
          With SignatureCraft, you can create professional email signatures that will make
          your emails stand out.
        </Text>
        
        <Text className="text-base">
          To get started, please verify your email address by clicking the button below:
        </Text>
        
        <Section className="text-center my-8">
          <Button
            href={verificationUrl}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded"
          >
            Verify Email Address
          </Button>
        </Section>
        
        <Text className="text-base">
          If you didn't create an account with us, you can safely ignore this email.
        </Text>
        
        <Text className="text-base mt-6">
          Best regards,<br />
          The SignatureCraft Team
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default WelcomeEmail;