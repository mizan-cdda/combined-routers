"use client";
import React, { useEffect, memo, useState } from "react";
import { ComponentsJsonProps } from "@/types/types";
import DragItem from "./DragItem";
import ListingComponent from "../ListingComponent";
import ExportJsonModal from "../ExportJSON/ExportJsonModal";
import Link from "next/link";
import SearchComonent from "./SearchComponent";
import { useSelector } from "react-redux";
import { getSelectedId } from "@/utils/selectors";
import { generateId } from "@/utils/generateId";
import Button from "@/components/Preview/ui/button/Button";
import useConvertPageCompilerData from "@/hooks/useConvertPageCompilerData";

const Aside = ({ data }: ComponentsJsonProps) => {
  // const { asPath, isQueryEmpty } = usePRLocation();
  const [aside, setAside] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [exportJsonModal, setExportJsonModal] = React.useState<boolean>(false);
  // const { components } = useSelector((state: any) => state);
  const [existingJson, setExistingJson] = React.useState<any>([]);

  const [component, setComponent] = React.useState<{
    [key: string]: any;
  }>([]);

  const selectedComponent = useSelector(getSelectedId);

  // SET UPDATED COMPONENTS DATA
  useEffect(() => {
    setExistingJson(JSON.parse(localStorage.getItem("form") || "[]"));
    setComponent(data);
  }, [data]);

  // HANDLE SAVE JSON DATA
  const handleSaveJsonData = () => {
    // const newJson = existingJson?.map((item: any) => {
    //   if (item.id === query.id) {
    //     return {
    //       ...item,
    //       components,
    //     };
    //   }
    //   return item;
    // });
    // setExistingJson(newJson);
    // localStorage.setItem("form", JSON.stringify(newJson));
  };
  const handlePublished = () => {
    // if (asPath === "/page-builder") {
    //   return;
    // }
    setOpen(true);
    // setExportJsonModal(true);
  };

  const { data: previewData } = useConvertPageCompilerData();

  const handlePreview = () => {
    console.log("preview data", previewData);
  };

  return (
    <div
      className="bg-gray-50 transition-all duration-75 flex flex-col max-w-[300px]"
      // style={{ width: aside ? "300px" : "200px" }}
      style={{ width: "300px" }}
    >
      <Link href="/">
        <div className="bg-gray-400 text-lg font-bold text-center py-2">
          PyReactor
        </div>
      </Link>
      <SearchComonent setComponent={setComponent} data={data} asPath={"/"} />
      <div className="flex-1">
        {Object?.entries(component)?.map(([category, componentList]) => {
          return (
            <div key={category}>
              <h3 className="capitalize font-bold text-base bg-slate-200 px-2">
                {category}
              </h3>
              <div>
                {componentList?.length === 0 && (
                  <p className="text-sm italic">No component found!</p>
                )}
                <div className="grid grid-cols-2 gap-2 p-2">
                  {componentList?.map((component: any) => {
                    const { soon, acceptChildren } = component || {};

                    return (
                      <DragItem
                        key={component.id}
                        acceptChildren={acceptChildren}
                        component={component}
                        soon={soon}
                        type={component.type || component.name}
                        rootParentType={
                          component.rootParentType || component.name
                        }
                        label={component.name}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/*  */}
        {/* {asPath === "/page-builder" && (
          <Link href="/component-builder">
            <button
              // onClick={() => setOpen(true)}
              className="flex items-center bg-slate-500 text-white py-2 px-4 w-full justify-center gap-2"
            >
              <span className="text-sm font-semibold">
                Create/Add new component
              </span>
              <Icon nameIcon="IoMdAdd" />
            </button>
          </Link>
        )} */}
      </div>
      <div className="bg-gray-400 py-3 text-center flex justify-center gap-2 px-2">
        {/* <button
          // onClick={() => handleSaveJsonData()}
          className="bg-blue-500 flex items-center justify-center gap-2 px-2 py-1 rounded-sm text-white text-sm font-semibold"
        >
          <span>Save </span>
          <Icon nameIcon="AiFillSave" />
        </button> */}
        <Button
          onClick={handlePreview}
          // target="_blank"
          className="bg-slate-500 hover:bg-slate-800 transition-all duration-150 flex items-center justify-center gap-2 px-2 py-1 rounded-sm text-white text-sm font-semibold"
        >
          Preview
        </Button>
        {/* <button className="bg-slate-500 hover:bg-slate-800 transition-all duration-150 flex items-center justify-center gap-2 px-2 py-1 rounded-sm text-white text-sm font-semibold">
          <span>Settings</span>
          <Icon nameIcon="MdOutlineSettings" />
        </button> */}
        <button
          className="bg-green-700 flex items-center justify-center gap-2 px-2 py-1 rounded-sm text-white text-sm font-semibold disabled:bg-gray-700"
          disabled={selectedComponent === "root"}
          onClick={handlePublished}
          title={
            selectedComponent === "root" ? "Component must be selected" : ""
          }
        >
          {/* <span>{isQueryEmpty ? "Publish" : "Update"}</span>
          <Icon nameIcon="PiScribbleLoopLight" /> */}
        </button>
      </div>
      <ListingComponent open={open} setOpen={setOpen} pageBuilder={false} />
      <ExportJsonModal open={exportJsonModal} setOpen={setExportJsonModal} />
    </div>
  );
};

export default memo(Aside);
