import React, { useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import SignaturePenal from './SignaturePenal';
import ReactSignatureCanvas from 'react-signature-canvas';

export default {
  title: 'Ui/SignaturePenal',
  component: SignaturePenal,
  tags: ['autodocs']
} as Meta;

const Template: Story<React.ComponentProps<typeof SignaturePenal>> = (args) => {
  // Create refs inside the Template function
  const signRef = useRef<ReactSignatureCanvas>(null);
  const initialsRef = useRef<ReactSignatureCanvas>(null);

  return <SignaturePenal signRef={signRef} initialsRef={initialsRef} {...args} />;
};

export const Default = Template.bind({});
