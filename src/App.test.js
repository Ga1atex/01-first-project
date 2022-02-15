import { render, screen } from '@testing-library/react';
import SocialNetworkApp from './App';
// import App from './App';

test('renders learn react link', () => {
  render(<SocialNetworkApp />);
  setTimeout(() => {
    const linkElement = screen.getByText(/Social Network/i);
    expect(linkElement).toBeInTheDocument();
  }, 200);
});
