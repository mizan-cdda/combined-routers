// Your content goes here
import { setModalRef } from "@/redux/features/modals/modalsSlice";
import React, { forwardRef, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const TestModal = forwardRef(({ children, style, ...rest }: any, ref) => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  function closeModal() {
    modalRef.current.close();
  }

  useEffect(() => {
    if (modalRef.current) {
      dispatch(setModalRef(modalRef.current));
    }
  }, []);
  return (
    <dialog
      style={style}
      className="bg-slate-400 rounded-md px-5 py-3 absolute h-[300px] m-auto w-[50%] left-0 right-0 top-[50%] "
      ref={modalRef}
      {...rest}
    >
      <h1>modal</h1>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
});

TestModal.displayName = TestModal;
export default TestModal;
