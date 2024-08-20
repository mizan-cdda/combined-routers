// import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";
import React, { useState } from "react";

const ProjectAside = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const sidebarStyles = {
    width: isNavOpen ? "300px" : "80px",
    transition: "width 0.3s ease",
  };
  return (
    <aside
      className="bg-teal-100 overflow-hidden transition-all duration-300"
      style={sidebarStyles}
    >
      <div className="flex items-center justify-between bg-teal-200">
        {isNavOpen && <h3 className="font-bold p-4">PyReactor</h3>}
        <button
          className={`text-gray-700 p-4 w-full text-left flex ${
            isNavOpen ? "justify-end" : "justify-center"
          }`}
          onClick={handleToggleNav}
        >
          {/* <Icon nameIcon={isNavOpen ? "MdClose" : "FaBars"} /> */}
        </button>
      </div>
    </aside>
  );
};

export default ProjectAside;
