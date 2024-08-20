"use client";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

function splitValueAndUnit(input: string) {
  if (!input) {
    return null;
  }
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
function convertCssUnit(originalValue: string, targetUnit: string) {
  // Define the conversion factors
  const unitFactors: { [key: string]: number } = {
    px: 1,
    rem: 0.0625, // Assuming 1rem = 16px
    inch: 0.0104167, // Assuming 1 inch = 96px
    cm: 0.0264583, // Assuming 1 cm = 37.8px
    mm: 0.264583, // Assuming 1 mm = 3.78px
    pt: 0.75, // Assuming 1 pt = 1.33px
    pc: 0.0625, // Assuming 1 pc = 16px
    em: 0.0625, // Assuming 1em = 16px
    ex: 0.625, // Assuming 1ex = 1.6px
    ch: 0.266667, // Assuming 1ch = 3.75px
    vw: 0.15625, // Assuming 1vw = 6.4px
    vh: 0.3125, // Assuming 1vh = 3.2px
    vmin: 0.15625, // Assuming 1vmin = 6.4px
    vmax: 0.3125, // Assuming 1vmax = 3.2px
    "%": 1, // Assuming % is a ratio based on 100
  };

  // Extract numeric value and unit from the original value
  //   const match = originalValue.match(/^([\d.]+)(\D+)$/);
  const match = originalValue.match(/^(-?[\d.]+)(\D+)$/);
  if (!match) {
    console.error(`Invalid input: ${originalValue}`);
    return null;
  }

  const numericValue = parseFloat(match[1]);
  const sourceUnit = match[2];

  // Check if the source and target units are supported
  if (
    !unitFactors.hasOwnProperty(sourceUnit) ||
    !unitFactors.hasOwnProperty(targetUnit)
  ) {
    console.error(`Unsupported units: ${sourceUnit} or ${targetUnit}`);
    return null;
  }

  // Handle percentage values
  if (sourceUnit === "%" || targetUnit === "%") {
    const convertedValue = (numericValue / 100) * unitFactors[targetUnit];
    return Number.isInteger(convertedValue)
      ? convertedValue.toFixed(0)
      : convertedValue.toFixed(3);
  }

  // Convert the value to pixels and then to the target unit
  const valueInPx = numericValue / unitFactors[sourceUnit];
  const convertedValue = valueInPx * unitFactors[targetUnit];

  // Check if the converted value has decimal places
  return Number.isInteger(convertedValue)
    ? convertedValue.toFixed(0)
    : convertedValue.toFixed(3);
}

type InputWithUnitProps = {
  defaultValue?: string;
  propertyType?: string;
  propertiName?: string;
  onChange?: (e: any) => void;
};

type InputWithUnitState = {
  digit: number;
  unit: string;
};

const CustomInput = ({
  defaultValue,
  propertiName = "property name",
  onChange,
}: InputWithUnitProps) => {
  const [showRange, setShowRange] = useState(false);
  //   const convertedValue = splitValueAndUnit(defaultValue) as any;
  const [state, setState] = useState<InputWithUnitState>({
    digit: undefined as any,
    unit: undefined as any,
  });
  //   const [state, setState] = useState<InputWithUnitState>(undefined as any);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "unit") {
      const convertedDigit = convertCssUnit(
        `${state.digit}${state.unit}`,
        value
      );
      setState((prev) => ({
        ...prev,
        [name]: value,
        digit: convertedDigit ? parseInt(convertedDigit) : 0,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // set default value when component mount
  useEffect(() => {
    if (splitValueAndUnit(defaultValue) !== null) {
      const { digit, defaultUnit } = splitValueAndUnit(defaultValue) as any;

      setState({
        ...state,
        digit: digit,
        unit: defaultUnit,
      });
    }
  }, [defaultValue]);

  // change value when state change
  useEffect(() => {
    const payload = {
      target: {
        name: propertiName,
        value: `${state && state.digit}${state && state.unit}`,
      },
    };
    if (state && state.digit && state.unit) {
      onChange && onChange(payload);
    }
  }, [state]);

  return (
    <div className="flex flex-col rounded-md border-2 ">
      {/* <label className="text-gray-200 capitalize">{propertiName}</label> */}
      <div className="flex gap-2 relative overflow-hidden">
        <input
          name="digit"
          type="number"
          value={state && state.digit}
          //   min="0"
          onChange={handleChange}
          className="w-full pl-6 rounded-md outline-none"
          placeholder="All"
        />
        {/* unit selector */}
        <select
          name="unit"
          onChange={handleChange}
          className="bg-transparent  absolute -right-5 outline-none cursor-pointer"
          value={state && state.unit}
        >
          <option value="px">px</option>
          <option value="rem">rem</option>
          <option value="em">em</option>
          <option value="vw">vw</option>
          <option value="vh">vh</option>
          <option value="vmin">vmin</option>
          <option value="vmax">vmax</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="in">in</option>
          <option value="pt">pt</option>
          <option value="pc">pc</option>
          <option value="ex">ex</option>
          <option value="ch">ch</option>
          <option value="%">%</option>
        </select>

        {/* range slide toggle button */}
        <div
          className="absolute cursor-pointer w-4 top-1.5 left-1"
          onClick={() => setShowRange(!showRange)}
        >
          <FaArrowDown
            className={`transform transition-all duration-500 ${
              showRange ? "rotate-180 " : ""
            }`}
          />
        </div>
      </div>

      {/* range slide */}
      <div
        className={`flex justify-center items-center duration-300 ${
          showRange ? "h-[30px]" : "h-0"
        }`}
      >
        <input
          className={`w-full mx-2 ${showRange ? "h-[30px]" : "h-0 hidden"}`}
          name="digit"
          type="range"
          value={state && state.digit}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomInput;
