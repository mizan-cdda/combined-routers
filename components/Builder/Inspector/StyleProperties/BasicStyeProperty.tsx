import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePropsStyle } from "@/redux/features/components/componentsSlice";
import Accordion from "../ui/Accordion/Accordion";
import DisplayPanel from "./components/DisplayPanel";
import SpacingPanel from "./components/SpacingPanel";
import SizePanel from "./components/SizePanel";
import TypographyPanel from "./components/TypographyPanel";
import BorderPanel from "./components/BorderPanel";
import BackgroundPanel from "./components/BackgroundPanel";
import EffectPanel from "./components/EffectPanel";
import ColorPicker from "../ui/ColorPicker/ColorPicker";

const StyleProperty = ({ component }: any) => {
  const dispatch = useDispatch();
  const { id } = component || {};

  const isRoot = id === "root";

  const onChange = (propertyName: string) => (e: any) => {
    dispatch(
      updatePropsStyle({
        id: component.id,
        name: propertyName,
        value: e.target.value,
      })
    );
  };
  // console.log(component, "component");
  return (
    <div className=" h-[calc(100vh-103px)] overflow-y-scroll">
      {!isRoot && (
        <>
          {/* Layout  */}

          <DisplayPanel component={component} />

          {/* Spacing  */}
          <SpacingPanel component={component} />
          {/* Size  */}
          <SizePanel component={component} />

          {/* Typography  */}
          <TypographyPanel component={component} />

          {/* Border  */}
          <BorderPanel />
        </>
      )}

      {/* Backgrounds  */}
      <BackgroundPanel />

      {/* Effect  */}
      <EffectPanel />
    </div>
  );
};

export default StyleProperty;
