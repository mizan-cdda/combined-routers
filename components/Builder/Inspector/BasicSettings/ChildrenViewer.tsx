import useLayoutIndex from "@/hooks/useLayoutIndex";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteComponent,
  select,
} from "@/redux/features/components/componentsSlice";
import { Icon } from "../../IconHandler/IconComponentCopy";

const ChildrenViewer = ({ component }: { component: any }) => {
  // HOOKS FOR DRAG AND DROP
  const { handleDragOver, handleDragStart, handleDrop } = useLayoutIndex({
    parentId: component.id,
    itemArr: component.children,
  });

  // Redux dispatch function
  const dispatch = useDispatch();

  // Handler for deleting a component
  const handleDelete = ({ id }: { id: string }) => {
    dispatch(deleteComponent({ id }));
  };

  // Handler for selecting a component
  const handleInspect = (id: string) => {
    dispatch(select({ id }));
  };

  return (
    <>
      {component.children.length > 0 && <p>Childrens</p>}
      <div className="flex flex-col gap-1">
        {component.children?.map((child: any, index: number) => {
          return (
            <div
              className="cursor-move border p-1 flex justify-between items-center"
              key={child}
              draggable
              onDragStart={(e) =>
                typeof handleDragStart === "function" &&
                handleDragStart(e, index)
              }
              onDragOver={(e) =>
                typeof handleDragOver === "function" && handleDragOver(e, index)
              }
              onDrop={(e) =>
                typeof handleDrop === "function" && handleDrop(e, index)
              }
            >
              <Icon nameIcon="PiCaretUpDown" className="" />
              {child} {/* Icon for deletion is commented out for now */}
              {/* <button
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => {
                      handleDelete({ id: child });
                    }}
                  >
                    <Icon nameIcon="MdOutlineDelete" />
                  </button> */}
              {/* Icon for inspection */}
              <Icon
                nameIcon="CiSettings"
                className="cursor-pointer hover:text-red-500 text-xl"
                title="Inspect"
                onClick={() => handleInspect(child)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChildrenViewer;
