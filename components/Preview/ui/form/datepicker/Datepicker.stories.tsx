import React from 'react';
import { Story, Meta } from '@storybook/react';
import DatePicker, { DatePickerProps } from './DatePicker';

export default {
  title: 'Ui/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      options: ['straight', 'rounded', 'smooth', 'curved', 'full'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    color: {
      options: ['default', 'contrast', 'muted', 'mutedContrast'],
      control: { type: 'select' }
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    valueFormat: { control: 'text' }
  }
} as Meta;

const Template: Story<DatePickerProps> = (args: any) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Select a date',
  placeholder: 'YYYY-MM-DD',
  icon: 'calendar',
  shape: 'smooth',
  size: 'md',
  color: 'default'
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  ...Default.args,
  value: new Date()
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  ...Default.args,
  valueFormat: 'MMM dd, yyyy',
  placeholder: 'MMM DD, YYYY'
};

export const WithMinDate = Template.bind({});
WithMinDate.args = {
  ...Default.args,
  minDate: new Date()
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
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
