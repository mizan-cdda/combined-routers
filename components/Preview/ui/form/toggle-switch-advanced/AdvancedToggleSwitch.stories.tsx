import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import AdvancedToggleSwitch from './AdvancedToggleSwitch';

// Meta configuration for Storybook
const meta: Meta<typeof AdvancedToggleSwitch> = {
  title: 'Ui/AdvancedToggleSwitch',
  component: AdvancedToggleSwitch,
  tags: ['autodocs'],
  argTypes: {
    startIcon: { control: 'text' },
    endIcon: { control: 'text' },
    startColor: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'info', 'success', 'warning', 'danger']
      }
    },
    endColor: {
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

// Template for stories
const Template: Story<React.ComponentProps<typeof AdvancedToggleSwitch>> = (args) => {
  const [isChecked, setIsChecked] = useState(args.checked || false);
  return (
    <AdvancedToggleSwitch {...args} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'default-toggle',
  startIcon: 'FaHome',
  endIcon: 'lucide:lock',
  startColor: 'primary',
  endColor: 'danger'
};

// Checked story
export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  id: 'checked-toggle',
  checked: true
};

// Disabled story
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  id: 'disabled-toggle',
  disabled: true
};

// Different Colors story
export const DifferentColors: Story<React.ComponentProps<typeof AdvancedToggleSwitch>> = () => (
  <div className="space-y-4">
    <AdvancedToggleSwitch
      id="default-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="default"
      endColor="default"
    />
    <AdvancedToggleSwitch
      id="primary-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="primary"
      endColor="primary"
    />
    <AdvancedToggleSwitch
      id="info-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="info"
      endColor="info"
    />
    <AdvancedToggleSwitch
      id="success-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="success"
      endColor="success"
    />
    <AdvancedToggleSwitch
      id="warning-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="warning"
      endColor="warning"
    />
    <AdvancedToggleSwitch
      id="danger-color"
      startIcon="FaHome"
      endIcon="FaHome"
      startColor="danger"
      endColor="danger"
    />
  </div>
);

// Custom Styling story
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  ...Default.args,
  id: 'custom-toggle',
  startColor: 'primary',
  endColor: 'danger',
  className: 'max-w-xs bg-gray-100 p-4 rounded-lg'
};
