import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('Header', () => {
  it('renders header with children content', () => {
    const testContent = 'Test Header Content';
    render(<Header>{testContent}</Header>);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders with React elements as children', () => {
    const ReactElement = (
      <div>
        <h1>Title</h1>
        <button type="button">Action</button>
      </div>
    );

    render(<Header>{ReactElement}</Header>);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with multiple children', () => {
    render(
      <Header>
        <h1>Pokemon App</h1>
        <nav>
          <button type="button">Home</button>
          <button type="button">Search</button>
        </nav>
      </Header>,
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(screen.getByText('Pokemon App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('applies correct semantic HTML structure', () => {
    render(<Header>Header Content</Header>);

    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
  });

  it('handles empty children gracefully', () => {
    render(<Header>{null}</Header>);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
    expect(header).toBeEmptyDOMElement();
  });

  it('renders with complex nested content', () => {
    render(
      <Header>
        <div className="header-content">
          <img src="logo.png" alt="Logo" />
          <div className="actions">
            <button type="button">Login</button>
            <span>Welcome</span>
          </div>
        </div>
      </Header>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
