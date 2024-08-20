// Your content goes here
import React, { forwardRef } from "react";

const Badge = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  const badgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #007bff",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "14px",
    width: "100px",
    textAlign: "center",
    ...style,
  };

  return (
    <div ref={ref} {...newRest} style={badgeStyle}>
      {children?.length > 0 ? children : "Badge"}
    </div>
  );
});

Badge.displayName = "Badge";
export default Badge;
