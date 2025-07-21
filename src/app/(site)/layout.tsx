import SiteNavigation from '@/components/navigation/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignatureCraft | Professional Email Signatures',
  description:
    'Create, customize, and deploy professional email signatures with logos, social links, and banners.',
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNavigation />
      {children}
    </>
  );
}
