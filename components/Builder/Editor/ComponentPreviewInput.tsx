import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useInteractive } from "@/hooks/useInteractive";
import Input from "@/components/Preview/ui/form/input/Input";
import Radio from "@/components/Preview/ui/form/radio/Radio";

const ComponentPreviewInput: React.FC<{
  componentName: string;
}> = ({ componentName }) => {
  const component = useSelector(getComponentBy(componentName));
  const { size, label, variant, shape, color, shadow, placeholder } =
    component || {};

  const { props, ref }: any = useInteractive(component, false);

  const { style: intStyle, ...rest } = props;

  // COMPONENT STYLE
  const { props: styleProps } =
    useSelector((state: any) => state.components[component?.id]) || {};

  // IF COMPONENT NOT FOUND
  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );
  }

  // DYNAMIC COMPONENT RENDER
  switch (component.type) {
    case "text":
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

    case "radio":
      return (
        <div
          ref={ref}
          {...rest}
          style={{
            // ...componentStyle,
            ...intStyle,
          }}
        >
          <Radio
            label={component.label}
            id={component.id}
            color={component.color}
          />
        </div>
      );

    case 'checkbox':
      return (
        <div
          ref={ref}
          {...rest}
          style={{
            //...componentStyle,
            ...intStyle,
          }}
        >
          <Checkbox color/>
        </div>
      );
    default:
      return null;
  }
};

export default memo(ComponentPreviewInput);
