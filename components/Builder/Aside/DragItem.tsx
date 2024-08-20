// DragItem.js
import React from "react";
import { useDrag } from "react-dnd";
import { ComponentProps } from "@/types/types";
import Dropdown from "./DropdownOptions";

const DragItem = ({
  type,
  soon,
  label,
  rootParentType,
  component,
  acceptChildren,
}: {
  component: ComponentProps;
  soon: boolean;
  type: string;
  rootParentType: string;
  label: string;
  acceptChildren?: boolean;
}) => {
  // console.log("drag comp", component)
  const [, drag] = useDrag({
    type,
    item: { ...component, rootParentType, soon, acceptChildren },
  });

  return (
    <div
      ref={drag}
      className="bg-gray-100 flex flex-col items-center justify-center border border-gray-300 rounded-lg p-2 relative"
    >
      {/* {component?.icon && <Icon nameIcon={component?.icon} />} */}
      <span className="text-sm font-semibold">{label}</span>
      <div className="absolute top-1 right-0">
        {!component?.default && <Dropdown component={component} />}
      </div>
    </div>
  );
};

export default DragItem;
