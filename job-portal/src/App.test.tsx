import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders glymo studio clone layout with interaction', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: '손짓만으로 네온/오로라 드로잉을 만드는 AI 스튜디오' }),
  ).toBeInTheDocument();

  expect(screen.getByLabelText('drawing canvas')).toBeInTheDocument();

  const drawingButton = screen.getByRole('button', { name: /drawing/i });
  fireEvent.click(drawingButton);
  expect(drawingButton).toHaveAttribute('aria-pressed', 'true');

  const auroraEffect = screen.getByRole('button', { name: /aurora/i });
  fireEvent.click(auroraEffect);
  expect(auroraEffect).toHaveAttribute('aria-pressed', 'true');

  const resetButton = screen.getByRole('button', { name: '초기화' });
  fireEvent.click(resetButton);

  expect(screen.getByRole('button', { name: /text/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: /neon/i })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: '캔버스 지우기' })).toBeInTheDocument();
});
