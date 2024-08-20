import React, { useState } from "react";
import AccordionPanel from "./AccordionPanel";

type AccordionProps = {
  data: {
    id: number | string;
    header: string;
    content: React.ReactNode;
  }[];
  elementHeight?: number;
};

const Accordion = ({ data, elementHeight }: AccordionProps) => {
  const [active, setActive] = useState<string | number | null>(null);

  const handleToggle = (
    index: React.SetStateAction<string | number | null>
  ) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div>
      {data?.map((item, index) => {
        return (
          <AccordionPanel
            key={index}
            active={active}
            handleToggle={handleToggle}
            item={item}
            elementHeight={elementHeight}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
