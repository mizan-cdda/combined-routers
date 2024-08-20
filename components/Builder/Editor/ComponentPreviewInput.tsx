import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useInteractive } from "@/hooks/useInteractive";

const ComponentPreviewInput: React.FC<{
  componentName: string;
}> = ({ componentName }) => {
  const component = useSelector(getComponentBy(componentName));

  const { props, ref }: any = useInteractive(component, false);

  const { style: intStyle, ...rest } = props;

  // COMPONENT STYLE
  const { props: styleProps } =
    useSelector((state: any) => state.components[component?.id]) || {};

  const { style: componentStyle } = styleProps || {};

  // IF COMPONENT NOT FOUND
  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }
  const type = (component && component?.componentName) || null;

  // DYNAMIC COMPONENT IMPORT - SSR
  const DynamicComponent = dynamic(
    () =>
      import("@/components/ui-components")
        .then((module: any) => module[type])
        .catch((err) => console.log(err)),
    {
      suspense: true,
    }
  );

  // DYNAMIC COMPONENT RENDER
  return (
    <div ref={ref}>
      <DynamicComponent
        {...rest}
        style={{
          ...componentStyle,
          ...intStyle,
        }}
        functions={component.functions}
        componentName={componentName}
        content={component?.content}
      />
    </div>
  );
};

export default memo(ComponentPreviewInput);
