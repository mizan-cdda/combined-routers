// import loadable, { LoadableComponent } from "@loadable/component";
// import { IconBaseProps } from "react-icons/lib";
// import React from "react";

// interface TypesPropsIcon {
//   nameIcon: string;
//   className?: string; // Make className optional
//   [key: string]: any; // Allow any other property
// }

// export function Icon({
//   nameIcon,
//   className,
//   ...rest
// }: TypesPropsIcon): JSX.Element {
//   const lib = nameIcon
//     .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
//     .split(" ")[0]
//     .toLocaleLowerCase();

//   const ElementIcon: LoadableComponent<IconBaseProps> = loadable(
//     () => import(`react-icons/${lib}/index.js`).catch(() => null),
//     {
//       resolveComponent: (module) => {
//         try {
//           if (module && module[nameIcon]) {
//             return module[nameIcon];
//           }
//           throw new Error(`Component '${nameIcon}' not found in module.`);
//         } catch (error: any) {
//           return () => "Icon not found";
//         }
//       },
//     }
//   );

//   return (
//     <div className={className} {...rest}>
//       <ElementIcon />
//     </div>
//   );
// }
