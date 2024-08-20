import React, { useState } from "react";

const SearchComponent = ({
  setComponent,
  data,
  asPath,
}: {
  setComponent: React.Dispatch<React.SetStateAction<any[]>>;
  data: any;
  asPath: string;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // SET SEARCH VALUE
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    // FILTER COrequestToBodyStreamMPONENTS
    const filteredData = data
      ? Object.keys(data).reduce((acc: any, category: string) => {
          const filteredComponents = data[category].filter((component: any) =>
            component.name.toLowerCase().includes(value)
          );
          if (filteredComponents.length > 0) {
            acc[category] = filteredComponents;
          }
          return acc;
        }, {})
      : {};
    setComponent(filteredData);
  };

  return (
    <div className="m-2">
      <input
        type="text"
        placeholder={`Search ${
          asPath === "/page-builder" ? "components" : "elements"
        } here`}
        className="border border-gray-300 rounded-lg p-1.5 w-full"
        onChange={handleSearch}
        value={searchValue}
      />
    </div>
  );
};

export default SearchComponent;
