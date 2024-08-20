import { useEffect } from "react";

const MoveableComponent = () => {
  useEffect(() => {
    dragElement(document.getElementById("dragdiv"));

    function dragElement(drugableItemDiv: any) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(drugableItemDiv.id)) {
        const drugableItem = document.getElementById(drugableItemDiv.id) as any;
        drugableItem.onmousedown = dragMouseDown;
      } else {
        drugableItemDiv.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e: any) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: any) {
        // e = e || window.event;
        e.preventDefault();
        // client calculate the coordinate of the mouse cursor relative to the top left edge of the document, not the element
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        drugableItemDiv.style.top = drugableItemDiv.offsetTop - pos2 + "px";
        drugableItemDiv.style.left = drugableItemDiv.offsetLeft - pos1 + "px";
      }
      // removing the mouseup event stops the drag event
      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }, []);
  return (
    <div id="dragdiv" className="text-black p-5 absolute bg-red-400">
      <div>
        <p>move me any where in the screen viewport</p>
      </div>
    </div>
  );
};

export default MoveableComponent;
