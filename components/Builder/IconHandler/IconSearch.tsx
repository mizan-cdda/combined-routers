import { Icon } from "./IconComponentCopy";
import React, { useState, useEffect } from "react";

// Path: src/pages/preview/IconSearch.tsx
const IconSearch = ({
  label,
  selectedIcon,
  setSelectedIcon,
}: {
  label?: string;
  selectedIcon: string | null;
  setSelectedIcon: React.Dispatch<React.SetStateAction<any | null>>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIcons, setFilteredIcons] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchFilteredIcons = async () => {
      try {
        if (searchQuery.length >= 3) {
          const response = await fetch(
            `/api/search-ico?query=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          setFilteredIcons(data.icons);
        } else {
          setFilteredIcons([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Debounce the search query
    const debounceTimeout = setTimeout(fetchFilteredIcons, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Handle search change
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
    setSelectedIcon(null);
    setIsDropdownOpen(true);
  };

  // Handle icon click
  const handleIconClick = (icon: any) => {
    setSelectedIcon(icon);
    setSearchQuery(icon);
    setIsDropdownOpen(false);
  };

  return (
    <div className="m-auto relative">
      <label className="block text-sm font-medium text-gray-600" htmlFor="">
        {label ? label : "Select"}
      </label>
      <input
        type="text"
        placeholder="Search icons..."
        value={selectedIcon ? selectedIcon : searchQuery}
        onChange={handleSearchChange}
        onClick={() => setIsDropdownOpen(true)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      {/* DROPDOWN */}
      {isDropdownOpen &&
        filteredIcons.length > 0 &&
        searchQuery.length >= 3 && (
          <div className="absolute top-full left-0 w-full max-h-[500px] overflow-y-auto bg-white border rounded-md shadow-lg">
            <ul>
              {filteredIcons.map((icon, index) => (
                <li
                  key={index}
                  onClick={() => handleIconClick(icon)}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${
                    selectedIcon === icon ? "bg-gray-300" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Icon nameIcon={icon} />
                    </div>
                    {icon}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* SELECTED ICO */}
      {selectedIcon && (
        <div className="mt-2 flex items-center gap-2 text-lg font-semibold bg-green-700 text-white p-2 rounded-md">
          <p className="w-64">{selectedIcon}</p>
          <div>
            <Icon nameIcon={selectedIcon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSearch;
