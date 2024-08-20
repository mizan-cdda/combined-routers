
    // Your content goes here
  import React, {forwardRef} from "react";
  
  const D4 = forwardRef(({ children, style, ...rest }: any, ref) => {
    const { content, functions, componentName, ...newRest } = rest || {};
    return <div style={style} ref={ref} {...newRest}>{children}</div>;
  });
  
  D4.displayName = "D4";
  export default D4;
    