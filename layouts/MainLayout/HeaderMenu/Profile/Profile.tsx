import Image from "next/image";
import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa";
const data = [
  {
    name: "personal",
    label: [
      {
        name: "Profile",
        link: "/profile",
      },
      {
        name: "settings",
        link: "/profile",
      },
      {
        name: "Keyboard shortcuts",
        link: "/profile",
      },
    ],
  },
  {
    name: "team",
    label: [
      {
        name: "Team",
        link: "/profile",
      },
      {
        name: "Invite colleagues",
        link: "/profile",
      },
    ],
  },

  {
    name: "Support",
    label: [
      {
        name: "profile",
        link: "/profile",
      },
      {
        name: "settings",
        link: "/profile",
      },
      {
        name: "Keyboard shortcuts",
        link: "/profile",
      },
    ],
  },
  {
    name: "Signout",
    label: [
      {
        name: "sign out ",
        link: "/profile",
      },
    ],
  },
];
const availAbleItem = [
  { name: "Available", color: "#fff" },
  { name: "Busy", color: "#D92D20" },
  { name: "Do not disturb", color: "#DC6803" },
  { name: "Appear offline", color: "#808080" },
];
const Profile = ({ sidebarMenuIcon, handleClick }: any) => {
  return (
    <div className=" relative">
      <button
        className="relative w-10 h-10  bg-[#5f5f5f33] p-2 rounded-full   "
        onClick={() => handleClick("profile")}>
        <Image
          src="/assets/Avatar.png"
          width={1000}
          height={1000}
          className="w-6 h-6 "
          alt=""
        />
        <span className="bg-[#28C76F] h-1 w-1 p-1 block rounded-full border  absolute right-1 bottom-1 "></span>
      </button>
      <div
        className={`${
          sidebarMenuIcon?.profile
            ? "block   min-h-min  borderss"
            : " h-0 text-transparent  overflow-hidden  "
        } bg-[#1A1A1A] absolute -right-6 top-[54px] rounded-md duration-300 ease-in-out transition-all  w-60  divide-y `}>
        <div className="flex space-x-2 py-3  px-5 ">
          <Image
            src="/assets/Avatar.png"
            width={1000}
            height={1000}
            alt=""
            className="w-9 h-9 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-base leading-4">Wade Warren</span>
            <span className="text-sm leading-4">warren@builder.com</span>
            <button className="group flex justify-between items-center cursor-pointer rounded-md relative px-1">
              <div className="space-x-2">
                <span className="bg-[#28C76F] h-1 w-1 p-1 inline-block rounded-full border border-white  "></span>
                <span className="text-sm leading-4  hover:underline">
                  Available
                </span>
              </div>
              <span className="flex">
                {" "}
                <FaChevronRight />
              </span>
              <div className="  absolute  right-0 top-6 bg-[#4D4D4D] w-full hidden group-hover:flex  px-1 capitalize py-2 rounded-md  ">
                <ul className="space-y-2">
                  {availAbleItem.map((item: any, index: any) => (
                    <li
                      key={index}
                      className="text-white flex items-center space-x-2 leading-[18px] text-sm truncate">
                      <span
                        style={{ backgroundColor: item?.color }}
                        className={`  h-1 w-1 p-1 block rounded-full border  right-0 bottom-0 `}></span>
                      <span> {item?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </div>
        </div>
        <div>
          <ProfileData data={data} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileData = ({ data }: any) => {
  return (
    <div className="divide-y divide-dashed ">
      {data.map((item: any, index: any) => (
        <ProfileLabel key={index} label={item.label} />
      ))}
    </div>
  );
};
const ProfileLabel = ({ label }: any) => {
  return (
    <div className="px-4 py-2.5 ">
      {label.map((item: any, index: any) => (
        <button
          key={index}
          className="flex items-center py-2.5 px-1.5 capitalize space-x-2.5 hover:bg-[#4D4D4D] rounded-md w-full truncate">
          <RxAvatar />
          <span className="text-base leading-5 font-normal text-white">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
};
