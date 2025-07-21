import React from 'react';
import { render } from '@testing-library/react';
import { Classic } from '../classic';

describe('Template Error Handling', () => {
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    console.error = jest.fn();
  });
  
  afterEach(() => {
    console.error = originalConsoleError;
  });
  
  test('Classic template logs error when required props are missing', () => {
    // @ts-ignore - Intentionally passing invalid props for testing
    render(<Classic />);
    expect(console.error).toHaveBeenCalled();
    
    // @ts-ignore - Intentionally passing invalid props for testing
    render(<Classic name="John Doe" />);
    expect(console.error).toHaveBeenCalled();
    
    // @ts-ignore - Intentionally passing invalid props for testing
    render(<Classic email="john@example.com" />);
    expect(console.error).toHaveBeenCalled();
  });
  
  test('Classic template renders even with missing props', () => {
    // @ts-ignore - Intentionally passing invalid props for testing
    const { container } = render(<Classic />);
    expect(container.querySelector('#classic')).toBeInTheDocument();
  });
});