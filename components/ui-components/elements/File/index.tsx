import React, { forwardRef } from "react";

const File = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  const styles = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    ...style,
  };
  return (
    <div ref={ref} style={styles} {...newRest}>
      {children}
    </div>
  );
});

File.displayName = "File";

export default File;
