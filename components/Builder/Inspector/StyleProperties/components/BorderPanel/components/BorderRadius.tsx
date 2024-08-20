import InputWithUnit from "@/components/Builder/Inspector/ui/components/InputWithUnit/InputWithUnit";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TbBorderRadius } from "react-icons/tb";

const BorderRadius = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-1">
        <span className="block  text-sm font-bold text-gray-600">
          Border radius
        </span>
        {/* Border radius all side  */}
        <InputWithUnit
          propertiName="borderRadius"
          onChange={(e) =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "borderRadius",
                value: e.target.value,
              })
            )
          }
          defaultValue={
            component.props.style.borderRadius &&
            component.props.style.borderRadius
          }
        />

        {/* border radius all property */}
        {/* border-top-left-radius */}
        {/* border-top-right-radius */}
        {/* border-bottom-right-radius */}
        {/* border-bottom-left-radius */}

        <div className="grid grid-cols-2 gap-1">
          <div>
            {/* <span>
              border-top-left-radius 
            </span> */}
            <TbBorderRadius className="h-5 w-5 font-bold text-lg " />
            <InputWithUnit
              propertiName="borderTopLeftRadius"
              onChange={(e) =>
                dispatch(
                  updatePropsStyle({
                    id: component.id,
                    name: "borderTopLeftRadius",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={component.props.style.borderTopLeftRadius}
            />
          </div>
          <div>
            {/* <span>border-top-right-radius</span>
             */}
            <TbBorderRadius className="h-5 w-5 font-bold text-lg rotate-90" />
            <InputWithUnit
              propertiName="borderTopRightRadius"
              onChange={(e) =>
                dispatch(
                  updatePropsStyle({
                    id: component.id,
                    name: "borderTopRightRadius",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={component.props.style.borderTopRightRadius}
            />
          </div>

          <div>
            {/* <span>border-bottom-left-radius</span> */}
            <TbBorderRadius className="h-5 w-5 font-bold text-lg -rotate-90" />
            <InputWithUnit
              propertiName="borderBottomLeftRadius"
              onChange={(e) =>
                dispatch(
                  updatePropsStyle({
                    id: component.id,
                    name: "borderBottomLeftRadius",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={component.props.style.borderBottomLeftRadius}
            />
          </div>

          <div>
            {/* <span>border-bottom-right-radius</span> */}
            <TbBorderRadius className="h-5 w-5 font-bold text-lg -rotate-180" />
            <InputWithUnit
              propertiName="borderBottomRightRadius"
              onChange={(e) =>
                dispatch(
                  updatePropsStyle({
                    id: component.id,
                    name: "borderBottomRightRadius",
                    value: e.target.value,
                  })
                )
              }
              defaultValue={component.props.style.borderBottomRightRadius}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderRadius;
