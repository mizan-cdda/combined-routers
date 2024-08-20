import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputFileProfile, { InputFileProfileProps } from './InputFileProfile';

// Meta configuration for Storybook
const meta: Meta<typeof InputFileProfile> = {
  title: 'Ui/InputFileProfile',
  component: InputFileProfile,
  tags: ['autodocs'],
  argTypes: {
    previewSize: {
      control: { type: 'radio', options: ['lg', 'xl'] }
    },
    color: {
      control: {
        type: 'radio',
        options: ['default', 'contrast', 'muted', 'primary', 'info', 'success', 'warning', 'danger']
      }
    },
    shape: {
      control: { type: 'radio', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    previewIcon: { control: 'text' },
    acceptedFileTypes: { control: 'array' },
    onRemoveFile: { action: 'onRemoveFile' }
  }
};

export default meta;

const Template: Story<InputFileProfileProps> = (args: any) => <InputFileProfile {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'file-input-profile-default',
  label: 'Upload Profile Picture',
  previewSize: 'lg',
  color: 'default',
  shape: 'full'
};

// Custom Appearance story
export const CustomAppearance = Template.bind({});
CustomAppearance.args = {
  ...Default.args,
  color: 'primary',
  shape: 'rounded'
};

// With Preview story
export const WithPreview = Template.bind({});
WithPreview.args = {
  ...Default.args,
  preview: 'https://via.placeholder.com/150', // Example URL for preview image
  value: 'example-profile-picture.jpg'
};

// Without Preview story
export const WithoutPreview = Template.bind({});
WithoutPreview.args = {
  ...Default.args,
  value: ''
};

// Custom Preview Icon story
export const CustomPreviewIcon = Template.bind({});
CustomPreviewIcon.args = {
  ...Default.args,
  previewIcon: 'fluent:person-24-filled'
};
