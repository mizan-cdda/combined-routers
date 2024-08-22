"use client";
import React, { useState, useEffect, useRef } from "react";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import { generateValidationSchema } from "./utils/generateValidationSchema";
import { generateInitialValues } from "./utils/generateInitialValues";
import { storeOrSendValueToApi } from "./utils/storeOrSendValueToApi";
import { filterSubmittingValues } from "./utils/filterSubmittingValues";
import { checkDependency } from "./utils/checkDependency";
import Input from "../ui/form/input/Input";
import Password from "../ui/form/password/Password";
import Textarea from "../ui/form/textarea/Textarea";
import Checkbox from "../ui/form/checkbox/Checkbox";
import Select from "../ui/form/select/Select";
import SignaturePanel from "../ui/form/SignaturePenal/AloneSignature";
import Button from "../ui/button/Button";
import CustomCDDA from "../ui/form/custom/CustomCDDA";
import { ReIcon } from "@/components/ReIcon/ReIcon";

interface ValidationRule {
  type: string;
  message?: string;
  value?: any;
  regex?: RegExp;
}

interface Validation {
  type: string;
  validations: ValidationRule[];
}

interface Widths {
  default: string;
  greaterThan1440: string;
  between890And1440: string;
  between600And890: string;
}

interface Dependency {
  name: string;
  operator: string;
  value: any;
}

export interface Item {
  index: number;
  widths: Widths;
  name: string;
  label: string;
  required?: boolean;
  tag: string;
  options?: string[];
  placeholder?: string;
  type?: string;
  validation?: Validation;
  depends?: Dependency;
  form?: NestedForm;
  variant?: string;
}

interface NestedForm {
  name: string;
  grid: number;
  items: Item[];
}

type Submit = {
  store?: "localStorage" | "sessionStorage" | "cookies";
  key_name?: string;
  endPoint?: string;
  method?: "INSERT" | "UPSERT" | "DELETE" | "UPDATE";
  function?: ({}: { [key: string]: any }) => void;
};

export type FormData = {
  name: string;
  columns?: number;
  submit: Submit;
  items: Item[];
  grid?: number; // Assuming grid property is optional
};

type DynamicFormProps = {
  formData: FormData;
  className?: string;
  children: React.ReactNode;
  store?: "localStorage" | "sessionStorage" | "cookies";
  set_data_to_browser_store?: boolean;
  send_data_to_external_api?: boolean;
  endPoint?: "string";
  onSubmit?: (data: any) => void;
  method?: "INSERT" | "UPSERT" | "DELETE" | "UPDATE";
  key_name?: string;
};

interface FormikValues {
  [key: string]: Record<string, string | string[] | any[]>;
}

const DynamicForm = ({
  formData,
  className,
  store,
  send_data_to_external_api,
  set_data_to_browser_store,
  endPoint,
  method,
  key_name,
  children,
  defaultValue,
  onSubmit: handleFormSubmit,
}: DynamicFormProps) => {
  const [formItems, setFormItems] = useState(formData.items);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object(
      generateValidationSchema(
        formData?.items.filter((item) => item.variant !== "custom-cdda"),
        {}
      )
    )
  );

  const initialValues = defaultValue ?? generateInitialValues(formItems);

  const formik: { values: FormikValues } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      // if stepper form
      if (handleFormSubmit) {
        handleFormSubmit(values);
      }
      // if not stepper form
      else {
        // Execute the function if defined in submit

        if (formData?.submit?.function) {
          formData.submit?.function({ values, formik, setErrors, resetForm });
        } else {
          // for story book configuration
          if (
            store ||
            set_data_to_browser_store ||
            send_data_to_external_api ||
            endPoint
          ) {
            const newData = {
              store:
                set_data_to_browser_store && !send_data_to_external_api
                  ? store
                  : "", // local Storage, session Storage
              key_name:
                set_data_to_browser_store && !send_data_to_external_api
                  ? key_name
                  : "",
              endPoint:
                send_data_to_external_api && !set_data_to_browser_store
                  ? endPoint
                  : "",
              method:
                send_data_to_external_api && !set_data_to_browser_store
                  ? method
                  : "INSERT", // UPSERT, DELETE, UPDATE
            };
            try {
              await storeOrSendValueToApi({ data: newData, values });
              // Optionally show success message or perform other actions upon successful submission
              // alert(JSON.stringify(filterSubmittingValues(values)));
              console.log(filterSubmittingValues(values));
            } catch (error) {
              console.error("Error submitting form data:", error);
              // Handle error state or display error message
            }
          }
          // for original data submission
          else {
            try {
              await storeOrSendValueToApi({ data: formData.submit, values });
              // Optionally show success message or perform other actions upon successful submission
              alert(JSON.stringify(filterSubmittingValues(values)));
            } catch (error) {
              console.error("Error submitting form data:", error);
              // Handle error state or display error message
            }
          }
        }
      }
    },
  });

  useEffect(() => {
    const updateFormItems = () => {
      const updateItemsWithDependencies = (items: Item[]) => {
        return items?.map((item) => {
          item = checkDependency(item, formik.values);
          if (item?.form?.items?.length > 0) {
            item.form.items = updateItemsWithDependencies(item?.form?.items);
          }
          return item;
        });
      };

      const updatedItems = updateItemsWithDependencies(formItems);

      const updateFormItems = (items: Item[], values: any) => {
        return items.map((item) => {
          let updatedItem = checkDependency(item, values);
          if (item.items) {
            updatedItem.items = updateFormItems(item.items, values);
          }
          return updatedItem;
        });
      };

      setFormItems(updatedItems);
      setValidationSchema(
        Yup.object(generateValidationSchema(updatedItems, formik.values))
      );
    };

    updateFormItems();
  }, [formik.values]);

  const adjustWidths = (items: Item[], innerWidth: number) => {
    return items.map((item) => {
      if (item.widths && typeof item.widths === "object") {
        if (innerWidth > 1440) {
          item.width = item.widths.greaterThan1440;
        } else if (innerWidth > 890 && innerWidth <= 1440) {
          item.width = item.widths.between890And1440;
        } else if (innerWidth > 600 && innerWidth <= 890) {
          item.width = item.widths.between600And890;
        } else {
          item.width = item.widths.default;
        }
      }

      // Recursively adjust widths for nested items in fieldArray
      if (item.tag === "repeater" && item.form && item.form.items) {
        item.form.items = adjustWidths(item.form.items, innerWidth);
      }

      return item;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      // Usage
      const updatedItems = adjustWidths(formData.items, window.innerWidth);

      const updatedItemsWithValidation = updatedItems.map((item) => {
        if (item?.depends) {
          const { name, operator, value } = item.depends;
          if (operator === "eq" && formik.values[name] !== value) {
            return { ...item, hidden: true, required: false };
          }
          return { ...item, hidden: false, required: true };
        }
        return item;
      });

      setFormItems(updatedItemsWithValidation);
      setValidationSchema(
        Yup.object(
          generateValidationSchema(updatedItemsWithValidation, formik.values)
        )
      );
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddFieldArrayItem = (name: string, items: Item[]) => {
    const newFieldArrayItem = generateInitialValues(items);
    console.log("addFieldArrayItem", [
      ...getIn(formik.values, name),
      newFieldArrayItem,
    ]);
    // formik.setFieldValue(name, [...formik.values[name], newFieldArrayItem]);
    formik.setFieldValue(name, [
      ...getIn(formik.values, name),
      newFieldArrayItem,
    ]);
  };

  const handleRemoveFieldArrayItem = (name: string, index: number) => {
    const fieldArray = [...getIn(formik.values, name)];
    fieldArray.splice(index, 1);
    formik.setFieldValue(name, fieldArray);
  };

  const [isOpen, setOpen] = useState(false);
  const addItem = (name = "", newItem) => {
    formik.setFieldValue(name, [...formik.values?.[name], newItem]);
    setOpen(false);
  };

  const renderRepeaterField = ({
    item,
    itemName,
    formik,
    handleRemoveFieldArrayItem,
    handleAddFieldArrayItem,
  }: {
    item: Item;
    itemName: string;
    formik: any;
    handleRemoveFieldArrayItem: (name: string, index: number) => void;
    handleAddFieldArrayItem: (name: string, items: Item[]) => void;
  }) => {
    const splittedWidth = item?.width?.split("%")?.[0];
    const gridSingleColumnWidth = 100 / formData?.grid;

    const gridColsDecorator = () => {
      const colsToSpan = splittedWidth / gridSingleColumnWidth;

      return Math.ceil(colsToSpan);
    };

    return (
      <div
        key={item.index}
        style={{
          gridColumn: `span ${gridColsDecorator(item, formData)}`,
        }}
        className="field-array-wrapper p-4 bg-gray-100 dark:bg-primary dark:border dark:rounded-md dark:border-white"
      >
        {(getIn(formik.values, itemName) || []).map(
          (fieldItem: Item, index: number) => (
            <div
              className="col-span-4"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${item?.form?.grid}, 1fr)`,
                gap: "1rem",
                maxWidth: "100%",
              }}
              key={index}
            >
              {renderFields({
                items:
                  [...item?.form.items]?.sort((a, b) => a.index - b.index) ||
                  [],
                parentName: `${itemName}[${index}]`,
                index,
              })}
              {getIn(formik.values, itemName).length > 1 ? (
                <Button
                  type="button"
                  onClick={() => handleRemoveFieldArrayItem(itemName, index)}
                  className="w-8"
                  color="error"
                >
                  <ReIcon iconName="AiTwotoneDelete" />
                </Button>
              ) : null}
            </div>
          )
        )}

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleAddFieldArrayItem(itemName, item?.form.items);
          }}
          className="btn bg-green-600 mt-2"
          variant="solid" color="success"
        >
          Add {item.placeholder}
        </Button>
      </div>
    );
  };

  const renderFields = ({
    items,
    parentName = "",
    index = null,
  }: {
    items: Item[];
    parentName: string;
    index: number | null;
  }) => {
    return items?.map((item: Item) => {
      if (item?.hidden) return null;

      const itemName = parentName ? `${parentName}.${item?.name}` : item?.name;
      const splittedWidth = item?.width?.split("%")?.[0];
      const gridSingleColumnWidth = 100 / formData?.grid;

      const gridColsDecorator = () => {
        const colsToSpan = splittedWidth / gridSingleColumnWidth;

        return Math.ceil(colsToSpan);
      };
      const {
        widths,
        depends,
        validation,
        width,
        required,
        matches,
        index,
        oneOf,
        ...rest
      } = item || {};

      if (item.tag === "repeater" && !item.variant) {
        return renderRepeaterField({
          item,
          itemName,
          formik,
          handleRemoveFieldArrayItem,
          handleAddFieldArrayItem,
        });
      } else if (item.tag === "repeater" && item.variant) {
        return (
          <InputRenderrer
            key={item.variant}
            {...rest}
            suggested="current-password"
            name={itemName}
            // value={getIn(formik.values, itemName)}
            // formik={formik}
            oldFormik={formik}
            item={item}
            addItem={addItem}
            open={isOpen}
            setOpen={setOpen}
          />
        );
      }

      const touched = getIn(formik.touched, itemName);
      const error = getIn(formik.errors, itemName);
      const showError = touched && error;
      return (
        !item?.hidden && (
          <div
            key={item?.index}
            style={{
              gridColumn: `span ${gridColsDecorator()}`,
              overflow: "hidden",
            }}
          >
            {/* inputs  */}

            <InputRenderrer
              {...rest}
              suggested="current-password"
              name={itemName}
              value={getIn(formik.values, itemName)}
              formik={formik}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={
                getIn(formik?.errors, itemName) &&
                getIn(formik?.touched, itemName)
              }
            />
          </div>
        )
      );
    });
  };

  // Sort items by index for grid layout
  const sortedItems = [...formItems]?.sort((a, b) => a.index - b.index);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`grid w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${formData.grid || 1}, 1fr)`,
        gap: "1rem",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {renderFields({ items: sortedItems, parentName: undefined })}
      {children}
    </form>
  );
};

export default DynamicForm;

export const InputRenderrer = (input) => {
  const signRef = useRef(null);
  const initialsRef = useRef(null);
  const { type, ...rest } = input || {};
  switch (type) {
    case "email":
      return <Input type="email" {...rest} />;
    case "password":
      // return <Input type="password" {...rest} />;
      return <Password type="password" {...rest} />;
    // case 'phone':
    //   return <Phone {...rest} />;
    case "number":
      return <Input type="number" {...rest} />;
    // case 'select':
    //   return <Select {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "checkbox":
      return (
        <Checkbox checked={getIn(rest.formik.values, rest.name)} {...rest} />
      );

    case "select":
      return <Select {...rest} />;

    case "signature":
      return <SignaturePanel ref={signRef} {...rest} />;
    case "initials":
      return <SignaturePanel ref={initialsRef} {...rest} />;

    case "EXCEPTIONAL_ADD_GROUP":
      return (
        <Button type="button" color="success">
          Add Group
        </Button>
      );
    case "EXCEPTIONAL_REMOVE_GROUP":
      return (
        <Button type="button" color="error">
          Remove Group
        </Button>
      );
    case "EXCEPTIONAL_ADD_CONDITION":
      return (
        <Button type="button" color="success">
          Add Condition
        </Button>
      );
    case "EXCEPTIONAL_REMOVE_CONDITION":
      return (
        <Button type="button" color="error">
          Remove Condtion
        </Button>
      );

    default:
      switch (input.variant) {
        case "custom-cdda":
          return <CustomCDDA {...input} />;
        default:
          return <Input type="text" {...rest} />;
      }
  }
};
