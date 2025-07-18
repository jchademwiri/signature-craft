import React from 'react';
import { Button, Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

interface SubscriptionUpdateEmailProps {
  name: string;
  planName: string;
  planPrice: string;
  billingDate: string;
  accountUrl: string;
}

export const SubscriptionUpdateEmail = ({
  name = 'John Doe',
  planName = 'Pro',
  planPrice = 'R99/month',
  billingDate = 'August 15, 2025',
  accountUrl = 'https://signaturecraft.example.com/account/billing',
}: SubscriptionUpdateEmailProps) => {
  
  
  return (
    <EmailLayout 
      preview={`Your SignatureCraft ${planName} subscription is active`}
    >
      <Section>
        <Heading className="text-2xl font-bold text-center my-6">
          Subscription Confirmation
        </Heading>
        
        <Text className="text-base">
          Hi {name},
        </Text>
        
        <Text className="text-base">
          Thank you for subscribing to SignatureCraft <strong>{planName}</strong> plan! 
          Your subscription is now active, and you have access to all the premium features.
        </Text>
        
        <Section className="border border-solid border-gray-200 rounded p-4 my-4">
          <Text className="text-base font-bold">Subscription Details:</Text>
          <Text className="text-base">Plan: {planName}</Text>
          <Text className="text-base">Price: {planPrice}</Text>
          <Text className="text-base">Next billing date: {billingDate}</Text>
        </Section>
        
        <Text className="text-base">
          You can manage your subscription, update payment details, or view billing history 
          from your account settings.
        </Text>
        
        <Section className="text-center my-8">
          <Button
            href={accountUrl}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded"
          >
            Manage Subscription
          </Button>
        </Section>
        
        <Text className="text-base mt-6">
          Best regards,<br />
          The SignatureCraft Team
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default SubscriptionUpdateEmail;