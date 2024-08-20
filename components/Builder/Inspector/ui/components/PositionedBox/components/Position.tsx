import React, { ChangeEvent, SelectHTMLAttributes } from "react";

type Props = {
  inputValue: number | string | undefined;
  unitValue: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void; // Update the type of onChange
  inputName: string;
  selectName: string;
};

const Position = ({
  inputValue,
  unitValue,
  onChange,
  inputName,
  selectName,
}: Props) => {
  return (
    <div className="flex border rounded-md relative overflow-hidden">
      <input
        name={inputName}
        type="number"
        value={inputValue}
        onChange={onChange}
        className="outline-none pl-2 rounded-md w-full"
      />
      <select
        name={selectName}
        className=" absolute -right-5 top-0 outline-none cursor-pointer"
        value={unitValue}
        onChange={onChange} // Update the type of onChange
      >
        <option value="px">px</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
        <option value="vw">vw</option>
        <option value="vh">vh</option>
        <option value="vmin">vmin</option>
        <option value="vmax">vmax</option>
        <option value="cm">cm</option>
        <option value="mm">mm</option>
        <option value="in">in</option>
        <option value="pt">pt</option>
        <option value="pc">pc</option>
        <option value="ex">ex</option>
        <option value="ch">ch</option>
      </select>
    </div>
  );
};

export default Position;
