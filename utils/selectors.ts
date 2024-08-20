// state components
export const getComponents = (state: any) => state?.components;
// state elements
export const getElements = (state: any) => state?.elements;

// get component by name or id
export const getComponentBy = (nameOrId: string) => (state: any) => {
  return state?.components?.[nameOrId];
};

// get selected component by name or id
export const getSelectedComponent = (state: any) =>
  state?.components?.[state?.components?.selectedId];

// get selected component props
export const getPropsForSelectedComponent = (state: any, propsName: string) =>
  state?.components?.present?.components[state?.components?.present?.selectedId]
    ?.props?.[propsName];

// get selected component Id
export const getSelectedComponentId = (state: any) =>
  state?.components?.present?.selectedId;

// get the component is selected or not
export const getIsSelectedComponent = (componentId: string) => (state: any) =>
  state?.components?.present?.selectedId === componentId;

// get selected component childrens
export const getSelectedComponentChildren = (state: any) => {
  return getSelectedComponent(state)?.children?.map((child: any) =>
    getComponentBy(child)(state)
  );
};

// get selected component parent
export const getSelectedComponentParent = (state: any) =>
  state?.components?.present?.components?.[getSelectedComponent(state)?.parent];

// get hovered component ID
export const getHoveredId = (state: any) => state?.components?.hoverId;

// get the component is hovered or not
export const getIsHovered = (id: string) => (state: any) =>
  getHoveredId(state) === id;

// get app display sizes
export const getdisplaySizes = (state: any) =>
  state?.app?.available_media_devices;

// curry function to pass screen size to get display sizes
export const getScreenSizes = (screen: string) => (state: any) =>
  state?.app?.available_media_devices?.[screen];

// get app default accept types
export const getDefaultAcceptTypes = (state: any) =>
  state?.app?.defaultAcceptTypes;

// get the selected component ID
export const getSelectedId = (state: any) => state?.components?.selectedId;

// << ------------------------------------------------------------------------------------------------------------------------------------ >> //
