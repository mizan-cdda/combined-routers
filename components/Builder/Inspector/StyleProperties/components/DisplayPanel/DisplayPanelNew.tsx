import React, { useRef } from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import SelectBox from "../../../ui/SelectBox/SelectBox";
import InputWithUnit from "../../../ui/components/InputWithUnit/InputWithUnit";
import useElementHeight from "../../hooks/useElementHeight";
import { useDispatch } from "react-redux";
import { updateComponent } from "@/redux/features/components/componentsSlice";

const DisplayPanel = ({ component }: { component: any }) => {
  const { id } = component || {};

  const contentHeight = useRef<HTMLDivElement>(null);
  const elementHeight = useElementHeight(contentHeight);

  const dispatch = useDispatch();

  const onChange = (propertyName: string) => (e: any) => {
    dispatch(
      updateComponent({
        id: id,
        name: propertyName,
        value: e.target.value,
      })
    );
  };

  return (
    <div className="">
      <Accordion
        elementHeight={elementHeight}
        data={[
          {
            id: 1,
            header: "Layout",
            content: (
              <div ref={contentHeight} className="flex flex-col gap-2">
                <SelectBox
                  id="variant"
                  label="Variant"
                  options={[
                    { label: "Solid", value: "solid" },
                    { label: "Pastel", value: "pastel" },
                    { label: "Outlined", value: "outlined" },
                  ]}
                  onChange={onChange("variant")}
                  defaultValue={component.variant || "outlined"}
                />

                <SelectBox
                  id="color"
                  label="Color"
                  options={[
                    { label: "Default", value: "" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Muted", value: "muted" },
                    { label: "Primary", value: "primary" },
                    { label: "Info", value: "info" },
                    { label: "Success", value: "success" },
                    { label: "Warning", value: "warning" },
                    { label: "Error", value: "error" },
                    { label: "Transparent", value: "transparent" },
                  ]}
                  onChange={onChange("color")}
                  defaultValue={component.color || ""}
                />

                <SelectBox
                  id="shape"
                  label="Shape"
                  options={[
                    { label: "Straight", value: "" },
                    { label: "Rounded", value: "rounded" },
                    { label: "Smooth", value: "smooth" },
                    { label: "Curved", value: "curved" },
                    { label: "Full", value: "full" },
                  ]}
                  onChange={onChange("shape")}
                  defaultValue={component.shape || ""}
                />

                <SelectBox
                  id="size"
                  label="Size"
                  options={[
                    { label: "Small", value: "sm" },
                    { label: "Medium", value: "md" },
                    { label: "Large", value: "lg" },
                  ]}
                  onChange={onChange("size")}
                  defaultValue={component.size || "md"}
                />

                <SelectBox
                  id="shadow"
                  label="Shadow"
                  options={[
                    { label: "Default", value: "default" },
                    { label: "Secondary", value: "secondary" },
                    { label: "Muted", value: "muted" },
                    {
                      label: "Primary",
                      value: "primary",
                    },
                    {
                      label: "Info",
                      value: "info",
                    },
                    {
                      label: "Success",
                      value: "success",
                    },
                    {
                      label: "Warning",
                      value:
                        "hover:enabled:shadow-xl hover:enabled:shadow-warning-500/50 dark:hover:enabled:shadow-warning-800/20",
                    },
                    {
                      label: "Error",
                      value: "error",
                    },
                  ]}
                  onChange={onChange("shadow")}
                  defaultValue={component.shadow || ""}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DisplayPanel;
