import Image from "next/image";
import React from "react";

import { RxAvatar } from "react-icons/rx";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
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
const Notification = ({ handleClick, sidebarMenuIcon }: any) => {
  return (
    <div className=" relative ">
      <button
        className="  relative w-10 h-10  bg-[#5f5f5f33] p-2 rounded-full    "
        onClick={() => handleClick("notification")}>
        <IoMdNotificationsOutline className="w-6 h-6 " />
      </button>
      <div
        className={`${
          sidebarMenuIcon?.notification
            ? "block   min-h-min  borderss"
            : " h-0 text-transparent  overflow-hidden  "
        } bg-[#1A1A1A] absolute -right-6 top-[54px] rounded-md duration-300 ease-in-out transition-all  w-80  divide-y `}>
        <div className="flex space-x-2 py-3  px-5 justify-between items-center">
          <span>Notification</span>
          <button className="text-base leading-4">settings</button>
        </div>

        <NotificationData data={data} />
        <div className="flex justify-around items-center py-3.5">
          <button className="flex items-center space-x-1.5">
            <span>
              <IoCheckmarkDone />{" "}
            </span>
            <span>Make all as read</span>
          </button>
          <button className="bg-[#1570EF] py-2 px-4 rounded-md">
            Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;

const NotificationData = ({ data }: any) => {
  return (
    <div className=" overflow-y-scroll h-[300px] ">
      {data.map((item: any, index: any) => (
        <NotificationLabel key={index} label={item.label} />
      ))}
    </div>
  );
};
const NotificationLabel = ({ label }: any) => {
  return (
    <div className="px-4 py-2.5 ">
      {label.map((item: any, index: any) => (
        <div className="flex space-x-2 py-3 items-start relative " key={index}>
          <Image
            src="/assets/Avatar.png"
            width={1000}
            height={1000}
            alt=""
            className="w-9 h-9 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-base leading-5">Congratulation Lettie</span>
            <span className="text-sm leading-4 text-[#999]">
              Won the monthly bestseller gold badge
            </span>
            <div className="flex justify-between text-sm text-[#F2F2F2]">
              <span>Friday 10:04am</span>
              <span>Sep 20,2024</span>
            </div>
            <span className="bg-[#28C76F] h-1 w-1 p-1 block rounded-full border  absolute right-1 top-4 "></span>
          </div>
        </div>
      ))}
    </div>
  );
};
