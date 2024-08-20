import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'pastel', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['default', 'secondary', 'muted', 'primary', 'info', 'success', 'warning', 'error'],
    },
    shape: {
      control: 'select',
      options: ['straight', 'rounded', 'smooth', 'curved', 'full'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'default', 'secondary', 'muted', 'primary', 'info', 'success', 'warning', 'error'],
    },
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'default',
    shape: 'smooth',
    size: 'md',
    shadow: 'none',
    loading: false,
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    color: 'secondary',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
};

export const Pastel: Story = {
  args: {
    ...Default.args,
    variant: 'pastel',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const FullyRounded: Story = {
  args: {
    ...Default.args,
    shape: 'full',
  },
};

export const WithShadow: Story = {
  args: {
    ...Default.args,
    shadow: 'default',
  },
};