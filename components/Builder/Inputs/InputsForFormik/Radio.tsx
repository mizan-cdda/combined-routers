import React, { forwardRef } from "react";

export const Radio = forwardRef(
  ({ error, options, label, formik, ...rest }: any) => {
    return (
      <div className="flex flex-col mb-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="flex space-x-4">
          {options.map((option: { value: any; label: React.ReactNode }) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${option.value}${rest.name}`}
                name={rest.name}
                value={option.value}
                checked={formik.values[rest.name] === option.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...rest}
              />
              <label htmlFor={`${option.value}${rest.name}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500 text-sm italic">{error}</div>}
      </div>
    );
  }
);

Radio.displayName = "Radio";
