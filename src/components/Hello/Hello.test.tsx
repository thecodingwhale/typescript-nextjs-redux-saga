import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

import '@testing-library/jest-dom';

describe('<Hello />', () => {
  test('should return Hello, Stranger as default when called', async () => {
    const testMessage = 'Hello, Stranger';
    render(<Hello />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test('should return Hello, John Wick! if props.name is set', async () => {
    const testMessage = 'Hello, John Wick!';
    render(<Hello name="John Wick!" />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
