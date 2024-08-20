import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import React from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

const TextAlign = ({ component }: { component: any }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-gray-600">Text align</span>
      <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textAlign === "left" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textAlign",
                value: "left",
              })
            )
          }
        >
          <FaAlignLeft />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textAlign === "center" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textAlign",
                value: "center",
              })
            )
          }
        >
          <FaAlignCenter />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textAlign === "right" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textAlign",
                value: "right",
              })
            )
          }
        >
          <FaAlignRight />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textAlign === "justify" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textAlign",
                value: "justify",
              })
            )
          }
        >
          <FaAlignJustify />
        </button>
      </div>
    </div>
  );
};

export default TextAlign;
