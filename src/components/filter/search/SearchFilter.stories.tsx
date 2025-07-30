import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import SearchFilter from "./search.filter";

// Wrapper component to handle state for interactive stories
const SearchFilterWrapper = ({
  placeholder,
  inputClass,
  label,
  onChangeHandler,
  ...props
}: {
  placeholder?: string;
  inputClass?: string;
  label?: string;
  onChangeHandler?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (
    newValue: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(newValue);
    if (onChangeHandler) {
      onChangeHandler(newValue, event);
    }
  };

  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <SearchFilter
        {...(placeholder !== undefined && { placeholder })}
        {...(inputClass !== undefined && { inputClass })}
        {...(label !== undefined && { label })}
        onChangeHandler={handleChange}
        {...props}
      />
      <div
        style={{
          marginTop: "16px",
          padding: "8px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <strong>Current Value:</strong> "{value}"
      </div>
    </div>
  );
};

const meta: Meta<typeof SearchFilter> = {
  title: "Components/SearchFilter",
  component: SearchFilter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Search filter component with input field and search icon. Used for filtering Pokemon by name or number.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "Placeholder text for the input field",
      control: { type: "text" },
    },
    inputClass: {
      description: "Additional CSS class for the input element",
      control: { type: "text" },
    },
    label: {
      description: "Label text displayed above the input field",
      control: { type: "text" },
    },
    onChangeHandler: {
      description: "Callback function triggered when input value changes",
      action: "changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Search Pokemon...",
    label: "Search",
    onChangeHandler: (value, _event) => console.log("Search value:", value),
  },
};

export const PokemonSearch: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Name or Number",
    label: "Search By",
    inputClass: "pokemon-search-filter",
    onChangeHandler: (value, _event) => console.log("Pokemon search:", value),
  },
};

export const WithoutLabel: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Type to search...",
    onChangeHandler: (value, _event) =>
      console.log("Search without label:", value),
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Enter Pokemon name, type, or ID...",
    label: "Advanced Search",
    onChangeHandler: (value, _event) => console.log("Advanced search:", value),
  },
};

export const WithCustomClass: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Search with custom styling",
    label: "Custom Search",
    inputClass: "custom-search-input",
    onChangeHandler: (value, _event) => console.log("Custom search:", value),
  },
};

export const LongLabel: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    placeholder: "Search...",
    label: "Search for your favorite Pokemon by name, number, or type",
    onChangeHandler: (value, _event) =>
      console.log("Long label search:", value),
  },
};

export const EmptyPlaceholder: Story = {
  render: (args) => <SearchFilterWrapper {...args} />,
  args: {
    label: "Search",
    onChangeHandler: (value, _event) =>
      console.log("Empty placeholder search:", value),
  },
};

// Static version without wrapper for simpler testing
export const Static: Story = {
  args: {
    placeholder: "Static search field",
    label: "Static Search",
    onChangeHandler: (value, _event) => console.log("Static search:", value),
  },
};
