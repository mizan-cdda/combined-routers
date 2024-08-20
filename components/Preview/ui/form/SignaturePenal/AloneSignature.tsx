'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import Button from '../../button/Button';
import { getIn } from 'formik';
import FormError from '@/components/Preview/DynamicForm/FormError';

interface SignaturePenalProps {
  onSignatureEnd: (field: string, ref: React.RefObject<SignaturePad>) => void;
  name: string;
  label: string;
  formik?: any;
}

const SignaturePanel = ({ onSignatureEnd, formik, ...props }: SignaturePenalProps) => {
  // Forward the ref to the parent component
  const ref = useRef<SignaturePad | null>(null);

  const [penColor, setPenColor] = useState('black');
  const [dotSize, setDotSize] = useState(1);
  const [throttle, setThrottle] = useState(16); // Throttle in milliseconds
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [velocityFilterWeight, setVelocityFilterWeight] = useState(0.7);
  // Load initial data if available
  useEffect(() => {
    if (formik && ref.current) {
      const canvas = ref.current.getCanvas();
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = getIn(formik.values, props.name);

      img.onload = () => {
        // Get the dimensions of the canvas and image
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate the position to center the image
        const x = (canvasWidth - imgWidth) / 2;
        const y = (canvasHeight - imgHeight) / 2;

        // Clear the canvas and draw the centered image
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, x, y);
      };
    }
  }, [props.name, formik]);

  const handleSignatureEnd = (field: string, ref: React.RefObject<any>) => {
    if (ref?.current) {
      const dataURL = ref.current.getTrimmedCanvas().toDataURL('image/png');

      if (formik) {
        formik.setFieldValue(field, dataURL);
        formik.setFieldError(field, '');
      }
    }
  };

  return (
    <div className="w-full relative mr-4 rounded-lg">
      <SignaturePad
        ref={ref}
        onEnd={() => handleSignatureEnd(props.name, ref)}
        canvasProps={{
          className: 'bg-primary-50 dark:bg-muted-800 w-full h-[220px] rounded-t-lg'
        }}
        penColor={penColor}
        backgroundColor={backgroundColor}
        dotSize={dotSize}
        throttle={throttle}
        velocityFilterWeight={velocityFilterWeight}
      />
      <div className="w-full h-8 bg-primary-50 dark:bg-muted-800 border-t-2 border-dashed  border-primary-500 dark:border-primary-200 rounded-b-lg"></div>
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPenColor('black')}
            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 transition"
          >
            Black Pen
          </button>
          <button
            type="button"
            onClick={() => setPenColor('red')}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:from-red-400 hover:to-red-600 transition"
          >
            Red Pen
          </button>
          <button
            type="button"
            onClick={() => setPenColor('blue')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-400 hover:to-blue-600 transition"
          >
            Blue Pen
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setBackgroundColor('white')}
            className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
          >
            White Background
          </button>
          <button
            type="button"
            onClick={() => setBackgroundColor('black')}
            className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 rounded-lg shadow-md hover:bg-gray-500 transition"
          >
            Light Gray Background
          </button>
          <button
            type="button"
            onClick={() => setBackgroundColor('transparent')}
            className="px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-500 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition"
          >
            Transparent Background
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setDotSize(1)}
            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 rounded-lg shadow-md hover:bg-blue-300 transition"
          >
            Small Dot
          </button>
          <button
            type="button"
            onClick={() => setDotSize(2)}
            className="px-4 py-2 bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800 rounded-lg shadow-md hover:bg-blue-400 transition"
          >
            Medium Dot
          </button>
          <button
            type="button"
            onClick={() => setDotSize(4)}
            className="px-4 py-2 bg-gradient-to-r from-blue-300 to-blue-400 text-gray-800 rounded-lg shadow-md hover:bg-blue-500 transition"
          >
            Large Dot
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setThrottle(16)}
            className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-gray-800 rounded-lg shadow-md hover:bg-green-300 transition"
          >
            Default Throttle
          </button>
          <button
            type="button"
            onClick={() => setThrottle(8)}
            className="px-4 py-2 bg-gradient-to-r from-green-200 to-green-300 text-gray-800 rounded-lg shadow-md hover:bg-green-400 transition"
          >
            Faster Throttle
          </button>
          <button
            type="button"
            onClick={() => setThrottle(32)}
            className="px-4 py-2 bg-gradient-to-r from-green-300 to-green-400 text-gray-800 rounded-lg shadow-md hover:bg-green-500 transition"
          >
            Slower Throttle
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setVelocityFilterWeight(0.5)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 rounded-lg shadow-md hover:bg-yellow-300 transition"
          >
            Low Filter Weight
          </button>
          <button
            type="button"
            onClick={() => setVelocityFilterWeight(0.7)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-yellow-300 text-gray-800 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Medium Filter Weight
          </button>
          <button
            type="button"
            onClick={() => setVelocityFilterWeight(0.9)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            High Filter Weight
          </button>
        </div>
      </div>
      <FormError formik={formik} name={props.name} helperText={''} />
      <Button
        variant={'outlined'}
        onClick={() => {
          ref?.current?.clear();
          handleSignatureEnd(props.name, ref);
          formik && formik.setFieldValue(props.name, '');
        }}
        className="w-full mt-4"
        type="button"
      >
        Clear and draw again
      </Button>
      <div className="bg-primary-500 dark:bg-muted-600 text-white py-1 px-2 absolute rounded-lg top-2 left-2 select-none">
        {props.label}
      </div>
    </div>
  );
};

SignaturePanel.displayName = 'SignaturePanel';
export default SignaturePanel;
