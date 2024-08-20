import { changeIndex } from "@/redux/features/components/componentsSlice";
import { useDispatch } from "react-redux";

const useLayoutIndex = ({
  itemArr,
  parentId,
}: {
  itemArr: any[];
  parentId: string;
}) => {
  const dispatch = useDispatch();

  // handle drag
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    //
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const sourceIndex =
      e.dataTransfer.getData("text/plain") === "0"
        ? e.dataTransfer.getData("text/plain")
        : Number(e.dataTransfer.getData("text/plain"));

    if (!sourceIndex) return;

    const updatedList = [...itemArr];
    // move item
    const [movedItem] = updatedList.splice(Number(sourceIndex), 1);
    // insert item
    updatedList.splice(index, 0, movedItem);
    // update index
    dispatch(changeIndex({ parentId, children: updatedList }));
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};

export default useLayoutIndex;
