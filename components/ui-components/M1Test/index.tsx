
  // Your content goes here
import React, {forwardRef} from "react";

const M1Test = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  return <div style={style} ref={ref} {...newRest}>{children}</div>;
});

M1Test.displayName = "M1Test";
export default M1Test;
  