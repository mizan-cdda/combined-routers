import SelectBox from "@/components/Builder/Inspector/ui/SelectBox/SelectBox";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const BackgroundImage = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-gray-600">Image url</span>
        <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
          <input
            type="url"
            className="w-full border-2 rounded px-3 py-1 text-sm mt-1 focus:outline-none focus:border-blue-500"
            onChange={(e) =>
              dispatch(
                updatePropsStyle({
                  id: component.id,
                  name: "backgroundImage",
                  value: `url(${e.target.value})`,
                })
              )
            }
          />
        </div>
      </div>
      <SelectBox
        id="backgroundPosition"
        label="Background position"
        options={[
          { value: "center", label: "Center" },
          { value: "top", label: "Top" },
          { value: "bottom", label: "Bottom" },
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
          { value: "top left", label: "Top left" },
          { value: "top right", label: "Top right" },
          { value: "bottom left", label: "Bottom left" },
          { value: "bottom right", label: "Bottom right" },
        ]}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "backgroundPosition",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.backgroundPosition}
      />

      <SelectBox
        id="backgroundSize"
        label="Background size"
        options={[
          { value: "auto", label: "Auto" },
          { value: "cover", label: "Cover" },
          { value: "contain", label: "Contain" },
        ]}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "backgroundSize",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.backgroundSize || "auto"}
      />
      <SelectBox
        id="backgroundRepeat"
        label="Background repeat"
        options={[
          { value: "no-repeat", label: "No repeat" },
          { value: "repeat", label: "Repeat" },
          { value: "repeat-x", label: "Repeat-x" },
          { value: "repeat-y", label: "Repeat-y" },
        ]}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "backgroundRepeat",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.backgroundRepeat}
      />

      <SelectBox
        id="backgroundAttachment"
        label="Background attachment"
        options={[
          { value: "scroll", label: "Scroll" },
          { value: "fixed", label: "Fixed" },
          { value: "local", label: "Local" },
        ]}
        onChange={(e) =>
          dispatch(
            updatePropsStyle({
              id: component.id,
              name: "backgroundAttachment",
              value: e.target.value,
            })
          )
        }
        defaultValue={component.props.style.backgroundAttachment}
      />
    </div>
  );
};

export default BackgroundImage;
