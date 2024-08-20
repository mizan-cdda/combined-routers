import ColorPicker from "@/components/Builder/Inspector/ui/ColorPicker/ColorPicker";
import SelectBox from "@/components/Builder/Inspector/ui/SelectBox/SelectBox";
import InputWithUnit from "@/components/Builder/Inspector/ui/components/InputWithUnit/InputWithUnit";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BorderTop = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div className="w-[95%] flex flex-col gap-2 shadow-xl bg-gray-200 mx-2 p-3 rounded-md absolute top-20 left-0 z-50 select-none">
      {/* border width */}
      <div className="flex justify-between items-center ">
        <span className="text-sm font-bold text-gray-600">Border Top</span>
        <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
          <InputWithUnit
            propertiName="borderTopWidth"
            onChange={(e) =>
              dispatch(
                updatePropsStyle({
                  id: component.id,
                  name: "borderTopWidth",
                  value: e.target.value,
                })
              )
            }
            defaultValue={
              component.props.style.borderTopWidth &&
              component.props.style.borderTopWidth
            }
          />
        </div>
      </div>
      {/* border style */}
      <SelectBox
        id="borderTopStyle"
        label="Border style"
        options={[
          { value: "none", label: "None" },
          { value: "solid", label: "Solid" },
          { value: "dashed", label: "Dashed" },
          { value: "dotted", label: "Dotted" },
          { value: "double", label: "Double" },
          { value: "groove", label: "Groove" },
          { value: "ridge", label: "Ridge" },
          { value: "inset", label: "Inset" },
          { value: "outset", label: "Outset" },
          { value: "hidden", label: "Hidden" },
        ]}
        //   onChange={onChange("borderTopStyle")}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "borderTopStyle",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.borderTopStyle || "none"}
      />

      {/* border color */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-gray-600">Border color</span>

        <div className="flex-grow-0  w-4/6  flex justify-end items-center gap-1">
          <ColorPicker
            getColor={(e: any) =>
              dispatch(
                updatePropsStyle({
                  id: component.id,
                  name: "borderTopColor",
                  value: e,
                })
              )
            }
            color={component.props.style.borderTopColor || "white"}
          />
        </div>
      </div>
    </div>
  );
};

export default BorderTop;
