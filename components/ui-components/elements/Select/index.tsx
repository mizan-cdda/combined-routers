import React, { forwardRef } from "react";

const Select = forwardRef(({ children, style, ...rest }: any, ref) => {
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
      {/* <label htmlFor="dino-select">Choose a dinosaur:</label> */}
      <select id="dino-select">
        <optgroup label="Theropods">
          <option>Tyrannosaurus</option>
          <option>Velociraptor</option>
          <option>Deinonychus</option>
        </optgroup>
        <optgroup label="Sauropods">
          <option>Diplodocus</option>
          <option>Saltasaurus</option>
          <option>Apatosaurus</option>
        </optgroup>
      </select>
    </div>
  );
});

Select.displayName = "Select";

export default Select;
