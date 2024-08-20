import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import ComboBox, { ComboBoxProps } from './ComboBox';

export default {
  title: 'Ui/ComboBox',
  component: ComboBox,
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
      options: ['rounded', 'smooth', 'curved', 'full'],
      control: { type: 'select' }
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'text' }
  }
} as Meta;

const Template: Story<ComboBoxProps> = (args: any) => {
  const [selected, setSelected] = useState(args.items[0]);
  return <ComboBox {...args} selected={selected} setSelected={setSelected} />;
};

const defaultItems = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' }
];

export const Default = Template.bind({});
Default.args = {
  label: 'Select an option',
  items: defaultItems,
  size: 'md',
  color: 'default',
  shape: 'smooth'
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...Default.args,
  items: [
    { id: '1', name: 'Option 1', icon: 'MdHome' },
    { id: '2', name: 'Option 2', icon: 'MdSettings' },
    { id: '3', name: 'Option 3', icon: 'MdPerson' }
  ]
};

export const WithImages = Template.bind({});
WithImages.args = {
  ...Default.args,
  items: [
    { id: '1', name: 'Option 1', image: 'https://example.com/image1.jpg' },
    { id: '2', name: 'Option 2', image: 'https://example.com/image2.jpg' },
    { id: '3', name: 'Option 3', image: 'https://example.com/image3.jpg' }
  ]
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'This field is required'
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
