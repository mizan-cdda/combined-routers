
    // Your content goes here
  import React, {forwardRef} from "react";
  
  const FoodOrderPage1 = forwardRef(({ children, style, ...rest }: any, ref) => {
    const { content, functions, componentName, ...newRest } = rest || {};
    return <div style={style} ref={ref} {...newRest}>{children}</div>;
  });
  
  FoodOrderPage1.displayName = "FoodOrderPage1";
  export default FoodOrderPage1;
    