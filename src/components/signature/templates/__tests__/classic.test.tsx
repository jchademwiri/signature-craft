import React from 'react';
import { render, screen } from '@testing-library/react';
import { Classic } from '../classic';
import { TemplateProps } from '../types';

describe('Classic Template', () => {
  const defaultProps: TemplateProps = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  test('renders with minimal required props', () => {
    render(<Classic {...defaultProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  test('renders with all props', () => {
    const fullProps: TemplateProps = {
      ...defaultProps,
      title: 'Software Engineer',
      company: 'Tech Company',
      phone: '+27 123 456 7890',
      website: 'www.example.com',
      logoData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      primaryColor: '#112233',
      secondaryColor: '#445566',
    };

    render(<Classic {...fullProps} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Company/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+27 123 456 7890/i)).toBeInTheDocument();
    expect(screen.getByText(/www\.example\.com/i)).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  test('has proper metadata', () => {
    expect(Classic.metadata).toBeDefined();
    expect(Classic.metadata.id).toBe('classic');
    expect(Classic.metadata.name).toBe('Classic');
    expect(Classic.metadata.description).toBeTruthy();
    expect(Classic.metadata.category).toBe('professional');
    expect(Classic.metadata.tags).toContain('traditional');
    expect(Classic.metadata.version).toBeTruthy();
    expect(Classic.metadata.author).toBeDefined();
    expect(Classic.metadata.author.name).toBeTruthy();
  });
});