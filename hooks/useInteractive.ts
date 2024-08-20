import { useRef, MouseEvent, useMemo } from "react";
import { useSelector } from "react-redux";
import useDispatch from "./useDispatch";
import { useDrag } from "react-dnd";
import { getFocusedComponent } from "@/utils/app";
import {
  hover,
  parentId,
  select,
  unhover,
} from "@/redux/features/components/componentsSlice";
import { getHoveredId, getSelectedId } from "@/utils/selectors";

export const useInteractive = (
  component: any,
  enableVisualHelper = false,
  withoutComponentProps = false
) => {
  const dispatch = useDispatch();

  const selectedId = useSelector(getSelectedId);
  const hoverId = useSelector(getHoveredId);

  // Memoize isComponentSelected
  const isComponentSelected = useMemo(
    () => selectedId === (component?.id || "root"),
    [selectedId, component]
  );

  // Memoize isHovered
  const isHovered = useMemo(
    () => hoverId === (component?.id || "root"),
    [hoverId, component]
  );

  // focused input
  const focusInput = useSelector(getFocusedComponent(component?.id));

  const [, drag] = useDrag({
    type: component?.type,
    item: { id: component?.id, type: component?.type, isMoved: true },
  });

  const ref = useRef<HTMLDivElement>(null);

  // handlers as props
  let props = {
    ...(withoutComponentProps ? {} : component.props),
    // if the component is selected, show the layout
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation();
      dispatch(hover({ id: component.id }));
      dispatch(parentId({ id: component.id }));
    },
    // on mouse out, if the component is not selected, unhover it
    onMouseOut: () => {
      dispatch(unhover({}));
    },
    // for single click to select component
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(select({ id: component.id }));
    },
    // for double click to edit text
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      alert(JSON.stringify(`Editing ${component.name}:${component.id}`));
      if (focusInput === false) {
        // dispatch.app.toggleInputText();
      }
    },
  };

  // if the component is selected, show the layout
  if (isHovered || isComponentSelected) {
    props = {
      ...props,
      style: {
        boxShadow: `${focusInput ? "red" : "blue"} 0px 0px 0px 2px `,
        // border: `${focusInput ? "red" : "green"} 2px solid`,
      },
    };
  }

  return { props, ref: drag(ref), drag };
};
