import { forwardRef } from "react";

export const CheckboxGroup = forwardRef(
  (
    { style, options, label, formik, field, name, onChange, ...rest }: any,
    ref
  ) => {
    const checkboxGroupStyles = {
      ...style,
      margin: "8px 0",
    };

    return (
      <div className="flex flex-col mb-2" style={checkboxGroupStyles}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="space-x-2">
          {options.map(
            (option: { value: string | number; label: React.ReactNode }) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={`${name}.${option.value}`}
                  checked={
                    formik &&
                    formik.values &&
                    formik.values[field.name] &&
                    formik.values[field.name].includes(option.value)
                  }
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = option.value;

                    onChange({
                      target: {
                        name: field.name,
                        value: isChecked
                          ? [...(formik.values[field.name] || []), value]
                          : (formik.values[field.name] || []).filter(
                              (val: string) => val !== value
                            ),
                      },
                    });
                  }}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            )
          )}
        </div>
        {formik.submitCount > 0 && formik.errors[field.name] && (
          <div className="text-red-500 text-sm italic">
            {formik.errors[field.name]}
          </div>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
