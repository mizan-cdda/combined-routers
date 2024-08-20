import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import RadioHeadless from './RadioHeadless';

// Meta configuration for Storybook
const meta: Meta<typeof RadioHeadless> = {
  title: 'Ui/RadioHeadless',
  component: RadioHeadless,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'onChange' }
  }
};

export default meta;

const Template: Story<React.ComponentProps<typeof RadioHeadless>> = (args) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <RadioHeadless {...args} checked={checked} onChange={() => setChecked(!checked)} />;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  id: 'default-radio',
  label: 'Default Radio',
  name: 'default-radio-group',
  children: <div className="p-4 border border-gray-300 rounded">Custom Radio Content</div>
};

// Without Label story
export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  ...Default.args,
  id: 'without-label-radio',
  label: undefined
};

// Checked story
export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  id: 'checked-radio',
  label: 'Checked Radio',
  checked: true
};

// Custom Content story
export const CustomContent = Template.bind({});
CustomContent.args = {
  ...Default.args,
  id: 'custom-content-radio',
  label: 'Custom Content Radio',
  children: (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
      <h3 className="text-lg font-bold">Custom Radio</h3>
      <p>This is a custom radio button with rich content.</p>
    </div>
  )
};

// Radio Group story
export const RadioGroup: Story<React.ComponentProps<typeof RadioHeadless>> = () => {
  const [selected, setSelected] = useState('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="space-y-4">
      <RadioHeadless
        id="option1"
        name="radio-group"
        value="option1"
        checked={selected === 'option1'}
        onChange={handleChange}
      >
        <div
          className={`p-4 border rounded ${selected === 'option1' ? 'bg-blue-100 border-blue-300' : 'border-gray-300'}`}
        >
          Option 1
        </div>
      </RadioHeadless>
      <RadioHeadless
        id="option2"
        name="radio-group"
        value="option2"
        checked={selected === 'option2'}
        onChange={handleChange}
      >
        <div
          className={`p-4 border rounded ${selected === 'option2' ? 'bg-blue-100 border-blue-300' : 'border-gray-300'}`}
        >
          Option 2
        </div>
      </RadioHeadless>
      <RadioHeadless
        id="option3"
        name="radio-group"
        value="option3"
        checked={selected === 'option3'}
        onChange={handleChange}
      >
        <div
          className={`p-4 border rounded ${selected === 'option3' ? 'bg-blue-100 border-blue-300' : 'border-gray-300'}`}
        >
          Option 3
        </div>
      </RadioHeadless>
    </div>
  );
};
