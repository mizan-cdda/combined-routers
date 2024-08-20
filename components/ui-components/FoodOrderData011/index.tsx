
    // Your content goes here
  import React, {forwardRef} from "react";
  
  const FoodOrderData011 = forwardRef(({ children, style, ...rest }: any, ref) => {
    const { content, functions, componentName, ...newRest } = rest || {};
    return <div style={style} ref={ref} {...newRest}>{children}</div>;
  });
  
  FoodOrderData011.displayName = "FoodOrderData011";
  export default FoodOrderData011;
    