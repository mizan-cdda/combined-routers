
  // Your content goes here
import React, {forwardRef} from "react";

<<<<<<<< HEAD:src/@core-components/ui-components/PrTest1011111/index.tsx
const PrTest1011111 = forwardRef(({ children, style, ...rest }: any, ref) => {
========
const FoodCart = forwardRef(({ children, style, ...rest }: any, ref) => {
>>>>>>>> c7a01587808d9fce0b8274af8dbfd80b3f506e9a:src/@core-components/ui-components/FoodCart/index.tsx
  const { content, functions, componentName, ...newRest } = rest || {};
  return <div style={style} ref={ref} {...newRest}>{children}</div>;
});

<<<<<<<< HEAD:src/@core-components/ui-components/PrTest1011111/index.tsx
PrTest1011111.displayName = "PrTest1011111";
export default PrTest1011111;
========
FoodCart.displayName = "FoodCart";
export default FoodCart;
>>>>>>>> c7a01587808d9fce0b8274af8dbfd80b3f506e9a:src/@core-components/ui-components/FoodCart/index.tsx
  