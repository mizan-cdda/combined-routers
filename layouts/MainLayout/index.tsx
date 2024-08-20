import HeaderMenubar from "./HeaderMenubar";
import Sidebar from "./SideBar";

import React, { useState } from "react";
import FooterArea from "./Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const [menuItems, setMenuItems] = useState(false);
  const [submenu, setSubmenu] = useState(false);

  const [activeMenu, setActiveMenu] = useState("");
  const [submenuItems, setSubmenuItems] = useState("home");
  const data = [
    {
      name: "Page List",
      href: "/page-list",
      icon: "FaHome",
    },
    {
      name: "Page Builder",
      href: "/page-builder",
      icon: "FaHome",
    },
    {
      name: "Component Builder",
      href: "/component-builder",
      icon: "FaHome",
    },
    {
      name: "Form Builder",
      href: "/form-builder",
      icon: "FaHome",
    },
    {
      name: "Api Builder",
      href: "/api-builder",
      icon: "FaHome",
    },
    {
      name: "WS Builder",
      href: "/ws-builder",
      icon: "FaHome",
    },
    {
      name: "Web Hook Builder",
      href: "/web-hook-builder",
      icon: "FaHome",
    },
    {
      name: "Collection Builder",
      href: "/collection-builder",
    },
  ];

  return (
    <div
      className={`${isActive ? "active wrapper" : "wrapper"} ${
        submenu ? "new" : ""
      }`}
    >
      <HeaderMenubar
        isActive={isActive}
        setMenuItems={setMenuItems}
        menuItems={menuItems}
      />
      <FooterArea isActive={isActive} />
      <div className="main_body">
        <div className="">
          {data?.map((item: any, index: number) => (
            <div key={index}>
              <Sidebar
                setIsActive={setIsActive}
                isActive={isActive}
                item={data}
                setSubmenuItems={setSubmenuItems}
                submenuItems={submenuItems}
              />
            </div>
          ))}
        </div>
        <ContainerArea isActive={isActive}> {children}</ContainerArea>
        {/* {children} */}
      </div>
    </div>
  );
};

export default MainLayout;

const ContainerArea = ({ isActive, children }: any) => {
  return (
    <div
      className={` ${
        isActive ? "ml-[83px]" : "ml-[300px]"
      } transition-all duration-300 ease-linear mt-[74px]`}
    >
      {children}
    </div>
  );
};
