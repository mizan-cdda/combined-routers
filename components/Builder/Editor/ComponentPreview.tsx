import { getComponentBy } from "@/utils/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import ComponentPreviewDefault from "./ComponentPreviewDefault";
import WithChildrenPreviewContainer from "./WithChildrenPreviewContainer";
import ComponentPreviewInput from "./ComponentPreviewInput";
import { useDropComponent } from "@/hooks/useDropComponent";
import { useInteractive } from "@/hooks/useInteractive";
import Radio from "@/components/Preview/ui/form/radio/Radio";

const ComponentPreview: React.FC<{
  componentName: string;
}> = ({ componentName, ...forwardedProps }) => {
  // component filtered
  const component = useSelector(getComponentBy(componentName));
  const {} = component || {};

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

    case "text":
    case "number":
    case "email":
    case "password":
    case "textarea":
    case "checkbox":
    case "radio":
      return <ComponentPreviewInput componentName={componentName} />;

    case "select":
      return null;

    default:
      return <ComponentPreviewDefault componentName={componentName} />;
  }
};

export default memo(ComponentPreview);
