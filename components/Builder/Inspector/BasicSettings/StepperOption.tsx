import { useState } from "react";
import { useFormik } from "formik";
import { Input } from "../../Inputs/InputsForFormik/TextInputs";
// import { Icon } from "../../IconHandler/IconComponentCopy";

const StepperOption = () => {
  const [arrayFields, setArrayFields] = useState([
    { label: "", description: "" },
  ]);

  const formik = useFormik({
    initialValues: {
      arrayField: arrayFields,
    },
    onSubmit: (values) => {
      console.log("Final Form Values:", values);
    },
    onValuesChange: (newValues: any) => {
      // Handle values change after each field update
      console.log("Updated Form Values:", newValues);
    },
  });

  const addField = () => {
    setArrayFields([...arrayFields, { label: "", description: "" }]);
    formik.setFieldValue("arrayField", [
      ...arrayFields,
      { label: "", description: "" },
    ]);
    // Manually trigger form submission after adding a new field
    formik.submitForm();
  };

  const removeField = (index: any) => {
    const updatedArrayFields = arrayFields.filter((_, i) => i !== index);

    setArrayFields(updatedArrayFields);
    formik.setFieldValue("arrayField", updatedArrayFields);
    // Manually trigger form submission after removing a field
    formik.submitForm();
  };

  const handleFieldChange = (index: any, fieldKey: any, value: any) => {
    const updatedArrayFields = arrayFields.map((field, i) =>
      i === index ? { ...field, [fieldKey]: value } : field
    );

    setArrayFields(updatedArrayFields);
    formik.setFieldValue("arrayField", updatedArrayFields);
    // Manually trigger form submission after each field change
    formik.submitForm();
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full flex flex-col gap-2">
        {arrayFields.map((field, index) => {
          console.log(index, arrayFields.length - 1);

          return (
            <div
              key={index}
              className="flex items-center h-full w-full bg-gray-200 rounded-md py-1 px-0.5 gap-2"
            >
              <div className="w-[25px]">
                {/* <Icon
                  nameIcon="MdDragIndicator"
                  className="w-4 h-4 text-gray-600 cursor-move"
                /> */}
              </div>
              <div key={index} className="w-full">
                <Input
                  label="Stepper Label"
                  name={`arrayField[${index}].label`}
                  // value={field.label}
                  onChange={(e: any) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  error={formik.errors.arrayField?.[index]?.label}
                  className="w-full border-2 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                />
                <Input
                  label="Stepper Description"
                  name={`arrayField[${index}].description`}
                  // value={field.description}
                  onChange={(e: any) =>
                    handleFieldChange(index, "description", e.target.value)
                  }
                  error={formik.errors.arrayField?.[index]?.description}
                  className="w-full border-2 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              {arrayFields.length - 1 == index && (
                <button type="button" onClick={addField}>
                  {/* <Icon nameIcon="IoMdAdd" className="w-4 h-4 text-gray-500" /> */}
                </button>
              )}
              <button
                className="w-[25px]"
                type="button"
                onClick={() => removeField(index)}
              >
                {/* <Icon nameIcon="FaTrashAlt" className="w-4 h-4 text-red-600" /> */}
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default StepperOption;
