// import { useGetState } from "@/utils/hooks/mngState";

export const styleCompiler = ({
  device,
  styles,
}: {
  device: string;
  styles: any;
}) => {
  // Initialize an array to store modified styles
  let approvedStyles: any = [];

  // Map through each style in the 'styles' array
  (styles || []).map((style: any) => {
    // Check if the style is dynamic
    if (style.dynamic) {
      // If dynamic, evaluate the value using 'eval' and push it to 'approvedStyles'
      approvedStyles.push({
        key: style.key,
        screen: style.screen,
        value: eval(style.value),
      });
    } else {
      // If not dynamic, push the style as is to 'approvedStyles'
      approvedStyles.push(style);
    }
  });

  // Return an object that combines styles for the default state, hover state, and focus state
  return {
    // Default state styles for the specified device
    ...Object.fromEntries(
      (styles || [])
        .filter(
          (style: any) =>
            style?.screen === device && !style?.hover && !style?.focus
        )
        .map((style: any) => [style?.key, style?.value])
    ),
    // Hover state styles for the specified device
    "&:hover": {
      ...Object.fromEntries(
        (approvedStyles || [])
          .filter((style: any) => style?.screen === device && style?.hover)
          .map((style: any) => [style?.key, style?.value])
      ),
    },
    // Focus state styles for the specified device
    "&:focus": {
      ...Object.fromEntries(
        (approvedStyles || [])
          .filter((style: any) => style?.screen === device && style?.focus)
          .map((style: any) => [style?.key, style?.value])
      ),
    },
  };
};
