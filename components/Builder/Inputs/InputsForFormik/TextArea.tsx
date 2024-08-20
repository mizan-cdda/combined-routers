import React, { forwardRef } from "react";

export const TextArea = forwardRef(({ ...rest }: any) => {
  const { label, error } = rest;

  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea {...rest} />
      {error && <div className="text-red-500 italic text-sm">{error}</div>}
    </div>
  );
});

TextArea.displayName = "TextArea";
