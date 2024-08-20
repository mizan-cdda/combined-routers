"use client";
import React, { useState, useEffect } from "react";
import { ReIcon } from "./ReIcon";
import { BiSearch } from "react-icons/bi";

const FindIcon = ({
  label,
  selectedIcon,
  setSelectedIcon,
  disabled = false,
}: {
  label?: string;
  selectedIcon: string | null;
  setSelectedIcon: React.Dispatch<React.SetStateAction<any | null>>;
  disabled?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //fetch icon from server
  useEffect(() => {
    const fetchFilteredIcons = async () => {
      try {
        if (searchQuery.length >= 3) {
          setLoading(true);
          const response = await fetch(
            `/api/icons?query=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          setFilteredIcons(data.icons);
          setLoading(false);
        } else {
          setLoading(false);
          setFilteredIcons([]);
        }
      } catch (error) {
        setLoading(false);
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
    <div className="relative mx-auto">
      {label && (
        <label className="block text-sm font-medium  mb-2">{label}</label>
      )}
      <div
        className={`relative w-full p-2 border-2 ${disabled ? "border-gray-300" : "border-primary"} rounded-md ${filteredIcons.length > 0 && isDropdownOpen ? "rounded-b-none" : "rounded-md"} pl-10`}
      >
        <input
          type="text"
          placeholder="Search icons..."
          value={selectedIcon ? selectedIcon : searchQuery}
          onChange={handleSearchChange}
          onClick={() => setIsDropdownOpen(true)}
          disabled={disabled}
          className="w-full text-lg  bg-transparent  focus:ring-0 border-none placeholder:text-current"
        />

        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          {selectedIcon ? (
            <ReIcon iconName={selectedIcon} className=" " />
          ) : (
            <BiSearch className=" " />
          )}
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-primary"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          )}
        </div>
      </div>

      {isDropdownOpen &&
        filteredIcons.length > 0 &&
        searchQuery.length >= 3 && (
          <div className="absolute z-[99999] bg-primary-500 dark:bg-gray-800 w-full max-h-80 overflow-y-auto custom__scrollbar border border-gray-300 rounded-b-md shadow-lg">
            <div>
              {filteredIcons.map((icon: any, index: number) => {
                return (
                  <IconListItem
                    key={index}
                    handleIconClick={handleIconClick}
                    icon={icon}
                  />
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};

export default FindIcon;

type IconListItemProps = {
  handleIconClick: (icon: any) => void;
  icon: any;
};

const IconListItem = ({ handleIconClick, icon }: IconListItemProps) => {
  const [isNotMatch, setIsNotMatch] = useState(false);
  return (
    <div
      onClick={() => handleIconClick(icon)}
      className={`flex cursor-pointer text-lg items-center gap-2 p-2 ${!isNotMatch ? "" : "hidden"} hover:bg-primary-700`}
    >
      {!isNotMatch && (
        <div className="flex flex-row items-center gap-2">
          <ReIcon setIsNotMatch={setIsNotMatch} iconName={icon} />
          {icon}
        </div>
      )}
    </div>
  );
};
