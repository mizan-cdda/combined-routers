import React, { memo } from "react";

interface TextInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  value: string;
  placeholder: string;
  type?: string;
  name: string;
  textArea?: boolean;
}

const TextInput = ({
  label,
  onChange,
  value,
  placeholder,
  name,
  textArea,
}: TextInputProps) => {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-600" htmlFor={name}>
        {label}
      </label>
      {!textArea ? (
        <input
          id={name}
          className="w-full border-2 rounded px-3 py-1 text-sm mt-1 focus:outline-none focus:border-blue-500"
          placeholder={placeholder}
          type="text"
          onChange={(e: any) => onChange(e.target.value, name)}
          value={value}
        />
      ) : (
        <textarea
          id={name}
          className="w-full border-2 rounded px-3 py-1 text-sm mt-1 focus:outline-none focus:border-blue-500"
          placeholder={placeholder}
          onChange={(e: any) => onChange(e.target.value, name)}
          value={value}
        />
      )}
    </div>
  );
};

export default memo(TextInput);
