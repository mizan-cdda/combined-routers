/** @format */

// import { FormField } from "@/types/types";
import * as Yup from "yup";

// Function to generate validations based on a field
type YupType = typeof Yup & {
  [key: string]: any;
};

export const generateValidations = (field: any) => {
  const { typeValue, validations } = field || {};

  let schema = (Yup as YupType)[typeValue ? typeValue : "string"](); // Initialize the schema based on field.typeValue

  // Iterate over each validation rule in field.validations
  for (const rule of validations ?? []) {
    switch (rule.type) {
      case "isTrue":
        schema = schema.oneOf([true], rule.message);
        break; // Apply isTrue rule
      case "isArray":
        schema = schema.min(1, rule.message);
        break; // Apply isTrue rule
      case "required":
        schema = schema.required(rule.message);
        break; // Apply required rule
      case "isEmail":
        schema = schema.email(rule.message);
        break; // Apply isEmail rule
      case "minLength":
        schema = schema.min(rule?.value, rule.message);
        break; // Apply minLength rule
      case "maxLength":
        schema = schema.max(rule?.value, rule.message);
        break; // Apply maxLength rule
      case "pattern":
        schema = schema.matches(rule?.value, rule.message);
        break; // Apply maxLength rule
      default:
        schema = schema.required(rule.message);
        break; // Apply required rule as default
    }
  }
  return schema; // Return the resulting schema
};
