
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getSelectedComponent } from "@/utils/selectors";
import usePRLocation from "@/hooks/usePRLocation";
import * as Yup from "yup";
// import { createCollection }

// REGISTER COMPONENTES MODAL
interface RegisterComponentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageBuilder?: boolean;
}

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  // type: Yup.string().required("Type is required"),
  // icon: Yup.string().required("Icon is required"),
  // category: Yup.string().required("Category is required"),
  // author: Yup.string().required("Author is required"),
  description: Yup.string()
    .min(5, "Minimum length must be at least 5 characters")
    .required("Description is required"),
});

const ListingComponent = ({
  open,
  setOpen,
  pageBuilder = false,
}: RegisterComponentModalProps) => {
  const selectedComponent = useSelector(getSelectedComponent) || {};
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleCloseModal = () => {
    setOpen(false);
  };

  // const { asPath, isQueryEmpty } = usePRLocation();
  // const router = useRouter();
  const store = useSelector((state: any) => state);

  const { app, components } = store || {};

  // recursive children function
  const nestedChildren = (
    {
      item,
      newComponents,
      child = false,
    }: {
      item: any;
      newComponents: any;
      child?: boolean;
    },
    values?: any
  ) => {
    const {
      id,
      name,
      type,
      icon,
      category,
      author,
      description,
      defaultStyles,
      children,
      props,
    } = item || {};
    return {
      id,
      name,
      type,
      icon,
      category: values?.category || category || "basic",
      author: values?.author || author || "admin",
      description: values?.description || description || "description",
      defaultStyles: props?.style,
      childrenLayout: children.map((child: any) => {
        const childItem = newComponents?.find((comp: any) => comp.id === child);
        if (childItem) {
          if (childItem?.children?.length > 0) {
            return nestedChildren({
              item: childItem,
              newComponents,
              child: true,
            });
          } else {
            return { ...childItem, defaultStyles: childItem?.props?.style };
          }
        }
      }),
    };
  };

  const defaultValues = {
    // id:  generateId() : selectedComponent?.id,
    name:  "" ,
    type:  "" ,
    icon:  "" ,
    category:  "" ,
    author:  "" ,
    description:  "" ,
  };

  const initialValues = {
    name: "",
    type: "",
    icon: "",
    category: "",
    author: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values, { resetForm }) => {
      values.icon = selectedIcon;
      try {
        const newComponents = Object.values(components).filter(
          (comp) => typeof comp === "object"
        );

        // organize childlayout tree
        const newData = nestedChildren({
          item: selectedComponent,
          newComponents,
        });

        // post data to backend
        const newValues =  defaultValues;

        // if (newData) {
        //   if (pageBuilder) {
        //     // If using page builder
        //     if (isQueryEmpty) {
        //       // If creating a new page
        //       // Post data to the backend for page creation
        //       const { data } = await Axios.post("/api/page-crud", {
        //         ...newData,
        //         ...newValues,
        //         ...values,
        //         id:  generateId() : selectedComponent?.id,
        //       });
        //       // If data is posted successfully, close the form, reset, and potentially navigate
        //       if (data) {
        //         setOpen(false);
        //         resetForm();
        //         // router.push("/page-builder");
        //       }
        //     } else {
        //       // If updating an existing page
        //       // Put data to the backend for page update
        //       const { data } = await Axios.put("/api/page-crud", {
        //         ...newData,
        //         ...newValues,
        //         ...values,
        //         id:  generateId() : selectedComponent?.id,
        //       });
        //       // If data is posted successfully, close the form, reset, and potentially navigate
        //       if (data) {
        //         setOpen(false);
        //         resetForm();
        //         // router.push("/page-builder");
        //       }
        //     }
        //   } else {
        //     if (asPath.includes("form-builder")) {
        //       createCollection({ ...newData, ...values })
        //         .then(async (res: any) => {
        //           if (isQueryEmpty) {
        //             const { data } = await Axios.post(
        //               "/api/listing-component",
        //               {
        //                 ...newData,
        //                 ...newValues,
        //                 id:  generateId() : selectedComponent?.id,
        //               }
        //             );
        //             // if data is posted successfully
        //             if (data) {
        //               setOpen(false);
        //               resetForm();
        //               // router.push("/page-builder");
        //             }
        //           } else {
        //             const { data } = await Axios.put(
        //               "/api/update-listing-component",
        //               {
        //                 ...newData,
        //                 ...newValues,
        //                 id:  generateId() : selectedComponent?.id,
        //               }
        //             );
        //             // if data is posted successfully
        //             if (data) {
        //               setOpen(false);
        //               resetForm();
        //               // router.push("/page-builder");
        //             }
        //           }
        //         })
        //         .catch((err: any) => {
        //           console.log(err);
        //         });
        //     } else {
        //       if (isQueryEmpty) {
        //         const { data } = await Axios.post("/api/listing-component", {
        //           ...newData,
        //           ...newValues,
        //           ...values,
        //           id:  generateId() : selectedComponent?.id,
        //         });
        //         // if data is posted successfully
        //         if (data) {
        //           setOpen(false);
        //           resetForm();
        //           // router.push("/page-builder");
        //         }
        //       } else {
        //         const { data } = await Axios.put(
        //           "/api/update-listing-component",
        //           {
        //             ...newData,
        //             ...newValues,
        //             ...values,
        //             id:  generateId() : selectedComponent?.id,
        //           }
        //         );
        //         // if data is posted successfully
        //         if (data) {
        //           setOpen(false);
        //           resetForm();
        //           // router.push("/page-builder");
        //         }
        //       }
        //     }
        //   }
        // }
      } catch (error: any) {
        console.log(error?.response?.data);
      }
    },

    // If that's not the case, you may need to handle touched differently
    initialTouched: Object.keys(defaultValues).reduce((acc: any, key: any) => {
      acc[key] = true;
      return acc;
    }, {}),
  });

  return (
    <>
      <Modal open={open} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit} className="max-w-full mx-auto">
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
              value={formik.values.name || defaultValues?.name}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-600"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type || defaultValues?.type}
              // defaultValue={
              //   ! selectedComponent?.category?.toLowerCase() : ""
              // }
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="" label="Select a category" />
              {types?.[
                (asPath.split("/") as keyof OptionType)?.[1].split("?")[0]
              ]?.map((option: any) => (
                <option
                  key={option.id}
                  value={option.label.toLowerCase()}
                  label={option.label}
                />
              ))}
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-sm">{formik.errors.type}</div>
            )}
          </div> */}

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

          {/* <IconSearch
            label="Select Icon"
            selectedIcon={
              selectedIcon ||  "" : selectedComponent?.icon
            }
            setSelectedIcon={setSelectedIcon}
          /> */}

          {/* <div className="mb-4">
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
              value={formik.values.category || defaultValues?.category}
              // defaultValue={
              //   ! selectedComponent?.category?.toLowerCase() : ""
              // }
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="" label="Select a category" />
              {options?.[
                (asPath.split("/") as keyof OptionType)?.[1].split("?")[0]
              ]?.map((option: any) => (
                <option
                  key={option.id}
                  value={option.label.toLowerCase()}
                  label={option.label}
                />
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 text-sm">
                {formik.errors.category}
              </div>
            )}
          </div> */}

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
              value={formik.values.author || defaultValues?.author}
              // defaultValue={! selectedComponent?.author : ""}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.author && formik.errors.author && (
              <div className="text-red-500 text-sm">{formik.errors.author}</div>
            )}
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
              value={formik.values.description || defaultValues?.description}
              // defaultValue={! selectedComponent?.description : ""}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {/* { "Add as Component" : "Update Component"} */}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ListingComponent;
