import AdvanceSettings from "./AdvanceSettings/AdvanceSettings";
import BasicStyleProperty from "./StyleProperties/BasicStyeProperty";
import { useState } from "react";
import BasicSettings from "./BasicSettings";

// TAB OPTIONS
const tabs = [
  { id: "basic", name: "Basic" },
  { id: "style", name: "Style" },
  { id: "advanced", name: "Advanced" },
];

const SettingsTab = ({ component }: any) => {
  const [activeTab, setActiveTab] = useState("basic");

  // Function to set the active tab
  const openTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Render the UI for settings tabs
  return (
    <div className="max-w-2xl mx-auto">
      {/* Display tabs for different settings categories */}
      <div className="flex bg-slate-600 text-slate-50 justify-between px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${
              activeTab === tab.id ? "active bg-gray-700 p-2" : ""
            }`}
            onClick={() => openTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Render content based on the active tab */}
      <div
        id="basic"
        className={`tab-content px-2 h-full overflow-y-scroll ${activeTab === "basic" ? "" : "hidden"}`}
      >
        <BasicSettings component={component} />
      </div>

      {/* Render content for 'style' and 'advanced' tabs */}
      <div
        id="style"
        className={`tab-content h-full overflow-y-scroll ${activeTab === "style" ? "" : "hidden"}`}
      >
        <BasicStyleProperty component={component} />
      </div>

      <div
        id="advanced"
        className={`tab-content ${activeTab === "advanced" ? "" : "hidden"}`}
      >
        <AdvanceSettings component={component} />
      </div>
    </div>
  );
};

export default SettingsTab;
