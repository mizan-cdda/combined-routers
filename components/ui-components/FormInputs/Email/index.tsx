import React, { forwardRef } from "react";

const Email = forwardRef(({ style, ...rest }: any, ref: any) => {
  const { label, content, functions, componentName, ...newRest } = rest || {};

  const styles = {
    ...style,
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
  };

  const mainStyle: any = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div ref={ref} style={mainStyle}>
      {label && <label>{label}</label>}
      <input type="email" {...newRest} style={styles} />
    </div>
  );
});

Email.displayName = "Email";

export default Email;
