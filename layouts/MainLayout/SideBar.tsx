import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
// import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";
import { FaArrowRight } from "react-icons/fa6";

const Sidebar = ({
  setIsActive,
  isActive,
  item,
  setSubmenuItems,
  submenuItems,
}: any) => {
  let [sideMenuSystem, setSideMenuSystem] = useState<boolean>(false);

  // side menu system
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      isActive ? setSideMenuSystem(false) : setSideMenuSystem(true);
    } else {
      isActive ? setSideMenuSystem(true) : setSideMenuSystem(false);
    }
  }, [isActive]);

  return (
    <div>
      <div className="sidebar_menu  p-4 fixed top-0 left-0 bg-primary w-[300px] h-full duration-300 transition-all ease-linear">
        <div className="inner__sidebar_menu ">
          {/* sidemenu header code here  */}
          <MenuItemHeader sideMenuSystem={sideMenuSystem} />
          {/* menu items code here  */}
          <SideMenuItem
            item={item}
            sideMenuSystem={sideMenuSystem}
            setSubmenuItems={setSubmenuItems}
            submenuItems={submenuItems}
          />

          {/* hamburger button section  */}
          <div
            onClick={() => setIsActive(!isActive)}
            className="absolute top-[50%] -right-4 flex items-center bg-[#1a1a1a17] hover:bg-[#1a1a1a4f] rounded-md text-gray-400 hover:text-gray-100 cursor-pointer py-4 px-1  z-50"
          >
            <FaArrowRight
              className={`text-xs  duration-500 ${!isActive && "rotate-180"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// header of menubar
const MenuItemHeader = ({ sideMenuSystem }: any) => {
  return (
    <div className="logo  w-full h-[60px] flex justify-center border-r-[1px] border-b-[1px] border-primary">
      {/* menut item header code  */}
      <Link
        href="/"
        className={`text-white text-center   w-full pt-2  text-[20px] ${
          sideMenuSystem && "hidden"
        }   `}
      >
        Pyreactor
      </Link>
      <Link
        href="/"
        className={`text-white text-center   pt-2  ${
          !sideMenuSystem && "hidden"
        }  `}
      >
        <MdDashboard className="h-7 w-7" />
      </Link>
    </div>
  );
};
// SIDE MENU ITEM CODE HERE
const SideMenuItem = ({
  item,
  sideMenuSystem,
  setSubmenuItems,
  submenuItems,
}: any) => {
  return (
    <ul className=" menu-items relative overflow-y-auto overflow-hidden px-1">
      {item.map((listItem: any, index: any) => (
        <li
          title={sideMenuSystem == true ? listItem?.name : undefined}
          key={index}
          onClick={() => {
            setSubmenuItems(listItem?.name);
          }}
        >
          <Link
            href={listItem?.href}
            className={`text-secondary text-sm font-medium whitespace-nowrap border border-primary py-3 px-0  ${
              submenuItems == listItem.name
                ? " bg-[#333]  border-[#5c5c5c]"
                : ""
            } flex items-center justify-between hover: rounded-[6px]  hover:border hover:bg-[#333] hover:border-white my-1 h-[42px] `}
          >
            <div className="flex items-center">
              <div
                className={`${
                  sideMenuSystem ? "px-3.5" : "px-3"
                } icon inline-block   `}
              >
                {" "}
                {/* <Icon nameIcon="FaHome" className="text-base" /> */}
              </div>
              <span
                className={`${
                  sideMenuSystem ? "hidden" : "list inline-block text-sm "
                }  `}
              >
                {" "}
                {listItem?.name}{" "}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
