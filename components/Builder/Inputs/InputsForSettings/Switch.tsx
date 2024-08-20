import React, { useState, memo, useEffect } from "react";

interface CustomSwitchProps {
  onChange: (value: any, key: string) => void;
  name: string;
  label: string;
  value: boolean;
}

const CustomSwitch = ({ onChange, name, label, value }: CustomSwitchProps) => {
  const [isChecked, setChecked] = useState(value || false);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleToggle = () => {
    const value = !isChecked;
    setChecked(value);
    if (onChange) {
      onChange(value, name);
    }
  };

  const switchStyles: any = {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
  };

  const sliderStyles: any = {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: isChecked ? "#2196f3" : "#ccc",
    transition: "0.4s",
    borderRadius: "34px",
  };

  const sliderBeforeStyles: any = {
    position: "absolute",
    content: "",
    height: "16px",
    width: "16px",
    left: "4px",
    bottom: "4px",
    backgroundColor: "white",
    transition: "0.4s",
    borderRadius: "50%",
    transform: isChecked ? "translateX(26px)" : "translateX(0)",
  };

  return (
    <div className="flex justify-between items-center">
      <label className="block text-sm font-bold text-gray-600" htmlFor={name}>
        {label}
      </label>
      <label style={switchStyles}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={sliderStyles}>
          <span style={sliderBeforeStyles}></span>
        </span>
      </label>
    </div>
  );
};

export default memo(CustomSwitch);
