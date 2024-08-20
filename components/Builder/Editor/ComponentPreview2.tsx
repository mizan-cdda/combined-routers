import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import ComponentPreviewDefault from "./ComponentPreviewDefault";
import WithChildrenPreviewContainer from "./WithChildrenPreviewContainer2";
import ComponentPreviewInput from "./ComponentPreviewInput";

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
    case "layout":
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={type}
          {...forwardedProps}
        />
      );

    case "input":
      return <ComponentPreviewInput componentName={componentName} />;

    default:
      return <ComponentPreviewDefault componentName={componentName} />;
  }
};

export default memo(ComponentPreview);
