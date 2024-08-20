import React from 'react';
import { Meta, Story } from '@storybook/react';
import Loader from './Loader';

// Meta configuration for Storybook
const meta: Meta<typeof Loader> = {
  title: 'Ui/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    thickness: { control: 'number' },
    size: { control: 'number' },
    classNames: { control: 'text' }
  }
};

export default meta;

// Template for stories
const Template: Story<React.ComponentProps<typeof Loader>> = (args) => <Loader {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  thickness: 5,
  size: 50,
  classNames: 'text-blue-500' // Example class for color or styling
};

// Different Thicknesses
export const DifferentThicknesses: Story<React.ComponentProps<typeof Loader>> = () => (
  <div className="space-y-4">
    <Loader thickness={2} size={50} classNames="text-blue-500" />
    <Loader thickness={4} size={50} classNames="text-green-500" />
    <Loader thickness={6} size={50} classNames="text-red-500" />
    <Loader thickness={8} size={50} classNames="text-yellow-500" />
  </div>
);

// Different Sizes
export const DifferentSizes: Story<React.ComponentProps<typeof Loader>> = () => (
  <div className="space-y-4">
    <Loader thickness={5} size={30} classNames="text-blue-500" />
    <Loader thickness={5} size={50} classNames="text-green-500" />
    <Loader thickness={5} size={70} classNames="text-red-500" />
    <Loader thickness={5} size={100} classNames="text-yellow-500" />
  </div>
);

// Custom Styling
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  thickness: 5,
  size: 50,
  classNames: 'text-blue-500 animate-spin' // Example of custom styling and animation
};
