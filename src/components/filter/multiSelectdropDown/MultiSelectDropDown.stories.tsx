import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import type { DropdownOption } from '@app-types/component.types';
import AppMultiSelectDropDown from './multiSelectdropDown';

// Sample data for different scenarios
const pokemonTypes: DropdownOption[] = [
  { label: 'Fire', value: 'fire' },
  { label: 'Water', value: 'water' },
  { label: 'Grass', value: 'grass' },
  { label: 'Electric', value: 'electric' },
  { label: 'Psychic', value: 'psychic' },
  { label: 'Ice', value: 'ice' },
  { label: 'Dragon', value: 'dragon' },
  { label: 'Dark', value: 'dark' },
  { label: 'Fairy', value: 'fairy' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Poison', value: 'poison' },
  { label: 'Ground', value: 'ground' },
  { label: 'Flying', value: 'flying' },
  { label: 'Bug', value: 'bug' },
  { label: 'Rock', value: 'rock' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Steel', value: 'steel' },
  { label: 'Normal', value: 'normal' },
];

const pokemonGenders: DropdownOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Genderless', value: 'genderless' },
];

const smallDataset: DropdownOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const largeDataset: DropdownOption[] = Array.from({ length: 50 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `option-${i + 1}`,
}));

// Interactive wrapper component
const DropdownWrapper = ({
  data,
  label = '',
  placeholder = 'Select options...',
  onChangeHandler,
  ...props
}: {
  data: DropdownOption[];
  label?: string;
  placeholder?: string;
  onChangeHandler?: (value: any, event?: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: any, event?: any) => {
    setSelectedValues(value ?? []);
    console.log('Selected values:', value);
    if (onChangeHandler) {
      onChangeHandler(value, event);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    console.log('Dropdown opened');
  };

  const handleClose = () => {
    setIsOpen(false);
    console.log('Dropdown closed');
  };

  const handleClean = (_event?: any) => {
    setSelectedValues([]);
    console.log('Dropdown cleaned');
  };

  return (
    <div style={{ width: '300px', padding: '20px' }}>
      <AppMultiSelectDropDown
        data={data}
        label={label}
        placeholder={placeholder}
        isOpen={isOpen}
        onChangeHandler={handleChange}
        onOpenHandler={handleOpen}
        onCloseHandler={handleClose}
        onCleanHandler={handleClean}
        {...props}
      />
      <div
        style={{
          marginTop: '16px',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        <strong>Selected:</strong>{' '}
        {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
        <br />
        <strong>Dropdown State:</strong> {isOpen ? 'Open' : 'Closed'}
      </div>
    </div>
  );
};

const meta: Meta<typeof AppMultiSelectDropDown> = {
  title: 'Components/MultiSelectDropDown',
  component: AppMultiSelectDropDown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Multi-select dropdown component using RSuite CheckPicker. Allows users to select multiple options from a list.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text displayed above the dropdown',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Placeholder text shown when no options are selected',
      control: { type: 'text' },
    },
    data: {
      description: 'Array of dropdown options with label and value',
      control: { type: 'object' },
    },
    isOpen: {
      description: 'Controls whether the dropdown is open or closed',
      control: { type: 'boolean' },
    },
    onChangeHandler: {
      description: 'Callback function triggered when selection changes',
      action: 'selection-changed',
    },
    onOpenHandler: {
      description: 'Callback function triggered when dropdown opens',
      action: 'dropdown-opened',
    },
    onCloseHandler: {
      description: 'Callback function triggered when dropdown closes',
      action: 'dropdown-closed',
    },
    onCleanHandler: {
      description: 'Callback function triggered when selection is cleared',
      action: 'selection-cleared',
    },
    className: {
      description: 'Additional CSS class names',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: pokemonTypes,
    label: 'Pokemon Types',
    placeholder: 'Select types...',
    onChangeHandler: (value, _event) =>
      console.log('Default selection:', value),
  },
};

export const PokemonTypes: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: pokemonTypes,
    label: 'Type',
    placeholder: 'Select Types',
    onChangeHandler: (value, _event) =>
      console.log('Pokemon types selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown configured for Pokemon type selection with all 18 Pokemon types.',
      },
    },
  },
};

export const PokemonGenders: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: pokemonGenders,
    label: 'Gender',
    placeholder: 'Select Gender',
    onChangeHandler: (value, _event) =>
      console.log('Pokemon genders selected:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown configured for Pokemon gender selection.',
      },
    },
  },
};

export const WithoutLabel: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: smallDataset,
    placeholder: 'Choose options...',
    onChangeHandler: (value, _event) =>
      console.log('No label selection:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown without a label, showing only the picker component.',
      },
    },
  },
};

export const SmallDataset: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: smallDataset,
    label: 'Small Options',
    placeholder: 'Pick from few options',
    onChangeHandler: (value, _event) =>
      console.log('Small dataset selection:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with a small dataset of only 3 options.',
      },
    },
  },
};

export const LargeDataset: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: largeDataset,
    label: 'Many Options',
    placeholder: 'Select from many options',
    onChangeHandler: (value, _event) =>
      console.log('Large dataset selection:', value),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown with a large dataset of 50 options to test performance and scrolling.',
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: pokemonTypes,
    label: 'Advanced Type Filter',
    placeholder: 'Choose one or more Pokemon types for filtering...',
    onChangeHandler: (value, _event) =>
      console.log('Custom placeholder selection:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with a longer, more descriptive placeholder text.',
      },
    },
  },
};

export const WithCustomClass: Story = {
  render: args => <DropdownWrapper {...args} />,
  args: {
    data: pokemonTypes,
    label: 'Styled Dropdown',
    placeholder: 'Select types',
    className: 'custom-dropdown-class',
    onChangeHandler: (value, _event) =>
      console.log('Custom class selection:', value),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with custom CSS class for additional styling.',
      },
    },
  },
};
