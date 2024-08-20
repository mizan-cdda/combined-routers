import React from "react";
import Aside from "./Aside";
import Editor from "./Editor";
import { ComponentsJsonProps } from "@/types/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Builder = ({
  data,
  asPath,
  query,
}: {
  data: ComponentsJsonProps | any;
  asPath: string;
  query: any;
}) => {
  return (
    // <DndProvider backend={HTML5Backend}>
    //   <div className="flex h-screen overflow-hidden">
    //     <Aside data={data} {...{ asPath, query }} />
    //     <Editor data={data} {...{ asPath, query }} />
    //   </div>
    // </DndProvider>
    <Editor data={data} {...{ asPath, query }} />
  );
};

export default Builder;
