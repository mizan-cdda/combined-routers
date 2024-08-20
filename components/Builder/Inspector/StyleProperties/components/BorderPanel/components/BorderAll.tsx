import React from "react";
import { useSelector } from "react-redux";
import { getSelectedComponent } from "@/utils/selectors";
import { useDispatch } from "react-redux";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import InputWithUnit from "@/components/Builder/Inspector/ui/components/InputWithUnit/InputWithUnit";
import SelectBox from "@/components/Builder/Inspector/ui/SelectBox/SelectBox";
import ColorPicker from "@/components/Builder/Inspector/ui/ColorPicker/ColorPicker";

const BorderAll = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div className="flex  flex-col gap-2 w-[95%] shadow-xl bg-gray-200 mx-2 p-3 rounded-md absolute top-20 left-0 z-50 select-none">
      {/* border width */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-gray-600">Border width</span>
        <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
          <InputWithUnit
            propertiName="borderWidth"
            // onChange={onChange("borderWidth")}
            onChange={(e) =>
              dispatch(
                updatePropsStyle({
                  id: component.id,
                  name: "borderWidth",
                  value: e.target.value,
                })
              )
            }
            defaultValue={
              component.props.style.borderWidth &&
              component.props.style.borderWidth
            }
          />
        </div>
      </div>
      {/* border style */}
      <SelectBox
        id="borderStyle"
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
        //   onChange={onChange("borderStyle")}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "borderStyle",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.borderStyle || "none"}
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
                  name: "borderColor",
                  value: e,
                })
              )
            }
            color={component.props.style.borderColor || "white"}
          />
        </div>
      </div>
    </div>
  );
};

export default BorderAll;
