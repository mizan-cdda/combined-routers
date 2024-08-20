
    // Your content goes here
  import React, {forwardRef} from "react";
  
  const TestPage001 = forwardRef(({ children, style, ...rest }: any, ref) => {
    const { content, functions, componentName, ...newRest } = rest || {};
    return <div style={style} ref={ref} {...newRest}>{children}</div>;
  });
  
  TestPage001.displayName = "TestPage001";
  export default TestPage001;
    