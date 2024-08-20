import React from 'react';
import { Meta, Story } from '@storybook/react';
import InputFileField, { InputFileFieldProps } from './InputFileField';

// Meta configuration for Storybook
const meta: Meta<typeof InputFileField> = {
  title: 'Ui/InputFileField',
  component: InputFileField,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: { type: 'radio', options: ['smooth', 'rounded', 'curved', 'full'] }
    },
    color: {
      control: { type: 'radio', options: ['default', 'contrast', 'muted', 'mutedContrast'] }
    },
    acceptedFileTypes: { control: 'array' },
    maxFileSize: { control: 'number' }
  }
};

export default meta;

const Template: Story<InputFileFieldProps> = (args: any) => <InputFileField {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'file-input-field-default',
  label: 'Upload your file',
  maxFileSize: 5,
  color: 'default',
  shape: 'smooth'
};

// Custom Color and Shape story
export const CustomAppearance = Template.bind({});
CustomAppearance.args = {
  ...Default.args,
  color: 'contrast',
  shape: 'curved'
};

// Error State story
export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  value: 'Error file.txt'
};

// File Selected story
export const FileSelected = Template.bind({});
FileSelected.args = {
  ...Default.args,
  value: 'example-file.txt'
};
