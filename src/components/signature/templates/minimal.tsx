import { TemplateProps, TemplateComponent } from "./types";

export const Minimal: TemplateComponent = (props: TemplateProps) => {
  const {
    name,
    title,
    company,
    email,
    phone,
    primaryColor = "#000000",
    secondaryColor = "#666666",
  } = props;
  
  return (
    <section id="minimal">
      <div style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}>
        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{name}</div>
        {(title || company) && (
          <div style={{ color: secondaryColor, fontSize: "12px" }}>
            {title}{company ? `, ${company}` : ""}
          </div>
        )}
        <div style={{ fontSize: "12px", color: secondaryColor }}>
          {email}{phone ? ` | ${phone}` : ""}
        </div>
      </div>
    </section>
  );
};

// Add metadata to the component
Minimal.metadata = {
  id: "minimal",
  name: "Minimal",
  description: "A clean, simple signature with just the essential information",
};
