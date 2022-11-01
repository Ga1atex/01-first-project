import { render, screen } from '@testing-library/react';
import SocialNetworkApp from './App';
// import App from './App';

test('renders learn react link', async () => {
  render(<SocialNetworkApp />);
  setTimeout(async () => {
    const linkElement = await screen.findByText(/Social Network/i);
    expect(linkElement).toBeInTheDocument();
  }, 200);
});
