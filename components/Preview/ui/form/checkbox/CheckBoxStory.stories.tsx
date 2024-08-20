import React from 'react';
import { Story, Meta } from '@storybook/react';
import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Ui/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
      control: { type: 'select' }
    },
    shape: {
      options: ['rounded', 'smooth', 'curved', 'full'],
      control: { type: 'select' }
    },
    label: { control: 'text' },
    icon: { control: 'text' },
    checked: { control: 'boolean' }
  }
} as Meta;

const Template: Story<CheckboxProps> = (args: CheckboxProps) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'default-checkbox',
  label: 'Default Checkbox',
  color: 'default',
  shape: 'smooth'
};

export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  ...Default.args,
  id: 'primary-checkbox',
  label: 'Primary Checkbox',
  color: 'primary'
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...Default.args,
  id: 'custom-icon-checkbox',
  label: 'Custom Icon Checkbox',
  icon: 'GoStar'
};

export const RoundedShape = Template.bind({});
RoundedShape.args = {
  ...Default.args,
  id: 'rounded-checkbox',
  label: 'Rounded Checkbox',
  shape: 'rounded'
};

export const CurvedShape = Template.bind({});
CurvedShape.args = {
  ...Default.args,
  id: 'curved-checkbox',
  label: 'Curved Checkbox',
  shape: 'curved'
};

export const FullShape = Template.bind({});
FullShape.args = {
  ...Default.args,
  id: 'full-checkbox',
  label: 'Full Shape Checkbox',
  shape: 'full'
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  id: 'no-label-checkbox',
  color: 'default',
  shape: 'smooth'
};
