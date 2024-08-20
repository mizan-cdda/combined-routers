import React, { RefObject, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./Accordion.module.css";

type AccordionItemProps = {
  active: number | string | null;
  item: {
    id: number | string;
    header: string;
    content: React.ReactNode;
  };
  handleToggle: (index: React.SetStateAction<string | number | null>) => void;
  elementHeight?: number | undefined;
};

const AccordionPanel = (props: AccordionItemProps) => {
  const contentEl: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { handleToggle, active, item, elementHeight } = props;
  const { header, id, content } = item;
  // console.log(elementHeight);
  // console.log(contentEl.current!.scrollHeight, "scrollHeight");
  useEffect(() => {
    if (active === id) {
      // contentEl.current!.style.height = `${contentEl.current!.scrollHeight}px`;
      contentEl.current!.style.height = `${
        elementHeight
          ? (elementHeight ?? 0) + 30
          : contentEl.current!.scrollHeight
      }px`;
    } else {
      contentEl.current!.style.height = "0px";
    }
  }, [active, id, content, elementHeight]);

  return (
    <div className={styles.accordion__card}>
      {/* accordion header  */}
      <div className={styles.accordion__header}>
        <div
          className={`${styles.accordion__toggle} p-3 ${
            active === id ? styles.active : ""
          }`}
          onClick={() => handleToggle(id)}
        >
          <h5 className={styles.accordion__title}>{header}</h5>
          <FaChevronDown className={styles.accordion__icon} />
        </div>
      </div>
      {/* accordion content */}
      <div
        ref={contentEl}
        className={`${styles.panel__collapse} ${
          active === id ? styles.show : ""
        }`}
        style={
          active === id
            ? { height: contentEl.current?.scrollHeight, overflowY: "auto" }
            : { height: "0px" }
        }
      >
        <div className={styles.accordion__body}>
          <div className="mb-0">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionPanel;
