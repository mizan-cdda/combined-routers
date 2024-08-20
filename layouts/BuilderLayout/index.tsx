import React, { memo } from "react";
import { LayoutProps } from "../ProjectLayout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Aside from "@/components/Builder/Aside"
import Editor from "@/components/Builder/Editor";
import { useRouter } from "next/router";

const BuilderLayout = ({ children, data }: LayoutProps) => {
  const { asPath, query } = useRouter();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen overflow-hidden">
        <Aside data={data} />
        {/* {children} */}
        <Editor data={data} {...{ asPath, query }} />
      </div>
    </DndProvider>
  );
};

export default memo(BuilderLayout);
