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

    // case "component":
    //   return (
    //     <ComponentLayoutPreview
    //       component={component}
    //       type={type}
    //       componentName={componentName}
    //       {...forwardedProps}
    //     />
    //   );

    // return <DynamicForm formData={component} />;

    default:
      return <ComponentPreviewDefault componentName={componentName} />;
  }
};

export default memo(ComponentPreview);

const ComponentLayoutPreview: React.FC<{
  component: any;
  type: string;
  componentName: string;
}> = ({ component, type, componentName, ...forwardedProps }) => {
  const { drop, isOver } = useDropComponent({
    componentId: component.id,
  });
  const { props, ref } = useInteractive(component, false);
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
  const children = React.createElement(
    "div",
    propsElement,
    component?.children?.map((key: string) => (
      <ComponentPreview key={key} componentName={key} />
    ))
  );

  return null;
};
