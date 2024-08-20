import Modal from "@/@core-components/ui-components/Modal";
import Axios from "@/axios";
import { generateId } from "@/utils/generateId";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import IconSearch from "../IconHandler/IconSearch";
import { useSelector } from "react-redux";
import { getSelectedComponent } from "@/utils/selectors";

// REGISTER COMPONENTES MODAL
interface RegisterComponentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingComponent = ({ open, setOpen }: RegisterComponentModalProps) => {
  const selectedComponent = useSelector(getSelectedComponent);
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleCloseModal = () => {
    setOpen(false);
  };

  const router = useRouter();
  const store = useSelector((state: any) => state);

  const { app, components } = store || {};
  const { available_media_devices } = app || {};
  const newComponents = Object.values(components).filter(
    (comp) => typeof comp === "object"
  );

  const id = generateId();
  const nestedChildren = ({ item }: { item: any }) => {
    return {
      // const newItem = {
      id: item?.id === "root" ? id : item?.id,
      name: "Hello",
      type: "something",
      icon: "",
      category: "Basic",
      author: "Mizan",
      description: "Test",
      defaultStyles: item?.props?.style,
      childrenLayout: item?.children.map((child: any) => {
        const childItem = newComponents?.find((comp: any) => comp.id === child);
        if (childItem?.children?.length > 0) {
          return nestedChildren({ item: childItem });
        } else {
          return childItem;
        }
      }),
    };
  };

  const formik = useFormik({
    initialValues: {
      id: generateId(),
      name: "",
      type: "",
      icon: "",
      category: "",
      author: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      values.icon = selectedIcon;
      try {
        const { app, components } = store || {};
        const { available_media_devices } = app || {};
        const newComponents = Object.values(components).filter(
          (comp) => typeof comp === "object"
        );
        const newData = newComponents.map((item: any) =>
          nestedChildren({ item  })
        );
        if (newData?.length > 0 && newData[0]) {
          const { data } = await Axios.post("/api/listing-component", {
            ...newData[0],
            ...values,
          });
          if (data) {
            setOpen(false);
            resetForm();
            // router.push("/page-builder");
          }
        }
      } catch (error: any) {
        console.log(error?.response?.data);
      }
    },
  });

  return (
    <>
      <Modal open={open} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit} className="max-w-full mx-auto">
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-600"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              onChange={formik.handleChange}
              value={formik.values.id}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-600"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-600"
            >
              Icon
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              onChange={formik.handleChange}
              value={formik.values.icon}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div> */}

          <IconSearch
            label="Select Icon"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="" label="Select a category" />
              <option value="basic" label="Basic" />
              <option value="advanced" label="Advanced" />
              <option value="pro" label="Pro" />
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              onChange={formik.handleChange}
              value={formik.values.author}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ListingComponent;
