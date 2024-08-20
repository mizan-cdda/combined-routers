import { Icon } from "@/@core-components/builder-components/IconHandler/IconComponent";
import React, { forwardRef, useState, memo } from "react";

const Number = forwardRef(({ style, ...rest }: any, ref: any) => {
  const {
    label,
    description,
    content,
    functions,
    componentName,
    default_value,
    show_label,
    ...newRest
  } = rest || {};
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const styles = {
    ...style,
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
  };

  const mainStyle: any = {
    display: "flex",
    flexDirection: "column",
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div ref={ref} style={mainStyle}>
      {label && (
        <label style={{ display: "flex", alignItems: "center" }}>
          {label}
          {description && (
            <span
              style={{
                marginLeft: "0px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa fa-info-circle" style={{ color: "#007bff" }} />
              <Icon
                nameIcon="IoMdInformationCircleOutline"
                style={{ color: "#007bff", marginLeft: "4px" }}
              />

              {isTooltipVisible && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "4px",
                    zIndex: 999,
                  }}
                >
                  {description}
                </div>
              )}
            </span>
          )}
        </label>
      )}
      <input
        defaultValue={default_value}
        id={componentName}
        type="number"
        {...newRest}
        style={styles}
      />
    </div>
  );
});

Number.displayName = "Number";

export default memo(Number);
