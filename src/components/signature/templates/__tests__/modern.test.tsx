import React from "react";
import { render, screen } from "@testing-library/react";
import { Modern } from "../modern";
import { TemplateProps } from "../types";

describe("Modern Template", () => {
  const defaultProps: TemplateProps = {
    name: "John Doe",
    email: "john@example.com",
  };

  test("renders with minimal required props", () => {
    render(<Modern {...defaultProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  test("renders with all props", () => {
    const fullProps: TemplateProps = {
      ...defaultProps,
      title: "Software Engineer",
      company: "Tech Company",
      phone: "+27 123 456 7890",
      website: "www.example.com",
      logoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      primaryColor: "#112233",
      secondaryColor: "#445566",
    };

    render(<Modern {...fullProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer at Tech Company/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+27 123 456 7890/i)).toBeInTheDocument();
    expect(screen.getByText(/www\.example\.com/i)).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  test("renders with title but no company", () => {
    const props: TemplateProps = {
      ...defaultProps,
      title: "Software Engineer",
    };

    render(<Modern {...props} />);
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.queryByText(/at/i)).not.toBeInTheDocument();
  });

  test("renders with company but no title", () => {
    const props: TemplateProps = {
      ...defaultProps,
      company: "Tech Company",
    };

    render(<Modern {...props} />);
    expect(screen.getByText(/Tech Company/i)).toBeInTheDocument();
    expect(screen.queryByText(/at/i)).not.toBeInTheDocument();
  });

  test("has proper metadata", () => {
    expect(Modern.metadata).toBeDefined();
    expect(Modern.metadata.id).toBe("modern");
    expect(Modern.metadata.name).toBe("Modern");
    expect(Modern.metadata.description).toBeTruthy();
    expect(Modern.metadata.category).toBe("professional");
    expect(Modern.metadata.tags).toContain("contemporary");
    expect(Modern.metadata.version).toBeTruthy();
    expect(Modern.metadata.author).toBeDefined();
    expect(Modern.metadata.author.name).toBeTruthy();
  });
});
