"use client";
import { getSelectedComponent } from "@/utils/selectors";
import { useEffect, useState } from "react";
import { TbArrowLoopRight } from "react-icons/tb";
import { useSelector } from "react-redux";

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
  defaultValue?: string | undefined;
  propertyType?: string;
  propertiName?: string;
  onChange?: (e: any) => void;
};

type InputWithUnitState = {
  digit: number | undefined;
  unit: string | undefined;
};

const InputWithUnit = ({
  defaultValue,
  propertiName = "property name",
  onChange,
}: InputWithUnitProps) => {
  const component = useSelector(getSelectedComponent);
  const [showRange, setShowRange] = useState(false);
  const [state, setState] = useState<InputWithUnitState>({
    digit: undefined as any,
    // unit: undefined as any,
    unit: "px",
  });

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
    if (defaultValue) {
      if (splitValueAndUnit(defaultValue as any) !== null) {
        const { digit, defaultUnit }: any = splitValueAndUnit(
          defaultValue as any
        );

        setState({
          ...state,
          digit: digit,
          unit: defaultUnit,
        });
      }
    } else {
      setState({
        digit: 0,
        unit: "px",
      });
    }
  }, [defaultValue, component.id]);

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
    <div className="flex flex-col rounded-md border-2  w-full relative overflow-hidden ">
      <div className="grid col-span-3 items-center">
        <div
          className=" cursor-pointer absolute  left-0.5   "
          onClick={() => setShowRange(!showRange)}
        >
          <TbArrowLoopRight
            className={`transform transition-all duration-500 ${
              showRange ? "rotate-180 " : ""
            }`}
          />
        </div>
        <div className="w-[100%] pl-5 pr-8  flex justify-between ">
          <div className=" w-full h-6 overflow-hidden  relative">
            <div
              className={`w-[200%] h-full ${
                showRange ? "-translate-x-1/2" : "-translate-x-0"
              } duration-300 absolute flex  h-full`}
            >
              <div className=" w-full flex justify-center items-center ">
                {/* input  */}
                <input
                  name="digit"
                  type="number"
                  value={state && state.digit}
                  onChange={handleChange}
                  className="w-full pl-2 rounded-md outline-none"
                />
              </div>
              <div className=" w-full flex justify-center items-center px-1">
                {/* range  */}
                <input
                  className={`w-full `}
                  name="digit"
                  type="range"
                  value={(state && state.digit) || 10}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* unit list  */}
        <div className="absolute -right-6 -top-0.5">
          <select
            name="unit"
            onChange={handleChange}
            className="bg-transparent    outline-none cursor-pointer"
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
        </div>
      </div>
    </div>
  );
};

export default InputWithUnit;
