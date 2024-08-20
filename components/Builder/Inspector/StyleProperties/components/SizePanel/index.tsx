import React, { use, useEffect, useRef } from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import InputWithUnit from "../../../ui/components/InputWithUnit/InputWithUnit";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { useDispatch } from "react-redux";
import SelectBox from "../../../ui/SelectBox/SelectBox";

const SizePanel = ({ component }: { component: any }) => {
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
            header: "Size",
            content: (
              <>
                <div className="flex flex-col gap-2">
                  {/* width and height  */}
                  <div className="grid grid-cols-2 gap-2 ">
                    {/* width  */}
                    <div className="flex flex-col  gap-2 ">
                      <label
                        className="text-xs font-bold text-gray-600 w-1/2"
                        htmlFor="width"
                      >
                        Width
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full">
                        <InputWithUnit
                          propertiName="width"
                          onChange={onChange("width")}
                          defaultValue={component.props.style.width}
                        />
                      </div>
                    </div>

                    {/* height  */}
                    <div className="flex flex-col  gap-2 ">
                      <label
                        className="text-xs font-bold text-gray-600 w-1/2"
                        htmlFor="height"
                      >
                        Height
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full">
                        <InputWithUnit
                          propertiName="height"
                          onChange={onChange("height")}
                          defaultValue={component.props.style.height}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <Switch
                    label="Min Width & Height"
                    name=""
                    onChange={(e) => setShowMinWidth(e)}
                    value={showMinWidth}
                  /> */}

                  {/* Min-width and Min-height  */}
                  {/* {showMinWidth && ( */}
                  <div className="grid grid-cols-2 gap-2 ">
                    {/*min width  */}
                    <div className="flex flex-col  gap-2">
                      <label
                        className=" text-xs font-bold text-gray-600 w-1/2 "
                        htmlFor="min-width"
                      >
                        Min-W
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full ">
                        <InputWithUnit
                          propertiName="minWidth"
                          onChange={onChange("minWidth")}
                          defaultValue={
                            component.props.style.minWidth &&
                            component.props.style.minWidth
                          }
                        />
                      </div>
                    </div>

                    {/*min height  */}
                    <div className="flex flex-col  gap-2">
                      <label
                        className=" text-xs font-bold text-gray-600 w-1/2 "
                        htmlFor="min-height"
                      >
                        Min-H
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full ">
                        <InputWithUnit
                          propertiName="minHeight"
                          onChange={onChange("minHeight")}
                          defaultValue={
                            component.props.style.minHeight &&
                            component.props.style.minHeight
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* )} */}

                  {/* <Switch
                    label="Max Width & Height"
                    name=""
                    onChange={(e) => setShowMaxWidth(e)}
                    value={showMaxWidth}
                  /> */}

                  {/* max-width and max-height  */}
                  {/* {showMaxWidth && ( */}
                  <div className="grid grid-cols-2 gap-2 ">
                    {/*max width  */}
                    <div className="flex flex-col  gap-2">
                      <label
                        className=" text-xs font-bold text-gray-600 w-1/2 "
                        htmlFor="max-width"
                      >
                        Max-W
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full ">
                        <InputWithUnit
                          propertiName="maxWidth"
                          onChange={onChange("maxWidth")}
                          defaultValue={
                            component.props.style.maxWidth &&
                            component.props.style.maxWidth
                          }
                        />
                      </div>
                    </div>

                    {/*max height  */}
                    <div className="flex flex-col  gap-2">
                      <label
                        className=" text-xs font-bold text-gray-600 w-1/2 "
                        htmlFor="max-height"
                      >
                        Max-H
                      </label>
                      <div className="flex justify-center items-center relative border rounded-md overflow-hidden w-full ">
                        <InputWithUnit
                          propertiName="maxHeight"
                          onChange={onChange("maxHeight")}
                          defaultValue={
                            component.props.style.maxHeight &&
                            component.props.style.maxHeight
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                  <div>
                    <SelectBox
                      id="overflow"
                      label="Overflow"
                      options={[
                        {
                          label: "Visible",
                          value: "visible",
                        },
                        {
                          label: "Hidden",
                          value: "hidden",
                        },
                        {
                          label: "Scroll",
                          value: "scroll",
                        },
                        {
                          label: "Auto",
                          value: "auto",
                        },
                      ]}
                      onChange={onChange("overflow")}
                      defaultValue={component.props.style.overflow || "auto"}
                    />
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

export default SizePanel;
