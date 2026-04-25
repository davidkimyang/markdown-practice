import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders notes app and can create a new note', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: '메모' })).toBeInTheDocument();
  expect(screen.getByPlaceholderText('메모 검색')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: '새 메모 생성' }));

  expect(screen.getByDisplayValue('새 메모')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('여기에 메모를 작성하세요')).toBeInTheDocument();
});
