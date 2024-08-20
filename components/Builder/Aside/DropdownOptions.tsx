import React, { useEffect, useRef, useState } from "react";
// import { Icon } from "../IconHandler/IconComponentCopy";
import { useRouter } from "next/router";
import Axios from "@/components/axios";
import { useDispatch } from "react-redux";
import { addComponent } from "@/redux/features/components/componentsSlice";

// DROPDOWN COMPONENT
const Dropdown = ({ component }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const router = useRouter();
  const dispatch = useDispatch();

  // DELETE CONFIRMATION
  function confirmDelete() {
    return confirm("Are you sure you want to delete?");
  }

  // DROPDOWN FUNCTIONS
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // CLOSE DROPDOWN
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // OUTSIDE CLICK
  const handleOutsideClick = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      closeDropdown();
    }
  };

  // DELETE COMPONENT FUNCTION
  const handleComponentDelete = () => {
    const userConfirm = confirmDelete();
    if (userConfirm) {
      Axios.delete(
        `/api/remove-component?name=${component?.name}&category=${component?.category}`
      )
        .then(() => {
          // router.push("/page-builder");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // EDIT COMPONENT FUNCTION
  const handleEdit = () => {
    switch (component?.category?.toLowerCase()) {
      case "form":
        dispatch(
          addComponent({ item: component, parentName: "root", isEditing: true })
        );
        // router.push({
        //   pathname: "/form-builder",
        //   query: { form: component.id },
        // });
        break;
      default:
        dispatch(
          addComponent({ item: component, parentName: "root", isEditing: true })
        );
        // router.push({
        //   pathname: "/component-builder",
        //   query: { component: component.id },
        // });
        break;
    }
  };

  // USE EFFECT FOR OUTSIDE CLICK
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="text-gray-400"
        >
          {/* <Icon nameIcon="BsThreeDotsVertical" /> */}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                closeDropdown();
                handleComponentDelete();
              }}
            >
              <p>Delete</p>
              <div className="text-red-500">
                {/* <Icon nameIcon="IoMdTrash" /> */}
              </div>
            </button>
          </div>
          <hr />
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={handleEdit}
            >
              <p>Edit</p>
              <div className="text-green-500">
                {/* <Icon nameIcon="BiSolidEdit" /> */}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
