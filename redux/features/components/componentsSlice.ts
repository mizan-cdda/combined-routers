import { generateId } from "@/utils/generateId";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ComponentsType } from "next/dist/build/webpack/loaders/next-app-loader";
import { ComponentState } from "react";
type ComponentId = string;

interface Style {
  [key: string]: any;
}

interface ComponentProps {
  style: Style;
}

interface Component {
  id: ComponentId;
  parent: ComponentId;
  type: string;
  name?: string;
  componentName?: string;
  rootParentType?: ComponentsType | undefined;
  children: ComponentId[];
  props: ComponentProps;
  function?: any;
}

const DEFAULT_ID: ComponentId = "root";

const initialState: ComponentState = {
  // builderType: "",
  // builderId: "",
  selectedId: DEFAULT_ID,
  parentId: DEFAULT_ID,
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: "",
    children: [],
    // props: {
    //   style: {},
    // },
    function: {},
  },
};

const componentsSlice: any = createSlice({
  name: "components",
  initialState,
  reducers: {
    // set existing components if have
    setComponents: (state: any, action: PayloadAction<any>) => {
      return action.payload || initialState;
    },
    // add a new component
    addComponent: (
      state: any,
      action: PayloadAction<{
        name?: string;
        parentName: string;
        type?: string | undefined;
        componentName?: any;
        rootParentType?: ComponentsType;
        testId?: string;
        item?: any;
        style?: { [key: string]: string };
        isEditing?: boolean;
      }>
    ) => {
      const {
        parentName,
        type = "",
        rootParentType,
        name = "root",
        item,
        isEditing = false,
      } = action.payload || {};

      const recursiveAddChildren = ({
        parentName,
        item,
      }: {
        parentName: string;
        item: any;
      }) => {
        // create a new component
        const id = isEditing ? item?.id || generateId() : generateId();
        state[parentName].children.push(id);
        state[id] = {
          id,
          props: {
            ...item?.props,
            // style: {
            //   // minHeight: "50px",
            //   // width: "100%",
            //   overflow: "hidden",
            //   // paddding: "10px",
            //   ...item?.defaultStyles,
            // },
          },
          children: [],
          type: item?.type,
          componentName: item?.name,
          parent: parentName,
          rootParentType,
          name: item?.name,
          content: item?.content,
          category: item?.category,
          author: item?.author,
          description: item?.description,
          icon: item?.icon,
          event_handlers: item?.event_handlers || {},
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
      recursiveAddChildren({ parentName, item });
    },

    // move a component
    moveComponent: (
      state: any,
      action: PayloadAction<{
        parentId: string;
        children: any;
        componentId: string;
      }>
    ) => {
      // Destructure parentId and componentId from action payload
      const { parentId, componentId } = action.payload;
      // Check if the component is already a child of the parent
      if (state[componentId].parent === parentId || parentId === componentId) {
        return;
      } else {
        // append the child id to the parent's children array
        state[parentId].children.push(componentId);
        // remove the child id from the previous parent's children array
        state[state[componentId].parent].children = state[
          state[componentId].parent
        ].children.filter((childId: string) => childId !== componentId);
        // update the child's parent property
        state[componentId].parent = parentId;
      }
    },

    // copy a component
    copyComponent: (
      state: any,
      action: PayloadAction<{
        parentId: string;
        children: any;
        componentId: string;
      }>
    ) => {
      // Destructure parentId and componentId from action payload
      const { parentId, componentId } = action.payload;

      if (componentId === "root") return; // Prevent copying the root component

      // Retrieve parent and component objects from state
      const parent = state[parentId];
      const component = state[componentId];

      // Generate a new unique identifier for the copied component
      const newId = generateId();

      // Add the new component's id to the parent's children array
      const children = parent.children;
      // Add the new component's id to the parent's children array
      children.splice(children.indexOf(componentId), 0, newId);

      // Create a new entry in state for the copied component
      state[newId] = {
        ...component,
        id: newId,
        parent: parentId,
        children: [],
      };

      // Helper function to recursively copy children of the copied component
      const compoChildren = ({
        arr = [],
        cId = "",
      }: {
        arr: string[];
        cId: string;
      }) => {
        arr?.forEach((child) => {
          // Retrieve the existing child from state
          const existingChild = state[child];

          // Generate a new unique identifier for the copied child
          const newChildId = generateId();

          // Add the new child's id to the parent's children array
          state[cId].children.push(newChildId);

          // Create a new entry in state for the copied child
          state[newChildId] = {
            ...existingChild,
            id: newChildId,
            parent: cId,
            children: [],
          };
          // Check if the existing child has further children
          if (existingChild?.children?.length > 0) {
            // Recursively copy children of the existing child
            compoChildren({
              arr: existingChild.children,
              cId: newChildId, // Use the newId for the copied component
            });
          }
        });
      };

      // Call the helper function to recursively copy children of the copied component
      compoChildren({ arr: component.children, cId: newId });
    },

    // change index of a element
    changeIndex: (
      state: any,
      action: PayloadAction<{ parentId: string; children: any }>
    ) => {
      const { parentId, children } = action.payload;
      // update children
      state[parentId].children = [...children];
    },

    // update style of a
    updatePropsStyle: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id, name, value } = action.payload;
      state[id].props.style[name] = value;
    },

    // add component event handler functions
    addHandlerFunctions: (
      state: any,
      action: PayloadAction<{
        id: ComponentId;
        name: string;
        value: any;
        actionType: any;
      }>
    ) => {
      const { id, name, value, actionType } = action.payload;

      if (state[id]) {
        // state[id].props = { ...state[id].props, [name]: value };
        state[id].event_handlers = {
          ...state[id].event_handlers,
          [name]: actionType
            ? `${value}`
            : `(event)=>{
            ${value}
          }`,
        };
      }
    },
    // hover a component
    hover: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id } = action.payload;
      state.hoverId = id;
    },

    // unhover a component
    unhover: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      state.hoverId = undefined;
    },

    // select a component
    select: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id } = action.payload;
      state.selectedId = id || "root";
    },

    // unselect a component
    unselect(state: any) {
      return {
        ...state,
        selectedId: DEFAULT_ID,
      };
    },

    // update props of a component
    updateProps: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id, name, value } = action.payload;
      state[id].props[name] = value;
    },

    // update content of a component
    updateContent: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id, name, value } = action.payload;
      state[id].content[name] = value;
    },

    // update component
    updateComponent: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id, name, value } = action.payload;
      state[id][name] = value;
    },

    // set component name
    setComponentName: (state: any, action) => {
      const { componentId, name } = action.payload;
      state[componentId].name = name;
    },

    // set parent id
    parentId: (
      state: any,
      action: PayloadAction<{ id: ComponentId; name: string; value: any }>
    ) => {
      const { id } = action.payload;
      state.parentId = id;
    },

    // delete a component
    deleteComponent: (state: any, action) => {
      const { id } = action.payload;

      // prevent deleting root
      if (id === "root") return;

      // delete child item
      const component = state[id];
      // check if component has children
      const hasChildren = component?.children?.length > 0;

      if (component && hasChildren) {
        // child item delete
        component?.children.forEach((childId: string) => {
          delete state[childId];
        });
      }

      // delete child item
      const parentId = component?.parent;
      state[parentId].children = state[parentId]?.children?.filter(
        (child: string) => child !== id
      );

      state.selectedId = component?.parent;
      // delete main item
      delete state[id];

      // state.selectedId = "root";
      state.parentId = "root";
    },

    // reset components
    resetComponents: () => {
      return initialState;
    },
  },
  // used for handling async actions or thunk actions
  extraReducers: (builder) => {},
});

export const {
  setComponents,
  addComponent,
  moveComponent,
  copyComponent,
  changeIndex,
  hover,
  unhover,
  select,
  unselect,
  setComponentName,
  updateComponent,
  updateProps,
  updateContent,
  updatePropsStyle,
  addHandlerFunctions,
  parentId,
  deleteComponent,
  resetComponents,
} = componentsSlice.actions;

export default componentsSlice.reducer;
