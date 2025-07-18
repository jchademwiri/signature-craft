import React from 'react';
import { Button, Heading, Section, Text } from '@react-email/components';
import EmailLayout from './components/EmailLayout';


interface TeamInvitationEmailProps {
  inviteeEmail: string;
  teamName: string;
  inviterName: string;
  invitationUrl: string;
}

export const TeamInvitationEmail = ({
  inviteeEmail = 'colleague@example.com',
  teamName = 'Acme Inc',
  inviterName = 'Jane Smith',
  invitationUrl = 'https://signaturecraft.example.com/invitations/accept?token=123',
}: TeamInvitationEmailProps) => {
  return (
    <EmailLayout
    preview={`You've been invited to join ${teamName} on SignatureCraft`}
  
    >
      <Section>
        <Heading className="text-2xl font-bold text-center my-6">
          Team Invitation
        </Heading>
        
        <Text className="text-base">
          Hello,
        </Text>
        
        <Text className="text-base">
          <strong>{inviterName}</strong> has invited you ({inviteeEmail}) to join their team 
          <strong> {teamName}</strong> on SignatureCraft.
        </Text>
        
        <Text className="text-base">
          SignatureCraft helps teams create and manage professional email signatures with 
          consistent branding across your organization.
        </Text>
        
        <Section className="text-center my-8">
          <Button
            href={invitationUrl}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded"
          >
            Accept Invitation
          </Button>
        </Section>
        
        <Text className="text-base">
          This invitation will expire in 7 days. If you have any questions, please contact 
          the person who invited you.
        </Text>
        
        <Text className="text-base mt-6">
          Best regards,<br />
          The SignatureCraft Team
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default TeamInvitationEmail;