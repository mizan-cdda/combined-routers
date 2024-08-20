import * as Yup from 'yup';

type ValidationRules = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  oneOf?: { field_name: string; message: string };
  email?: string;
  matches?: { regex: RegExp; message: string };
  length?: number;
  min?: number;
  max?: number;
  lessThan?: number;
  moreThan?: number;
  positive?: boolean;
  negative?: boolean;
  [key: string]: any;
};

type SchemaType = 'string' | 'number' | 'array' | 'object' | 'boolean';

export const getYupValidation = (schemaType: SchemaType, validation: ValidationRules) => {
  let validator:
    | Yup.StringSchema<string | undefined, object>
    | Yup.NumberSchema<number | undefined, object>
    | Yup.ArraySchema<any, object>
    | Yup.ObjectSchema<object | undefined, object, {}, ''>
    | Yup.BooleanSchema<boolean | undefined, object>;

  switch (schemaType) {
    case 'string':
      validator = Yup.string();
      break;
    case 'number':
      validator = Yup.number();
      break;
    case 'array':
      validator = Yup.array();
      break;
    case 'object':
      validator = Yup.object();
      break;
    case 'boolean':
      validator = Yup.boolean();
      break;
    default:
      validator = Yup.string();
  }

  Object.entries(validation).forEach(([rule, value]) => {
    switch (rule) {
      case 'required':
        validator = validator.required(value as string);
        break;
      case 'minLength':
        validator = (validator as Yup.StringSchema).min(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'maxLength':
        validator = (validator as Yup.StringSchema).max(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'oneOf':
        validator = validator.oneOf(
          [Yup.ref((value as { field_name: string; message: string }).field_name), null],
          (value as { field_name: string; message: string }).message
        );
        break;
      case 'email':
        validator = (validator as Yup.StringSchema).email(value as string);
        break;
      case 'matches':
        validator = (validator as Yup.StringSchema).matches(
          (value as { regex: RegExp; message: string }).regex,
          (value as { regex: RegExp; message: string }).message
        );
        break;
      case 'length':
        validator = (validator as Yup.StringSchema).length(value as number);
        break;
      case 'min':
        validator = (validator as Yup.StringSchema).min(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'max':
        validator = (validator as Yup.NumberSchema).max(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'lessThan':
        validator = (validator as Yup.NumberSchema).lessThan(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'moreThan':
        validator = (validator as Yup.NumberSchema).moreThan(
          (value as { value: number; message: string }).value,
          (value as { value: number; message: string }).message
        );
        break;
      case 'positive':
        validator = (validator as Yup.NumberSchema).positive(
          (value as { value: boolean; message: string }).value,
          (value as { value: boolean; message: string }).message
        );
        break;
      case 'negative':
        validator = (validator as Yup.NumberSchema).negative(
          (value as { value: boolean; message: string }).value,
          (value as { value: boolean; message: string }).message
        );
        break;
      default:
        break;
    }
  });

  return validator;
};
