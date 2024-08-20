import React from "react";
import Accordion from "../../../ui/Accordion/Accordion";
import BackgroundColor from "./components/BackgroundColor";
import BackgroundImage from "./components/BackgroundImage";

const BackgroundPanel = () => {
  return (
    <Accordion
      data={[
        {
          id: 1,
          header: "Backgrounds",
          content: (
            <>
              <BackgroundColor />
              <BackgroundImage />
            </>
          ),
        },
      ]}
    />
  );
};

export default BackgroundPanel;
