import { updateProps } from "@/redux/features/components/componentsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ButtonBasicSettings = ({ component }: any) => {
  const dispatch = useDispatch();

  const { label } = component.props || {};

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    dispatch(
      updateProps({
        id: component.id,
        name: key,
        value: e.target.value,
      })
    );
  };

  return (
    <>
      <label className="block text-sm font-bold text-gray-600" htmlFor="label">
        Label
      </label>
      <input
        className="w-full border-2 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
        placeholder="Enter label"
        type="text"
        onChange={(e) => onChange(e, "label")}
        value={label}
      />
    </>
  );
};

export default ButtonBasicSettings;
