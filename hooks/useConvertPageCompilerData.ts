import { getComponents } from "@/utils/selectors";
import { useSelector } from "react-redux";

const useConvertPageCompilerData = ({
  newData = {},
  isComponents = true,
}: {
  newData?: any;
  isComponents?: boolean;
} = {}) => {
  // Get the 'components' slice of the Redux state
  const components = useSelector(getComponents);

  // Filter out non-object values from the 'components' and store in 'newComponents' array
  const newComponents =
    Object.values(isComponents ? components : newData).filter(
      (comp) => typeof comp === "object"
    ) || [];

  // Map through 'newComponents' and transform the data structure
  const data = newComponents?.map(
    ({
      id,
      parent,
      name,
      event_handlers,
      children,
      props,
      content,
      type,
      ...rest
    }: any) => {
      // Conditionally remove 'style' property from 'props'
      const { style, ...propsWithoutStyle } = props || {};

      return {
        // Assign component ID to the 'id' property
        id: id,
        // Assign parent ID to the 'parent_id' property, or null if the component is the root
        type: type,
        parent_id: id !== "root" ? parent : null,
        // Assign component name to the 'name' property
        name: id !== "root" ? name : "root",
        // Assign component function to 'function' property
        eventHandlers: event_handlers ? event_handlers : {},
        // Assign children array to the 'children' property
        children: children,
        // Extract styles from component props and create a styles array
        styles: props && [
          {
            key: "padding",
            value: "10px",
            screen: "desktop",
          },
          // Map through each style in the 'style' object and convert to desired format
          ...(style
            ? Object.keys(style).map((styleKey) => ({
                key: styleKey,
                value: style[styleKey],
                screen: "desktop",
              }))
            : []),
        ],

        // Set 'static_content' property to null
        static_content: content || null,
        // Set 'dynamic_content' property with empty 'hooks' and 'data' arrays
        dynamic_content: {
          hooks: [],
          data: [],
        },
        // Merge props excluding style
        ...propsWithoutStyle,
      };
    }
  );
  // Return the transformed data
  return { data };
};

export default useConvertPageCompilerData;
