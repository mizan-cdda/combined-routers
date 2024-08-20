import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import { getSelectedComponent } from "@/utils/selectors";
import React from "react";

import {
  MdFormatUnderlined,
  MdFormatOverline,
  MdFormatStrikethrough,
} from "react-icons/md";
import { RxTextNone } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const TextDecoration = () => {
  const component = useSelector(getSelectedComponent);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-gray-600">Text decoration</span>
      <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textDecoration === "none" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textDecoration",
                value: "none",
              })
            )
          }
          title="none"
        >
          <RxTextNone />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textDecoration === "underline" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textDecoration",
                value: "underline",
              })
            )
          }
          title="underline"
        >
          <MdFormatUnderlined />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textDecoration === "overline" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textDecoration",
                value: "overline",
              })
            )
          }
          title="overline"
        >
          <MdFormatOverline />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textDecoration === "line-through" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textDecoration",
                value: "line-through",
              })
            )
          }
          title="line-through"
        >
          <MdFormatStrikethrough />
        </button>
      </div>
    </div>
  );
};

export default TextDecoration;
