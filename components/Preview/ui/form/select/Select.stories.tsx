import React from 'react';
import { Meta, Story } from '@storybook/react';
import Select from './Select';

// Meta configuration for Storybook
const meta: Meta<typeof Select> = {
  title: 'Ui/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    color: {
      control: { type: 'select', options: ['default', 'contrast', 'muted', 'mutedContrast'] }
    },
    shape: {
      control: { type: 'select', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] }
    },
    error: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

export default meta;

const Template: Story<React.ComponentProps<typeof Select>> = (args) => <Select {...args} />;

// Sample options
const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Select an option',
  options: sampleOptions,
  color: 'default',
  size: 'md',
  shape: 'smooth'
};

// With Icon story
export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: 'BsPersonCircle',
  label: 'Select with Icon'
};

// With Error story
export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'This field is required',
  label: 'Select with Error'
};

// Loading story
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
  label: 'Loading Select'
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Select'
};

// Custom Styling story
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  ...Default.args,
  label: 'Custom Styled Select',
  color: 'muted',
  shape: 'curved',
  size: 'lg',
  containerClasses: 'max-w-xs'
};

// String Options story
export const StringOptions = Template.bind({});
StringOptions.args = {
  ...Default.args,
  label: 'Select with String Options',
  options: ['Red', 'Green', 'Blue']
};
