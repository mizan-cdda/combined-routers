import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import ListBox, { ListboxProps } from './Listbox';

// Meta configuration for Storybook
const meta: Meta<typeof ListBox> = {
  title: 'Ui/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: {
      control: { type: 'radio', options: ['sm', 'md', 'lg'] }
    },
    color: {
      control: { type: 'radio', options: ['default', 'contrast', 'muted', 'mutedContrast'] }
    },
    shape: {
      control: { type: 'radio', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    multiple: { control: 'boolean' },
    error: { control: 'text' },
    setSelected: { action: 'setSelected' }
  }
};

export default meta;

const items = [
  { id: '1', name: 'Option 1', icon: 'BsPersonCircle' },
  { id: '2', name: 'Option 2', icon: 'BsEnvelope' },
  { id: '3', name: 'Option 3', icon: 'BsGear' },
  { id: '4', name: 'Option 4', image: 'https://example.com/avatar1.jpg' },
  { id: '5', name: 'Option 5', image: 'https://example.com/avatar2.jpg' }
];

const Template: Story<ListboxProps> = (args: any) => {
  const [selected, setSelected] = useState(items[0]);
  return <ListBox {...args} selected={selected} setSelected={setSelected} />;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Select an option',
  items: items,
  size: 'md',
  color: 'default',
  shape: 'smooth'
};

// With Error story
export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'This is an error message'
};

// Loading story
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};

// Multiple Selection story
export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  ...Default.args,
  multiple: true
};

// Custom Styling story
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  ...Default.args,
  size: 'lg',
  color: 'muted',
  shape: 'curved',
  classNames: 'max-w-md'
};
