import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

type UseDragDataProps = {
  type: string;
  data: any;
  captureDraggingState: boolean;
};

const useDragData = ({ type = '', data = {}, captureDraggingState = false }: UseDragDataProps) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // type: ItemTypes.INPUT,
    type: type,
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),

    options: {
      dropEffect: 'move'
    },
    end: (item, monitor) => {
      // Check if a drop occurred
      if (monitor.didDrop()) {
      }
    }
  }));

  // Effect for drag image preview to be empty
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState });
  }, [dragPreview, captureDraggingState]);

  return { isDragging, drag };
};

export default useDragData;
