import React, { useEffect, useMemo, useState } from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import { useSelector } from "react-redux";
import { getSelectedComponent } from "@/utils/selectors";
import { useDispatch } from "react-redux";
import SelectBox from "../../../ui/SelectBox/SelectBox";
import ColorPicker from "../../../ui/ColorPicker/ColorPicker";
import InputRange from "../../../ui/InputRange";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";

type perseBoxShadow = {
  shadowType: string;
  xOffset: number;
  yOffset: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
};

type BoxShadow = {
  xOffset?: number | undefined;
  yOffset?: number | undefined;
  blurRadius?: number | undefined;
  spreadRadius?: number | undefined;
  color?: string | undefined;
  shadowType?: string | undefined;
};

function parseBoxShadow(boxShadowString: string): perseBoxShadow {
  // Split the input string into individual parts
  const parts = boxShadowString.split(/\s+/);

  // Extract values for each property
  const xOffset = parseFloat(parts[0]);
  const yOffset = parseFloat(parts[1]);
  const blurRadius = parseFloat(parts[2]);
  const spreadRadius = parseFloat(parts[3]);
  const color = parts.slice(4).join(" ");

  // Determine shadowType based on the presence of "inset" or "none"
  let shadowType = "outset";
  if (parts.includes("inset")) {
    shadowType = "inset";
  } else if (parts.includes("none")) {
    shadowType = "none";
  }

  // Return the parsed object
  return {
    shadowType,
    xOffset,
    yOffset,
    blurRadius,
    spreadRadius,
    color,
  };
}

const EffectPanel = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  const [boxShadow, setBoxShadow] = useState<BoxShadow>({
    xOffset: undefined,
    yOffset: undefined,
    blurRadius: undefined,
    spreadRadius: undefined,
    color: undefined,
    shadowType: undefined,
  });
  const [shadowType, setShadowType] = useState("none" as string);

  const onChange = (propertyName: string) => (e: any) => {
    // box-shadow: 0px 0px 0px 0px rgba(227,54,54,0) inset;

    if (e.target) {
      const { value, name } = e.target;

      setBoxShadow((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setBoxShadow((prev) => ({
        ...prev,
        [propertyName]: e,
      }));
    }

    if (propertyName === "shadowType") {
      // setShadowType(e.target.value);
      setBoxShadow((prev) => ({
        ...prev,
        shadowType: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (boxShadow && boxShadow.shadowType) {
      if (boxShadow.shadowType === "none") {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: "boxShadow",
            value: `none`,
          })
        );
        console.log("first");
      } else if (boxShadow.shadowType === "outset") {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: "boxShadow",
            value: `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color}`,
          })
        );
      } else {
        const updateSh = `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color} ${boxShadow.shadowType}`;
        const hasInset = updateSh.includes("inset");
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: "boxShadow",
            value: hasInset
              ? `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color}`
              : `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.blurRadius}px ${boxShadow.spreadRadius}px ${boxShadow.color} inset`,
          })
        );
      }
    }
  }, [boxShadow]);

  //set default value from component
  useEffect(() => {
    if (component.props.style.boxShadow) {
      setBoxShadow(parseBoxShadow(component.props.style.boxShadow));
      const { shadowType } = parseBoxShadow(component.props.style.boxShadow);

      // setShadowType(shadowType);
    } else {
      setBoxShadow({
        xOffset: undefined,
        yOffset: undefined,
        blurRadius: undefined,
        spreadRadius: undefined,
        color: undefined,
        shadowType: undefined,
      });
      // setShadowType("none");
    }
  }, [component.id]);

  return (
    <Accordion
      data={[
        {
          id: 1,
          header: "Effect",
          content: (
            <>
              <p>Box-shadow</p>
              <SelectBox
                id="shadowType"
                label="shadow type"
                options={[
                  { value: "none", label: "None" },
                  { value: "inset", label: "Inset" },
                  { value: "outset", label: "Outset" },
                ]}
                onChange={onChange("shadowType")}
                defaultValue={boxShadow && boxShadow.shadowType}
              />

              {/* x-offset  */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-gray-600">
                  x-offset
                </span>
                <InputRange
                  max={100}
                  min={-100}
                  showValue={true}
                  name="xOffset"
                  onChange={onChange("xOffset")}
                  defaultValue={
                    boxShadow && boxShadow.xOffset && boxShadow.xOffset
                  }
                />
              </div>
              {/* y-offset  */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-gray-600">
                  y-offset
                </span>
                <InputRange
                  max={100}
                  min={-100}
                  showValue={true}
                  name="yOffset"
                  onChange={onChange("yOffset")}
                  defaultValue={
                    boxShadow && boxShadow.yOffset && boxShadow.yOffset
                  }
                />
              </div>
              {/* blur-radius  */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-gray-600">
                  blur-radius
                </span>
                <InputRange
                  max={100}
                  min={-100}
                  showValue={true}
                  name="blurRadius"
                  onChange={onChange("blurRadius")}
                  defaultValue={
                    boxShadow && boxShadow.blurRadius && boxShadow.blurRadius
                  }
                />
              </div>
              {/* spread-radius  */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-gray-600">
                  spread-radius
                </span>
                <InputRange
                  max={100}
                  min={-100}
                  showValue={true}
                  name="spreadRadius"
                  onChange={onChange("spreadRadius")}
                  defaultValue={
                    boxShadow &&
                    boxShadow.spreadRadius &&
                    boxShadow.spreadRadius
                  }
                />
              </div>
              {/* color  */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">Color</span>

                <div className="flex-grow-0  w-4/6  flex justify-end items-center gap-1">
                  <ColorPicker
                    getColor={onChange("color")}
                    color={boxShadow && boxShadow.color && boxShadow.color}
                    //   color={component.props.style.background || "white"}
                  />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
};

export default EffectPanel;
