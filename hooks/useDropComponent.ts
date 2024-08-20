import { useDrop, DropTargetMonitor } from "react-dnd";
import useDispatch from "./useDispatch";
import { useSelector } from "react-redux";
import {
  addComponent,
  moveComponent,
} from "@/redux/features/components/componentsSlice";
import { getDefaultAcceptTypes } from "@/utils/selectors";

export const useDropComponent = ({
  componentId,
  accept = [],
  canDrop = true,
}: // parentId = null,
{
  componentId: string;
  accept?: string[];
  canDrop?: boolean;
  // parentId?: string | null;
}) => {
  const dispatch = useDispatch();
  const defaultTypes = useSelector(getDefaultAcceptTypes);

  const [{ isOver }, drop] = useDrop({
    accept: accept?.length ? accept : defaultTypes || [],
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: any, monitor: DropTargetMonitor) => {
      
      if (!monitor.isOver()) {
        return;
      }

      if (item?.isMoved) {
        // return;
        dispatch(
          moveComponent({ parentId: componentId, componentId: item.id })
        );
      } else {
        // COMPONENT IS NOT DROP DIRECTLY TO THE ROOT
        if (
          item?.type === "layout" ||
          componentId !== "root" ||
          item?.type === "section" ||
          item?.type === "form"
        ) {
          dispatch(
            addComponent({
              parentName: componentId,
              type: item.type,
              rootParentType: item.rootParentType,
              item,
            })
          );
        } else if (componentId !== "root") {
          dispatch(
            addComponent({
              parentName: componentId,
              type: item.type,
              rootParentType: item.rootParentType,
              item,
            })
          );
        }
      }
    },
    canDrop: () => canDrop,
  });

  return { drop, isOver };
};
