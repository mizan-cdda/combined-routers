import React from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import InputWithUnit from "../../../ui/components/InputWithUnit/InputWithUnit";
import { useDispatch } from "react-redux";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import PositionedBox from "../../../ui/components/PositionedBox";
import Margin from "./components/Margin";
import Padding from "./components/Padding";

const SpacingPanel = ({ component }: { component: any }) => {
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
    <div>
      {" "}
      <Accordion
        data={[
          {
            id: 1,
            header: "Spacing",
            content: (
              <>
                <div className="flex flex-col gap-4">
                  {/* margin  */}

                  {/* <div className="flex flex-col gap-1">
                    <span className="block  text-sm font-bold text-gray-600">
                      Margin
                    </span>

                    <InputWithUnit
                      propertiName="margin"
                      onChange={onChange("margin")}
                      defaultValue={
                        component.props.style.margin &&
                        component.props.style.margin
                      }
                    />

                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <span>top</span>
                        <InputWithUnit
                          propertiName="marginTop"
                          onChange={onChange("marginTop")}
                          defaultValue={component.props.style.marginTop}
                        />
                      </div>

                      <div>
                        <span>bottom</span>
                        <InputWithUnit
                          propertiName="marginBottom"
                          onChange={onChange("marginBottom")}
                          defaultValue={component.props.style.marginBottom}
                        />
                      </div>

                      <div>
                        <span>right</span>
                        <InputWithUnit
                          propertiName="marginRight"
                          onChange={onChange("marginRight")}
                          defaultValue={component.props.style.marginRight}
                        />
                      </div>

                      <div>
                        <span>left</span>
                        <InputWithUnit
                          propertiName="marginLeft"
                          onChange={onChange("marginLeft")}
                          defaultValue={component.props.style.marginLeft}
                        />
                      </div>
                    </div>
                  </div> */}
                  <Margin />

                  {/* padding  */}
                  {/* <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <span className="block  text-sm font-bold text-gray-600">
                        Padding
                      </span>
                      <InputWithUnit
                        propertiName="padding"
                        onChange={onChange("padding")}
                        defaultValue={component.props.style.padding}
                      />

                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <span>top</span>
                          <InputWithUnit
                            propertiName="paddingTop"
                            onChange={onChange("paddingTop")}
                            defaultValue={component.props.style.paddingTop}
                          />
                        </div>

                        <div>
                          <span>bottom</span>
                          <InputWithUnit
                            propertiName="paddingBottom"
                            onChange={onChange("paddingBottom")}
                            defaultValue={component.props.style.paddingBottom}
                          />
                        </div>

                        <div>
                          <span>right</span>
                          <InputWithUnit
                            propertiName="paddingRight"
                            onChange={onChange("paddingRight")}
                            defaultValue={component.props.style.paddingRight}
                          />
                        </div>

                        <div>
                          <span>left</span>
                          <InputWithUnit
                            propertiName="paddingLeft"
                            onChange={onChange("paddingLeft")}
                            defaultValue={component.props.style.paddingLeft}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <Padding />
                </div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default SpacingPanel;
