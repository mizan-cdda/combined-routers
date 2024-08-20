import React from 'react';
import { Meta, Story } from '@storybook/react';
import Radio from './Radio';

// Meta configuration for Storybook
const meta: Meta<typeof Radio> = {
  title: 'Ui/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: {
      control: {
        type: 'radio',
        options: ['default', 'primary', 'info', 'success', 'warning', 'danger']
      }
    },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    onChange: { action: 'onChange' }
  }
};

export default meta;

const Template: Story<React.ComponentProps<typeof Radio>> = (args) => <Radio {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'default-radio',
  label: 'Default Radio',
  color: 'default'
};

// Primary Color story
export const PrimaryColor = Template.bind({});
PrimaryColor.args = {
  ...Default.args,
  id: 'primary-radio',
  label: 'Primary Radio',
  color: 'primary'
};

// Checked story
export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  id: 'checked-radio',
  label: 'Checked Radio',
  checked: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  id: 'disabled-radio',
  label: 'Disabled Radio',
  disabled: true
};

// Different Colors story
export const DifferentColors: Story<React.ComponentProps<typeof Radio>> = () => (
  <div className="space-y-2">
    <Radio id="default-radio" label="Default Radio" color="default" />
    <Radio id="primary-radio" label="Primary Radio" color="primary" />
    <Radio id="info-radio" label="Info Radio" color="info" />
    <Radio id="success-radio" label="Success Radio" color="success" />
    <Radio id="warning-radio" label="Warning Radio" color="warning" />
    <Radio id="danger-radio" label="Danger Radio" color="danger" />
  </div>
);
