import PositionedBox from "@/components/Builder/Inspector/ui/components/PositionedBox";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Margin = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  const onChange = (propertyName: string) => (e: any) => {
    if (Array.isArray(e.target)) {
      e.target.forEach((item: any) => {
        dispatch(
          updatePropsStyle({
            id: component.id,
            name: item.name,
            value: item.value,
          })
        );
      });
    } else {
      dispatch(
        updatePropsStyle({
          id: component.id,
          name: propertyName,
          value: e.target.value,
        })
      );
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <span className="block  text-sm font-bold text-gray-600">Margin</span>
      <PositionedBox
        property="margin"
        onChange={onChange("positionedMargin")}
        defaultValue={{
          top: component.props.style.marginTop,
          bottom: component.props.style.marginBottom,
          right: component.props.style.marginRight,
          left: component.props.style.marginLeft,
        }}
      />
    </div>
  );
};

export default Margin;
