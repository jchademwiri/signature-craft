import React from 'react';
import { Button, Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export const PasswordResetEmail = ({
  name = 'John Doe',
  resetUrl = 'https://signaturecraft.example.com/reset-password?token=123',
}: PasswordResetEmailProps) => {
  
  
  return (
    <EmailLayout 
      preview="Reset your SignatureCraft password"
     
    >
      <Section>
        <Heading className="text-2xl font-bold text-center my-6">
          Password Reset Request
        </Heading>
        
        <Text className="text-base">
          Hi {name},
        </Text>
        
        <Text className="text-base">
          We received a request to reset your password for your SignatureCraft account.
          If you didn't make this request, you can safely ignore this email.
        </Text>
        
        <Text className="text-base">
          To reset your password, click the button below:
        </Text>
        
        <Section className="text-center my-8">
          <Button
            href={resetUrl}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded"
          >
            Reset Password
          </Button>
        </Section>
        
        <Text className="text-base">
          This link will expire in 24 hours. If you need a new reset link, please visit our
          login page and click "Forgot Password".
        </Text>
        
        <Text className="text-base mt-6">
          Best regards,<br />
          The SignatureCraft Team
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default PasswordResetEmail;