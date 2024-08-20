import InputWithUnit from "@/components/Builder/Inspector/ui/components/InputWithUnit/InputWithUnit";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const LineHeight = () => {
  const dispatch = useDispatch();
  const component = useSelector(getSelectedComponent);
  const onChange = (propertyName: string) => (e: any) => {
    dispatch(
      updatePropsStyle({
        id: component.id,
        name: propertyName,
        value: e.target.value,
      })
    );
  };
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-gray-600">Line height</span>
      <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
        <InputWithUnit
          propertiName="lineHeight"
          onChange={onChange("lineHeight")}
          defaultValue={component.props.style.lineHeight}
        />
      </div>
    </div>
  );
};

export default LineHeight;
