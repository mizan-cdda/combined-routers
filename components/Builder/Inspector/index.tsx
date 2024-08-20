import useDispatch from "@/hooks/useDispatch";
import {
  copyComponent,
  deleteComponent,
} from "@/redux/features/components/componentsSlice";
import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import SettingsTab from "./SettingsTab";
import { FaRegCopy } from "react-icons/fa";

const Inspector = () => {
  const [inspector, setInspector] = useState(false);
  const dispatch = useDispatch();
  const component = useSelector(
    (state: any) => state.components[state.components.selectedId]
  );

  const { id, parent } = component || {};

  const isRoot = id === "root";

  // OPEN INSPECTOR WHEN COMPONENT IS SELECTED
  useEffect(() => {
    if (id !== "root") {
      setInspector(true);
    } else {
      setInspector(false);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        (event.key === "Delete") &&
        id !== "root"
      ) {
        handleDelete();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // DELETE COMPONENT

  const handleDelete = () => {
    dispatch(deleteComponent({ id }));
  };

  const handleCopy = () => {
    dispatch(copyComponent({ parentId: parent, componentId: id }));
  };

  if (!component) {
    return null;
  }

  return (
    <div
      className="border-l-2 transition-all duration-150 relative"
      style={{ width: true ? "300px" : "0px" }}
    >
      <div
        className={`bg-red-300 text-ellipsis text-sm font-bold uppercase flex justify-between py-1`}
      >
        <p>
          {component.name} {component.id}
        </p>
        <FaRegCopy
          onClick={handleCopy}
          className={`my-auto mr-2 cursor-pointer ${
            isRoot ? "hidden" : "block"
          }`}
          size={16}
        />
      </div>
      <SettingsTab component={component} />

      {!isRoot && (
        <button
          className="absolute bottom-0 text-center text-xl w-full py-2 bg-red-400 disabled:bg-red-300 hover:bg-red-500 transition-all duration-150 text-md font-bold text-white flex justify-center"
          onClick={handleDelete}
          disabled={isRoot}
        >
          {/* <Icon nameIcon="MdOutlineDeleteOutline" /> */}
        </button>
      )}
    </div>
  );
};

export default memo(Inspector);
