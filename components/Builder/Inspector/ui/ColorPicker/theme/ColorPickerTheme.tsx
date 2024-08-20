import { useEffect, useRef, useState } from "react";
// import { colorFnc, gradientPosition } from "../colorPickerData/color";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import Theme from "./Theme";
const ColorPickerTheme = ({
  colorFnc,
  gradientPosition,
  getColor,

  colorAdd,
  getColorAdd,
}: any) => {
  // console.log(color.split("gradient")[1].split(","));
  const [gradientPos, setGradientPos] = useState<string>("to left");
  const [gradientStyle, setGradientStyle] = useState<any>("");
  const [textColor, setTextColor] = useState<boolean>(false);
  const [fixColor, setFixColor] = useState<any>();
  const [openChooseColor, setOpenChooseColor] = useState<number | null>(null);
  const [gradientColorPos, setGradientColorPos] =
    useState<string>("linear-gradient");
  const [preview, setPreview] = useState<any>(false);
  // added color to ColorPickerThemefunction

  const handleAdd = (e: any) => {
    let colors = colorFnc(1);
    const rand = Math.floor(Math.random() * colors.length);
    getColorAdd([...colorAdd, colors[rand].value]);
  };
  // added color to ColorPickerThemefunction
  useEffect(() => {
    const newColor = colorAdd.join(",");
    const colorAdded =
      colorAdd.length == 1 ? `${newColor},${newColor}` : newColor;
    let newArr;
    newArr = {
      background: `${gradientColorPos}(${gradientPos}, ${colorAdded})`,
    };
    // console.log(newArr);
    setGradientStyle(newArr);
  }, [colorAdd, gradientPos, gradientColorPos, fixColor, getColor]);

  //  open popup to choose your color
  const handleAddedColor = (e: any) => {
    setFixColor(e);
    e === openChooseColor ? setOpenChooseColor(null) : setOpenChooseColor(e);
  };
  // change your choose  color from popup
  const handleGetCollor = (e: any) => {
    getColorAdd(
      colorAdd.map((item: any, index: any) => {
        return index == fixColor ? (item = e) : item;
      })
    );
  };
  // remove color from background
  const handleAddedColorRemove = (idx: any) => {
    const data = colorAdd.filter((item: any, index: any) => index !== idx);
    getColorAdd(data);
  };

  // set graident item here
  const handleGradientItem = (e: any) => {
    setGradientPos(
      e.target.value == "radial-gradient" ? "circle at top" : "to left"
    );
    setGradientColorPos(e.target.value);
  };
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    getColor(gradientStyle.background);
  }, [getColor, gradientStyle.background]);
  return (
    <div className=" w-full  relative flex justify-center px-2  ">
      <div className="w-full  ">
        {preview && (
          <h1
            style={
              textColor
                ? {
                    ...gradientStyle,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : gradientStyle
            }
            className="w-full h-6 mb-2 rounded-md "
          >
            {" "}
          </h1>
        )}
        {/* select gradient item  */}
        <div className="flex justify-between items-center ">
          <GradientItem handleGradientItem={handleGradientItem} />
          {/* <FaRegEyeSlash
            className="text-blue-300 h-5 w-5 rounded-md hover:text-blue-400"
           
          /> */}

          <button
            onClick={() => {
              setPreview(!preview);
            }}
          >
            {preview ? "off" : "on"}
          </button>
        </div>
        {/* select your gradient position  */}
        <GradientPosition
          setGradientPos={setGradientPos}
          gradientColorPos={gradientColorPos}
          gradientPosition={gradientPosition}
        />
        {/* added color to ColorPickerTheme */}
        <ColorAdded
          colorAdd={colorAdd}
          handleAddedColor={handleAddedColor}
          handleGetCollor={handleGetCollor}
          handleAddedColorRemove={handleAddedColorRemove}
          openChooseColor={openChooseColor}
          colorFnc={colorFnc}
        />
        <div className="  flex justify-end">
          <button
            onClick={handleAdd}
            className="hover:bg-gray-400/30 rounded-full px-5 py-1 mt-1 border "
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerTheme;
// type func = {
//   handleGradientItem: (e: any) => void;

// }
const GradientItem = ({ handleGradientItem }: any) => {
  return (
    <>
      <select
        className=" border rounded-md px-1 py-1 outline-none"
        onChange={(e) => handleGradientItem(e)}
      >
        {["linear-gradient", "radial-gradient"].map((item: any, index: any) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};
// color added here
const ColorAdded = ({
  colorAdd,
  handleAddedColor,
  handleGetCollor,
  handleAddedColorRemove,
  openChooseColor,
  colorFnc,
}: any) => {
  const inputRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleCopy = (index: any) => {
    if (inputRef.current[index]) {
      const value: any = inputRef.current[index];
      console.log(inputRef.current[index]);

      value.select();
      document.execCommand("copy");
      // Optionally, you can provide feedback to the user, e.g., a tooltip or a notification.
    }
  };

  return (
    <div className="  flex    justify-end  ">
      <div>
        {colorAdd.map((item: any, index: number) => (
          <div
            key={index}
            className="relative  flex  justify-between  items-center py-1  "
          >
            {/* <span className="bg-red-900 ">{item}</span> */}

            <div className="flex justify-center items-center gap-2  w-full mr-3">
              <button
                className="w-6 h-6 rounded-full    "
                style={{ background: item }}
                onClick={() => handleAddedColor(index)}
              ></button>
              <input
                onChange={(e) => handleGetCollor(e.target.value)}
                value={item}
                ref={(ref) => (inputRef.current[index] = ref)}
                className="w-[85%]  border rounded-md outline-none  px-2   "
                readOnly={true}
              />
            </div>
            <div className="flex justify-center items-center gap-1  ">
              <button
                className="w-6 h-6 rounded-full  flex items-center justify-center hover:bg-gray-300/30 "
                onClick={() => handleCopy(index)}
              >
                <FaCopy />
              </button>
              {/* {!(index === 0) && ( */}
              <button
                className="w-6 h-6 rounded-full   hover:bg-gray-300/30"
                onClick={() => handleAddedColorRemove(index)}
              >
                x
              </button>
              {/* )} */}
            </div>
            {/* {console.log(!index == 0, index)} */}
            <div>
              {" "}
              {/*   open popup to choose your color */}
              {openChooseColor === index && (
                <div className="absolute left-0 bottom-8 px-5 py-3 rounded-md border z-50 bg-white ">
                  <Theme
                    colorFnc={colorFnc}
                    handleGetCollor={handleGetCollor}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// gradient position here
const GradientPosition = ({
  setGradientPos,
  gradientColorPos,
  gradientPosition,
}: any) => {
  return (
    <div className="flex justify-between gap-2 py-2 ">
      <span>Gradient</span>
      <select
        className="w-1/2 border rounded-md px-1 py-1 outline-none"
        onChange={(e) => setGradientPos(e.target.value)}
      >
        {gradientPosition?.map((item: any, index: any) => {
          let data =
            gradientColorPos === "radial-gradient" ? item.rName : item.name;
          return (
            <option key={index} value={data}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  );
};
