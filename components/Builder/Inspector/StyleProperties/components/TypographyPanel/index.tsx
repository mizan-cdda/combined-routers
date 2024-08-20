import React from "react";
import InputWithUnit from "../../../ui/components/InputWithUnit/InputWithUnit";
import Accordion from "../../../ui/Accordion/Accordion";

import { useDispatch } from "react-redux";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import FontStyle from "./components/FontStyle";
import TextAlign from "./components/TextAlign";
import TextDecoration from "./components/TextDecoration";
import TextTransform from "./components/TextTransform";
import LineHeight from "./components/LineHeight";
import ColorPicker from "../../../ui/ColorPicker/ColorPicker";

const TypographyPanel = ({ component }: { component: any }) => {
  const dispatch = useDispatch();

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
    <div>
      <Accordion
        data={[
          {
            id: 1,
            header: "Typography",
            content: (
              <>
                <div className="flex flex-col gap-2 select-none">
                  {/* font style  */}
                  <FontStyle component={component} />

                  {/* text align */}
                  <TextAlign component={component} />
                  {/* text decoration */}

                  <TextDecoration />

                  {/* text transform */}
                  <TextTransform component={component} />

                  {/* font color*/}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600">
                      Color
                    </span>

                    <div className="flex-grow-0  w-4/6  flex justify-end items-center gap-1">
                      <ColorPicker
                        getColor={(e: any) =>
                          dispatch(
                            updatePropsStyle({
                              id: component.id,
                              name: "color",
                              value: e,
                            })
                          )
                        }
                        color={component.props.style.color || "black"}
                      />
                    </div>
                  </div>
                  {/* Line height */}
                  <LineHeight />
                  {/* Letter spacing */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600">
                      Letter spacing
                    </span>
                    <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
                      <InputWithUnit
                        propertiName="letterSpacing"
                        onChange={onChange("letterSpacing")}
                        defaultValue={
                          component.props.style.letterSpacing &&
                          component.props.style.letterSpacing
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TypographyPanel;
