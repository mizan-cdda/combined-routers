// import { join_forms } from "@/data/join_data";
import * as Yup from "yup";
import { generateValidations } from "./generateValidations";
// import { FormField, ValidateForm } from "@/types/types";

// Function to get inputs, validation schema, and initial values for a given section
export const getInputs = (formType = "", data: /* ValidateForm */ any) => {
  let initialValues: { [key: string]: any } = {};
  let validationsFields: { [key: string]: any } = {};

  const fields = data[formType] as /* FormField[] */ any | undefined;

  if (fields) {
    for (const field of fields) {
      initialValues[field?.name] = field?.default;

      if (field?.type === "fieldArray") {
        const newName = field?.name;
        const arrValue: { [key: string]: any } = {};
        const validationArrValue: { [key: string]: any } = {};

        const arFields =
          (field[newName] as /* FormField[] */ any | undefined) || [];

        if (arFields) {
          for (const arField of arFields) {
            arrValue[arField.name] = arField.default;
            const schema = generateValidations(arField);
            validationArrValue[arField.name] = schema;
          }
        }

        initialValues[newName] = [arrValue];
        validationsFields[newName] = Yup.array().of(
          Yup.object().shape(validationArrValue)
        );
      }

      if (field?.validations) {
        const schema = generateValidations(field);
        validationsFields[field.name] = schema;
      }
    }
  }

  return {
    validationSchema: Yup.object({ ...validationsFields }),
    initialValues,
    inputs: data[formType],
  };
};
