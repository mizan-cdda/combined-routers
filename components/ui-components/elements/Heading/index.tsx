import React, { forwardRef } from "react";

const Heading = forwardRef(({ children, style, ...rest }: any, ref) => {
  const { content, functions, componentName, ...newRest } = rest || {};
  const styles = {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  const HeadingType = "h1";

  return (
    <HeadingType ref={ref} style={styles} {...newRest}>
      {/* {children} */}
      {content?.text}
    </HeadingType>
  );
});

Heading.displayName = "Heading";

export default Heading;
