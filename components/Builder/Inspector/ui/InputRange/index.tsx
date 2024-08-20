import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

type InputRangeProps = {
  name?: string | undefined;
  defaultValue?: number;
  onChange?: (e: any) => void;
  min?: number;
  max?: number;
  showValue?: boolean;
};

type Payload = {
  target: {
    name: string;
    value: number;
  };
};

const InputRange = ({
  name,
  defaultValue,
  onChange,
  min,
  max,
  showValue = false,
}: InputRangeProps) => {
  const [value, setValue] = useState(undefined as number | undefined);

  const handleSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(parseInt(event.currentTarget.value, 10));
  };

  useEffect(() => {
    const payload: Payload = {
      target: {
        name: name || "",
        value: value || 0,
      },
    };
    if (value) {
      onChange && onChange(payload);
    }
  }, [value, name]);

  const thumbStyle = {
    left: `${(((value ? value : 0) + 100) / 200) * 100}%`, // Adjusting for the min value of -100
  };

  useEffect(() => {
    setValue(defaultValue || 0);
  }, [defaultValue]);

  return (
    <div className={styles.rangeSlider}>
      <input
        type="range"
        min={min}
        max={max}
        value={value && value}
        onInput={handleSliderChange}
      />
      {showValue && (
        <div className={styles.rangeValue} style={thumbStyle}>
          {value && value}
        </div>
      )}
    </div>
  );
};

export default InputRange;
