import { TEMPLATES } from '@/components/signature/templates';
import { TemplateProps, TemplateComponent } from '@/components/signature/templates/types';

const mockData: TemplateProps = {
  name: 'Jane Doe',
  title: 'Product Manager',
  company: 'Acme Corp',
  email: 'jane.doe@acme.com',
  phone: '+1 (555) 123-4567',
  website: 'www.acme.com',
  logoData: '/logo.svg', // Use a public logo asset or leave undefined
  primaryColor: '#1a73e8',
  secondaryColor: '#5f6368',
};

export default function TemplatesGalleryPage() {
  return (
    <main className="container mx-auto px-4 py-12 pt-20">
      <h1 className="text-3xl font-bold mb-2">Signature Template Gallery</h1>
      <p className="mb-8 text-gray-600 max-w-2xl">
        Preview all available signature templates below. Choose the style that fits you best—no
        account required!
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {Object.values(TEMPLATES).map((Template: TemplateComponent) => (
          <div
            key={Template.metadata.id}
            className="rounded-lg border shadow-sm p-6 bg-white dark:bg-zinc-900 flex flex-col items-center"
          >
            <div className="mb-4 w-full flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {Template.metadata.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm mb-2 text-center">
                {Template.metadata.description}
              </span>
            </div>
            <div className="w-full flex justify-center bg-gray-50 p-4 rounded">
              <Template {...mockData} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
