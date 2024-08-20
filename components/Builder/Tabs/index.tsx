// components/Tab.js

import React, { useState } from "react";

const Tab = ({ tabs }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex space-x-4 border-b-2 pb-4">
        {tabs.map((tab: any, index: number) => (
          <button
            key={index}
            className={`${
              activeTab === index ? "bg-blue-500 text-white" : "bg-gray-300"
            } px-4 py-2 rounded`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Tab;
