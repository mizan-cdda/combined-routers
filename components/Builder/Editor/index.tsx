"use client"
import useDispatch from "@/hooks/useDispatch";
import { useDropComponent } from "@/hooks/useDropComponent";
import { getComponents, getElements } from "@/utils/selectors";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import ComponentPreview from "./ComponentPreview";
import Inspector from "../Inspector";
import { toggleTypes } from "@/redux/features/app/appSlice";
import { unselect } from "@/redux/features/components/componentsSlice";
import { InspectorProvider } from "@/context/InspectorContext2";
import { usePathname } from "next/navigation";

const Editor: React.FC<{ data: any }> = ({ data }) => {
  const pathname = usePathname();
  const components = useSelector(getComponents);
  const elements = useSelector(getElements);
  const dispatch = useDispatch();

  // TODO: move this to a better place
  useEffect(() => {
    dispatch(
      toggleTypes(
        Object.keys(data).reduce((types: any, category) => {
          return [...types, ...data[category].map((item: any) => item.type)];
        }, [])
      )
    );
  }, [data, dispatch]);

  const { drop } = useDropComponent({ componentId: "root" });
  const isEmpty = !components?.root?.children?.length;
  const rootProps = components?.root?.props || {};
  let editorBackgroundProps = {};

  const onSelectBackground = () => {
    dispatch(unselect({}));
  };

  editorBackgroundProps = {
    ...editorBackgroundProps,
    ...rootProps.style,
  };

  const Playground = (
    <div
      onClick={onSelectBackground}
      style={{
        ...editorBackgroundProps,
        minHeight: "100%",
        minWidth: "10rem",
        padding: "10px",
        width: "100%",
        display: "flex",
        // flexWrap : "wrap",
        flexDirection: "column",
        position: "relative",
        height: "auto",
      }}
      className="editor-background"
    >

      {components?.root?.children?.map((name: string) => (
        <ComponentPreview key={name} componentName={name} />
      ))}
    </div>
  );

  return (
    <div className="flex w-full">
      <div className="editor flex-grow relative overflow-y-scroll" ref={drop}>
        {Playground}
      </div>
      {/* Inspector */}
      <InspectorProvider>
        <Inspector />
      </InspectorProvider>
    </div>
  );
};

export default memo(Editor);
