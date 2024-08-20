import { useContext } from "react";
import { DynamicDataContext } from "@/context/DynamicDataProvider";

const useDnd = () => {
  return useContext(DynamicDataContext);
};

export default useDnd;
