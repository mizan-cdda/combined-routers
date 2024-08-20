import { generateId } from "./generateId";

export const uiDataCompiler = ({ data }: { data: any }) => {
  const parentName = "root";
  const state: any = {};
  const recursiveAddChildren = ({
    parentName,
    item,
  }: {
    parentName: string;
    item: any;
  }) => {
    console.log("item", item);

    // create a new component
    const { style, ...rest } = item?.props || {};
    const id = generateId();
    state[parentName]?.children?.push(id);
    state[id] = {
      id,
      props: {
        style: {
          overflow: "hidden",
          ...item?.defaultStyles,
        },
        ...item?.props,
        ...rest,
      },
      children: [],
      type: item?.type,
      componentName: item?.name,
      parent: parentName,
      rootParentType: "",
      name: item?.name,
      content: item?.content,
      category: item?.category,
      author: item?.author,
      description: item?.description,
      icon: item?.icon,
      event_handlers: item?.event_handlers,
    };

    if (item?.childrenLayout) {
      item?.childrenLayout?.forEach((element: any) => {
        recursiveAddChildren({
          parentName: id,
          item: element,
        });
      });
    }
  };
  recursiveAddChildren({ parentName, item: data });
  return state;
};
