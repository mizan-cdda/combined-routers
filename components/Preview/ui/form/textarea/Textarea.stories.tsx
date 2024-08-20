import React from 'react';
import { Meta, Story } from '@storybook/react';
import Textarea from './Textarea';

// Meta configuration for Storybook
const meta: Meta<typeof Textarea> = {
  title: 'Ui/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: {
      control: { type: 'select', options: ['default', 'contrast', 'muted', 'mutedContrast'] }
    },
    shape: {
      control: { type: 'select', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    error: { control: 'text' },
    resize: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' }
  }
};

export default meta;

const Template: Story<React.ComponentProps<typeof Textarea>> = (args) => <Textarea {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  label: 'Default Textarea',
  placeholder: 'Enter your text here...',
  color: 'default',
  shape: 'smooth'
};

// With Error story
export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  label: 'Textarea with Error',
  error: 'This field is required'
};

// Resizable story
export const Resizable = Template.bind({});
Resizable.args = {
  ...Default.args,
  label: 'Resizable Textarea',
  resize: true
};

// Loading story
export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  label: 'Loading Textarea',
  loading: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  label: 'Disabled Textarea',
  disabled: true
};

// Custom Styling story
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  ...Default.args,
  label: 'Custom Styled Textarea',
  color: 'muted',
  shape: 'curved',
  className: 'max-w-md'
};

// Long Content story
export const LongContent = Template.bind({});
LongContent.args = {
  ...Default.args,
  label: 'Textarea with Long Content',
  rows: 8,
  value:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.'
};
