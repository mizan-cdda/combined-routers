import React, { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import PreviewContainer from "@/components/Builder/Editor/PreviewContainer";
import useConvertPageCompilerData from "@/hooks/useConvertPageCompilerData";
import { useRouter } from "next/router";
import { getdisplaySizes } from "@/utils/selectors";

const Preview = () => {
  const pageData = useSelector((state: any) => state);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [width, setWidth] = useState({
    minResulation: "80%",
    maxResulation: "100%",
  });
  // const mediaDevices = useSelector(getdisplaySizes) || {};

  // const [selectedDevice, setSelectedDevice] = useState("desktop");

  // const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // const handleDeviceChange = (device: string) => {
  //   startTransition(() => {
  //     setSelectedDevice(device);
  //     setWidth(mediaDevices[device]);
  //   });
  // };

  const handleGoBack = () => {
    router.back();
  };

  const { data } = useConvertPageCompilerData();


  console.log(data, "preview data");

  return (
    <div className="bg-gray-500 min-h-screen">
      <div className="fixed w-1/4 right-0 left-0 mx-auto flex justify-center items-center gap-x-4 py-1 bg-black z-10 shadow-xl rounded-r-2 mb-2">
        {/* <span className="text-white absolute left-2">
          {width.minResulation.split("px")[0]} X{" "}
          {width.maxResulation.split("px")[0]}
        </span> */}
        {/* <Icon
          nameIcon="FaMobileAlt"
          title="Mobile"
          className={` hover:text-blue-500 cursor-pointer text-lg ${
            selectedDevice === "mobile"
              ? "text-blue-500 font-bold"
              : "text-white"
          }`}
          onClick={() => handleDeviceChange("mobile")}
        />
        <Icon
          nameIcon="LuTablet"
          title="Tablet"
          className={` hover:text-blue-500 cursor-pointer text-xl ${
            selectedDevice === "tablet"
              ? "text-blue-500 font-bold"
              : "text-white"
          }`}
          onClick={() => handleDeviceChange("tablet")}
        />
        <Icon
          nameIcon="CiLaptop"
          title="Laptop"
          className={` hover:text-blue-500 cursor-pointer text-xl ${
            selectedDevice === "laptop"
              ? "text-blue-500 font-bold"
              : "text-white"
          }`}
          onClick={() => handleDeviceChange("laptop")}
        />
        <Icon
          nameIcon="IoIosDesktop"
          title="Desktop"
          className={` hover:text-blue-500 cursor-pointer text-xl ${
            selectedDevice === "desktop"
              ? "text-blue-500 font-bold"
              : "text-white"
          }`}
          onClick={() => handleDeviceChange("desktop")}
        /> */}

        <button
          className="absolute bg-green-500 h-4 text-xs px-2 font-bold right-2"
          onClick={handleGoBack}
        >
          Back To Editor
        </button>
      </div>
      <div
        style={{ width: width.maxResulation, margin: "0 auto" }}
        className="bg-white p-4 box-border"
      >
        <PreviewContainer data={data} />
      </div>
    </div>
  );
};


export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Preview;