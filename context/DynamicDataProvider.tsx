"use client"
import React from "react";
export interface dataType {
  states: {
    id: string;
    type: string;
    name: string;
    description: string;
    code: string;
    dataType?: string;
    dependencies?: string[];
  }[];
  hooks: {
    id: string;
    type: string;
    name: string;
    description: string;
    code: string;
    dataType?: string;
    dependencies?: string[];
  }[];
  functions: { id: string; name: string; description: string; code: string }[];
}

export const DynamicDataContext = React.createContext({});

export const DynamicDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = React.useState<dataType>({
    states: [],
    hooks: [],
    functions: [],
  });
  return (
    <DynamicDataContext.Provider value={[data, setData]}>
      {children}
    </DynamicDataContext.Provider>
  );
};
