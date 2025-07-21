import { render, screen } from "@testing-library/react";
import { Minimal } from "../minimal";
import { TemplateProps } from "../types";

describe("Minimal Template", () => {
  const minimalProps: TemplateProps = {
    name: "John Doe",
    email: "john@example.com",
  };

  test("renders with minimal required props", () => {
    render(<Minimal {...minimalProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  test("renders with all props", () => {
    const fullProps: TemplateProps = {
      name: "John Doe",
      title: "Software Engineer",
      company: "Tech Company",
      email: "john@example.com",
      phone: "+27 123 456 7890",
      website: "www.example.com",
      logoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
      primaryColor: "#2563eb",
      secondaryColor: "#64748b",
    };

    render(<Minimal {...fullProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer, Tech Company/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+27 123 456 7890/i)).toBeInTheDocument();
    // Website should not be displayed in minimal template
    expect(screen.queryByText(/www\.example\.com/i)).not.toBeInTheDocument();
    // Logo should not be displayed in minimal template
    expect(screen.queryByAltText("Logo")).not.toBeInTheDocument();
  });

  test("renders with title but no company", () => {
    const props: TemplateProps = {
      name: "John Doe",
      title: "Software Engineer",
      email: "john@example.com",
      phone: "+27 123 456 7890",
    };

    render(<Minimal {...props} />);
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.queryByText(/,/i)).not.toBeInTheDocument();
  });

  test("renders with company but no title", () => {
    const props: TemplateProps = {
      name: "John Doe",
      company: "Tech Company",
      email: "john@example.com",
      phone: "+27 123 456 7890",
    };

    render(<Minimal {...props} />);
    expect(screen.getByText(/Tech Company/i)).toBeInTheDocument();
    expect(screen.queryByText(/,/i)).not.toBeInTheDocument();
  });

  test("renders with only email (no phone)", () => {
    const props: TemplateProps = {
      name: "John Doe",
      title: "Software Engineer",
      company: "Tech Company",
      email: "john@example.com",
    };

    render(<Minimal {...props} />);
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.queryByText(/\|/i)).not.toBeInTheDocument();
  });

  test("renders with only phone (no email - edge case)", () => {
    const props: TemplateProps = {
      name: "John Doe",
      title: "Software Engineer",
      company: "Tech Company",
      email: "", // Empty email to test edge case
      phone: "+27 123 456 7890",
    };

    render(<Minimal {...props} />);
    expect(screen.getByText(/\+27 123 456 7890/i)).toBeInTheDocument();
    expect(screen.queryByText(/\|/i)).not.toBeInTheDocument();
  });

  test("has proper metadata", () => {
    expect(Minimal.metadata).toBeDefined();
    expect(Minimal.metadata.id).toBe("minimal");
    expect(Minimal.metadata.name).toBe("Minimal");
    expect(Minimal.metadata.description).toBeTruthy();
    expect(Minimal.metadata.category).toBe("minimal");
    expect(Minimal.metadata.tags).toContain("clean");
    expect(Minimal.metadata.tags).toContain("simple");
    expect(Minimal.metadata.tags).toContain("essential");
    expect(Minimal.metadata.version).toBeTruthy();
    expect(Minimal.metadata.author).toBeDefined();
    expect(Minimal.metadata.author?.name).toBeTruthy();
  });
});