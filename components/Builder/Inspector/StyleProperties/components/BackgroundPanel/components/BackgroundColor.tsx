import ColorPicker from "@/components/Builder/Inspector/ui/ColorPicker/ColorPicker";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BackgroundColor = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-gray-600">Background color</span>

      <div className="flex-grow-0  w-4/6  flex justify-end items-center gap-1">
        <ColorPicker
          getColor={(e: any) =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "background",
                value: e,
              })
            )
          }
          color={component.props.style.background || "white"}
        />
      </div>
    </div>
  );
};

export default BackgroundColor;
