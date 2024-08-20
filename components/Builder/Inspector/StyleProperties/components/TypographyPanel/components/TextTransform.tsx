import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import React from "react";

import {
  RxLetterCaseCapitalize,
  RxLetterCaseUppercase,
  RxLetterCaseLowercase,
} from "react-icons/rx";
import { useDispatch } from "react-redux";
const TextTransform = ({ component }: { component: any }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-gray-600">Text transform</span>
      <div className="flex-grow-0 w-1/2  flex justify-end items-center gap-1">
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textTransform === "capitalize" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textTransform",
                value: "capitalize",
              })
            )
          }
          title="capitalize"
        >
          <RxLetterCaseCapitalize />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textTransform === "uppercase" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textTransform",
                value: "uppercase",
              })
            )
          }
          title="uppercase"
        >
          <RxLetterCaseUppercase />
        </button>
        <button
          className={`hover:bg-gray-100 border rounded-md w-6 flex justify-center items-center py-1 px-0.5 ${
            component.props.style.textTransform === "lowercase" &&
            "bg-green-200 hover:bg-green-200"
          }`}
          onClick={() =>
            dispatch(
              updatePropsStyle({
                id: component.id,
                name: "textTransform",
                value: "lowercase",
              })
            )
          }
          title="lowercase"
        >
          <RxLetterCaseLowercase />
        </button>
      </div>
    </div>
  );
};

export default TextTransform;
