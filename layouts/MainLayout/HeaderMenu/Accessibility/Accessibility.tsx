import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { CiZoomIn } from "react-icons/ci";
import { FaUniversalAccess } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
const data = [
  {
    name: "Color Blind",
    type: "checkbox",
  },
  {
    name: "Color",
  },

  {
    name: "Vision impaired (microphone)",
    type: "checkbox",
  },
  {
    name: "Motor disable (Keyboard navigation)",
    type: "checkbox",
  },
  {
    name: "Font Size",
    type: "zoom_font",
  },
  {
    name: "Page Zoom",
    type: "zoom_font",
  },
  {
    name: "Magnify",
    type: "checkbox",
  },
];

const Accessibility = ({ sidebarMenuIcon, handleClick }: any) => {
  return (
    <div className=" relative">
      <button
        className="  relative w-10 h-10  bg-[#5f5f5f33] p-2 rounded-full    "
        onClick={() => handleClick("accessblity")}
      >
        <FaUniversalAccess className="w-6 h-6   border rounded-full" />
      </button>
      <div
        className={`${
          sidebarMenuIcon?.accessblity
            ? "block   min-h-min  borderss"
            : " h-0 text-transparent  overflow-hidden  "
        } bg-[#1A1A1A] absolute -right-6 top-[54px] rounded-md duration-300 ease-in-out transition-all  w-[360px]  divide-y `}
      >
        <div className="flex space-x-2 py-3  px-5 ">
          <div className="flex flex-col">
            <span className="text-lg leading-[23px] font-semibold">
              Accessibility assistant
            </span>
            <span className="text-sm leading-4 font-normal text-[#999]">
              let’s Personalize your experience.
            </span>
          </div>
        </div>

        <AccessibilityData data={data} />
        <div className="bg-black flex justify-center py-3.5 rounded-bl-md rounded-br-md">
          <button className="text-white flex space-x-1.5 text-base items-center">
            <span>
              <GrPowerReset />
            </span>
            <span>Reset settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;

const AccessibilityData = ({ data }: any) => {
  const [count, setCount] = useState({
    pageZoomCount: 100,
    fontSizeCount: 100,
  });

  const handleClick = (fncName: string, value: string) => {
    const bodyZoom: any = document.body.style;
    switch (fncName) {
      case "Font Size":
        break;
      // body zoom in zoom out system
      case "Page Zoom":
        if (value === "inc") {
          setCount((prevCount) => ({
            ...prevCount,
            pageZoomCount: prevCount.pageZoomCount + 5,
          }));
          bodyZoom.zoom = `${count.pageZoomCount + 5}%`;
        } else {
          setCount((prevCount) => ({
            ...prevCount,
            pageZoomCount: prevCount.pageZoomCount - 5,
          }));
          bodyZoom.zoom = `${count.pageZoomCount - 5}%`;
        }

        break;
      default:
        break;
    }
  };
  return (
    <div className=" bg-[#31313133]  ">
      {data.map((item: any, index: any) => (
        <AccessibilityMenutItem
          item={item}
          key={index}
          handleClick={handleClick}
          count={count}
        />
      ))}
    </div>
  );
};
const AccessibilityMenutItem = ({ item, handleClick, count }: any) => {
  return (
    <div className="flex justify-between py-5 px-5 relative items-center">
      <div className="flex space-x-1 items-center">
        <span>
          <CiZoomIn />
        </span>
        <div className="text-base leading-5 ">
          <span>{item.name}</span>
          {item.name == "Color" && (
            <div className="flex  justify-around   w-full absolute left-0 py-[1px] ">
              <div className="w-1/2 flex space-x-2 items-center pl-20">
                <div className="w-3 h-3 bg-[#5f5f5f33] rounded-full  flex items-center justify-center p-1">
                  <span className="   rounded-full border-[4px] block"></span>
                </div>
                <div className="w-3 h-3 bg-[#5f5f5f33] rounded-full  flex items-center justify-center p-1">
                  <span className="   rounded-full border-[4px] block"></span>
                </div>
                <div className="w-3 h-3 bg-[#5f5f5f33] rounded-full  flex items-center justify-center p-1">
                  <span className="   rounded-full border-[4px] border-green-600 block"></span>
                </div>
                <div className="w-3 h-3 bg-[#5f5f5f33] rounded-full  flex items-center justify-center p-1">
                  <span className="   rounded-full border-[4px] border-red-700 block"></span>
                </div>
                <div className="w-3 h-3 bg-[#5f5f5f33] rounded-full  flex items-center justify-center p-1">
                  <span className="   rounded-full border-[4px] block border-yellow-500"></span>
                </div>
              </div>
              <div className="w-1/2 flex pl-36 ">
                <button className="h-6 w-6 bg-[#5f5f5f33] rounded-full">
                  <CiEdit className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {item.type == "zoom_font" && (
          <div>
            <div className="p-1 flex  items-center bg-[#333333] space-x-1 rounded-full ">
              <button
                className="w-5 h-5 bg-[#4D4D4D] flex items-center justify-center rounded-full  hover:bg-gray-400  "
                onClick={() => handleClick(item?.name, "inc")}
              >
                {" "}
                <FaPlus />
              </button>
              <span className="text-sm leading-[18px] font-medium">
                {item.name == "Page Zoom"
                  ? count?.pageZoomCount
                  : count?.fontSizeCount}
                %
              </span>
              <button
                className="w-5 h-5 bg-[#4D4D4D] flex items-center justify-center rounded-full hover:bg-gray-400  "
                onClick={() => handleClick(item.name, "dec")}
              >
                <FiMinus />
              </button>
            </div>
            {item.name == "Font Size" && (
              <span className="text-xs leading-3 font-normal text-[#B3B3B3] underline tracking-tighter mt-0 block">
                Change font style
              </span>
            )}
          </div>
        )}
        {item?.type == "checkbox" && (
          <label className={style.switch}>
            <input type="checkbox" />
            <span className={`${style.slider} ${style.round}`}> </span>
          </label>
        )}
      </div>
    </div>
  );
};
