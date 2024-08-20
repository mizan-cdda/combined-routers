"use client";

import React, { useState, useEffect } from "react";
import { LoadableComponent } from "@loadable/component";
import { IconBaseProps } from "react-icons/lib";
import { FaQuestionCircle } from "react-icons/fa"; // Default not found icon

interface TypesPropsIcon {
  iconName: string;
  className?: string; // Make className optional
  setIsNotMatch?: (notMatch: boolean) => void; // Optional callback function
  [key: string]: any; // Allow any other property
}

const textSizeToDimensions = (
  className: string | undefined
): { height: string; width: string } => {
  const sizeMap: { [key: string]: { height: string; width: string } } = {
    "text-xs": { height: "0.75rem", width: "0.75rem" },
    "text-sm": { height: "0.875rem", width: "0.875rem" },
    "text-base": { height: "1rem", width: "1rem" },
    "text-lg": { height: "1.125rem", width: "1.125rem" },
    "text-xl": { height: "1.25rem", width: "1.25rem" },
    "text-2xl": { height: "1.5rem", width: "1.5rem" },
    "text-3xl": { height: "1.875rem", width: "1.875rem" },
    "text-4xl": { height: "2.25rem", width: "2.25rem" },
    "text-5xl": { height: "3rem", width: "3rem" },
    "text-6xl": { height: "3.75rem", width: "3.75rem" },
    "text-7xl": { height: "4.5rem", width: "4.5rem" },
    "text-8xl": { height: "6rem", width: "6rem" },
    "text-9xl": { height: "8rem", width: "8rem" },
  };

  if (!className) return { height: "1rem", width: "1rem" }; // Default dimensions

  for (const [key, value] of Object.entries(sizeMap)) {
    if (className.includes(key)) {
      return value;
    }
  }
  // Handle custom text size classes like text-[8px]
  const customSizeMatch = className.match(/text-\[(\d+(\.\d+)?)px\]/);
  if (customSizeMatch) {
    const size = customSizeMatch[1] + "px";
    return { height: size, width: size };
  }

  return { height: "1rem", width: "1rem" }; // Default dimensions if no matching class found
};

export function ReIcon({
  iconName,
  className,
  setIsNotMatch,
  ...rest
}: TypesPropsIcon): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [iconNotFound, setIconNotFound] = useState(false);
  const [LoadedIcon, setLoadedIcon] =
    useState<LoadableComponent<IconBaseProps> | null>(null);

  const lib = iconName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(" ")[0]
    .toLocaleLowerCase();

  useEffect(() => {
    setLoading(true);
    setIconNotFound(false);

    const loadIcon = async () => {
      try {
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = await import(`react-icons/${lib}/index.js`);
        if (module && module[iconName]) {
          setIsNotMatch && setIsNotMatch(false);
          setLoadedIcon(() => module[iconName]);
          setLoading(false);
        } else {
          throw new Error(`Component '${iconName}' not found in module.`);
        }
      } catch (error) {
        setIsNotMatch && setIsNotMatch(true);
        setIconNotFound(true);
        setLoading(false);
      }
    };

    loadIcon();
  }, [iconName, lib, setIsNotMatch]);

  const { height, width } = textSizeToDimensions(className);

  if (loading) {
    return (
      <div
        className={className}
        style={{
          minHeight: height,
          minWidth: width,
          display: "inline-block",
          backgroundColor: "#e0e0e0", // Skeleton loader background color
        }}
      />
    );
  }

  if (iconNotFound) {
    return (
      <FaQuestionCircle
        className={className}
        style={{ minHeight: height, minWidth: width }}
      />
    );
  }

  if (LoadedIcon) {
    return (
      <LoadedIcon
        className={className}
        style={{ minHeight: height, minWidth: width }}
        {...rest}
      />
    );
  }

  return <></>; // Should not reach here
}
