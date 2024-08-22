import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import ComponentPreviewDefault from "./ComponentPreviewDefault";
import WithChildrenPreviewContainer from "./WithChildrenPreviewContainer";
import ComponentPreviewInput from "./ComponentPreviewInput";
import { useDropComponent } from "@/hooks/useDropComponent";
import { useInteractive } from "@/hooks/useInteractive";

const ComponentPreview: React.FC<{
  componentName: string;
}> = ({ componentName, ...forwardedProps }) => {
  // component filtered
  const component = useSelector(getComponentBy(componentName));

  // check component is valid or not
  if (!component) {
    console.error(
      `ComponentPreview unavailable for component ${componentName}`
    );

    return;
  }
  // check component type
  const type = (component && component.type) || null;

  switch (type) {
    case "something":
    case "component":
    case "section":
    case "layout":
    case "form":
      return (
        <WithChildrenPreviewContainer
          isBoxWrapped
          enableVisualHelper
          component={component}
          type={type}
          {...forwardedProps}
        />
      );

    case "input":
    case "number":
      return <ComponentPreviewInput componentName={componentName} />;

    default:
      return <ComponentPreviewDefault componentName={componentName} />;
  }
};

export default memo(ComponentPreview);
