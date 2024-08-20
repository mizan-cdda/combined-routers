import { useRouter } from "next/router";
import React, { ButtonHTMLAttributes, forwardRef, useEffect } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Define your custom props here
  children?: any;
  style?: React.CSSProperties;
  functions?: any;
  componentName?: string;
  label?: string;
}

// Button component
const Submit: React.FC<ButtonProps> = forwardRef(
  ({ label, children, functions, style, componentName, ...rest }, ref: any) => {
    const buttonStyle = {
      ...style,
      padding: "6px 12px",
      borderRadius: "4px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      width: "200px",
    };

    // ROUTER
    const router = useRouter();

    // FUNCTION CONVERSION
    const isPreviewMood: any = router.asPath.includes("preview");
    return (
      <button {...rest} {...isPreviewMood} style={buttonStyle}>
        {label ? label : "Submit Button"}
      </button>
    );
  }
);

Submit.displayName = "Submit";
export default Submit;
