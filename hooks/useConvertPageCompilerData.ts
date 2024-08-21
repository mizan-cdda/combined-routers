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

  function nestComponents(data: any = {}) {
    // Function to deep copy objects and arrays
    function deepCopy(obj: any = {}) {
      return JSON.parse(JSON.stringify(obj));
    }

    // Create a deep copy of the original data to avoid mutating it
    const dataCopy = deepCopy(data);

    const nestedComponents = (component: any = {}) => {
      if (component?.children?.length) {
        return {
          ...component,
          children: component.children.map((childId: string) =>
            nestedComponents(dataCopy[childId])
          ),
        };
      }
      return component;
    };

    const rootComponent = nestedComponents(
      deepCopy(dataCopy[dataCopy.root.children[0]])
    );

    // Return the new structure with only the root at the top level
    return {
      root: {
        ...dataCopy.root,
        children: [rootComponent],
      },
    };
  }
  // Return the transformed data
  return { data: nestComponents(components) };
};

export default useConvertPageCompilerData;
