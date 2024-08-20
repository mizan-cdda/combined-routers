import React, { forwardRef } from "react";

export const Select = forwardRef(
  ({ error, options, label, name, ...rest }: any) => {
    return (
      <div className="flex flex-col mb-2">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select {...rest}>
          {options.map(
            (option: { value: string | number; label: React.ReactNode }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
        {error && <div className="text-red-500 text-sm italic">{error}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";
