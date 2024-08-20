import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputOtp, { InputOtpProps } from './InputOtp';

// Meta configuration for Storybook
const meta: Meta<typeof InputOtp> = {
  title: 'Ui/InputOtp',
  component: InputOtp,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    valueLength: { control: 'number' },
    color: {
      control: { type: 'radio', options: ['default', 'contrast', 'muted', 'mutedContrast'] }
    },
    shape: {
      control: { type: 'radio', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    onChange: { action: 'onChange' }
  }
};

export default meta;

const Template: Story<InputOtpProps> = (args: any) => <InputOtp {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  value: '',
  valueLength: 4
};

// With Value story
export const WithValue = Template.bind({});
WithValue.args = {
  value: '1234',
  valueLength: 4
};

// Custom Color story
export const CustomColor = Template.bind({});
CustomColor.args = {
  value: '',
  valueLength: 4,
  color: 'contrast'
};

// Custom Shape story
export const CustomShape = Template.bind({});
CustomShape.args = {
  value: '',
  valueLength: 4,
  shape: 'curved'
};

// Longer Length story
export const LongerLength = Template.bind({});
LongerLength.args = {
  value: '',
  valueLength: 6
};
