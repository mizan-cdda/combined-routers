// This hook provides the addNode function and the getComponents function
// The state is managed using the useState hook, and the memoization with useMemo ensures that the getComponents function only recomputes when the components state changes.
import { useState, useMemo } from "react";
import { generateId } from "@/utils/generateId";

type ComponentType = string;

const DEFAULT_PROPS: { [key: string]: any } = {};

type IComponents = {
  [key: string]: {
    children: string[];
    type: ComponentType;
    parent: string;
    id: string;
    props: any;
    rootParentType: ComponentType | undefined;
  };
};

type AddNode = {
  type: ComponentType;
  parent?: string;
  props?: any;
  rootParentType?: ComponentType;
};

const useComposer = (initialRootComponentType?: ComponentType) => {
  const [components, setComponents] = useState<IComponents>({});
  const [rootComponentType, setRootComponentType] = useState<
    ComponentType | undefined
  >(initialRootComponentType);

  const addNode = ({
    type,
    parent = "root",
    props = {},
    rootParentType,
  }: AddNode): string => {
    const id = generateId();

    if (parent === "root" && !rootComponentType) {
      setRootComponentType(type);
    }

    const localRootParentType = rootParentType || rootComponentType;

    const { form, ...defaultProps } = DEFAULT_PROPS[type] || {};

    setComponents((prevComponents) => ({
      ...prevComponents,
      [id]: {
        children: [],
        type,
        parent,
        id,
        props: { ...defaultProps, ...props },
        rootParentType: localRootParentType,
      },
    }));

    if (parent !== "root" && components[parent]) {
      setComponents((prevComponents) => ({
        ...prevComponents,
        [parent]: {
          ...prevComponents[parent],
          children: [...prevComponents[parent].children, id],
        },
      }));
    }

    return id;
  };

  const getComponents = useMemo(() => components, [components]);

  return { addNode, getComponents };
};

export default useComposer;
