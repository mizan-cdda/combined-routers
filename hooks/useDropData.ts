import { useDrop } from 'react-dnd';
import useDnd from './useDnd';

const useDropData = ({ accept = [], index = null, parentId = null }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    //? accept is array of types of items that can be dropped
    accept,
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) {
        console.log('Already dropped!');
        return;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  }));
  return { isOver, isOverCurrent, drop };
};

export default useDropData;
