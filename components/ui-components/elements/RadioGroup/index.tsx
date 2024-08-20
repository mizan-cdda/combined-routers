import React, { forwardRef } from "react";

const RadioGroup = forwardRef(({ children, style, ...rest }: any, ref) => {
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
      {/* <p>Please select your age:</p> */}
      <input type="radio" id="age1" name="age" defaultValue={30} />
      <label htmlFor="age1">0 - 30</label>
      <br />
      <input type="radio" id="age2" name="age" defaultValue={60} />
      <label htmlFor="age2">31 - 60</label>
      <br />
      <input type="radio" id="age3" name="age" defaultValue={100} />
      <label htmlFor="age3">61 - 100</label>
      <br />
    </div>
  );
});

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
