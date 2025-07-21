import { TemplateProps, TemplateComponent, TemplateMetadata } from "./types";
import { ReactElement } from "react";

/**
 * Classic email signature template
 * A traditional signature layout with contact details stacked vertically
 */
export const Classic: TemplateComponent = (props: TemplateProps): ReactElement => {
  const {
    name,
    title,
    company,
    email,
    phone,
    website,
    logoData,
    primaryColor = "#000000",
    secondaryColor = "#666666",
  } = props;
  
  // Error handling for required fields
  if (!name || !email) {
    console.error("Classic template: Name and email are required fields");
  }
  
  return (
    <section id="classic">
      <div className="text-xs space-y-1" style={{ color: primaryColor }}>
        <div><strong>{name}</strong>{title ? ` | ${title}` : ""}</div>
        {company && <div><strong>{company}</strong></div>}
        <div>
          {email && <span> {email} </span>}
          {phone && <span>|  {phone}</span>}
        </div>
        {website && <div> {website}</div>}
        {logoData && (
          <div>
            <img 
              src={logoData} 
              alt="Logo" 
              style={{ maxWidth: "100px", maxHeight: "50px" }} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

// Define comprehensive metadata for the template
const classicMetadata: TemplateMetadata = {
  id: "classic",
  name: "Classic",
  description: "A traditional signature layout with contact details stacked vertically",
  category: "professional",
  tags: ["traditional", "vertical", "simple"],
  version: "1.0.0",
  author: {
    name: "SignatureCraft Team"
  }
};

// Attach metadata to the component
Classic.metadata = classicMetadata;
