
import SelectBox from "@/components/Builder/Inspector/ui/SelectBox/SelectBox";
import InputWithUnit from "@/components/Builder/Inspector/ui/components/InputWithUnit/InputWithUnit";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const FontStyle = ({ component }: { component: any }) => {
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
    <div className="">
      <div className="flex  flex-col gap-2">
        <SelectBox
          id="fontFamily"
          label="Font family"
          options={[
            {
              label: "Roboto",
              value: "'Roboto', sans-serif",
            },
            {
              label: "Arial",
              value: "Arial, Helvetica, sans-serif",
            },
            {
              label: "Times New Roman",
              value: "'Times New Roman', Times, serif",
            },
            {
              label: "Courier New",
              value: "'Courier New', Courier, monospace",
            },
            {
              label: "Georgia",
              value: "Georgia, serif",
            },
            {
              label: "Verdana",
              value: "Verdana, Geneva, sans-serif",
            },
            {
              label: "Geneva",
              value: "Geneva, Tahoma, sans-serif",
            },
            {
              label: "Tahoma",
              value: "Tahoma, Geneva, sans-serif",
            },
            {
              label: "Trebuchet MS",
              value: "'Trebuchet MS', Helvetica, sans-serif",
            },
            {
              label: "Arial Black",
              value: "'Arial Black', Gadget, sans-serif",
            },
            {
              label: "Impact",
              value: "Impact, Charcoal, sans-serif",
            },
            {
              label: "Lucida Sans Unicode",
              value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
            },
            {
              label: "Tahoma",
              value: "Tahoma, Geneva, sans-serif",
            },
            {
              label: "Lucida Console",
              value: "'Lucida Console', Monaco, monospace",
            },
          ]}
          onChange={onChange("fontFamily")}
          defaultValue={
            component.props.style.fontFamily || "'Roboto', sans-serif"
          }
        />
        <SelectBox
          id="fontWeight"
          label="Font weight"
          options={[
            {
              label: "Normal",
              value: "normal",
            },
            {
              label: "Bold",
              value: "bold",
            },
            {
              label: "Bolder",
              value: "bolder",
            },
            {
              label: "Lighter",
              value: "lighter",
            },
          ]}
          onChange={onChange("fontWeight")}
          defaultValue={component.props.style.fontWeight || "normal"}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-600">Font size</span>
          <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
            <InputWithUnit
              propertiName="fontSize"
              onChange={onChange("fontSize")}
              defaultValue={component.props.style.fontSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontStyle;
