import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import ToggleSwitch from './ToggleSwitch';

// Meta configuration for Storybook
const meta: Meta<typeof ToggleSwitch> = {
  title: 'Ui/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    sublabel: { control: 'text' },
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'info', 'success', 'warning', 'danger']
      }
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
};

export default meta;

const Template: Story<React.ComponentProps<typeof ToggleSwitch>> = (args) => {
  const [isChecked, setIsChecked] = useState(args.checked || false);
  return <ToggleSwitch {...args} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'default-toggle',
  label: 'Default Toggle',
  color: 'default'
};

// With Sublabel story
export const WithSublabel = Template.bind({});
WithSublabel.args = {
  ...Default.args,
  id: 'sublabel-toggle',
  label: 'Toggle with Sublabel',
  sublabel: 'This is a description of the toggle'
};

// Checked story
export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  id: 'checked-toggle',
  label: 'Checked Toggle',
  checked: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  id: 'disabled-toggle',
  label: 'Disabled Toggle',
  disabled: true
};

// Different Colors story
export const DifferentColors: Story<React.ComponentProps<typeof ToggleSwitch>> = () => (
  <div className="space-y-4">
    <ToggleSwitch id="default-color" label="Default Color" color="default" />
    <ToggleSwitch id="primary-color" label="Primary Color" color="primary" />
    <ToggleSwitch id="info-color" label="Info Color" color="info" />
    <ToggleSwitch id="success-color" label="Success Color" color="success" />
    <ToggleSwitch id="warning-color" label="Warning Color" color="warning" />
    <ToggleSwitch id="danger-color" label="Danger Color" color="danger" />
  </div>
);

// Custom Styling story
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  ...Default.args,
  id: 'custom-toggle',
  label: 'Custom Styled Toggle',
  color: 'primary',
  className: 'max-w-xs bg-gray-100 p-4 rounded-lg'
};
