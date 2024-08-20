export interface ComponentProps {
  id: string;
  name: string;
  type: string;
  icon: string;
  category: string;
  author: string;
  description: string;
  default?: any;
  [key: string]: any;
}

export type ComponentsJsonProps = {
  data: {
    basic: ComponentProps[];
    advanced: ComponentProps[];
    pro: ComponentProps[];
    layouts: ComponentProps[];
    custom: ComponentProps[];
  };
};

interface InputSettingsProps {
  component: {
    id: string;
    props: {
      value: string;
      label: string;
      placeholder: string;
      type: string;
    };
  };
}

// BUILDER OPTION

export type OptionType = {
  [key: string]: any;
};

export type OptionsType = {
  "page-builder": OptionType[];
  "component-builder": OptionType[];
  "form-builder": OptionType[];
  forms: OptionType[];
};
