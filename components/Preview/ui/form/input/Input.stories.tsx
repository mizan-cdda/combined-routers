import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'Ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    color: {
      options: ['default', 'contrast', 'muted', 'mutedContrast'],
      control: { type: 'select' }
    },
    shape: {
      options: ['straight', 'rounded', 'smooth', 'curved', 'full'],
      control: { type: 'select' }
    },
    icon: { control: 'text' },
    label: { control: 'text' },
    addon: { control: 'text' },
    error: { control: 'text' },
    loading: { control: 'boolean' },
    placeholder: { control: 'text' }
  }
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  size: 'md',
  color: 'default',
  shape: 'smooth'
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: 'Username'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: 'user',
  placeholder: 'Enter username'
};

export const WithAddon = Template.bind({});
WithAddon.args = {
  ...Default.args,
  addon: '@',
  placeholder: 'Enter username'
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'This field is required'
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: 'lg'
};

export const ContrastColor = Template.bind({});
ContrastColor.args = {
  ...Default.args,
  color: 'contrast'
};

export const CurvedShape = Template.bind({});
CurvedShape.args = {
  ...Default.args,
  shape: 'curved'
};

export const FullyFeatured = Template.bind({});
FullyFeatured.args = {
  label: 'Email',
  icon: 'email',
  addon: '@',
  placeholder: 'Enter your email',
  size: 'md',
  color: 'default',
  shape: 'smooth'
};
