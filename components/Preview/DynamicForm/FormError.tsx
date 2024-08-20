import React from 'react';
import { getIn } from 'formik';

const FormError = ({
  formik,
  name,
  helperText,
  customError
}: {
  formik: any;
  name: string;
  helperText: any;
  customError?: string;
}) => {
  return customError ? (
    <p className="text-error text-xs">{getIn(formik.errors, name)}</p>
  ) : getIn(formik.errors, name) && getIn(formik.touched, name) ? (
    <p className="text-error text-xs">{getIn(formik.errors, name)}</p>
  ) : (
    helperText
  );
};

export default FormError;
