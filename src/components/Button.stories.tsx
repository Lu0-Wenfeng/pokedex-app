import type { Meta, StoryObj } from 'storybook-react-rsbuild';

// Simple component for testing
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    style={{
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
    {...props}
  >
    {children}
  </button>
);

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    style: { fontSize: '18px', padding: '12px 24px' },
  },
};
