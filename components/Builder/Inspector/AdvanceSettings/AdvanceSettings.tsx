import { addHandlerFunctions } from "@/redux/features/components/componentsSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AdvanceSettings = ({ component }: any) => {
  const dispatch = useDispatch();

  const onChange = (propertyName: string) => (e: any) => {
    dispatch(
      addHandlerFunctions({
        id: component.id,
        name: propertyName,
        value: e.target.value ? JSON?.parse(e?.target?.value) : "",
      })
    );
  };

  //   const renderWithInterval=(intervalInSeconds)=> {
  //     let renderCount = 0;

  //     function render() {
  //       renderCount++;
  //       console.log(`Render count: ${renderCount}`);
  //     }

  //     // Call the render function every specified interval
  //     setInterval(render, intervalInSeconds * 1000);
  //   }

  const functions = {
    log: "()=>{console.log('hello fun log')}",
    confirm: "()=>confirm('hello confirm')",
    alert: "()=>alert('hello alert')",
    timeInterval: `()=> {
          
      renderCount++;
        console.log("render count: ", renderCount);

      }`,
  };

  const handlersArr = [
    "formAction",
    "onClick",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseOver",
    "onMouseOut",
    "onMouseUp",
    "onMouseDown",
    "onFocus",
    "onBlur",
    "onSubmit",
    "onChange",
    "onReload",
    "onUnload",
    "onResize",
  ];

  const [selectedHandler, setSelectedHandler] = useState("onClick");
  const [writtenFunction, setWrittenFunction] = useState("");

  const handleWriteFunction = () => {
    dispatch(
      addHandlerFunctions({
        id: component.id,
        name: selectedHandler,
        value: writtenFunction,
        actionType: selectedHandler === "formAction" ? true : false,
      })
    );
  };

  // Debounce the function with a delay of 500 milliseconds
  // const debouncedFunction = debounce(handleWriteFunction, 500);
  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      {/* <label
        className="block mb-2 text-sm font-bold text-gray-600"
        htmlFor="onClick"
      >
        onClick
      </label>
      <textarea
        placeholder="()=>{write your function here like this}}"
        id="onClick"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={onChange("onClick")}
      />
      <select
        name=""
        id=""
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={onChange("onClick")}
      >
        <option value="">select functions</option>
        {Object.keys(functions).map((key) => (
          <option key={key} value={JSON.stringify(functions?.[key])}>
            {key}
          </option>
        ))}
      </select> */}
      <select
        name=""
        id=""
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={(e) => setSelectedHandler(e.target.value)}
        value={selectedHandler}
      >
        {handlersArr.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <textarea
        placeholder="{ // write some code here }"
        id="onClick"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        onChange={(e) => setWrittenFunction(e.target.value)}
        defaultValue={component?.functions?.[selectedHandler] || ""}
      />
      <button
        className="bg-green-600 disabled:bg-green-400 px-4 text-base font-semibold text-white"
        onClick={handleWriteFunction}
      >
        Update
      </button>
    </div>
  );
};

export default AdvanceSettings;
