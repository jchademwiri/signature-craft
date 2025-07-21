import { TemplateProps, TemplateComponent } from "./types";

export const Classic: TemplateComponent = (props: TemplateProps) => {
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

// Add metadata to the component
Classic.metadata = {
  id: "classic",
  name: "Classic",
  description: "A traditional signature layout with contact details stacked vertically",
};
