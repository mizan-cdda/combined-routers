import { getComponentBy } from "@/utils/selectors";
import React, { memo, Fragment } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useInteractive } from "@/hooks/useInteractive";

const ComponentPreview: React.FC<{
  componentName: string;
}> = ({ componentName }) => {
  const component = useSelector(getComponentBy(componentName));

  const { props, ref } = useInteractive(component, false);

  const { style: intStyle, ...rest } = props;

  const { props: styleProps } =
    useSelector((state: any) => state.components[component?.id]) || {};

  const { style: componentStyle } = styleProps || {};

  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }
  const type = (component && component?.componentName) || null;

  const DynamicComponent = dynamic(
    () =>
      import("@/@core-components/ui-components")
        .then((module: any) => module[type])
        .catch((err) => console.log(err)),
    {
      suspense: true
    }
  );

  const style =
    type === "Box"
      ? {
          padding: "20px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }
      : type === "Input"
      ? {
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
        }
      : {
          padding: "20px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        };

  const newStyle = {
    ...style,
    ...componentStyle,
  };

  return (
    <div ref={ref} {...rest}>
      <DynamicComponent
      // ref = {ref}
        {...rest}
        style={{ ...newStyle, ...intStyle, border: "1px solid gray" }}
      >
        {component?.children?.map((key: string) => {
          console.log(key,"key")
          return <ComponentPreview key={key} componentName={key} />;
          
        })}
      </DynamicComponent>
    </div>
  );
};

export default memo(ComponentPreview);
