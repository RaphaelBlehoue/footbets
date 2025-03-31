import App from '../App';
import { screen, render } from '@testing-library/react';

test('renders the App title', () => {
  render(<App />);
  expect(screen.getByText(/Footbets APP/i)).toBeInTheDocument();
});
