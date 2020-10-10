import React from 'react';
import { render, screen, fireEvent, waitForElement } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'

import App from './App';

test('app renders without crashing', () => {
  render(<App />);
  expect(screen.getByText('Checkout Calculator')).toBeInTheDocument();
});

test('product database can be fetched', async () => {
  render(<App />);
  await waitForElement(() => screen.getByText('Water'));
});
