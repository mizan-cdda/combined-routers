// Import necessary modules and hooks
import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useInteractive } from "@/hooks/useInteractive";
import dynamic from "next/dynamic";

// Define the ComponentPreview functional component
const ComponentPreview: React.FC<{
  componentName: string;
}> = ({ componentName }) => {
  // Retrieve the component using the provided name
  const component = useSelector(getComponentBy(componentName));

  // Get props and ref using the useInteractive hook
  const { props, ref }: any = useInteractive(component, false);

  // Destructure style from props
  const { style: intStyle, ...rest } = props;

  // Get additional style props from the Redux store
  const { props: styleProps } =
    useSelector((state: any) => state.components[component?.id]) || {};

  // Destructure style from additional style props
  const { style: componentStyle } = styleProps || {};

  // Log a warning if the component is unavailable
  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }

  // Determine the type of the component
  const type = (component && component?.componentName) || null;

  // DYNAMIC COMPONENT IMPORT - SSR
  const DynamicComponent = dynamic(
    () =>
      import("@/components/ui-components")
        .then((module: any) => {
          return module[type];
        })
        .catch((err) => {
          console.warn(`Error loading dynamic component: ${err}`);
          // Handle the error as needed, e.g., show a fallback component or log it
          return <div>Failed to load</div>;
        }),
    {
      suspense: true,
    }
  );

  // Uncomment this block if you want to use lazy loading for CSR
  // DYNAMIC COMPONENT IMPORT - CSR
  // const DynamicComponent = lazy(
  //   () => import(`@/@core-components/ui-components/${type}`)
  // );

  // Uncomment this block if you want to use dynamic loading with SSR
  // DYNAMIC COMPONENT IMPORT - SSR
  // const DynamicComponent = dynamic(
  //   () => import(`@/@core-components/ui-components/${type}`),
  //   {
  //     ssr: false,
  //   }
  // );

  // Return the component wrapped in a div with the ref
  return (
    <div ref={ref}>
      <DynamicComponent
        {...rest}
        style={{
          ...componentStyle,
          ...intStyle,
        }}
        functions={component?.functions}
        componentName={componentName}
        content={component?.content}
      >
        {component?.children?.length
          ? component?.children?.map((key: string) => (
              <ComponentPreview key={key} componentName={key} />
            ))
          : null}
      </DynamicComponent>
    </div>
  );
};

// Export the memoized ComponentPreview
export default memo(ComponentPreview);
