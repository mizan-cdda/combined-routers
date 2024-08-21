import React, { FunctionComponent, ComponentClass } from "react";
import { getComponentBy } from "@/utils/selectors";
import { useSelector } from "react-redux";
import { useInteractive } from "@/hooks/useInteractive";

const PreviewContainer: React.FC<{
  component: any;
  type: string | FunctionComponent<any> | ComponentClass<any, any>;
  enableVisualHelper?: boolean;
  isBoxWrapped?: boolean;
}> = ({
  component = {},
  type,
  enableVisualHelper,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { props, ref } = useInteractive(component, enableVisualHelper);

  const { style, ...rest } = props;

  const { props: styleProps } = useSelector(getComponentBy(component?.id)) || {};
  const { style: componentStyle } = styleProps || {};



  const children = React.createElement(type, {
    ...rest,
    ...forwardedProps,
    ref,
    style: {
      ...style,
      width: "100%",
      height: "40px",
      border: "1px solid gray",
      padding: "8px",
      ...componentStyle,
    },
  });

  return children;
};

export default PreviewContainer;
