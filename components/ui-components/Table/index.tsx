// Your content goes here
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";

const Table = forwardRef(({ children, style, ...rest }: any, ref) => {
  const {
    content,
    functions,
    componentName,
    table_name,
    table_data = [],
    table_api,
    ...newRest
  } = rest || {};

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #007bff",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "14px",
    width: "100px",
    textAlign: "center",
    ...style,
  };

  const generateRowsHeader = ({ item }: { item: any }) => {
    return Array.from({ length: Object.keys(item).length }, (header, index) => (
      <th key={index} className="py-2 px-4 border-b">
        {Object.keys(item)[index]}
      </th>
    ));
  };

  // for dummy table
  const rows = 5;

  const generateRows = () => {
    return Array.from({ length: rows }, (_, index) => (
      <tr key={index}>
        <td className="py-2 px-4 border-b">Name {index + 1}</td>
        <td className="py-2 px-4 border-b">{25 + index}</td>
        <td className="py-2 px-4 border-b">City {index + 1}</td>
      </tr>
    ));
  };

  return table_data?.length > 0 ? (
    <div ref={ref} {...newRest} style={badgeStyle}>
      {/* {children?.length > 0 ? children : "Table"} */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>{generateRowsHeader({ item: table_data[0] })}</tr>
          </thead>
          <tbody>
            {table_data?.map((item, index) => {
              return (
                <tr key={index}>
                  {Object.values(item).map((item: any, index) => {
                    if (typeof item === "object")
                      return (
                        <td key={index} className="py-2 px-4 border-b">
                          {item?.$oid}
                        </td>
                      );
                    return (
                      <td key={index} className="py-2 px-4 border-b">
                        {item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div ref={ref} {...newRest} style={badgeStyle}><div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">City</th>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
    </div></div>
    
  );
});

Table.displayName = "Table";
export default Table;
