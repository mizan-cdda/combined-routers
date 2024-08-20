import React from 'react';
import Form from '@/components/Preview/StepperForm/Form';

const StepperForm = ({ searchParams }: { searchParams: any }) => {
  const { step } = searchParams || {};
  return (
    <div>
      <Form step={step} />
    </div>
  );
};

export default StepperForm;
