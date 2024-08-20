import React, { useEffect, useState } from "react";
import Background from "./theme/ColorPickerTheme";
import { colorFnc, gradientPosition } from "./colorPickerData/color";
import Theme from "./theme/Theme";

const ColorPicker = ({ color, getColor }: any) => {
  const [colorAdd, getColorAdd] = useState<any>(["red"]);
  // console.log(color.includes("gradient"));

  const initialGradientVariant =
    typeof color === "string" && color.includes("gradient")
      ? "gradient"
      : "normal";

  const [gradientVarient, setGradientVarient] = React.useState<string>(
    initialGradientVariant
  );
  // TOGGLE NORMAL AND GRADIENT STATE COLOR
  const handleRadioChange = (e: any) => {
    const radioValue = e.target.value;

    setGradientVarient(radioValue);
  };
  const handleGetCollor = (e: any) => {
    getColor(e);
  };

  const [toggle, setToggle] = React.useState<boolean>(false);
  // console.log(color.includes("gradient") ? true : false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Check if the click is inside the component
      if (
        event.target instanceof Element &&
        !event.target.closest(".relative")
      ) {
        setToggle(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [toggle]);

  const handleToggle = (value: boolean) => {
    setToggle(value);
  };

  return (
    <div className="relative w-full z-40  rounded-md text-gray-400 ">
      {/* <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleCopy}>Copy</button>
      </div> */}

      <div className="flex justify-end items-center rounded-md">
        <button
          className="h-6 w-6 rounded-full shadow-md border border-[#e4e4e4]"
          style={{ background: color }}
          onClick={() => handleToggle(!toggle)}
        ></button>
      </div>
      {toggle && (
        <div className="w-full top-7 absolute bg-white border  py-3 rounded-md  shadow-md   before:absolute before:border-4   before:border-transparent  before:border-b-[#e4e4e4] before:-top-[8px] before:left-[91%]  ">
          <div className="flex  justify-center items-center flex-col ">
            <SelectedColorType
              gradientVarient={gradientVarient}
              handleRadioChange={handleRadioChange}
            />
            {gradientVarient === "gradient" && (
              <Background
                colorFnc={colorFnc}
                gradientPosition={gradientPosition}
                getColor={getColor}
                handleGetCollors={handleGetCollor}
                colorAdd={colorAdd}
                getColorAdd={getColorAdd}
              />
            )}
            {gradientVarient === "normal" && (
              <div className="w-full    ">
                <Theme colorFnc={colorFnc} handleGetCollor={handleGetCollor} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

const SelectedColorType = ({ gradientVarient, handleRadioChange }: any) => {
  return (
    <div className=" flex justify-between gap-2  ">
      <div className="flex items-center  ">
        <input
          id="radio1"
          type="radio"
          name="radio"
          className="hidden"
          value="normal"
          checked={gradientVarient === "normal"}
          onChange={handleRadioChange}
        />
        <label htmlFor="radio1" className="flex items-center cursor-pointer">
          <span
            className={` ${
              gradientVarient === "normal" && "bg-green-500"
            }  w-4 h-4 inline-block mr-1 rounded-full border border-grey transition-transform hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-inner`}
          ></span>
          normal
        </label>
      </div>
      <div className="flex items-center ">
        <input
          id="radio2"
          type="radio"
          name="radio"
          className="hidden"
          value="gradient"
          checked={gradientVarient === "gradient"}
          onChange={handleRadioChange}
        />
        <label htmlFor="radio2" className="flex items-center cursor-pointer">
          <span
            className={` ${
              gradientVarient === "gradient" && "bg-blue-500"
            }  w-4 h-4 inline-block mr-1 rounded-full border border-grey transition-transform hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-inner`}
          ></span>
          gradient
        </label>
      </div>
    </div>
  );
};
