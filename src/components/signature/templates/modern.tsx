import { TemplateProps, TemplateComponent } from "./types";

export const Modern: TemplateComponent = (props: TemplateProps) => {
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
    <section id="modern">
      <table style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}>
        <tbody>
          <tr>
            {logoData && (
              <td style={{ verticalAlign: "top", paddingRight: "10px" }}>
                <img 
                  src={logoData} 
                  alt="Logo" 
                  style={{ maxWidth: "100px", maxHeight: "50px" }} 
                />
              </td>
            )}
            <td>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>{name}</div>
              {title && company && (
                <div style={{ color: secondaryColor, fontSize: "14px" }}>
                  {title} at {company}
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={logoData ? 2 : 1} style={{ paddingTop: "5px", fontSize: "12px", color: secondaryColor }}>
              {email && <span> {email} </span>}
              {phone && <span>|  {phone} </span>}
              {website && <span>|  {website}</span>}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

// Add metadata to the component
Modern.metadata = {
  id: "modern",
  name: "Modern",
  description: "A contemporary layout with logo and name side by side",
};
