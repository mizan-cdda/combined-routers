import React, { useEffect, useState } from "react";
import InputWithUnit from "./InputWithUnit";
function splitValueAndUnit(input: string) {
  // Regular expression to match digits and units
  const regex = /^(\d*)?([a-zA-Z%]+)$/;

  const match = input.match(regex);

  if (!match) {
    // If no match, return null
    return null;
  }

  const digit = match[1] ? parseInt(match[1], 10) : "";
  const defaultUnit = match[2];

  return { digit, defaultUnit };
}

const LinkedInputs = () => {
  const [linkedValues, setLinkedValues] = useState({
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
  });

  const handleLinkButtonClick = () => {
    // Get the current value of the first component (assuming they all have the same initial value)
    const { digit, unit } = splitValueAndUnit(linkedValues.top) || {
      digit: 0,
      unit: "",
    };

    // Create a new set of values with the same digit and unit
    const newValues = {
      top: `${digit}${unit}`,
      right: `${digit}${unit}`,
      bottom: `${digit}${unit}`,
      left: `${digit}${unit}`,
    };

    // Update the state to trigger a re-render with the new values
    setLinkedValues(newValues);
  };

  const handleInputChange = (e) => {
    // Update the state based on the input's name
    setLinkedValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // Update all values when 'top' property changes
    const { digit, unit } = splitValueAndUnit(linkedValues.top) || {
      digit: 0,
      unit: "",
    };
    const newValues = {
      top: `${digit}${unit}`,
      right: `${digit}${unit}`,
      bottom: `${digit}${unit}`,
      left: `${digit}${unit}`,
    };
    setLinkedValues(newValues);
  }, [linkedValues.top]);

  console.log(linkedValues);

  return (
    <div>
      <button onClick={handleLinkButtonClick}>Link Values</button>
      <InputWithUnit
        defaultValue={linkedValues.top}
        propertiName="top"
        onChange={handleInputChange}
      />
      <InputWithUnit
        defaultValue={linkedValues.right}
        propertiName="right"
        onChange={handleInputChange}
      />
      <InputWithUnit
        defaultValue={linkedValues.bottom}
        propertiName="bottom"
        onChange={handleInputChange}
      />
      <InputWithUnit
        defaultValue={linkedValues.left}
        propertiName="left"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default LinkedInputs;
