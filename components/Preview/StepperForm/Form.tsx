'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import SidebarForm from './Sidebar';
import DynamicForm from '../DynamicForm/DynamicForm';
import { sForm } from './data/stepperForm';
import Button from '../ui/button/Button';
import { filterSubmittingValues } from '../DynamicForm/utils/filterSubmittingValues';

type FormProps = {
  step: number;
};

type FormData = {
  [key: string]: any;
};

const Form = ({ step }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleNextStep = (newData: FormData) => {
    console.log('hello next');
    const updatedData = { ...formData, [`step${step}`]: newData };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    Cookie.set('formData', JSON.stringify(updatedData));
    router.push(`/form?step=${Number(step) + 1}`);
  };

  const handlePreviousStep = () => {
    router.push(`/form?step=${Number(step) - 1}`);
  };

  useEffect(() => {
    const cookieData = JSON.parse(Cookie.get('formData') || '{}');
    const formData = JSON.parse(localStorage.getItem('formData')) || {};
    // if (cookieData) {
    //   setFormData(cookieData);
    // }
    if (formData) {
      setFormData(formData);
    }
  }, [step]);

  const handleSubmit = async (newData: FormData) => {
    const updatedData = { ...formData, [`step${step}`]: filterSubmittingValues(newData) };
    setFormData(updatedData);
    Cookie.set('formData', JSON.stringify(updatedData));
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setIsSubmitted(true);
    alert('Form submitted successfully!');
  };

  const renderStep = () => {
    const stepConfig = sForm[step - 1];
    if (!stepConfig) return null;

    return (
      <div className="step-container flex-grow-1 p-6 bg-white shadow-md rounded-lg min-w-[300px]">
        <h2 className="text-xl font-semibold mb-4">{stepConfig.form.name}</h2>
        <DynamicForm
          key={stepConfig.name}
          formData={stepConfig.form}
          onSubmit={step < sForm.length ? handleNextStep : handleSubmit}
          defaultValue={formData[`step${step}`]}
        >
          <div className="buttons flex justify-between mt-4 col-span-2">
            {step > 1 && (
              <Button type="button" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
            {step < sForm.length && (
              <Button type="submit" color="primary" className="btn btn-primary">
                Save and Continue
              </Button>
            )}
            {step == sForm.length && (
              <Button type="submit" variant="solid" color="success" className="btn bg-green-600">
                Submit
              </Button>
            )}
          </div>
        </DynamicForm>
      </div>
    );
  };

  const steps = sForm.map((step, i) => ({
    name: step.name,
    slug: step.slug,
    step: i + 1
  }));

  if (!step) {
    router.push('/dashboard');
  }

  return (
    <div className="grid md:grid-cols-6 gap-4 min-h-screen bg-gray-100 p-4">
      <SidebarForm steps={steps} step={step} formData={formData} />
      <div className="col-span-5 flex-col items-center gap-2">
        {renderStep()}
        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            <p>Form submitted successfully!</p>
          </div>
        )}
        <pre className="dark:text-white mt-4">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Form;
