import { Item } from '../DynamicForm';

export const checkDependency = (item: Item, values: any) => {
  if (item?.depends) {
    const { name, operator, value } = item.depends;
    const dependentValue = name.split('.').reduce((acc, key) => acc[key], values);

    if (operator === 'eq' && dependentValue !== value) {
      return { ...item, hidden: true, required: false };
    }
    return { ...item, hidden: false, required: true };
  }
  return item;
};
