import { useDropComponent } from "@/hooks/useDropComponent";
import React, { FunctionComponent, ComponentClass } from "react";
import ComponentPreview from "./ComponentPreview";
import { useInteractive } from "@/hooks/useInteractive";

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
      // display: "flex",
      ...style,
      ...component?.props?.style,
    },
  };

  if (isBoxWrapped) {
    propsElement.ref = drop(ref);
  }

  if (isOver) {
    propsElement.style.backgroundColor = "teal";
  }

  const children = React.createElement(
    "div",
    propsElement,
    component?.children?.map((key: string) => (
      <ComponentPreview key={key} componentName={key} />
    ))
  );

  return children;
};

export default WithChildrenPreviewContainer;
