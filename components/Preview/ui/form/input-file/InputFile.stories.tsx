import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputFile, { InputFileProps } from './InputFile';

// Meta configuration for Storybook
const meta: Meta<typeof InputFile> = {
  title: 'Ui/InputFile',
  component: InputFile,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: { type: 'radio', options: ['straight', 'rounded', 'smooth', 'curved', 'full'] }
    },
    color: {
      control: {
        type: 'radio',
        options: [
          'default',
          'contrast',
          'muted',
          'mutedContrast',
          'primary',
          'info',
          'success',
          'warning',
          'danger',
          'none'
        ]
      }
    },
    acceptedFileTypes: { control: 'array' },
    maxFileSize: { control: 'number' },
    allowMultiple: { control: 'boolean' },
    bordered: { control: 'boolean' },
    spaced: { control: 'boolean' }
  }
};

export default meta;

const Template: Story<InputFileProps> = (args: any) => <InputFile {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'file-input-default',
  url: 'https://example.com/upload',
  label: 'Upload File',
  labelAlt: 'Max size: 5MB',
  shape: 'smooth',
  color: 'contrast',
  maxFileSize: 5,
  allowMultiple: false,
  bordered: true,
  spaced: true
};

// Error state story
export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  fileStatus: {
    'example-file.txt': 'File size cannot exceed 5 MB'
  },
  uploadError: 'Sorry, there was a problem uploading your file(s).'
};

// Success state story
export const SuccessState = Template.bind({});
SuccessState.args = {
  ...Default.args,
  fileStatus: {
    'example-file.txt': 'Uploaded'
  },
  uploadSuccess: true
};

// Multiple files story
export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  ...Default.args,
  allowMultiple: true
};

// Custom color and shape story
export const CustomAppearance = Template.bind({});
CustomAppearance.args = {
  ...Default.args,
  color: 'primary',
  shape: 'curved'
};
