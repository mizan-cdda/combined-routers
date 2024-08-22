"use client";
import React from "react";
import { useFormik, FormikErrors } from "formik";
import * as Yup from "yup";
import { getIn } from "formik";
import Select from "../ui/form/select/Select";
import Input from "../ui/form/input/Input";
import {
  Condition,
  Data,
  evaluateRules,
  Rule,
} from "@/utils/evaluateCondition";

interface FormValues {
  condition: Condition;
  rules: Rule[];
}

// Initial Values
const initialValues: FormValues = {
  condition: "OR",
  rules: [
    {
      field: "AGE",
      operator: "GT",
      value: "",
    },
  ],
};

// Example usage:
const data: Data = {
  AGE: 28,
  NAME: "Dewan Mizanur Rahman",
};

// Validation Schema
const ruleSchema: any = Yup.lazy((value: any) => {
  if (value && value.condition) {
    return Yup.object().shape({
      condition: Yup.string().required("Condition is required"),
      rules: Yup.array()
        .of(Yup.lazy(() => ruleSchema))
        .required("Rules are required"),
    });
  } else {
    return Yup.object().shape({
      field: Yup.string().required("Field is required"),
      operator: Yup.string().required("Operator is required"),
      value: Yup.string().required("Value is required"),
    });
  }
});

const validationSchema = Yup.object().shape({
  condition: Yup.string().required("Condition is required"),
  rules: Yup.array().of(ruleSchema).required("Rules are required"),
});

const QueryBuilderForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      const result = evaluateRules(data, values.condition!, values.rules!);
      console.log("Check result:", result);
    },
  });

  const handleChange = (path: string, value: any) => {
    formik.setFieldValue(path, value);
  };

  const handleAddRule = (path?: string) => {
    if (path) {
      const rules = getIn(formik.values, path) as Rule[];
      formik.setFieldValue(path, [
        ...rules,
        { field: "NAME", operator: "GT", value: "" },
      ]);
    } else {
      formik.setFieldValue("rules", [
        ...getIn(formik.values, "rules"),
        { field: "NAME", operator: "GT", value: "" },
      ]);
    }
  };

  const handleAddGroup = (path?: string) => {
    if (path) {
      const rules = getIn(formik.values, path) as Rule[];
      formik.setFieldValue(path, [
        ...rules,
        {
          condition: "AND",
          rules: [{ field: "NAME", operator: "GT", value: "" }],
        },
      ]);
    } else {
      formik.setFieldValue("rules", [
        ...getIn(formik.values, "rules"),
        {
          condition: "AND",
          rules: [{ field: "NAME", operator: "GT", value: "" }],
        },
      ]);
    }
  };

  const handleRemoveRule = (path: string) => {
    const keys = path.split(".");
    const index = parseInt(keys.pop()!, 10);
    const parentPath = keys.join(".");
    const parent = getIn(formik.values, parentPath) as Rule[];
    parent.splice(index, 1);
    formik.setFieldValue(parentPath, [...parent]);
  };

  const renderRules = (rules: Rule[], path = "rules") => {
    return rules.map((rule, index) => {
      const currentPath = `${path}.${index}`;
      const error =
        (getIn(formik.errors, currentPath) as FormikErrors<Rule>) || {};

      return rule.condition ? (
        <div
          key={currentPath}
          className="group mb-4 p-4 border border-gray-200 rounded-md"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Select
              label="Condition"
              name={`${currentPath}.condition`}
              options={["OR", "AND"]}
              onChange={(e) =>
                formik.setFieldValue(`${currentPath}.condition`, e.target.value)
              }
              value={getIn(formik.values, `${currentPath}.condition`)}
            />
            {error.condition && (
              <div className="text-red-500">{error.condition}</div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveRule(currentPath)}
              className="text-red-500 border border-red-300 rounded-md px-2 py-1"
            >
              Delete Group
            </button>
          </div>
          <div className="ml-4">
            {renderRules(rule.rules || [], `${currentPath}.rules`)}
            <button
              type="button"
              onClick={() => handleAddRule(`${currentPath}.rules`)}
              className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
            >
              Add Condition
            </button>
            <button
              type="button"
              onClick={() => handleAddGroup(`${currentPath}.rules`)}
              className="text-blue-500 border border-blue-300 rounded-md px-2 py-1 ml-2"
            >
              Add Group
            </button>
          </div>
        </div>
      ) : (
        <div
          key={currentPath}
          className="mb-4 p-4 border border-gray-200 rounded-md"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Select
              label="Field"
              name={`${currentPath}.field`}
              value={getIn(formik.values, `${currentPath}.field`)}
              options={["AGE", "NAME"]}
              onChange={(e) =>
                formik.setFieldValue(`${currentPath}.field`, e.target.value)
              }
            />
            {error.field && <div className="text-red-500">{error.field}</div>}
            <Select
              label="Operator"
              name={`${currentPath}.operator`}
              options={["GT", "LT", "CONTAINS"]}
              value={getIn(formik.values, `${currentPath}.operator`)}
              onChange={(e) =>
                formik.setFieldValue(`${currentPath}.operator`, e.target.value)
              }
            />
            {error.operator && (
              <div className="text-red-500">{error.operator}</div>
            )}
            <Input
              name={`${currentPath}.value`}
              label="Value"
              type="text"
              value={rule.value}
              onChange={(e) =>
                handleChange(`${currentPath}.value`, e.target.value)
              }
              showErrorMessage={false}
              onBlur={formik.handleBlur}
              formik={formik}
              placeholder="Value"
              className="p-2 border border-gray-300 rounded-md flex-grow"
            />
            <button
              type="button"
              onClick={() => handleRemoveRule(currentPath)}
              className="text-red-500 border border-red-300 rounded-md px-2 py-1"
            >
              Delete Condition
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-4 m-2 bg-white rounded-lg shadow-md"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Select
          label="Condition"
          name="condition"
          options={["OR", "AND"]}
          value={formik.values.condition}
          onChange={(e) => formik.setFieldValue("condition", e.target.value)}
        />
        {formik.errors.condition && (
          <div className="text-red-500">{formik.errors.condition}</div>
        )}
      </div>
      <div className="pl-4">
        {renderRules(formik.values.rules)}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handleAddRule()}
            className="text-blue-500 border border-blue-300 rounded-md px-2 py-1"
          >
            Add Rule
          </button>
          <button
            type="button"
            onClick={() => handleAddGroup()}
            className="text-green-500 border border-green-300 rounded-md px-2 py-1"
          >
            Add Group
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default QueryBuilderForm;
