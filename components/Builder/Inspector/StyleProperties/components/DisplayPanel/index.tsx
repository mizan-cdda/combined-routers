import React, { useEffect, useRef, useState } from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import SelectBox from "../../../ui/SelectBox/SelectBox";
import { useDispatch } from "react-redux";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import InputWithUnit from "../../../ui/components/InputWithUnit/InputWithUnit";
import useElementHeight from "../../hooks/useElementHeight";

const DisplayPanel = ({ component }: { component: any }) => {
  const { id } = component || {};
  const dispatch = useDispatch();
  const [isFlex, setIsFlex] = useState(false);

  const contentHeight = useRef<HTMLDivElement>(null);

  const elementHeight = useElementHeight(contentHeight);

  const onChange = (propertyName: string) => (e: any) => {
    if (propertyName === "display" && e.target.value === "flex") {
      setIsFlex(true);
    }

    dispatch(
      updatePropsStyle({
        id: id,
        name: propertyName,
        value: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (component.props.style.display === "flex") {
      setIsFlex(true);
    } else {
      setIsFlex(false);
    }
  }, [component.props.style.display]);

  return (
    <div className="">
      <Accordion
        elementHeight={elementHeight}
        data={[
          {
            id: 1,
            header: "Layout",
            content: (
              <>
                <div ref={contentHeight} className="flex  flex-col gap-2 ">
                  <SelectBox
                    id="display"
                    label="Display"
                    options={[
                      {
                        label: "Block",
                        value: "block",
                      },
                      {
                        label: "Inline Block",
                        value: "inline-block",
                      },
                      {
                        label: "Flex",
                        value: "flex",
                      },
                      {
                        label: "Inline Flex",
                        value: "inline-flex",
                      },
                    ]}
                    onChange={onChange("display")}
                    defaultValue={component.props.style.display || "block"}
                  />
                  {isFlex && (
                    <>
                      <div className="e">
                        <SelectBox
                          id="direction"
                          label="Direction"
                          options={[
                            {
                              label: "Row",
                              value: "row",
                            },
                            {
                              label: "Row Reverse",
                              value: "row-reverse",
                            },
                            {
                              label: "Column",
                              value: "column",
                            },
                            {
                              label: "Column Reverse",
                              value: "column-reverse",
                            },
                          ]}
                          onChange={onChange("flexDirection")}
                          defaultValue={
                            component.props.style.flexDirection || "row"
                          }
                        />
                        <SelectBox
                          id="justify-content"
                          label="Justify Content"
                          options={[
                            {
                              label: "Start",
                              value: "flex-start",
                            },
                            {
                              label: "End",
                              value: "flex-end",
                            },
                            {
                              label: "Center",
                              value: "center",
                            },
                            {
                              label: "Space Between",
                              value: "space-between",
                            },
                            {
                              label: "Space Around",
                              value: "space-around",
                            },
                            {
                              label: "Space Evenly",
                              value: "space-evenly",
                            },
                          ]}
                          onChange={onChange("justifyContent")}
                          defaultValue={
                            component.props.style.justifyContent || "flex-start"
                          }
                        />
                        <SelectBox
                          id="align-items"
                          label="Align Items"
                          options={[
                            {
                              label: "Start",
                              value: "flex-start",
                            },
                            {
                              label: "End",
                              value: "flex-end",
                            },
                            {
                              label: "Center",
                              value: "center",
                            },
                            {
                              label: "Baseline",
                              value: "baseline",
                            },
                            {
                              label: "Stretch",
                              value: "stretch",
                            },
                          ]}
                          onChange={onChange("alignItems")}
                          defaultValue={
                            component.props.style.alignItems || "flex-start"
                          }
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-600">
                            Gap
                          </span>
                          <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
                            <InputWithUnit
                              propertiName="gap"
                              onChange={onChange("gap")}
                              defaultValue={
                                component.props.style.gap &&
                                component.props.style.gap
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DisplayPanel;
