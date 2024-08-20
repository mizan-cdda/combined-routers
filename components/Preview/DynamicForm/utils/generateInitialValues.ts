import { Item } from '../DynamicForm';

export const generateInitialValues = (items: Item[]): any => {
  return items.reduce((values, item) => {
    if (item.tag === 'repeater' && item.form?.items) {
      // For repeater, initialize it as an array with one set of initial values

      if (item.variant) {
        values[item.name] = [];
        // values[item.name] = [generateInitialValues(item.form.items)];
      } else {
        values[item.name] = [generateInitialValues(item.form.items)];
      }
    } else {
      // Set default value based on the field type
      values[item.name] = getDefaultValue(item.type);
    }
    return values;
  }, {});
};

const getDefaultValue = (type?: string): any => {
  switch (type) {
    case 'text':
    case 'textarea':
    case 'email':
      return '';
    case 'number':
      return 0;
    case 'checkbox':
      return false;
    default:
      return '';
  }
};
