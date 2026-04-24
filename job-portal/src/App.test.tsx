import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders instagram style preview content', () => {
  render(<App />);
  expect(screen.getAllByText('ai.favmag').length).toBeGreaterThan(0);
  expect(screen.getByText('내 스토리')).toBeInTheDocument();
  expect(screen.getByText('AI Fav Mag')).toBeInTheDocument();
});
