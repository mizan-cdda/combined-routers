import React from "react";

export const Input = ({ label, error, ...rest }: any) => {
  const { name } = rest;

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
      <input id={name} {...rest} />
      {error && <div className="text-red-500 italic text-sm">{error}</div>}
    </div>
  );
};
