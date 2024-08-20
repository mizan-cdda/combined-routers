import { useDropComponent } from "@/hooks/useDropComponent";
import React, { FunctionComponent, ComponentClass } from "react";
import { useInteractive } from "@/hooks/useInteractive";
import ComponentPreviewDefault from "./ComponentPreviewDefault2";

const WithChildrenPreviewContainer: React.FC<{
  component: any;
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  enableVisualHelper?: boolean;
  isBoxWrapped?: boolean;
  parentId?: string | null;
}> = ({
  component,
  type,
  parentId = null,
  enableVisualHelper = false,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { drop, isOver } = useDropComponent({
    componentId: component.id,
  });
  const { props, ref } = useInteractive(component, enableVisualHelper);
  const { style, ...rest } = props;

  const propsElement = {
    ...rest,
    ...forwardedProps,
    ref,
    style: {
      position: "relative",
      minHeight: "100px",
      width: "100%",
      padding: "8px",
      margin: "8px 0px",
      border: "1px dashed gray",
      ...style,
      ...component?.props?.style,
    },
  };

  if (!isBoxWrapped) {
    propsElement.ref = drop(ref);
  }

  if (isOver) {
    propsElement.style.backgroundColor = "teal";
  }

  return (
    <div href="" {...propsElement}>
      <ComponentPreviewDefault componentName={component?.id} />
    </div>
  );
};

export default WithChildrenPreviewContainer;
