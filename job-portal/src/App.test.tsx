import { render, screen } from '@testing-library/react';
import App from './App';

test('renders glymo studio clone layout', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: '손짓만으로 네온/오로라 드로잉을 만드는 AI 스튜디오' }),
  ).toBeInTheDocument();

  expect(screen.getByRole('list', { name: 'visual effects' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '카메라 연결' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'PNG로 저장' })).toBeInTheDocument();
});
