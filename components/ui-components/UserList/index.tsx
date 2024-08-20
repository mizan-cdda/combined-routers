
  // Your content goes here
import React, {forwardRef} from "react";

const UserList = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  return <div style={style} ref={ref} {...newRest}>{children}</div>;
});

UserList.displayName = "UserList";
export default UserList;
  