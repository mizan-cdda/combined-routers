import { useEffect, useState, RefObject } from "react";

const useElementHeight = (elementRef: RefObject<HTMLElement>): number => {
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    const updateElementHeight = () => {
      if (elementRef.current) {
        // const height = elementRef.current.offsetHeight;
        const height = elementRef.current?.clientHeight;
        setElementHeight(height);
      }
    };

    // Initial update
    updateElementHeight();

    // Recalculate height on window resize
    window.addEventListener("resize", updateElementHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateElementHeight);
    };
  });

  return elementHeight;
};

export default useElementHeight;
