import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Col, Row } from 'rsuite';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header component that wraps content in a semantic header element with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to be rendered inside the header',
      control: { type: 'text' },
    },
    className: {
      description: 'Additional CSS class names to apply to the header',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h1>Default Header Content</h1>
        <p>This is a simple header with basic content.</p>
      </div>
    ),
  },
};

export const PokemonAppHeader: Story = {
  args: {
    children: (
      <Row className="app-header-wrap show-grid" style={{ padding: '20px' }}>
        <Col xs={12} sm={12} lg={5} xl={5}>
          <div className="header-title">
            <h3 style={{ color: '#2E3156', margin: 0 }}>Pokédex</h3>
          </div>
        </Col>
        <Col xs={12} sm={12} lg={2} xl={2} className="hide">
          <div
            style={{
              width: '1px',
              height: '32px',
              backgroundColor: '#5D5F7E',
              margin: '22px',
            }}
          />
        </Col>
        <Col xs={24} sm={24} lg={20} xl={20}>
          <div style={{ fontSize: '20px', paddingLeft: '20px' }}>
            <span>Search for any Pokémon that exist on the planet</span>
          </div>
        </Col>
      </Row>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Header as used in the Pokemon app with title, separator line, and description.',
      },
    },
  },
};

export const SimpleTitle: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '20px 54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ margin: 0, color: '#2E3156' }}>Simple Title</h2>
        <nav>
          <button
            type="button"
            style={{
              marginRight: '20px',
              color: '#2E3156',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Home
          </button>
          <button
            type="button"
            style={{
              marginRight: '20px',
              color: '#2E3156',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            About
          </button>
          <button
            type="button"
            style={{
              color: '#2E3156',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Contact
          </button>
        </nav>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple header with title and navigation links.',
      },
    },
  },
};

export const WithLogo: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '16px 54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#DEEDED',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#2E3156',
              borderRadius: '50%',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            P
          </div>
          <h2 style={{ margin: 0, color: '#2E3156' }}>Pokédex</h2>
        </div>
        <div style={{ fontSize: '16px', color: '#333' }}>
          Gotta catch &apos;em all!
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with logo placeholder and tagline.',
      },
    },
  },
};

export const ResponsiveHeader: Story = {
  args: {
    children: (
      <div style={{ padding: '16px 54px' }}>
        <Row className="show-grid">
          <Col xs={24} sm={24} md={12} lg={8}>
            <div
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#2E3156',
                marginBottom: '8px',
              }}
            >
              Responsive Header
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            <div
              style={{
                fontSize: '16px',
                color: '#666',
                textAlign: 'right',
              }}
            >
              This header adapts to different screen sizes
            </div>
          </Col>
        </Row>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive header that adapts to different screen sizes using RSuite's grid system.",
      },
    },
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'header-container custom-header',
    children: (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '2px dashed #ccc',
        }}
      >
        <h3 style={{ margin: 0, color: '#2E3156' }}>
          Header with Custom Class
        </h3>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
          This header has additional CSS classes applied.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom CSS classes for additional styling.',
      },
    },
  },
};

export const MinimalHeader: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #ddd',
          backgroundColor: 'white',
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: '500', color: '#2E3156' }}>
          Minimal Header
        </span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal header with just text and subtle border.',
      },
    },
  },
};

export const FullWidthHeader: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '24px 0',
          backgroundColor: '#2E3156',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '32px' }}>Full Width Header</h1>
        <p style={{ margin: '8px 0 0 0', fontSize: '16px', opacity: 0.9 }}>
          This header spans the full width with dark background
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width header with dark background and centered content.',
      },
    },
  },
};
