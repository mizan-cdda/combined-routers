import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReIcon } from './ReIcon';

export default {
  title: 'Ui/ReIcon',
  component: ReIcon,
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'text',
      defaultValue: 'FaBeer'
    },
    className: {
      control: 'text',
      defaultValue: 'text-2xl'
    }
  }
} as Meta;

const Template: Story<React.ComponentProps<typeof ReIcon>> = (args: any) => <ReIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconName: 'FaHome'
};

export const NotFound = Template.bind({});
NotFound.args = {
  iconName: 'NonExistentIcon'
};
