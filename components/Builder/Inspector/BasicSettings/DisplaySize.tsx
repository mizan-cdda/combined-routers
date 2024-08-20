import React from "react";
import { toggleDisplaySize } from "@/redux/features/app/appSlice";
import { RootState } from "@/redux/store";
import { getdisplaySizes } from "@/utils/selectors";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const displayTabs: {
  [key: string]: { id: string; name: string }[];
} = {
  desktop: [
    { name: "minResulation", id: "desk-minResulation" },
    { name: "maxResulation", id: "desk-maxResulation" },
  ],
  laptop: [
    { name: "minResulation", id: "laptop-minResulation" },
    { name: "maxResulation", id: "laptop-maxResulation" },
  ],
  tablet: [
    { name: "minResulation", id: "tablet-minResulation" },
    { name: "maxResulation", id: "tablet-maxResulation" },
  ],
  mobile: [
    { name: "minResulation", id: "mobile-minResulation" },
    { name: "maxResulation", id: "mobile-maxResulation" },
  ],
};

const DisplaySize = ({ component }: any) => {
  const displaySizes = useSelector(getdisplaySizes) || {};
  const dispatch = useDispatch();

  return (
    <>
      {component?.id === "root" ? (
        <div>
          <p>Display Sizes</p>
          <div className="flex flex-col gap-1">
            {Object.keys(displayTabs).map((tab: string, i: number) => {
              const display = displayTabs[tab];
              const handleInput = (
                e: ChangeEvent<HTMLInputElement>,
                display: string
              ) => {
                // console.log(e.target.name, e.target.value, display);
                dispatch(
                  toggleDisplaySize({
                    name: e.target.name,
                    value: e.target.value,
                    display,
                  })
                );
              };
              return (
                <div key={i}>
                  <p className="capitalize font-bold text-lg">{tab}</p>
                  <div className="flex justify-between w-full overflow-hidden">
                    {display.map((screen: { id: string; name: string }) => (
                      <input
                        type="number"
                        key={screen.id}
                        name={screen.name}
                        placeholder={screen.name}
                        className="border-2 border-gray-700 w-32 text-center"
                        onChange={(event) => handleInput(event, tab)}
                        defaultValue={
                          displaySizes[tab][screen?.name].split("px")[0]
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DisplaySize;
