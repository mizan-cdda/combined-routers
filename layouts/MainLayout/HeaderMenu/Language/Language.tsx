import Image from "next/image";
import React, { useState } from "react";

import { RxAvatar } from "react-icons/rx";

import { LiaLanguageSolid } from "react-icons/lia";

const data = [
  {
    name: "America",
  },
  {
    name: "Bangladesh",
  },

  {
    name: "India",
  },
  {
    name: "Brazil",
  },
  {
    name: "Brazil",
  },
  {
    name: "Brazil",
  },
  {
    name: "Brazil",
  },
];
const availAbleItem = [
  { name: "Available", color: "#fff" },
  { name: "Busy", color: "#D92D20" },
  { name: "Do not disturb", color: "#DC6803" },
  { name: "Appear offline", color: "#808080" },
];

const Language = ({ sidebarMenuIcon, handleClick }: any) => {
  const [language, setLanguage] = useState(false);
  return (
    <div className=" relative ">
      <button
        className="relative w-10 h-10  bg-[#5f5f5f33] p-2 rounded-full  "
        onClick={() => handleClick("language")}>
        <LiaLanguageSolid className="w-6 h-6  " />
      </button>
      <div
        className={`${
          sidebarMenuIcon?.language
            ? "block     borderss h-[300px] "
            : " h-0 text-transparent  overflow-hidden  "
        } bg-[#1A1A1A] absolute -right-6 top-[54px] rounded-md   w-80  divide-y   `}>
        <div className=" space-x-2 py-3  px-5 justify-between items-center">
          <span className="text-white">Select your language</span>
        </div>

        <LanguageData data={data} />
      </div>
    </div>
  );
};

export default Language;

const LanguageData = ({ data }: any) => {
  return (
    <div
      className={` ${
        data.length > 6 ? "overflow-y-auto h-[250px] " : "h-auto"
      }  py-3  px-5  `}>
      {data.map((item: any, index: any) => (
        <div key={index} className="flex justify-between py-3 space-x-2">
          <div className="flex space-x-2 items-center">
            <Image
              src="/assets/flag.png"
              width={1000}
              height={1000}
              alt=""
              className="w-7 h-7 "
            />
            <span className="text-base font-medium leading-5 text-white">
              English
            </span>
          </div>
          {index == 0 && (
            <div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded-full text-green-500 focus:ring-transparent border-green-500 border-[2px] cursor-pointer"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
