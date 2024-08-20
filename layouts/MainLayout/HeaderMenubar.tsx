import React, { useState } from "react";
import Language from "./HeaderMenu/Language/Language";
import Accessibility from "./HeaderMenu/Accessibility/Accessibility";
import DarkmodeLightmode from "./HeaderMenu/Mode/DarkmodeLightmode";
import Notification from "./HeaderMenu/Notification/Notification";
import Profile from "./HeaderMenu/Profile/Profile";

const HeaderMenubar = ({ isActive, setMenuItems, menuItems }: any) => {
  const [sidebarMenuIcon, setSidebarMenuIcon] = useState<any>({
    profile: false,
    language: false,
    notification: false,
    accessblity: false,
  });
  // handle menuicon click here
  const handleClick = (item: any) => {
    const menuSettingUpdate = { ...sidebarMenuIcon };
    menuSettingUpdate[item] = !menuSettingUpdate[item];
    for (let key in menuSettingUpdate) {
      if (key !== item) {
        menuSettingUpdate[key] = false;
      }
    }
    setSidebarMenuIcon(menuSettingUpdate);
  };

  return (
    <div className="  w-full h-[74px] flex fixed top-0 right-0  bg-primary text-white ">
      <div
        className={` ${
          isActive ? "md:ml-20 ml-72 " : "md:ml-72 ml-20"
        } text-white  px-10   bg-transparent w-full flex justify-between items-center duration-300 ease-in-out transition-all `}
      >
        <div className="">
          <span className="md:text-2xl text-xl">Dashboard</span>
        </div>

        <div className="flex space-x-3">
          {/* language changing action here  */}
          <Language
            sidebarMenuIcon={sidebarMenuIcon}
            handleClick={handleClick}
          />
          {/* accessibility action here  */}
          <Accessibility
            sidebarMenuIcon={sidebarMenuIcon}
            handleClick={handleClick}
          />
          {/* darkmode and lightmode action here  */}
          <DarkmodeLightmode />
          {/* notification action here  */}
          <Notification
            sidebarMenuIcon={sidebarMenuIcon}
            handleClick={handleClick}
          />
          {/* profile action here  */}
          <Profile
            sidebarMenuIcon={sidebarMenuIcon}
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMenubar;
