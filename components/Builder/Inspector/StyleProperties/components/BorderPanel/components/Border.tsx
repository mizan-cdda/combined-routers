import React from "react";
import BorderTop from "./BorderTop";
import BorderRight from "./BorderRight";
import BorderBottom from "./BorderBottom";
import BorderLeft from "./BorderLeft";
import {
  CgBorderAll,
  CgBorderLeft,
  CgBorderTop,
  CgBorderRight,
  CgBorderBottom,
} from "react-icons/cg";
import BorderAll from "./BorderAll";

const Border = () => {
  const [activeBorder, setActiveBorder] = React.useState(null);

  const toggleBorder = (border: any) => {
    setActiveBorder((prevActiveBorder) =>
      prevActiveBorder === border ? null : border
    );
  };

  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex justify-between py-2 px-2">
        <CgBorderAll
          onClick={() => toggleBorder("all")}
          className={`h-6 w-6 border rounded-md cursor-pointer hover:bg-gray-100 ${
            activeBorder === "all" ? "active bg-green-100" : ""
          }`}
        />
        <CgBorderTop
          onClick={() => toggleBorder("top")}
          className={`h-6 w-6 border rounded-md cursor-pointer hover:bg-gray-100 ${
            activeBorder === "top" ? "active bg-green-100" : ""
          }`}
        />
        <CgBorderRight
          onClick={() => toggleBorder("right")}
          className={`h-6 w-6 border rounded-md cursor-pointer hover:bg-gray-100 ${
            activeBorder === "right" ? "active bg-green-100" : ""
          }`}
        />
        <CgBorderBottom
          onClick={() => toggleBorder("bottom")}
          className={`h-6 w-6 border rounded-md cursor-pointer hover:bg-gray-100 ${
            activeBorder === "bottom" ? "active bg-green-100" : ""
          }`}
        />
        <CgBorderLeft
          onClick={() => toggleBorder("left")}
          className={`h-6 w-6 border rounded-md cursor-pointer hover:bg-gray-100 ${
            activeBorder === "left" ? "active bg-green-100" : ""
          }`}
        />
      </div>
      {activeBorder === "all" && <BorderAll />}
      {activeBorder === "top" && <BorderTop />}
      {activeBorder === "right" && <BorderRight />}
      {activeBorder === "bottom" && <BorderBottom />}
      {activeBorder === "left" && <BorderLeft />}
    </div>
  );
};

export default Border;
