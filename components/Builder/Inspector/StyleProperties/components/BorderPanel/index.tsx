import React from "react";
import BorderRadius from "./components/BorderRadius";
import Border from "./components/Border";
import Accordion from "../../../ui/Accordion/Accordion";

const BorderPanel = () => {
  return (
    <Accordion
      data={[
        {
          id: 1,
          header: "Border",
          content: (
            <>
              <div className="flex  flex-col gap-2">
                <span className="block  text-sm font-bold text-gray-600">
                  Border
                </span>
                {/* border  */}
                <Border />

                {/* border radius*/}
                <BorderRadius />
              </div>
            </>
          ),
        },
      ]}
    />
  );
};

export default BorderPanel;
