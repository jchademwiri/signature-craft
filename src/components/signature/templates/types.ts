export interface TemplateProps {
  name: string;
  title?: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  logoData?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  previewImage?: string; // Optional path to a static preview image
}

export interface TemplateComponent {
  (props: TemplateProps): JSX.Element;
  metadata: TemplateMetadata;
}
