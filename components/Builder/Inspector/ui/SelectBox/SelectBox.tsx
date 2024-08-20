import React, { useState } from "react";

type SelectBoxProps = {
  id: string;
  label?: string;
  defaultValue?: string;
  options?: Array<{ label: string; value: string }>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  //   propertyName: string;
};

const SelectBox = (props: SelectBoxProps) => {
  const { id, label, options, onChange, defaultValue } = props;
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-bold text-gray-600" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="flex-grow-0 w-1/2 px-1 py-1 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={onChange}
        value={defaultValue}
      >
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
