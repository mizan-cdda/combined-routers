import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useInteractive } from "@/hooks/useInteractive";
import Input from "@/components/Preview/ui/form/input/Input";

const ComponentPreviewInput: React.FC<{
  componentName: string;
}> = ({ componentName }) => {
  const component = useSelector(getComponentBy(componentName));
  const { size, label, variant, shape, color, shadow, placeholder } = component || {};

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
      <Input
        {...rest}
        style={{
          // ...componentStyle,
          ...intStyle,
        }}
        // functions={component.functions}
        componentName={componentName}
        content={component?.content}
        {...{ size, shadow, shape, color, variant, label, placeholder }}
      />
    </div>
  );
};

export default memo(ComponentPreviewInput);
