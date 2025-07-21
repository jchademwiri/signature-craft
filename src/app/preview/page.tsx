'use client';

import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { TEMPLATES } from "@/components/signature/templates";
import { TemplateComponent, TemplateProps } from "@/components/signature/templates/types";

const isDev = process.env.NODE_ENV === "development";

const sidebarItems = [
  { label: "Classic", id: "classic" },
  { label: "Modern", id: "modern" },
  { label: "Minimal", id: "minimal" },
];

const mockData: TemplateProps = {
  name: "Jane Doe",
  title: "Product Manager",
  company: "Acme Corp",
  email: "jane.doe@acme.com",
  phone: "+1 (555) 123-4567",
  website: "www.acme.com",
  logoData: "/logo.svg",
  primaryColor: "#1a73e8",
  secondaryColor: "#5f6368",
};

export default function Preview() {
  const { data: session, isPending } = useSession();
  const [selected, setSelected] = useState<string>(sidebarItems[0].id);

  if (!isDev && !isPending && !session) {
    return (
      <main className="flex items-center justify-center min-h-[60vh] bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Access Restricted</h1>
          <p className="text-gray-600">You must be signed in to access the preview environment.</p>
        </div>
      </main>
    );
  }

  const Template: TemplateComponent = TEMPLATES[selected];

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r p-6 flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Templates</h2>
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded focus:outline-none transition-colors ${
                    selected === item.id
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSelected(item.id)}
                  aria-current={selected === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Preview Area */}
      <section className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Email Signature Preview</h1>
        <div className="border rounded-lg p-6 bg-white shadow-sm min-h-[300px] flex flex-col items-center justify-center">
          <Template {...mockData} />
          <span className="mt-4 text-gray-500 text-sm">This is a live preview of the <b>{Template.metadata.name}</b> template.</span>
        </div>
      </section>
    </main>
  );
}