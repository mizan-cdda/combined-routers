import React, { useEffect, useState } from "react";

const Theme = ({ colorFnc, handleGetCollor }: any) => {
  const [theme, setTheme] = useState(true);
  const [range, setRange] = useState<number>(0.5);
  const [colorList, setColorList] = useState<any>([]);
  // color opacity set and change here 0.1 to 1
  useEffect(() => {
    setColorList(colorFnc(range));
  }, [range, colorFnc]);
  //   change color opacity using range value
  const handleRange = (e: any) => {
    const inputValue = Number(e.target.value);
    const rangeFix = Number((Math.floor(inputValue / 10) * 0.1).toFixed(1));
    setRange(rangeFix);
  };

  return (
    <div className="flex flex-col bg-white    rounded-lg gap-2  z-10 ">
      <div className="flex justify-between px-2 ">
        <button
          className="text-sm rounded-full text-gray-500 font-medium "
          onClick={() => setTheme(true)}
        >
          theme
        </button>
        <input
          type="color"
          className="w-6 h-6 border"
          onChange={(e) => handleGetCollor(e.target.value)}
        />
      </div>
      {theme && (
        <div className=" flex flex-col items-center justify-center  ">
          <div className="  flex    flex-wrap justify-center w-full ">
            <div className="flex flex-wrap gap-2 justify-center">
              {colorList?.map((color: any, index: any) => (
                <button
                  key={index}
                  className="h-5 w-5 rounded-full   border border-[#dbdbdb]"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleGetCollor(color.value)}
                ></button>
              ))}
            </div>
          </div>
          <>
            <label className="w-full mt-2 px-2">
              <input
                type="range"
                max={100}
                min={10}
                onChange={(e) => handleRange(e)}
                className="w-full"
              />
            </label>
          </>
        </div>
      )}
    </div>
  );
};

export default Theme;
