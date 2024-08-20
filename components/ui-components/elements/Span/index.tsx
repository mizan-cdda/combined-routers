import React, { forwardRef } from "react";

const Span = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  const styles = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  return (
    <span ref={ref} style={styles} {...newRest}>
      {/* {children ? children : "Span"} */}
      {content?.text}
    </span>
  );
});

Span.displayName = "Span";

export default Span;
