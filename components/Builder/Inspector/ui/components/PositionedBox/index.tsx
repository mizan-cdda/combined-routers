import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Position from "./components/Position";

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

    // return 0;
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

function splitValueAndUnit(input: string) {
  if (!input) {
    return null;
  }
  // Regular expression to match digits and units
  const regex = /^(-?\d*\.?\d+)?([a-zA-Z%]+)$/;
  const match = input.match(regex);
  if (!match) {
    // If no match, return null
    return null;
  }

  const digit =
    match[1] !== undefined && match[1] !== "" ? parseFloat(match[1]) : "";
  const defaultUnit = match[2];

  return { digit, defaultUnit };
}

const extractDefaultValue = (
  value: string
): { value: number; unit: PropertyUnit } => {
  const { digit, defaultUnit } = splitValueAndUnit(value) || {
    digit: "",
    defaultUnit: "px",
  };
  return { value: Number(digit), unit: defaultUnit as PropertyUnit };
};

// convert state value to payload format
function createStatePayload<T extends keyof StateValue>(
  property: string,
  stateValue: StateValue
) {
  const payload: Payload = {
    target: Object.entries(stateValue).map(([prop, propValue]) => ({
      name: `${property}${prop.charAt(0).toUpperCase() + prop.slice(1)}`,
      value: `${propValue.value}${propValue.unit}`,
    })),
  };

  return payload;
}

type PositionedBoxProps = {
  property: string;
  onChange: (e: any) => void;
  defaultValue?: any;
};

type PropertyUnit =
  | "px"
  | "rem"
  | "em"
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"
  | "ex"
  | "ch"
  | "%";

type Property = {
  value: number | undefined;
  unit: PropertyUnit;
};

type StateValue = {
  top: Property;
  right: Property;
  bottom: Property;
  left: Property;
};

type PropertyKey = string;

type Payload = {
  target: {
    name: string;
    value: string;
  }[];
};

const PositionedBox = ({
  property,
  onChange,
  defaultValue,
}: PositionedBoxProps) => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState<StateValue>({
    top: { value: undefined, unit: "px" },
    right: { value: undefined, unit: "px" },
    bottom: { value: undefined, unit: "px" },
    left: { value: undefined, unit: "px" },
  });

  const [isLinking, setIsLinking] = useState(false);

  const handleLinkButtonClick = () => {
    setIsLinking((prev) => !prev);
  };
  // linking all value when click link button
  useEffect(() => {
    if (isLinking) {
      // If linking is active, update all values based on the top value
      const linkedValue = stateValue.top.value;
      const linkedUnit = stateValue.top.unit;
      setStateValue((prev) => ({
        top: { value: linkedValue, unit: linkedUnit },
        right: { value: linkedValue, unit: linkedUnit },
        bottom: { value: linkedValue, unit: linkedUnit },
        left: { value: linkedValue, unit: linkedUnit },
      }));
    }
  }, [isLinking, stateValue?.top?.value, stateValue?.top?.unit]);

  // handle change value
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    propertyName: keyof StateValue
  ): void => {
    const { name, value } = e.target;

    setStateValue((prev) => {
      let updatedValue: number | string | null | undefined =
        prev[propertyName].value;
      let updatedUnit: string = prev[propertyName].unit;

      if (name === "unit") {
        // If changing the unit, perform unit conversion
        updatedUnit = value as PropertyUnit;
        updatedValue = convertCssUnit(
          `${prev[propertyName].value}${prev[propertyName].unit}`,
          value
        );
      } else {
        // If changing the numeric value, update only the value

        updatedValue = convertCssUnit(
          `${value}${prev[propertyName].unit}`,
          prev[propertyName].unit
        );
      }

      if (isLinking) {
        // If linking is active, update all linked properties
        const linkedProperties: (keyof StateValue)[] = [
          "top",
          "right",
          "bottom",
          "left",
        ];
        const linkedState: StateValue = {} as StateValue;
        linkedProperties.forEach((prop) => {
          linkedState[prop] = {
            value: updatedValue as number,
            unit: updatedUnit as PropertyUnit,
          };
        });
        return linkedState;
      } else {
        // If linking is not active, update only the current property
        return {
          ...prev,
          [propertyName]: {
            value: updatedValue,
            unit: updatedUnit,
          },
        };
      }
    });
  };

  // set default value when component mount

  useEffect(() => {
    if (
      defaultValue &&
      (defaultValue.top ||
        defaultValue.right ||
        defaultValue.bottom ||
        defaultValue.left)
    ) {
      const { top, right, bottom, left } = defaultValue;
      setStateValue({
        top: top ? extractDefaultValue(top) : { value: undefined, unit: "px" },
        right: right
          ? extractDefaultValue(right)
          : { value: undefined, unit: "px" },
        bottom: bottom
          ? extractDefaultValue(bottom)
          : { value: undefined, unit: "px" },
        left: left
          ? extractDefaultValue(left)
          : { value: undefined, unit: "px" },
      });
    } else {
      setStateValue({
        top: { value: undefined, unit: "px" },
        right: { value: undefined, unit: "px" },
        bottom: { value: undefined, unit: "px" },
        left: { value: undefined, unit: "px" },
      });
    }
  }, [
    defaultValue,
    defaultValue?.top,
    defaultValue?.right,
    defaultValue?.bottom,
    defaultValue?.left,
  ]);

  //   change value when state change
  useEffect(() => {
    if (
      (stateValue.top && stateValue.top.value && stateValue.top.value) ||
      (stateValue.right && stateValue.right.value && stateValue.right.value) ||
      (stateValue.bottom &&
        stateValue.bottom.value &&
        stateValue.bottom.value) ||
      (stateValue.left && stateValue.left.value && stateValue.left.value)
    ) {
      // const payload = createStatePayload(property, stateValue);
      // onChange && onChange(payload);
      // set value for top
      if (
        stateValue?.top?.value !== undefined &&
        stateValue?.top?.value !== null &&
        stateValue?.top?.unit !== undefined
      ) {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: `${property}Top`,
            value: `${stateValue.top.value}${stateValue.top.unit}`,
          })
        );
      }
      // set value for right
      if (
        stateValue?.right?.value !== undefined &&
        stateValue?.right?.value !== null &&
        stateValue?.right?.unit !== undefined
      ) {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: `${property}Right`,
            value: `${stateValue.right.value}${stateValue.right.unit}`,
          })
        );
      }
      // set value for bottom
      if (
        stateValue?.bottom?.value !== undefined &&
        stateValue?.bottom?.value !== null &&
        stateValue?.bottom?.unit !== undefined
      ) {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: `${property}Bottom`,
            value: `${stateValue.bottom.value}${stateValue.bottom.unit}`,
          })
        );
      }
      // set value for left
      if (
        stateValue?.left?.value !== undefined &&
        stateValue?.left?.value !== null &&
        stateValue?.left?.unit !== undefined
      ) {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: `${property}Left`,
            value: `${stateValue.left.value}${stateValue.left.unit}`,
          })
        );
      }
    }
  }, [stateValue]);
  // console.log(stateValue, "stateValue");
  return (
    <div className="grid grid-cols-2 gap-1">
      {/* top  */}
      <div>
        <div className="flex justify-between py-1 text-gray-300">
          <span>top</span>
          {/* link button  */}
          <button
            onClick={handleLinkButtonClick}
            className="flex justify-center items-center gap-2  px-1 h-5  bg-teal-400 rounded-md hover:bg-teal-500 text-white"
          >
            {isLinking ? "Unlink" : "Link"}
          </button>
        </div>
        <Position
          inputName="top"
          selectName="unit"
          inputValue={
            stateValue.top && stateValue?.top?.value && stateValue?.top?.value
          }
          unitValue={
            stateValue.top && stateValue.top.unit ? stateValue.top.unit : "px"
          }
          onChange={(e) => handleChange(e, "top")}
        />
      </div>
      {/* right */}
      <div>
        <div className="flex justify-between py-1 text-gray-300">
          <span>right</span>
        </div>
        <Position
          inputName="right"
          selectName="unit"
          inputValue={
            stateValue.right && stateValue.right.value
              ? stateValue.right.value
              : ""
          }
          unitValue={
            stateValue.right && stateValue.right.unit
              ? stateValue.right.unit
              : "px"
          }
          onChange={(e) => handleChange(e, "right")}
        />
      </div>
      {/* bottom  */}
      <div>
        <div className="flex justify-between py-1 text-gray-300">
          <span>bottom</span>
        </div>
        <Position
          inputName="bottom"
          selectName="unit"
          inputValue={
            stateValue.bottom && stateValue.bottom.value
              ? stateValue.bottom.value
              : ""
          }
          unitValue={
            stateValue.bottom && stateValue.bottom.unit
              ? stateValue.bottom.unit
              : "px"
          }
          onChange={(e) => handleChange(e, "bottom")}
        />
      </div>
      {/* left  */}
      <div>
        <div className="flex justify-between py-1 text-gray-300">
          <span>left</span>
        </div>
        <Position
          inputName="left"
          selectName="unit"
          inputValue={
            stateValue.left && stateValue.left.value
              ? stateValue.left.value
              : ""
          }
          unitValue={
            stateValue.left && stateValue.left.unit
              ? stateValue.left.unit
              : "px"
          }
          onChange={(e) => handleChange(e, "left")}
        />
      </div>
    </div>
  );
};

export default PositionedBox;
