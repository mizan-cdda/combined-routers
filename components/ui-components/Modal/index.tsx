import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  useEffect(() => {
    const closeOnEscape = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[1] ${
        open ? "visible opacity-100" : "invisible opacity-0"
      } transition duration-300 ease-in-out z-10`}
    >
      <div className="absolute bg-white p-4 rounded shadow-md w-[800px]">
        {children}
        <button
          className="mt-4 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
