---
inclusion: fileMatch
fileMatchPattern: "**/preview/**"
---

# SignatureCraft Template Preview Environment Guidelines

## Preview Environment Architecture

### Core Components
- **Preview Page**: Main page with layout and state management
- **Template Sidebar**: Navigation for template selection
- **Preview Panel**: Display area with tabs for different views
- **Sample Data Form**: Form for editing test data
- **Export Test Panel**: Tools for testing export functionality

### Page Structure
```tsx
// src/app/preview/page.tsx
export default function PreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [sampleData, setSampleData] = useState(defaultSampleData);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {/* Left sidebar - 1/4 width */}
      <div className="lg:col-span-1">
        <TemplateSidebar 
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
      </div>
      
      {/* Main content area - 3/4 width */}
      <div className="lg:col-span-3">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="data">Test Data</TabsTrigger>
            <TabsTrigger value="export">Export Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            <TemplatePreviewArea 
              templateId={selectedTemplate}
              data={sampleData}
            />
          </TabsContent>
          
          <TabsContent value="data">
            <SampleDataForm
              data={sampleData}
              onChange={setSampleData}
            />
          </TabsContent>
          
          <TabsContent value="export">
            <ExportTestPanel
              templateId={selectedTemplate}
              data={sampleData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

## Template Sidebar Component

### Features
- List all available templates from registry
- Show template name and description
- Highlight currently selected template
- Include mini preview of each template
- Allow template selection via click

```tsx
// src/components/preview/TemplateSidebar.tsx
interface TemplateSidebarProps {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
}

export function TemplateSidebar({
  selectedTemplate,
  onSelectTemplate
}: TemplateSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates</CardTitle>
        <CardDescription>Select a template to preview</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {Object.values(TEMPLATES).map((Template) => (
            <div
              key={Template.metadata.id}
              className={cn(
                "p-3 cursor-pointer hover:bg-accent",
                selectedTemplate === Template.metadata.id && "bg-accent"
              )}
              onClick={() => onSelectTemplate(Template.metadata.id)}
            >
              <div className="font-medium">{Template.metadata.name}</div>
              <div className="text-xs text-muted-foreground">
                {Template.metadata.description}
              </div>
              <div className="mt-2 border rounded p-2 bg-card text-xs">
                <Template {...miniPreviewData} showMobile={false} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

## Template Preview Area Component

### Features
- Display selected template with sample data
- Toggle between desktop and mobile views
- Show template metadata and documentation
- Include responsive preview container
- Handle template rendering errors

```tsx
// src/components/preview/TemplatePreviewArea.tsx
interface TemplatePreviewAreaProps {
  templateId: string;
  data: TemplateProps;
}

export function TemplatePreviewArea({
  templateId,
  data
}: TemplatePreviewAreaProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const Template = getTemplateById(templateId);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{Template.metadata.name}</CardTitle>
          <CardDescription>{Template.metadata.description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("desktop")}
          >
            <Monitor className="h-4 w-4 mr-1" />
            Desktop
          </Button>
          <Button
            variant={viewMode === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("mobile")}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "border rounded-md p-4 bg-white",
          viewMode === "mobile" && "max-w-[375px] mx-auto"
        )}>
          <ErrorBoundary FallbackComponent={TemplateErrorFallback}>
            <Template {...data} showMobile={viewMode === "mobile"} />
          </ErrorBoundary>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Sample Data Form Component

### Features
- Form for editing all template properties
- Real-time updates to preview
- Color pickers for brand colors
- Logo upload and preview
- Preset sample data options

```tsx
// src/components/preview/SampleDataForm.tsx
interface SampleDataFormProps {
  data: TemplateProps;
  onChange: (data: TemplateProps) => void;
}

export function SampleDataForm({
  data,
  onChange
}: SampleDataFormProps) {
  const handleChange = (field: keyof TemplateProps, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };
  
  const handlePreset = (preset: "full" | "minimal" | "noLogo") => {
    onChange(presetData[preset]);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Data</CardTitle>
        <CardDescription>Edit sample data for template preview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={() => handlePreset("full")}>
              Full Data
            </Button>
            <Button size="sm" variant="outline" onClick={() => handlePreset("minimal")}>
              Minimal Data
            </Button>
            <Button size="sm" variant="outline" onClick={() => handlePreset("noLogo")}>
              No Logo
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={data.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            
            {/* Additional form fields */}
            
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: data.primaryColor }}
                />
                <Input
                  id="primaryColor"
                  type="color"
                  value={data.primaryColor || "#000000"}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Export Test Panel Component

### Features
- Test export functionality for different email clients
- Display generated HTML for inspection
- Include clipboard copy functionality
- Show success/error messages
- Provide email client setup instructions

```tsx
// src/components/preview/ExportTestPanel.tsx
interface ExportTestPanelProps {
  templateId: string;
  data: TemplateProps;
}

export function ExportTestPanel({
  templateId,
  data
}: ExportTestPanelProps) {
  const [activeTab, setActiveTab] = useState<"gmail" | "outlook" | "apple" | "html">("gmail");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCopy = async (format: "gmail" | "outlook" | "apple" | "html") => {
    try {
      setIsLoading(true);
      // Generate export format
      const html = await generateExportFormat(templateId, data, format);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(html);
      
      // Show success message
      toast({
        title: "Copied to clipboard",
        description: `${format} format copied successfully`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Test</CardTitle>
        <CardDescription>Test signature export for different email clients</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="apple">Apple Mail</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gmail">
            <div className="space-y-4">
              <div className="text-sm">
                Test Gmail export format with copy to clipboard
              </div>
              <Button
                onClick={() => handleCopy("gmail")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Copying...
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy for Gmail
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          {/* Similar content for other tabs */}
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

## Development Workflow

### Template Development Process
1. Create new template component in `src/components/signature/templates/`
2. Add metadata to template component
3. Register template in `src/components/signature/templates/index.ts`
4. Open preview environment at `/preview`
5. Test template with various data configurations
6. Verify email client compatibility
7. Update template as needed

### Testing Checklist
- Test with complete data set
- Test with minimal required fields
- Test with missing optional fields
- Test with very long text values
- Test with special characters
- Test in desktop and mobile views
- Test export in all supported email clients
- Verify error handling works correctly

### Access Control
- Preview environment should be accessible only in development
- In production, restrict access to authenticated users with admin role
- Include environment check in page component
- Add proper route protection in middleware