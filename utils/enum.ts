import { OptionType, OptionsType } from "@/types/types";

export enum FormType {
  login = "login",
  register = "register",
  join = "join",
}

export enum CaseType {
  text = "text",
  radio = "radio",
  checkbox = "checkbox",
  select = "select",
  fieldArray = "fieldArray",
  password = "password",
  file = "file",
  date = "date",
  time = "time",
  datetime = "datetime",
  datetimeLocal = "datetime-local",
  month = "month",
  week = "week",
  number = "number",
  range = "range",
  email = "email",
  url = "url",
  tel = "tel",
  color = "color",
}

export enum BuildersPath {
  formBuilder = "/form-builder",
  componentBuilder = "/component-builder",
  pageBuilder = "/page-builder",
}

export const COMPONENT_TYPE = "component";
export const SECTION_TYPE = "section";
export const LAYOUT_TYPE = "layout";
export const FORM_TYPE = "form";
export const INPUT_TYPE = "input";
export const NUMBER_TYPE = "number";
export const SOMETHING_TYPE = "component";
export const PAGE_TYPE = "page";

// OPTION TYPE FOR BUILDER OPTION
export const types: OptionType = {
  "page-builder": [
    {
      id: 1,
      label: PAGE_TYPE,
    },
  ],
  "component-builder": [
    {
      id: 1,
      label: COMPONENT_TYPE,
    },
  ],
  "form-builder": [
    {
      id: 1,
      label: FORM_TYPE,
    },
  ],
};

export const options: OptionsType = {
  "page-builder": [
    {
      id: 1,
      label: "Publish",
    },
    {
      id: 2,
      label: "Draft",
    },
  ],
  "component-builder": [
    {
      id: 1,
      label: "Basic",
    },
    {
      id: 2,
      label: "Advanced",
    },
    {
      id: 3,
      label: "Pro",
    },
  ],
  "form-builder": [
    {
      id: 1,
      label: "Forms",
    },
  ],
  forms: [
    {
      id: 1,
      label: "Forms",
    },
  ],
};
