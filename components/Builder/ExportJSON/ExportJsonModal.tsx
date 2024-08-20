// EXPORT JSON MODAL

import Modal from "@/components/Modal";
import useConvertPageCompilerData from "@/hooks/useConvertPageCompilerData";
import { convertToPageCompilerData } from "@/utils/convertToPageCompilerData";
import { generateId } from "@/utils/generateId";
import { useSelector } from "react-redux";

const ExportJsonModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // CLOSE MODAL
  const handleCloseModal = () => {
    setOpen(false);
  };

  // GET JSON FROM REDUX
  const store = useSelector((state: any) => state);

  const { app, components } = store || {};
  const { available_media_devices } = app || {};
  const newComponents = Object.values(components).filter(
    (comp) => typeof comp === "object"
  );

  // Style manupulated like original json
  const { data } = useConvertPageCompilerData();

  const id = generateId();
  const nestedChildren = ({ item }: { item: any }) => {
    return {
      // const newItem = {
      id: item?.id === "root" ? id : item?.id,
      name: "Hello",
      type: "component",
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
          return childItem
        }
      }),
    };
  };

  const newData = newComponents.map((item: any) => nestedChildren({ item }));

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="flex flex-col">
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-600"
          >
            JSON
          </label>
          <textarea
            className="mt-1 p-2 w-full border rounded-md bg-black text-white"
            rows={10}
            cols={50}
            value={JSON.stringify(data)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExportJsonModal;
